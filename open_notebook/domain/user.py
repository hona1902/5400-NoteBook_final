"""
User domain model for multi-user authentication.
"""

from datetime import datetime
from typing import ClassVar, Literal, Optional

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from loguru import logger
from pydantic import field_validator

from open_notebook.database.repository import ensure_record_id, repo_query
from open_notebook.domain.base import ObjectModel
from open_notebook.exceptions import InvalidInputError, NotFoundError

# Password hasher instance (uses secure defaults)
ph = PasswordHasher()


class User(ObjectModel):
    """
    User model for authentication and authorization.
    
    Attributes:
        username: Unique username for login
        email: Optional email address
        password_hash: Argon2-hashed password (never store plaintext!)
        role: User role - "admin" or "user"
        is_active: Whether the user account is active
        theme_preference: User's preferred UI theme
    """
    
    table_name: ClassVar[str] = "user"
    
    username: str
    email: Optional[str] = None
    password_hash: str = ""
    role: Literal["admin", "user"] = "user"
    is_active: bool = True
    theme_preference: Optional[str] = None
    
    @field_validator("username", mode="before")
    @classmethod
    def validate_username(cls, v: str) -> str:
        """Validate username format."""
        if not v or len(v.strip()) < 2:
            raise InvalidInputError("Username must be at least 2 characters")
        v = v.strip().lower()
        if not v.replace("_", "").replace("-", "").replace(".", "").isalnum():
            raise InvalidInputError("Username can only contain letters, numbers, underscores, hyphens, and dots")
        return v
    
    @field_validator("role", mode="before")
    @classmethod
    def validate_role(cls, v: str) -> str:
        """Validate role is either admin or user."""
        if v not in ("admin", "user"):
            raise InvalidInputError("Role must be 'admin' or 'user'")
        return v
    
    @classmethod
    def hash_password(cls, plain_password: str) -> str:
        """Hash a plaintext password using Argon2."""
        return ph.hash(plain_password)
    
    def verify_password(self, plain_password: str) -> bool:
        """Verify a plaintext password against the stored hash."""
        try:
            ph.verify(self.password_hash, plain_password)
            if ph.check_needs_rehash(self.password_hash):
                self.password_hash = ph.hash(plain_password)
            return True
        except VerifyMismatchError:
            return False
        except Exception as e:
            logger.error(f"Password verification error: {e}")
            return False
    
    def set_password(self, plain_password: str) -> None:
        """Set a new password (hashes it automatically)."""
        if len(plain_password) < 8:
            raise InvalidInputError("Password must be at least 8 characters")
        self.password_hash = self.hash_password(plain_password)
    
    @classmethod
    async def get_by_username(cls, username: str) -> Optional["User"]:
        """Find a user by username."""
        username = username.strip().lower()
        try:
            results = await repo_query(
                "SELECT * FROM user WHERE username = $username LIMIT 1",
                {"username": username}
            )
            if results and len(results) > 0:
                return cls.model_validate(results[0])
            return None
        except Exception as e:
            logger.error(f"Error fetching user by username: {e}")
            return None
    
    @classmethod
    async def get_by_id(cls, user_id: str) -> Optional["User"]:
        """Find a user by ID."""
        try:
            record_id = ensure_record_id(user_id)
            results = await repo_query(
                "SELECT * FROM $id LIMIT 1",
                {"id": record_id}
            )
            if results and len(results) > 0:
                return cls.model_validate(results[0])
            return None
        except Exception as e:
            logger.error(f"Error fetching user by id: {e}")
            return None

    @classmethod
    async def get_all(cls) -> list["User"]:
        """Get all users."""
        try:
            results = await repo_query("SELECT * FROM user ORDER BY username")
            return [cls.model_validate(r) for r in results]
        except Exception as e:
            logger.error(f"Error fetching users: {e}")
            return []
    
    @classmethod
    async def authenticate(cls, username: str, password: str) -> Optional["User"]:
        """Authenticate a user by username and password."""
        user = await cls.get_by_username(username)
        if user is None:
            logger.warning(f"Login attempt for non-existent user: {username}")
            return None
        
        if not user.is_active:
            logger.warning(f"Login attempt for inactive user: {username}")
            return None
        
        if not user.verify_password(password):
            logger.warning(f"Invalid password for user: {username}")
            return None
        
        logger.info(f"User authenticated successfully: {username}")
        return user
    
    @classmethod
    async def create_user(
        cls,
        username: str,
        password: str,
        role: Literal["admin", "user"] = "user",
        email: Optional[str] = None,
        is_active: bool = True
    ) -> "User":
        """Create a new user with hashed password."""
        # Check if username already exists
        existing = await cls.get_by_username(username)
        if existing:
            raise InvalidInputError(f"User '{username}' already exists")
        
        if len(password) < 8:
            raise InvalidInputError("Password must be at least 8 characters")
        
        user = cls(
            username=username,
            email=email,
            password_hash=cls.hash_password(password),
            role=role,
            is_active=is_active
        )
        await user.save()
        logger.info(f"Created new user: {username} with role: {role}")
        return user
    
    async def update_role(self, new_role: Literal["admin", "user"]) -> None:
        """Update user role."""
        self.role = new_role
        await self.save()
        logger.info(f"Updated role for user {self.username} to {new_role}")
    
    async def change_password(self, new_password: str) -> None:
        """Change user password."""
        self.set_password(new_password)
        await self.save()
        logger.info(f"Password changed for user {self.username}")
    
    async def delete_user(self) -> None:
        """Delete this user."""
        from open_notebook.database.repository import repo_delete
        if self.id:
            await repo_delete(self.id)
            logger.info(f"Deleted user: {self.username}")
    
    @classmethod
    async def get_admin_count(cls) -> int:
        """Get the count of admin users."""
        try:
            results = await repo_query(
                "SELECT count() FROM user WHERE role = 'admin' GROUP ALL"
            )
            if results and len(results) > 0:
                return results[0].get("count", 0)
            return 0
        except Exception as e:
            logger.error(f"Error counting admins: {e}")
            return 0
    
    def to_public_dict(self) -> dict:
        """Return user data safe for public exposure (no password hash)."""
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "is_active": self.is_active,
            "theme_preference": self.theme_preference,
            "created": self.created.isoformat() if self.created else None,
            "updated": self.updated.isoformat() if self.updated else None,
        }
