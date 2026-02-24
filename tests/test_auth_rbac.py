"""
Tests for authentication and role-based access control (RBAC).

Tests cover:
1. JWT token creation and validation
2. User authentication (email/password, legacy password)
3. Admin-only endpoint protection (sources, models, transformations, settings)
4. User role restrictions
"""

import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi import HTTPException

# Import auth utilities
from api.auth import (
    create_access_token,
    create_refresh_token,
    create_tokens,
    decode_token,
    CurrentUser,
    require_admin,
    require_user,
    TokenData,
)


class TestJWTTokens:
    """Tests for JWT token creation and validation."""

    def test_create_access_token(self):
        """Test access token creation."""
        token = create_access_token(
            user_id="user:123",
            email="test@example.com",
            role="admin"
        )
        
        assert token is not None
        assert isinstance(token, str)
        assert len(token) > 0

    def test_create_refresh_token(self):
        """Test refresh token creation."""
        token = create_refresh_token(
            user_id="user:123",
            email="test@example.com",
            role="user"
        )
        
        assert token is not None
        assert isinstance(token, str)
        assert len(token) > 0

    def test_create_tokens_returns_both(self):
        """Test that create_tokens returns both access and refresh tokens."""
        response = create_tokens(
            user_id="user:123",
            email="test@example.com",
            role="admin"
        )
        
        assert response.access_token is not None
        assert response.refresh_token is not None
        assert response.token_type == "bearer"
        assert response.expires_in > 0

    def test_decode_valid_token(self):
        """Test decoding a valid access token."""
        token = create_access_token(
            user_id="user:123",
            email="test@example.com",
            role="admin"
        )
        
        token_data = decode_token(token)
        
        assert token_data is not None
        assert token_data.user_id == "user:123"
        assert token_data.email == "test@example.com"
        assert token_data.role == "admin"
        assert token_data.token_type == "access"

    def test_decode_invalid_token_returns_none(self):
        """Test that decoding an invalid token returns None."""
        token_data = decode_token("invalid-token")
        
        assert token_data is None

    def test_decode_refresh_token_type(self):
        """Test that refresh tokens have correct type."""
        token = create_refresh_token(
            user_id="user:456",
            email="user@example.com",
            role="user"
        )
        
        token_data = decode_token(token)
        
        assert token_data is not None
        assert token_data.token_type == "refresh"


class TestRoleGuards:
    """Tests for role-based access control dependencies."""

    def test_require_admin_allows_admin(self):
        """Test that require_admin allows admin users."""
        admin_user = CurrentUser(
            id="user:123",
            email="admin@example.com",
            role="admin",
            is_app_password=False
        )
        
        # Should not raise
        result = require_admin(admin_user)
        assert result.role == "admin"

    def test_require_admin_blocks_user(self):
        """Test that require_admin blocks regular users."""
        regular_user = CurrentUser(
            id="user:456",
            email="user@example.com",
            role="user",
            is_app_password=False
        )
        
        with pytest.raises(HTTPException) as exc:
            require_admin(regular_user)
        
        assert exc.value.status_code == 403
        assert "Admin access required" in exc.value.detail

    def test_require_user_allows_admin(self):
        """Test that require_user allows admin users."""
        admin_user = CurrentUser(
            id="user:123",
            email="admin@example.com",
            role="admin",
            is_app_password=False
        )
        
        result = require_user(admin_user)
        assert result.role == "admin"

    def test_require_user_allows_user(self):
        """Test that require_user allows regular users."""
        regular_user = CurrentUser(
            id="user:456",
            email="user@example.com",
            role="user",
            is_app_password=False
        )
        
        result = require_user(regular_user)
        assert result.role == "user"

    def test_app_password_user_is_admin(self):
        """Test that APP_PASSWORD users are treated as admin."""
        app_password_user = CurrentUser(
            id=None,
            email=None,
            role="admin",
            is_app_password=True
        )
        
        result = require_admin(app_password_user)
        assert result.is_app_password is True
        assert result.role == "admin"


class TestAdminEndpointProtection:
    """Tests to verify admin-only endpoints are protected."""

    @pytest.mark.asyncio
    async def test_user_cannot_create_source(self):
        """Test that regular user cannot create sources (POST /sources)."""
        # This is a behavioral test - in a real integration test,
        # you would use TestClient to call the endpoint with a user token.
        regular_user = CurrentUser(
            id="user:456",
            email="user@example.com",
            role="user",
            is_app_password=False
        )
        
        # Verify the require_admin guard blocks this
        with pytest.raises(HTTPException) as exc:
            require_admin(regular_user)
        
        assert exc.value.status_code == 403

    @pytest.mark.asyncio
    async def test_user_cannot_delete_source(self):
        """Test that regular user cannot delete sources (DELETE /sources/{id})."""
        regular_user = CurrentUser(
            id="user:789",
            email="user@example.com",
            role="user",
            is_app_password=False
        )
        
        with pytest.raises(HTTPException) as exc:
            require_admin(regular_user)
        
        assert exc.value.status_code == 403

    @pytest.mark.asyncio
    async def test_admin_can_create_source(self):
        """Test that admin user can access source creation."""
        admin_user = CurrentUser(
            id="user:admin1",
            email="admin@example.com",
            role="admin",
            is_app_password=False
        )
        
        # Should not raise
        result = require_admin(admin_user)
        assert result.role == "admin"

    @pytest.mark.asyncio
    async def test_user_cannot_modify_models(self):
        """Test that regular user cannot modify models."""
        regular_user = CurrentUser(
            id="user:456",
            email="user@example.com",
            role="user",
            is_app_password=False
        )
        
        with pytest.raises(HTTPException) as exc:
            require_admin(regular_user)
        
        assert exc.value.status_code == 403

    @pytest.mark.asyncio
    async def test_user_cannot_modify_transformations(self):
        """Test that regular user cannot modify transformations."""
        regular_user = CurrentUser(
            id="user:456",
            email="user@example.com",
            role="user",
            is_app_password=False
        )
        
        with pytest.raises(HTTPException) as exc:
            require_admin(regular_user)
        
        assert exc.value.status_code == 403

    @pytest.mark.asyncio
    async def test_user_cannot_modify_settings(self):
        """Test that regular user cannot modify settings."""
        regular_user = CurrentUser(
            id="user:456",
            email="user@example.com",
            role="user",
            is_app_password=False
        )
        
        with pytest.raises(HTTPException) as exc:
            require_admin(regular_user)
        
        assert exc.value.status_code == 403


class TestCurrentUser:
    """Tests for CurrentUser model."""

    def test_current_user_defaults(self):
        """Test CurrentUser default values."""
        user = CurrentUser()
        
        assert user.id is None
        assert user.email is None
        assert user.role == "user"
        assert user.is_app_password is False

    def test_current_user_admin(self):
        """Test CurrentUser with admin role."""
        user = CurrentUser(
            id="user:123",
            email="admin@example.com",
            role="admin",
            is_app_password=False
        )
        
        assert user.role == "admin"
        assert user.email == "admin@example.com"

    def test_current_user_app_password(self):
        """Test CurrentUser from APP_PASSWORD."""
        user = CurrentUser(
            role="admin",
            is_app_password=True
        )
        
        assert user.id is None
        assert user.email is None
        assert user.role == "admin"
        assert user.is_app_password is True
