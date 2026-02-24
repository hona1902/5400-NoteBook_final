'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useRoleGuard } from '@/lib/hooks/use-role-guard'
import { useToast } from '@/lib/hooks/use-toast'
import { getApiUrl } from '@/lib/config'
import {
    Users,
    UserPlus,
    MoreHorizontal,
    Trash2,
    KeyRound,
    Shield,
    RefreshCw,
    AlertTriangle,
} from 'lucide-react'

interface UserData {
    id: string
    username: string
    role: 'admin' | 'user'
    is_active: boolean
}

export default function UsersPage() {
    const router = useRouter()
    const { accessToken } = useAuthStore()
    const { isAdmin } = useRoleGuard()
    const { toast } = useToast()
    const [users, setUsers] = useState<UserData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Redirect non-admin users
    useEffect(() => {
        if (!isAdmin) {
            router.replace('/notebooks')
        }
    }, [isAdmin, router])

    // Dialog states
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showPasswordDialog, setShowPasswordDialog] = useState(false)
    const [showRoleDialog, setShowRoleDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null)

    // Form states
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newRole, setNewRole] = useState<'admin' | 'user'>('user')
    const [changePassword, setChangePassword] = useState('')
    const [changeRole, setChangeRole] = useState<'admin' | 'user'>('user')
    const [actionLoading, setActionLoading] = useState(false)

    const getHeaders = useCallback(() => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }), [accessToken])

    const fetchUsers = useCallback(async () => {
        if (!isAdmin) return
        setLoading(true)
        setError(null)
        try {
            const apiUrl = await getApiUrl()
            const res = await fetch(`${apiUrl}/api/auth/users`, { headers: getHeaders() })
            if (!res.ok) throw new Error('Failed to fetch users')
            const data = await res.json()
            setUsers(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [getHeaders, isAdmin])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    // Don't render page content for non-admin
    if (!isAdmin) return null

    // Add User
    const handleAddUser = async () => {
        if (!newUsername.trim() || !newPassword.trim()) return
        setActionLoading(true)
        try {
            const apiUrl = await getApiUrl()
            const res = await fetch(`${apiUrl}/api/auth/users`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ username: newUsername.trim(), password: newPassword, role: newRole }),
            })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.detail || 'Failed to create user')
            }
            toast({ title: 'User Created', description: `User "${newUsername}" created successfully` })
            setShowAddDialog(false)
            setNewUsername('')
            setNewPassword('')
            setNewRole('user')
            fetchUsers()
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, variant: 'destructive' })
        } finally {
            setActionLoading(false)
        }
    }

    // Delete User
    const handleDeleteUser = async () => {
        if (!selectedUser) return
        setActionLoading(true)
        try {
            const apiUrl = await getApiUrl()
            const res = await fetch(`${apiUrl}/api/auth/users/${encodeURIComponent(selectedUser.id)}`, {
                method: 'DELETE',
                headers: getHeaders(),
            })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.detail || 'Failed to delete user')
            }
            toast({ title: 'User Deleted', description: `User "${selectedUser.username}" deleted` })
            setShowDeleteDialog(false)
            setSelectedUser(null)
            fetchUsers()
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, variant: 'destructive' })
        } finally {
            setActionLoading(false)
        }
    }

    // Change Password
    const handleChangePassword = async () => {
        if (!selectedUser || !changePassword.trim()) return
        setActionLoading(true)
        try {
            const apiUrl = await getApiUrl()
            const res = await fetch(`${apiUrl}/api/auth/users/${encodeURIComponent(selectedUser.id)}/password`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ new_password: changePassword }),
            })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.detail || 'Failed to change password')
            }
            toast({ title: 'Password Changed', description: `Password changed for "${selectedUser.username}"` })
            setShowPasswordDialog(false)
            setChangePassword('')
            setSelectedUser(null)
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, variant: 'destructive' })
        } finally {
            setActionLoading(false)
        }
    }

    // Change Role
    const handleChangeRole = async () => {
        if (!selectedUser) return
        setActionLoading(true)
        try {
            const apiUrl = await getApiUrl()
            const res = await fetch(`${apiUrl}/api/auth/users/${encodeURIComponent(selectedUser.id)}/role`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ role: changeRole }),
            })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.detail || 'Failed to change role')
            }
            toast({ title: 'Role Updated', description: `Role updated for "${selectedUser.username}" → ${changeRole}` })
            setShowRoleDialog(false)
            setSelectedUser(null)
            fetchUsers()
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, variant: 'destructive' })
        } finally {
            setActionLoading(false)
        }
    }

    return (
        <AppShell>
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    <div className="max-w-4xl">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold flex items-center gap-2">
                                    <Users className="h-6 w-6" />
                                    User Management
                                </h1>
                                <p className="text-muted-foreground mt-1">
                                    Manage user accounts, roles, and passwords
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loading}>
                                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                </Button>
                                <Button onClick={() => setShowAddDialog(true)} size="sm">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add User
                                </Button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-4 px-4 py-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Users List */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Users ({users.length})</CardTitle>
                                <CardDescription>All registered user accounts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                                        <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                                        Loading users...
                                    </div>
                                ) : users.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No users found. Click "Add User" to create one.
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {users.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center justify-between py-3 px-2 hover:bg-muted/50 rounded-md transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm uppercase">
                                                        {user.username.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{user.username}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            ID: {user.id?.split(':')[1]?.substring(0, 8) || user.id}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <Badge
                                                        variant={user.role === 'admin' ? 'default' : 'secondary'}
                                                        className="min-w-[60px] justify-center"
                                                    >
                                                        {user.role === 'admin' ? (
                                                            <><Shield className="h-3 w-3 mr-1" /> Admin</>
                                                        ) : (
                                                            'User'
                                                        )}
                                                    </Badge>

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-48">
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedUser(user)
                                                                    setChangePassword('')
                                                                    setShowPasswordDialog(true)
                                                                }}
                                                            >
                                                                <KeyRound className="h-4 w-4 mr-2" />
                                                                Change Password
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedUser(user)
                                                                    setChangeRole(user.role === 'admin' ? 'user' : 'admin')
                                                                    setShowRoleDialog(true)
                                                                }}
                                                            >
                                                                <Shield className="h-4 w-4 mr-2" />
                                                                Change Role
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-red-600 dark:text-red-400"
                                                                onClick={() => {
                                                                    setSelectedUser(user)
                                                                    setShowDeleteDialog(true)
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete User
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Add User Dialog */}
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Create a new user account</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="add-username">Username</Label>
                            <Input
                                id="add-username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="Enter username"
                                autoComplete="off"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="add-password">Password</Label>
                            <Input
                                id="add-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Min 8 characters"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="add-role">Role</Label>
                            <Select value={newRole} onValueChange={(v: 'admin' | 'user') => setNewRole(v)}>
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
                        <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddUser}
                            disabled={actionLoading || !newUsername.trim() || newPassword.length < 8}
                        >
                            {actionLoading ? 'Creating...' : 'Create User'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete User Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="h-5 w-5" />
                            Delete User
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{selectedUser?.username}</strong>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteUser} disabled={actionLoading}>
                            {actionLoading ? 'Deleting...' : 'Delete User'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Password Dialog */}
            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                            Set new password for <strong>{selectedUser?.username}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="change-password">New Password</Label>
                            <Input
                                id="change-password"
                                type="password"
                                value={changePassword}
                                onChange={(e) => setChangePassword(e.target.value)}
                                placeholder="Min 8 characters"
                                autoComplete="new-password"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleChangePassword}
                            disabled={actionLoading || changePassword.length < 8}
                        >
                            {actionLoading ? 'Changing...' : 'Change Password'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Role Dialog */}
            <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Role</DialogTitle>
                        <DialogDescription>
                            Change role for <strong>{selectedUser?.username}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label>New Role</Label>
                            <Select value={changeRole} onValueChange={(v: 'admin' | 'user') => setChangeRole(v)}>
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
                        <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleChangeRole} disabled={actionLoading}>
                            {actionLoading ? 'Updating...' : 'Update Role'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppShell>
    )
}
