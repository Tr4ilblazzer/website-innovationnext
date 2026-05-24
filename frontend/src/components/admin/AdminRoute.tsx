import { Navigate } from 'react-router-dom'
import { useAdminStore } from '@/store/adminStore'

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const token = useAdminStore(s => s.token)
  if (!token) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}
