"""
Script to create the first admin user for Open Notebook.

Usage:
    uv run --env-file .env python scripts/create_admin.py

Or set ADMIN_USERNAME and ADMIN_PASSWORD in .env for auto-seeding on startup.
"""

import asyncio
import os
import sys

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


async def create_admin():
    """Create admin user interactively or from env vars."""
    from open_notebook.database.repository import repo_query
    from open_notebook.database.async_migrate import AsyncMigrationManager
    from open_notebook.domain.user import User

    # Run migrations first
    print("Running database migrations...")
    try:
        migration_manager = AsyncMigrationManager()
        if await migration_manager.needs_migration():
            await migration_manager.run_migration_up()
            print("Migrations applied successfully.")
        else:
            print("Database is up to date.")
    except Exception as e:
        print(f"Migration error: {e}")
        return

    # Check env vars first
    admin_username = os.environ.get("ADMIN_USERNAME", "").strip()
    admin_password = os.environ.get("ADMIN_PASSWORD", "").strip()

    if not admin_username:
        admin_username = input("Enter admin username (default: admin): ").strip() or "admin"
    if not admin_password:
        admin_password = input("Enter admin password (min 8 chars): ").strip()

    if len(admin_password) < 8:
        print("Error: Password must be at least 8 characters.")
        return

    # Check if user already exists
    existing = await User.get_by_username(admin_username)
    if existing:
        print(f"User '{admin_username}' already exists. Updating password...")
        await existing.change_password(admin_password)
        print(f"Password updated for '{admin_username}'.")
    else:
        user = await User.create_user(
            username=admin_username,
            password=admin_password,
            role="admin"
        )
        print(f"Admin user '{admin_username}' created successfully!")
        print(f"User ID: {user.id}")

    print(f"\nYou can now login with:")
    print(f"  Username: {admin_username}")
    print(f"  Password: {admin_password}")


if __name__ == "__main__":
    asyncio.run(create_admin())
