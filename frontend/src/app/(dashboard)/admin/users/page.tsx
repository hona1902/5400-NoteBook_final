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
            setError(t.users.failedToLoadUsers)
        } finally {
            setLoading(false)
        }
    }, [t])

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
            toast.success(t.users.userCreated.replace('{name}', newUsername))
            setCreateDialogOpen(false)
            setNewUsername('')
            setNewPassword('')
            setNewRole('user')
            fetchUsers()
        } catch (err: unknown) {
            const error = err as { response?: { data?: { detail?: string } } }
            toast.error(error.response?.data?.detail || t.users.failedToCreateUser)
        } finally {
            setCreating(false)
        }
    }

    const handleDeleteUser = async () => {
        if (!userToDelete) return

        try {
            await apiClient.delete(`/auth/users/${encodeURIComponent(userToDelete.id)}`)
            toast.success(t.users.userDeleted.replace('{name}', userToDelete.username))
            setDeleteDialogOpen(false)
            setUserToDelete(null)
            fetchUsers()
        } catch (err: unknown) {
            const error = err as { response?: { data?: { detail?: string } } }
            toast.error(error.response?.data?.detail || t.users.failedToDeleteUser)
        }
    }

    const handleChangePassword = async () => {
        if (!userToChangePassword || !newPasswordValue.trim()) return

        try {
            await apiClient.put(`/auth/users/${encodeURIComponent(userToChangePassword.id)}/password`, {
                new_password: newPasswordValue,
            })
            toast.success(t.users.passwordChanged.replace('{name}', userToChangePassword.username))
            setPasswordDialogOpen(false)
            setUserToChangePassword(null)
            setNewPasswordValue('')
        } catch (err: unknown) {
            const error = err as { response?: { data?: { detail?: string } } }
            toast.error(error.response?.data?.detail || t.users.failedToChangePassword)
        }
    }

    const handleChangeRole = async () => {
        if (!userToChangeRole || !newRoleValue) return

        try {
            await apiClient.put(`/auth/users/${encodeURIComponent(userToChangeRole.id)}/role`, {
                role: newRoleValue,
            })
            toast.success(t.users.roleUpdated.replace('{name}', userToChangeRole.username).replace('{role}', newRoleValue))
            setRoleDialogOpen(false)
            setUserToChangeRole(null)
            setNewRoleValue('')
            fetchUsers()
        } catch (err: unknown) {
            const error = err as { response?: { data?: { detail?: string } } }
            toast.error(error.response?.data?.detail || t.users.failedToChangeRole)
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
                            {t.users.manageDesc}
                        </p>
                    </div>
                    <Button onClick={() => setCreateDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        {t.users.createUser}
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
                                    {t.users.username}
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    {t.users.role}
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
                                            {user.role === 'admin' ? t.users.roleAdmin : t.users.roleUser}
                                        </Badge>
                                    </td>
                                    <td className="h-14 px-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title={t.users.changePassword}
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
                                                title={t.users.changeRole}
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
                                                title={t.users.deleteUser}
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
                                        {t.users.noUsersFound}
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
                        <DialogTitle>{t.users.createNewUser}</DialogTitle>
                        <DialogDescription>
                            {t.users.addNewUserDesc}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">{t.users.username}</Label>
                            <Input
                                id="username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder={t.users.enterUsername}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t.users.password}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder={t.users.enterPassword}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">{t.users.role}</Label>
                            <Select value={newRole} onValueChange={setNewRole}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">{t.users.roleUser}</SelectItem>
                                    <SelectItem value="admin">{t.users.roleAdmin}</SelectItem>
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
                            {creating ? t.users.creatingUser : t.users.createUser}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Confirm Dialog */}
            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title={t.users.deleteUser}
                description={t.users.deleteUserConfirm.replace('{name}', userToDelete?.username || '')}
                confirmText={t.common.delete}
                confirmVariant="destructive"
                onConfirm={handleDeleteUser}
            />

            {/* Change Password Dialog */}
            <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.users.changePassword}</DialogTitle>
                        <DialogDescription>
                            {t.users.changePasswordDesc.replace('{name}', userToChangePassword?.username || '')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-password">{t.users.newPassword}</Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={newPasswordValue}
                                onChange={(e) => setNewPasswordValue(e.target.value)}
                                placeholder={t.users.enterNewPassword}
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
                            {t.users.changePassword}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Role Dialog */}
            <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t.users.changeRole}</DialogTitle>
                        <DialogDescription>
                            {t.users.changeRoleDesc.replace('{name}', userToChangeRole?.username || '')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-role">{t.users.role}</Label>
                            <Select value={newRoleValue} onValueChange={setNewRoleValue}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">{t.users.roleUser}</SelectItem>
                                    <SelectItem value="admin">{t.users.roleAdmin}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
                            {t.common.cancel}
                        </Button>
                        <Button onClick={handleChangeRole} disabled={!newRoleValue}>
                            {t.users.changeRole}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppShell>
    )
}
