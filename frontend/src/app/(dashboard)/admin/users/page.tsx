'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Users, Plus, Trash2, Key, Shield } from 'lucide-react'
import { useRoleGuard } from '@/lib/hooks/use-role-guard'
import { useTranslation } from '@/lib/hooks/use-translation'
import apiClient from '@/lib/api/client'
import { toast } from 'sonner'

interface UserInfo {
    id: string
    username: string
    email?: string | null
    role: string
}

export default function AdminUsersPage() {
    const { t } = useTranslation()
    const { isAdmin } = useRoleGuard()
    const router = useRouter()

    const [users, setUsers] = useState<UserInfo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Create user dialog
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newRole, setNewRole] = useState('user')
    const [creating, setCreating] = useState(false)

    // Delete user dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<UserInfo | null>(null)

    // Change password dialog
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
    const [userToChangePassword, setUserToChangePassword] = useState<UserInfo | null>(null)
    const [newPasswordValue, setNewPasswordValue] = useState('')

    // Change role dialog
    const [roleDialogOpen, setRoleDialogOpen] = useState(false)
    const [userToChangeRole, setUserToChangeRole] = useState<UserInfo | null>(null)
    const [newRoleValue, setNewRoleValue] = useState('')

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true)
            const response = await apiClient.get<UserInfo[]>('/auth/users')
            setUsers(response.data)
            setError(null)
        } catch (err) {
            console.error('Failed to fetch users:', err)
            setError('Failed to load users')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!isAdmin) {
            router.push('/notebooks')
            return
        }
        fetchUsers()
    }, [isAdmin, router, fetchUsers])

    const handleCreateUser = async () => {
        if (!newUsername.trim() || !newPassword.trim()) return

        setCreating(true)
        try {
            await apiClient.post('/auth/users', {
                username: newUsername.trim(),
                password: newPassword,
                role: newRole,
            })
            toast.success(`User "${newUsername}" created successfully`)
            setCreateDialogOpen(false)
            setNewUsername('')
            setNewPassword('')
            setNewRole('user')
            fetchUsers()
        } catch (err: unknown) {
            const error = err as { response?: { data?: { detail?: string } } }
            toast.error(error.response?.data?.detail || 'Failed to create user')
        } finally {
            setCreating(false)
        }
    }

    const handleDeleteUser = async () => {
        if (!userToDelete) return

        try {
            await apiClient.delete(`/auth/users/${encodeURIComponent(userToDelete.id)}`)
            toast.success(`User "${userToDelete.username}" deleted`)
            setDeleteDialogOpen(false)
            setUserToDelete(null)
            fetchUsers()
        } catch (err: unknown) {
            const error = err as { response?: { data?: { detail?: string } } }
            toast.error(error.response?.data?.detail || 'Failed to delete user')
        }
    }

    const handleChangePassword = async () => {
        if (!userToChangePassword || !newPasswordValue.trim()) return

        try {
            await apiClient.put(`/auth/users/${encodeURIComponent(userToChangePassword.id)}/password`, {
                new_password: newPasswordValue,
            })
            toast.success(`Password changed for "${userToChangePassword.username}"`)
            setPasswordDialogOpen(false)
            setUserToChangePassword(null)
            setNewPasswordValue('')
        } catch (err: unknown) {
            const error = err as { response?: { data?: { detail?: string } } }
            toast.error(error.response?.data?.detail || 'Failed to change password')
        }
    }

    const handleChangeRole = async () => {
        if (!userToChangeRole || !newRoleValue) return

        try {
            await apiClient.put(`/auth/users/${encodeURIComponent(userToChangeRole.id)}/role`, {
                role: newRoleValue,
            })
            toast.success(`Role updated for "${userToChangeRole.username}" → ${newRoleValue}`)
            setRoleDialogOpen(false)
            setUserToChangeRole(null)
            setNewRoleValue('')
            fetchUsers()
        } catch (err: unknown) {
            const error = err as { response?: { data?: { detail?: string } } }
            toast.error(error.response?.data?.detail || 'Failed to change role')
        }
    }

    if (!isAdmin) {
        return null
    }

    if (loading) {
        return (
            <AppShell>
                <div className="flex h-full items-center justify-center">
                    <LoadingSpinner />
                </div>
            </AppShell>
        )
    }

    return (
        <AppShell>
            <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-6 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Users className="h-8 w-8" />
                            {t.navigation.users}
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Manage user accounts and permissions
                        </p>
                    </div>
                    <Button onClick={() => setCreateDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create User
                    </Button>
                </div>

                {error && (
                    <div className="mb-4 p-4 rounded-md bg-destructive/10 text-destructive">
                        {error}
                    </div>
                )}

                <div className="rounded-md border">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Username
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Role
                                </th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                    {t.common.actions}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                                    <td className="h-14 px-4">
                                        <span className="font-medium">{user.username}</span>
                                        {user.email && (
                                            <span className="text-sm text-muted-foreground ml-2">({user.email})</span>
                                        )}
                                    </td>
                                    <td className="h-14 px-4">
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="h-14 px-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Change password"
                                                onClick={() => {
                                                    setUserToChangePassword(user)
                                                    setNewPasswordValue('')
                                                    setPasswordDialogOpen(true)
                                                }}
                                            >
                                                <Key className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Change role"
                                                onClick={() => {
                                                    setUserToChangeRole(user)
                                                    setNewRoleValue(user.role)
                                                    setRoleDialogOpen(true)
                                                }}
                                            >
                                                <Shield className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                title="Delete user"
                                                onClick={() => {
                                                    setUserToDelete(user)
                                                    setDeleteDialogOpen(true)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="h-24 text-center text-muted-foreground">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create User Dialog */}
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New User</DialogTitle>
                        <DialogDescription>
                            Add a new user account to the system.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={newRole} onValueChange={setNewRole}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                            {t.common.cancel}
                        </Button>
                        <Button
                            onClick={handleCreateUser}
                            disabled={creating || !newUsername.trim() || !newPassword.trim()}
                        >
                            {creating ? t.common.creating : 'Create User'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Confirm Dialog */}
            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete User"
                description={`Are you sure you want to delete user "${userToDelete?.username}"? This action cannot be undone.`}
                confirmText={t.common.delete}
                confirmVariant="destructive"
                onConfirm={handleDeleteUser}
            />

            {/* Change Password Dialog */}
            <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                            Set a new password for user &quot;{userToChangePassword?.username}&quot;.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={newPasswordValue}
                                onChange={(e) => setNewPasswordValue(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>
                            {t.common.cancel}
                        </Button>
                        <Button
                            onClick={handleChangePassword}
                            disabled={!newPasswordValue.trim()}
                        >
                            Change Password
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Role Dialog */}
            <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Role</DialogTitle>
                        <DialogDescription>
                            Change role for user &quot;{userToChangeRole?.username}&quot;.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-role">Role</Label>
                            <Select value={newRoleValue} onValueChange={setNewRoleValue}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
                            {t.common.cancel}
                        </Button>
                        <Button onClick={handleChangeRole} disabled={!newRoleValue}>
                            Change Role
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppShell>
    )
}
