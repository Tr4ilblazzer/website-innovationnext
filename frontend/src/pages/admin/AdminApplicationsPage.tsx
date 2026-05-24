import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Linkedin, Globe, FileText } from 'lucide-react'
import {
  getApplications, updateApplicationStatus,
  type JobApplication,
} from '@/services/adminApi'
import { AdminPageHeader } from '@/components/admin/AdminLayout'

const STATUS_OPTIONS: JobApplication['status'][] = [
  'new', 'reviewing', 'shortlisted', 'rejected', 'hired',
]

const STATUS_COLORS: Record<string, string> = {
  new:         'bg-blue-50 text-blue-600',
  reviewing:   'bg-amber-50 text-amber-600',
  shortlisted: 'bg-purple-50 text-purple-600',
  rejected:    'bg-red-50 text-red-500',
  hired:       'bg-green-50 text-green-600',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export default function AdminApplicationsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [apps, setApps] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<JobApplication | null>(null)
  const [filter, setFilter] = useState<'all' | JobApplication['status']>('all')

  const vacancyTitle = apps[0]?.vacancy?.title ?? 'Vacancy'

  useEffect(() => {
    if (!id) return
    getApplications(id)
      .then(r => setApps(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  async function setStatus(app: JobApplication, status: JobApplication['status']) {
    try {
      await updateApplicationStatus(app.id, status)
      setApps(prev => prev.map(a => a.id === app.id ? { ...a, status } : a))
      if (selected?.id === app.id) setSelected({ ...app, status })
    } catch (e) { console.error(e) }
  }

  const visible = filter === 'all' ? apps : apps.filter(a => a.status === filter)

  return (
    <div className="p-8">
      <AdminPageHeader
        title={`Applications — ${vacancyTitle}`}
        subtitle={`${apps.length} total · ${apps.filter(a => a.status === 'new').length} new`}
        breadcrumb="Vacancies"
        action={
          <button
            onClick={() => navigate('/admin/vacancies')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-black/40 hover:text-black/70 hover:bg-black/[0.04] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Vacancies
          </button>
        }
      />

      {/* Status filter */}
      <div className="flex gap-1 bg-black/[0.04] rounded-xl p-1 w-fit mb-5 flex-wrap">
        {(['all', ...STATUS_OPTIONS] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === s ? 'bg-white text-[#0072BC] shadow-sm' : 'text-black/40 hover:text-black/60'
            }`}
          >
            {s} {s !== 'all' && `(${apps.filter(a => a.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-black/[0.04] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/[0.07] py-20 text-center">
          <p className="text-black/25 text-sm">No applications yet.</p>
        </div>
      ) : (
        <div className="flex gap-5">
          {/* List */}
          <div className="flex-1 bg-white rounded-2xl border border-black/[0.07] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.06]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Applicant</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Contact</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Applied</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {visible.map(app => (
                  <tr
                    key={app.id}
                    onClick={() => setSelected(app)}
                    className={`border-b border-black/[0.04] last:border-0 cursor-pointer transition-colors ${
                      selected?.id === app.id ? 'bg-[#EBF5FF]' : 'hover:bg-black/[0.015]'
                    }`}
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-black/80">{app.firstName} {app.lastName}</p>
                      {app.currentRole && (
                        <p className="text-xs text-black/35">{app.currentRole}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-black/50">{app.email}</p>
                      <p className="text-xs text-black/35">{app.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-xs text-black/40">{formatDate(app.createdAt)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={app.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1 text-[11px] font-semibold text-[#0072BC] hover:underline"
                      >
                        <FileText className="w-3 h-3" /> CV
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-80 shrink-0 bg-white rounded-2xl border border-black/[0.07] p-6 space-y-5 self-start sticky top-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-black/80">{selected.firstName} {selected.lastName}</h3>
                  {selected.currentRole && (
                    <p className="text-xs text-black/40 mt-0.5">{selected.currentRole}</p>
                  )}
                </div>
                <button onClick={() => setSelected(null)} className="text-black/25 hover:text-black/50 text-lg leading-none">×</button>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                <a href={selected.cvUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#EBF5FF] text-[#0072BC] hover:bg-[#0072BC] hover:text-white transition-colors">
                  <FileText className="w-3 h-3" /> Download CV
                </a>
                {selected.linkedinUrl && (
                  <a href={selected.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-black/[0.05] text-black/60 hover:bg-black/[0.1] transition-colors">
                    <Linkedin className="w-3 h-3" /> LinkedIn
                  </a>
                )}
                {selected.portfolioUrl && (
                  <a href={selected.portfolioUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-black/[0.05] text-black/60 hover:bg-black/[0.1] transition-colors">
                    <Globe className="w-3 h-3" /> Portfolio
                  </a>
                )}
              </div>

              {/* Contact */}
              <div className="space-y-1 text-xs">
                <p className="text-black/40 font-semibold uppercase tracking-wide">Contact</p>
                <p className="text-black/70">{selected.email}</p>
                <p className="text-black/50">{selected.phone}</p>
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <p className="text-xs text-black/40 font-semibold uppercase tracking-wide">Experience</p>
                <p className="text-xs text-black/65 leading-relaxed whitespace-pre-line">{selected.experience}</p>
              </div>

              {/* Cover letter */}
              {selected.coverLetter && (
                <div className="space-y-1.5">
                  <p className="text-xs text-black/40 font-semibold uppercase tracking-wide">Cover Letter</p>
                  <p className="text-xs text-black/65 leading-relaxed whitespace-pre-line">{selected.coverLetter}</p>
                </div>
              )}

              {/* Status changer */}
              <div className="space-y-2 pt-2 border-t border-black/[0.06]">
                <p className="text-xs text-black/40 font-semibold uppercase tracking-wide">Update Status</p>
                <div className="flex flex-wrap gap-1.5">
                  {STATUS_OPTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(selected, s)}
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full capitalize border transition-colors ${
                        selected.status === s
                          ? 'border-[#0072BC] bg-[#0072BC] text-white'
                          : 'border-black/[0.1] text-black/50 hover:border-[#0072BC] hover:text-[#0072BC]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
