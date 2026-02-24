# Authentication and Authorization

Open Notebook supports multi-user authentication with role-based access control (RBAC).

## Features

- **Multi-user authentication** with email/password login
- **JWT tokens** (access + refresh tokens)
- **Role-based access control** (admin/user roles)
- **Backward compatible** with legacy `OPEN_NOTEBOOK_PASSWORD` mechanism

## User Roles

### Admin
Full access to all features:
- Create, edit, delete sources (documents, URLs, text)
- Manage AI models and providers
- Configure transformations
- Modify system settings
- Manage users

### User
Limited access:
- Chat with notebooks
- Create and manage notebooks/notes
- Change theme preferences
- Search and browse existing sources (read-only)

**Blocked for users:**
- Adding/editing/deleting sources
- Model/provider configuration
- Transformation management
- System settings
- User management

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPEN_NOTEBOOK_PASSWORD` | (empty) | Legacy instance password. When set, this password grants admin access. |
| `JWT_SECRET_KEY` | `change-me-in-production-use-secure-random-key` | Secret key for signing JWT tokens. **MUST change in production!** |
| `JWT_ALGORITHM` | `HS256` | Algorithm for JWT signing |
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | Access token expiration in minutes |
| `JWT_REFRESH_TOKEN_EXPIRE_DAYS` | `7` | Refresh token expiration in days |

## Creating the First Admin User

### Option 1: Using OPEN_NOTEBOOK_PASSWORD (Quick Start)

Set the `OPEN_NOTEBOOK_PASSWORD` environment variable. Any login with this password will have admin access.

```bash
OPEN_NOTEBOOK_PASSWORD=your-secure-password
```

### Option 2: SurrealDB Direct Insert (Recommended for Production)

1. Connect to your SurrealDB instance
2. Run the following query to create an admin user:

```sql
-- Generate password hash with argon2
-- In production, use a secure tool to generate the hash
-- Example hash for password "admin123" (DO NOT use in production):
-- $argon2id$v=19$m=65536,t=3,p=4$...

CREATE user SET
  email = 'admin@example.com',
  password_hash = '<argon2-hashed-password>',
  role = 'admin',
  is_active = true,
  created = time::now(),
  updated = time::now();
```

### Option 3: Using Python Script

Create a file `scripts/create_admin.py`:

```python
import asyncio
from open_notebook.domain.user import User

async def create_admin():
    user = await User.create_user(
        email="admin@example.com",
        password="your-secure-password",
        role="admin"
    )
    print(f"Created admin user: {user.email}")

if __name__ == "__main__":
    asyncio.run(create_admin())
```

Run with: `uv run python scripts/create_admin.py`

## API Endpoints

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/status` | GET | Check if authentication is enabled |
| `/api/auth/login` | POST | Login with email/password |
| `/api/auth/logout` | POST | Logout current user |
| `/api/auth/me` | GET | Get current user info |
| `/api/auth/refresh` | POST | Refresh access token |
| `/api/auth/users` | GET | List all users (admin only) |
| `/api/auth/users` | POST | Create new user (admin only) |

### Login Request

```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "your-password"
}
```

### Login Response

```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

## Frontend Integration

The frontend automatically:
1. Stores JWT tokens securely
2. Attaches tokens to API requests
3. Refreshes tokens before expiration
4. Hides admin UI elements for regular users
5. Redirects to login when authentication expires

## Security Best Practices

1. **Change JWT_SECRET_KEY** in production to a secure random string (32+ characters)
2. **Use HTTPS** to protect tokens in transit
3. **Never store plaintext passwords** - always use argon2 hashing
4. **Set appropriate token expiration** based on your security requirements
5. **Monitor failed login attempts** in your logs

## Backward Compatibility

Existing deployments using `OPEN_NOTEBOOK_PASSWORD` continue to work:
- If the password is set, users can log in with any email + that password
- This grants admin access (full functionality)
- New multi-user system works alongside legacy password authentication
