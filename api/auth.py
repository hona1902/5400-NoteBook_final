"""
Authentication module for Open Notebook API.
Supports both JWT token auth (multi-user) and legacy password auth.
"""

import os
from datetime import datetime, timedelta, timezone
from typing import Optional

import jwt
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from loguru import logger
from pydantic import BaseModel
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from open_notebook.utils.encryption import get_secret_from_env

# JWT Configuration
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "change-me-in-production-use-secure-random-key")
JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM", "HS256")
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
JWT_REFRESH_TOKEN_EXPIRE_DAYS = int(os.environ.get("JWT_REFRESH_TOKEN_EXPIRE_DAYS", "7"))


# --- Models ---

class TokenData(BaseModel):
    user_id: Optional[str] = None
    username: Optional[str] = None
    email: Optional[str] = None
    role: str = "user"
    token_type: str = "access"


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60


class CurrentUser(BaseModel):
    id: Optional[str] = None
    username: Optional[str] = None
    email: Optional[str] = None
    role: str = "user"
    is_app_password: bool = False


# --- JWT Token Functions ---

def create_access_token(user_id: str, username: str = None, email: str = None, role: str = "user") -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": user_id,
        "username": username,
        "email": email,
        "role": role,
        "type": "access",
        "exp": expire,
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str, username: str = None, email: str = None, role: str = "user") -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=JWT_REFRESH_TOKEN_EXPIRE_DAYS)
    payload = {
        "sub": user_id,
        "username": username,
        "email": email,
        "role": role,
        "type": "refresh",
        "exp": expire,
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def create_tokens(user_id: str, username: str = None, email: str = None, role: str = "user") -> TokenResponse:
    access_token = create_access_token(user_id, username, email, role)
    refresh_token = create_refresh_token(user_id, username, email, role)
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


def decode_token(token: str) -> Optional[TokenData]:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return TokenData(
            user_id=payload.get("sub"),
            username=payload.get("username"),
            email=payload.get("email"),
            role=payload.get("role", "user"),
            token_type=payload.get("type", "access"),
        )
    except jwt.ExpiredSignatureError:
        logger.debug("Token expired")
        return None
    except jwt.InvalidTokenError as e:
        logger.debug(f"Invalid token: {e}")
        return None


# --- Middleware ---

class PasswordAuthMiddleware(BaseHTTPMiddleware):
    """
    Middleware to check authentication for all API requests.
    Supports both JWT tokens and legacy password auth.
    """

    def __init__(self, app, excluded_paths: Optional[list] = None):
        super().__init__(app)
        self.password = get_secret_from_env("OPEN_NOTEBOOK_PASSWORD")
        self.excluded_paths = excluded_paths or [
            "/",
            "/health",
            "/docs",
            "/openapi.json",
            "/redoc",
        ]

    async def dispatch(self, request: Request, call_next):
        # Skip authentication for excluded paths
        if request.url.path in self.excluded_paths:
            return await call_next(request)

        # Skip authentication for CORS preflight requests (OPTIONS)
        if request.method == "OPTIONS":
            return await call_next(request)

        # Get authorization header
        auth_header = request.headers.get("Authorization")

        # If no auth header and no password required, allow through
        if not auth_header:
            if not self.password:
                return await call_next(request)
            return JSONResponse(
                status_code=401,
                content={"detail": "Missing authorization header"},
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Parse Bearer token
        try:
            scheme, credentials = auth_header.split(" ", 1)
            if scheme.lower() != "bearer":
                raise ValueError("Invalid authentication scheme")
        except ValueError:
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid authorization header format"},
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Try JWT token first
        token_data = decode_token(credentials)
        if token_data and token_data.token_type == "access":
            # Valid JWT token - store user info in request state
            request.state.current_user = CurrentUser(
                id=token_data.user_id,
                username=token_data.username,
                email=token_data.email,
                role=token_data.role,
                is_app_password=False,
            )
            return await call_next(request)

        # Fall back to legacy password check
        if self.password and credentials == self.password:
            request.state.current_user = CurrentUser(
                role="admin",
                is_app_password=True,
            )
            return await call_next(request)

        # If no password is configured and JWT failed, allow through (backwards compat)
        if not self.password:
            return await call_next(request)

        return JSONResponse(
            status_code=401,
            content={"detail": "Invalid credentials"},
            headers={"WWW-Authenticate": "Bearer"},
        )


# --- Dependencies ---

security = HTTPBearer(auto_error=False)


def get_current_user(request: Request) -> CurrentUser:
    """Get the current authenticated user from request state."""
    user = getattr(request.state, "current_user", None)
    if user:
        return user
    # Default: no auth required mode
    return CurrentUser(role="admin", is_app_password=True)


def require_admin(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    """Require admin role."""
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


def require_user(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    """Require at least user role (admin also passes)."""
    return user


def check_api_password(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> bool:
    """
    Utility function to check API password.
    Can be used as a dependency in individual routes if needed.
    """
    password = get_secret_from_env("OPEN_NOTEBOOK_PASSWORD")

    if not password:
        return True

    if not credentials:
        raise HTTPException(
            status_code=401,
            detail="Missing authorization",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Try JWT first
    token_data = decode_token(credentials.credentials)
    if token_data:
        return True

    # Fall back to password check
    if credentials.credentials != password:
        raise HTTPException(
            status_code=401,
            detail="Invalid password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return True
