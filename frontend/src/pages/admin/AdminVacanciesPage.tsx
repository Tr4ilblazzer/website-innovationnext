import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAdminVacancies, deleteVacancy, toggleVacancy, type Vacancy,
} from '@/services/adminApi'
import { AdminPageHeader, StatusBadge } from '@/components/admin/AdminLayout'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Users } from 'lucide-react'

function formatDate(iso?: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const TYPE_COLORS: Record<string, string> = {
  'Full-time': 'border-blue-300 text-blue-600',
  'Part-time': 'border-purple-300 text-purple-600',
  'Contract':  'border-amber-400 text-amber-600',
  'Remote':    'border-green-400 text-green-600',
}

export default function AdminVacanciesPage() {
  const navigate = useNavigate()
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  function load() {
    setLoading(true)
    getAdminVacancies()
      .then(r => setVacancies(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function toggle(id: string) {
    try {
      const res = await toggleVacancy(id)
      setVacancies(prev => prev.map(v => v.id === id ? res.data : v))
    } catch (e) { console.error(e) }
  }

  async function remove(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await deleteVacancy(id)
      setVacancies(prev => prev.filter(v => v.id !== id))
    } catch (e) { console.error(e) }
  }

  const visible = vacancies.filter(v =>
    filter === 'all' ? true : filter === 'active' ? v.active : !v.active
  )

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Vacancies"
        subtitle={`${vacancies.filter(v => v.active).length} active openings`}
        breadcrumb="Vacancies"
        action={
          <button
            onClick={() => navigate('/admin/vacancies/new')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0072BC] text-white text-sm font-semibold rounded-xl hover:bg-[#005a96] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New vacancy
          </button>
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-1 bg-black/[0.04] rounded-xl p-1 w-fit mb-5">
        {(['all', 'active', 'inactive'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === f ? 'bg-white text-[#0072BC] shadow-sm' : 'text-black/40 hover:text-black/60'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-black/[0.04] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-black/25 text-sm mb-4">No vacancies yet</p>
            <button
              onClick={() => navigate('/admin/vacancies/new')}
              className="text-xs font-semibold text-[#0072BC] hover:underline"
            >
              Post your first vacancy →
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.06]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Department</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Level</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Apps</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Closes</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {visible.map(v => (
                <tr key={v.id} className="border-b border-black/[0.04] last:border-0 hover:bg-black/[0.015]">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-black/80">{v.title}</p>
                    <p className="text-xs text-black/30">{v.location}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-black/50">{v.department}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold border ${TYPE_COLORS[v.type] ?? 'border-black/20 text-black/40'}`}>
                      {v.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-black/50">{v.level}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => navigate(`/admin/vacancies/${v.id}/applications`)}
                      className="flex items-center gap-1 text-xs font-semibold text-black/40 hover:text-[#0072BC] transition-colors"
                    >
                      <Users className="w-3 h-3" />
                      {v._count?.applications ?? 0}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-xs text-black/40">{formatDate(v.closingDate)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={v.active ? 'active' : 'inactive'} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => toggle(v.id)}
                        className={`p-1.5 rounded-lg transition-colors ${v.active ? 'text-green-500 hover:bg-green-50' : 'text-black/25 hover:bg-black/[0.04]'}`}
                        title={v.active ? 'Deactivate' : 'Activate'}
                      >
                        {v.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => navigate(`/admin/vacancies/${v.id}`)}
                        className="p-1.5 rounded-lg text-black/30 hover:text-[#0072BC] hover:bg-[#EBF5FF] transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => remove(v.id, v.title)}
                        className="p-1.5 rounded-lg text-black/30 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
