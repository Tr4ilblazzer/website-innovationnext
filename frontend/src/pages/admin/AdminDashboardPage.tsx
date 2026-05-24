import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminStore } from '@/store/adminStore'
import { getAdminStats, getContacts, type AdminStats, type ContactSubmission } from '@/services/adminApi'
import { AdminPageHeader } from '@/components/admin/AdminLayout'
import { Mail, FileText, Briefcase, Users, ArrowRight, TrendingUp } from 'lucide-react'

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  to,
}: {
  label: string
  value: number | string
  sub: string
  icon: React.ElementType
  accent: string
  to: string
}) {
  return (
    <Link to={to} className="block bg-white rounded-2xl border border-black/[0.07] p-6 hover:shadow-md hover:border-[#0072BC]/20 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ borderColor: `${accent}50` }}>
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-[#0072BC] group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-2xl font-bold text-black/90 mb-0.5">{value}</p>
      <p className="text-sm font-semibold text-black/60">{label}</p>
      <p className="text-xs text-black/30 mt-1">{sub}</p>
    </Link>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function statusColor(status: string) {
  if (status === 'new') return 'border-blue-300 text-blue-600'
  if (status === 'replied') return 'border-green-400 text-green-600'
  return 'border-black/20 text-black/35'
}

export default function AdminDashboardPage() {
  const admin = useAdminStore(s => s.admin)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [recent, setRecent] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAdminStats(), getContacts(undefined, 1)])
      .then(([s, c]) => {
        setStats(s.data)
        setRecent(c.data.slice(0, 5))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="p-8">
      <AdminPageHeader
        title={`${greeting}, ${admin?.name?.split(' ')[0] ?? 'Admin'} 👋`}
        subtitle="Here's what's happening with Innovation Next today."
      />

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-black/[0.07] p-6 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-black/[0.04] mb-4" />
              <div className="h-7 w-16 bg-black/[0.04] rounded mb-1" />
              <div className="h-4 w-24 bg-black/[0.04] rounded" />
            </div>
          ))}
        </div>
      ) : stats ? (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            <StatCard
              label="Contact messages"
              value={stats.contacts.total}
              sub={`${stats.contacts.new} unread`}
              icon={Mail}
              accent="#0072BC"
              to="/admin/contacts"
            />
            <StatCard
              label="Blog posts"
              value={stats.posts.total}
              sub={`${stats.posts.published} published · ${stats.posts.draft} drafts`}
              icon={FileText}
              accent="#8b5cf6"
              to="/admin/insights"
            />
            <StatCard
              label="Open vacancies"
              value={stats.vacancies.active}
              sub={`${stats.applications.total} applications total`}
              icon={Briefcase}
              accent="#10b981"
              to="/admin/vacancies"
            />
            <StatCard
              label="Newsletter"
              value={stats.newsletter.subscribers}
              sub="Active subscribers"
              icon={Users}
              accent="#f59e0b"
              to="/admin/contacts"
            />
          </div>

          {/* Quick summary strip */}
          {stats.contacts.new > 0 && (
            <div className="mt-4 border border-[#0072BC]/30 rounded-2xl px-5 py-3.5 flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-[#0072BC] shrink-0" />
              <p className="text-sm text-[#0072BC] font-medium">
                You have <strong>{stats.contacts.new} new</strong> contact{stats.contacts.new !== 1 ? 's' : ''} waiting for a response.
              </p>
              <Link to="/admin/contacts?status=new" className="ml-auto text-xs font-semibold text-[#0072BC] underline underline-offset-2 shrink-0">
                View →
              </Link>
            </div>
          )}

          {/* Recent contacts */}
          {recent.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-black/60 uppercase tracking-wider">Recent contacts</h2>
                <Link to="/admin/contacts" className="text-xs font-semibold text-[#0072BC] hover:underline">
                  View all →
                </Link>
              </div>
              <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/[0.06]">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Name</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Subject</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Status</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map(c => (
                      <tr key={c.id} className="border-b border-black/[0.04] last:border-0 hover:bg-black/[0.015]">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-black/80">{c.name}</p>
                          <p className="text-xs text-black/40">{c.email}</p>
                        </td>
                        <td className="px-5 py-3.5 text-black/60 max-w-[200px] truncate">{c.subject}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize border ${statusColor(c.status)}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-black/40">{formatDate(c.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
