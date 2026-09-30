import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminRoute } from '@/components/admin/AdminRoute'

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRoute>
      <AdminLayout>{children}</AdminLayout>
    </AdminRoute>
  )
}
