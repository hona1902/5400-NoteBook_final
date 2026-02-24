"""
Authentication router for Open Notebook API.
Provides endpoints for login, user management, and auth status.
"""

import os
from urllib.parse import unquote

from fastapi import APIRouter, Depends, HTTPException, Request
from loguru import logger
from pydantic import BaseModel
from typing import Optional

from api.auth import (
    CurrentUser,
    create_tokens,
    decode_token,
    get_current_user,
    require_admin,
)
from open_notebook.utils.encryption import get_secret_from_env

router = APIRouter(prefix="/auth", tags=["auth"])


# --- Request/Response Models ---

class LoginRequest(BaseModel):
    username: str
    password: str


class CreateUserRequest(BaseModel):
    username: str
    password: str
    role: str = "user"


class ChangePasswordRequest(BaseModel):
    new_password: str


class ChangeRoleRequest(BaseModel):
    role: str


# --- Endpoints ---

@router.get("/status")
async def get_auth_status():
    """Check if authentication is enabled."""
    app_password = get_secret_from_env("OPEN_NOTEBOOK_PASSWORD")
    admin_username = os.environ.get("ADMIN_USERNAME", "").strip()

    auth_enabled = bool(app_password) or bool(admin_username)

    return {
        "auth_enabled": auth_enabled,
        "auth_mode": "jwt" if admin_username else ("password" if app_password else "none"),
        "message": "Authentication is required" if auth_enabled else "Authentication is disabled",
    }


@router.post("/login")
async def login(request: LoginRequest):
    """Login with username and password. Returns JWT tokens."""

    # Try JWT user auth first
    try:
        from open_notebook.domain.user import User

        user = await User.authenticate(request.username, request.password)
        if user:
            tokens = create_tokens(
                user_id=user.id,
                username=user.username,
                email=user.email,
                role=user.role,
            )
            return {
                "access_token": tokens.access_token,
                "refresh_token": tokens.refresh_token,
                "token_type": tokens.token_type,
                "expires_in": tokens.expires_in,
                "user": user.to_public_dict(),
            }
    except Exception as e:
        logger.debug(f"JWT user auth error (may be expected if no user table): {e}")

    # Fall back to legacy OPEN_NOTEBOOK_PASSWORD
    app_password = get_secret_from_env("OPEN_NOTEBOOK_PASSWORD")
    if app_password and request.password == app_password:
        tokens = create_tokens(
            user_id="app_password",
            username=request.username,
            role="admin",
        )
        return {
            "access_token": tokens.access_token,
            "refresh_token": tokens.refresh_token,
            "token_type": tokens.token_type,
            "expires_in": tokens.expires_in,
            "user": {
                "id": None,
                "username": request.username,
                "role": "admin",
                "is_app_password": True,
            },
        }

    # Fall back to ADMIN_USERNAME / ADMIN_PASSWORD env vars
    admin_username = os.environ.get("ADMIN_USERNAME", "").strip()
    admin_password = os.environ.get("ADMIN_PASSWORD", "").strip()
    if admin_username and admin_password:
        if request.username == admin_username and request.password == admin_password:
            # Auto-create user in DB if possible
            try:
                from open_notebook.domain.user import User

                existing = await User.get_by_username(admin_username)
                if not existing:
                    existing = await User.create_user(
                        username=admin_username,
                        password=admin_password,
                        role="admin",
                    )
                    logger.info(f"Auto-created admin user: {admin_username}")

                tokens = create_tokens(
                    user_id=existing.id,
                    username=existing.username,
                    role="admin",
                )
                return {
                    "access_token": tokens.access_token,
                    "refresh_token": tokens.refresh_token,
                    "token_type": tokens.token_type,
                    "expires_in": tokens.expires_in,
                    "user": existing.to_public_dict(),
                }
            except Exception as e:
                logger.debug(f"Auto-create user error: {e}")
                # Still grant access via env var match
                tokens = create_tokens(
                    user_id="env_admin",
                    username=admin_username,
                    role="admin",
                )
                return {
                    "access_token": tokens.access_token,
                    "refresh_token": tokens.refresh_token,
                    "token_type": tokens.token_type,
                    "expires_in": tokens.expires_in,
                    "user": {
                        "id": None,
                        "username": admin_username,
                        "role": "admin",
                    },
                }

    raise HTTPException(status_code=401, detail="Invalid username or password")


@router.get("/me")
async def get_me(user: CurrentUser = Depends(get_current_user)):
    """Get current user info."""
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
        "is_app_password": user.is_app_password,
    }


@router.post("/refresh")
async def refresh_token(request: Request):
    """Refresh access token using refresh token."""
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    try:
        scheme, token = auth_header.split(" ", 1)
        if scheme.lower() != "bearer":
            raise ValueError()
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token_data = decode_token(token)
    if not token_data or token_data.token_type != "refresh":
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    tokens = create_tokens(
        user_id=token_data.user_id,
        username=token_data.username,
        email=token_data.email,
        role=token_data.role,
    )
    return {
        "access_token": tokens.access_token,
        "refresh_token": tokens.refresh_token,
        "token_type": tokens.token_type,
        "expires_in": tokens.expires_in,
    }


@router.post("/logout")
async def logout():
    """Logout (client-side token removal)."""
    return {"message": "Logged out successfully"}


# --- User Management (Admin Only) ---

@router.get("/users")
async def list_users(admin: CurrentUser = Depends(require_admin)):
    """List all users (admin only)."""
    try:
        from open_notebook.domain.user import User
        users = await User.get_all()
        return [u.to_public_dict() for u in users]
    except Exception as e:
        logger.error(f"Error listing users: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/users")
async def create_user(request: CreateUserRequest, admin: CurrentUser = Depends(require_admin)):
    """Create a new user (admin only)."""
    try:
        from open_notebook.domain.user import User
        user = await User.create_user(
            username=request.username,
            password=request.password,
            role=request.role,
        )
        return user.to_public_dict()
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/users/{user_id:path}")
async def delete_user(user_id: str, admin: CurrentUser = Depends(require_admin)):
    """Delete a user (admin only)."""
    try:
        from open_notebook.domain.user import User
        decoded_id = unquote(user_id)
        user = await User.get_by_id(decoded_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        await user.delete_user()
        return {"message": f"User '{user.username}' deleted"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting user: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/users/{user_id:path}/password")
async def change_password(user_id: str, request: ChangePasswordRequest, admin: CurrentUser = Depends(require_admin)):
    """Change user password (admin only)."""
    try:
        from open_notebook.domain.user import User
        decoded_id = unquote(user_id)
        user = await User.get_by_id(decoded_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        await user.change_password(request.new_password)
        return {"message": f"Password changed for '{user.username}'"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error changing password: {e}")
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/users/{user_id:path}/role")
async def change_role(user_id: str, request: ChangeRoleRequest, admin: CurrentUser = Depends(require_admin)):
    """Change user role (admin only)."""
    try:
        from open_notebook.domain.user import User
        decoded_id = unquote(user_id)
        user = await User.get_by_id(decoded_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        await user.update_role(request.role)
        return {"message": f"Role updated for '{user.username}' → {request.role}"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error changing role: {e}")
        raise HTTPException(status_code=400, detail=str(e))