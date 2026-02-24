import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getApiUrl } from '@/lib/config'
import { queryClient } from '@/lib/api/query-client'

export type UserRole = 'admin' | 'user'

interface UserInfo {
  id: string | null
  username: string
  email?: string | null
  role: UserRole
  is_app_password?: boolean
}

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  refreshToken: string | null
  user: UserInfo | null
  accessToken: string | null
  isLoading: boolean
  error: string | null
  lastAuthCheck: number | null
  isCheckingAuth: boolean
  hasHydrated: boolean
  authRequired: boolean | null
  setHasHydrated: (state: boolean) => void
  checkAuthRequired: () => Promise<boolean>
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => Promise<boolean>
  refreshAccessToken: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,
      lastAuthCheck: null,
      isCheckingAuth: false,
      hasHydrated: false,
      authRequired: null,

      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state })
      },

      checkAuthRequired: async () => {
        try {
          const apiUrl = await getApiUrl()
          const response = await fetch(`${apiUrl}/api/auth/status`, {
            cache: 'no-store',
          })

          if (!response.ok) {
            throw new Error(`Auth status check failed: ${response.status}`)
          }

          const data = await response.json()
          const required = data.auth_enabled || false
          set({ authRequired: required })

          // If auth is not required, mark as authenticated
          if (!required) {
            set({ isAuthenticated: true, token: 'not-required' })
          }

          return required
        } catch (error) {
          console.error('Failed to check auth status:', error)

          if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            set({
              error: 'Unable to connect to server. Please check if the API is running.',
              authRequired: null
            })
          } else {
            set({ authRequired: true })
          }

          throw error
        }
      },

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const apiUrl = await getApiUrl()

          const response = await fetch(`${apiUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          })

          if (response.ok) {
            const data = await response.json()
            set({
              isAuthenticated: true,
              token: data.access_token,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              user: data.user,
              isLoading: false,
              lastAuthCheck: Date.now(),
              error: null,
            })
            // Clear any cached data from previous user
            queryClient.clear()
            return true
          } else {
            let errorMessage = 'Authentication failed'
            try {
              const errData = await response.json()
              errorMessage = errData.detail || errorMessage
            } catch { /* ignore parse error */ }

            if (response.status === 401) {
              errorMessage = 'Invalid username or password.'
            } else if (response.status >= 500) {
              errorMessage = 'Server error. Please try again later.'
            }

            set({
              error: errorMessage,
              isLoading: false,
              isAuthenticated: false,
              token: null,
              accessToken: null,
              refreshToken: null,
              user: null,
            })
            return false
          }
        } catch (error) {
          console.error('Network error during auth:', error)
          let errorMessage = 'Authentication failed'

          if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            errorMessage = 'Unable to connect to server. Please check if the API is running.'
          } else if (error instanceof Error) {
            errorMessage = `Network error: ${error.message}`
          }

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            accessToken: null,
            refreshToken: null,
            user: null,
          })
          return false
        }
      },

      logout: () => {
        // Clear all cached query data to prevent data leakage between users
        queryClient.clear()
        set({
          isAuthenticated: false,
          token: null,
          accessToken: null,
          refreshToken: null,
          user: null,
          error: null,
        })
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get()
        if (!refreshToken) return false

        try {
          const apiUrl = await getApiUrl()
          const response = await fetch(`${apiUrl}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${refreshToken}`,
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const data = await response.json()
            set({
              token: data.access_token,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              lastAuthCheck: Date.now(),
            })
            return true
          }
        } catch (error) {
          console.error('Token refresh failed:', error)
        }

        set({
          isAuthenticated: false,
          token: null,
          accessToken: null,
          refreshToken: null,
          user: null,
        })
        return false
      },

      checkAuth: async () => {
        const state = get()
        const { token, lastAuthCheck, isCheckingAuth, isAuthenticated } = state

        if (isCheckingAuth) {
          return isAuthenticated
        }

        if (!token) {
          return false
        }

        // If we checked recently (within 30 seconds) and are authenticated, skip
        const now = Date.now()
        if (isAuthenticated && lastAuthCheck && (now - lastAuthCheck) < 30000) {
          return true
        }

        set({ isCheckingAuth: true })

        try {
          const apiUrl = await getApiUrl()

          const response = await fetch(`${apiUrl}/api/notebooks`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })

          if (response.ok) {
            set({
              isAuthenticated: true,
              lastAuthCheck: now,
              isCheckingAuth: false
            })
            return true
          } else if (response.status === 401) {
            // Try refresh
            const refreshed = await get().refreshAccessToken()
            set({ isCheckingAuth: false })
            return refreshed
          } else {
            set({
              isAuthenticated: false,
              token: null,
              accessToken: null,
              refreshToken: null,
              user: null,
              lastAuthCheck: null,
              isCheckingAuth: false
            })
            return false
          }
        } catch (error) {
          console.error('checkAuth error:', error)
          set({
            isAuthenticated: false,
            token: null,
            accessToken: null,
            refreshToken: null,
            user: null,
            lastAuthCheck: null,
            isCheckingAuth: false
          })
          return false
        }
      }
    }),
    {
      name: 'auth-storage',
      version: 2,
      partialize: (state) => ({
        token: state.token,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      migrate: (persistedState: unknown, version: number) => {
        if (version < 2 || !persistedState || typeof persistedState !== 'object') {
          return { token: null, accessToken: null, refreshToken: null, user: null, isAuthenticated: false }
        }
        return persistedState as Partial<AuthState>
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      }
    }
  )
)