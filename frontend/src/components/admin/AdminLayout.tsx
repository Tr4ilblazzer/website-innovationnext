import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { useAdminStore } from '@/store/adminStore'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Mail,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const NAV = [
  { to: '/admin',           label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/admin/insights',  label: 'Insights',   icon: FileText },
  { to: '/admin/vacancies', label: 'Vacancies',  icon: Briefcase },
  { to: '/admin/contacts',  label: 'Contacts',   icon: Mail },
]

export function AdminLayout() {
  const { admin, logout } = useAdminStore()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen bg-[#F7F9FC] font-['Public_Sans',sans-serif]">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-black/[0.07] flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-black/[0.07] flex items-center justify-between">
          <img
            src="/next_logo_lightbackgorund.png"
            alt="Innovation Next"
            className="h-7 w-auto object-contain"
          />
          <span className="text-[10px] font-semibold text-black/30 tracking-widest uppercase">
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EBF5FF] text-[#0072BC]'
                    : 'text-black/50 hover:bg-black/[0.04] hover:text-black/80'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-black/[0.07]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#0072BC] text-xs font-bold shrink-0">
              {admin?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-black/80 truncate">{admin?.name}</p>
              <p className="text-[10px] text-black/40 truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-medium text-black/40 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

// ── Reusable page-header used across admin pages ──────────────────
interface AdminPageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  breadcrumb?: string
}

export function AdminPageHeader({ title, subtitle, action, breadcrumb }: AdminPageHeaderProps) {
  return (
    <div className="flex items-start justify-between px-8 pt-8 pb-6">
      <div>
        {breadcrumb && (
          <div className="flex items-center gap-1.5 text-xs text-black/30 mb-2 font-medium">
            <span>Admin</span>
            <ChevronRight className="w-3 h-3" />
            <span>{breadcrumb}</span>
          </div>
        )}
        <h1 className="text-xl font-bold text-black/90">{title}</h1>
        {subtitle && <p className="text-sm text-black/40 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// ── Status badge ──────────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new:        'bg-blue-50 text-blue-600',
    read:       'bg-gray-100 text-gray-500',
    replied:    'bg-green-50 text-green-600',
    published:  'bg-green-50 text-green-600',
    draft:      'bg-amber-50 text-amber-600',
    active:     'bg-green-50 text-green-600',
    inactive:   'bg-gray-100 text-gray-400',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${styles[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {status}
    </span>
  )
}
