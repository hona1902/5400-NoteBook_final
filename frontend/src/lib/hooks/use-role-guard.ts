'use client'

import { useAuthStore, UserRole } from '@/lib/stores/auth-store'

/**
 * Hook for role-based access control in the UI.
 * 
 * Returns:
 * - isAdmin: Whether current user has admin role
 * - isUser: Whether current user has regular user role
 * - role: The current user's role or null if not authenticated
 * - canManageSources: Whether user can add/edit/delete sources
 * - canManageModels: Whether user can add/edit/delete models
 * - canManageTransformations: Whether user can add/edit/delete transformations
 * - canManageSettings: Whether user can modify settings
 * - canManageUsers: Whether user can manage users
 */
export function useRoleGuard() {
    const { user, isAuthenticated } = useAuthStore()

    const role: UserRole | null = isAuthenticated && user ? user.role : null
    const isAdmin = role === 'admin'
    const isUser = role === 'user'

    return {
        // Role checks
        role,
        isAdmin,
        isUser,

        // Admin-only actions
        canManageSources: isAdmin,
        canManageModels: isAdmin,
        canManageTransformations: isAdmin,
        canManageSettings: isAdmin,
        canManageUsers: isAdmin,

        // User + Admin actions
        canViewSources: isAuthenticated,
        canChat: isAuthenticated,
        canManageNotebooks: isAdmin,
        canManageNotes: isAuthenticated,
        canChangeTheme: isAuthenticated,
    }
}
