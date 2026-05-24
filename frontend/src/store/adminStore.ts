import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminUser {
  id: string
  name: string
  email: string
}

interface AdminState {
  token: string | null
  admin: AdminUser | null
  setAuth: (token: string, admin: AdminUser) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      token: null,
      admin: null,
      setAuth: (token, admin) => set({ token, admin }),
      logout: () => set({ token: null, admin: null }),
      isAuthenticated: () => !!get().token,
    }),
    { name: 'admin-auth' }
  )
)
