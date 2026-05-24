import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  getContacts, updateContactStatus, deleteContact,
  type ContactSubmission,
} from '@/services/adminApi'
import { AdminPageHeader, StatusBadge } from '@/components/admin/AdminLayout'
import { X, ChevronDown, Trash2, Mail, Building2, Phone, Tag } from 'lucide-react'

type Status = 'all' | 'new' | 'read' | 'replied'
const FILTERS: { label: string; value: Status }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Replied', value: 'replied' },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminContactsPage() {
  const [params, setParams] = useSearchParams()
  const activeFilter = (params.get('status') as Status) || 'all'
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)
  const [updating, setUpdating] = useState(false)

  function loadContacts(status: Status) {
    setLoading(true)
    getContacts(status === 'all' ? undefined : status)
      .then(r => setContacts(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadContacts(activeFilter) }, [activeFilter])

  function setFilter(f: Status) {
    setParams(f === 'all' ? {} : { status: f })
    setSelected(null)
  }

  async function changeStatus(id: string, status: string) {
    setUpdating(true)
    try {
      const updated = await updateContactStatus(id, status)
      setContacts(prev => prev.map(c => c.id === id ? updated.data : c))
      if (selected?.id === id) setSelected(updated.data)
    } catch (e) { console.error(e) }
    finally { setUpdating(false) }
  }

  async function remove(id: string) {
    if (!confirm('Delete this submission? This cannot be undone.')) return
    try {
      await deleteContact(id)
      setContacts(prev => prev.filter(c => c.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch (e) { console.error(e) }
  }

  return (
    <div className="h-full flex flex-col">
      <AdminPageHeader
        title="Contact submissions"
        subtitle="Messages sent through the contact form."
        breadcrumb="Contacts"
      />

      {/* Filter tabs */}
      <div className="px-8 mb-4">
        <div className="flex gap-1 bg-black/[0.04] rounded-xl p-1 w-fit">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeFilter === f.value
                  ? 'bg-white text-[#0072BC] shadow-sm'
                  : 'text-black/40 hover:text-black/60'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 pb-8 flex gap-4 min-h-0">
        {/* List */}
        <div className={`bg-white rounded-2xl border border-black/[0.07] overflow-hidden flex flex-col ${selected ? 'w-80 shrink-0' : 'w-full'}`}>
          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-black/[0.04] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : contacts.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-black/25 text-sm">
              No submissions here yet
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-black/[0.05]">
              {contacts.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`w-full text-left px-5 py-4 hover:bg-black/[0.02] transition-colors ${selected?.id === c.id ? 'bg-[#EBF5FF]' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-black/80 truncate">{c.name}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-xs text-black/50 truncate mb-0.5">{c.subject}</p>
                  <p className="text-[11px] text-black/30">{formatDate(c.createdAt)}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="flex-1 bg-white rounded-2xl border border-black/[0.07] flex flex-col overflow-hidden min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-black/[0.07]">
              <div>
                <h3 className="font-bold text-black/90">{selected.name}</h3>
                <p className="text-xs text-black/40 mt-0.5">{formatDate(selected.createdAt)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-black/30 hover:text-black/60 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Meta */}
            <div className="px-6 py-4 border-b border-black/[0.07] space-y-2">
              <div className="flex items-center gap-2 text-xs text-black/50">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <a href={`mailto:${selected.email}`} className="hover:text-[#0072BC]">{selected.email}</a>
              </div>
              {selected.company && (
                <div className="flex items-center gap-2 text-xs text-black/50">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  {selected.company}
                </div>
              )}
              {selected.phone && (
                <div className="flex items-center gap-2 text-xs text-black/50">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {selected.phone}
                </div>
              )}
              {selected.interest && (
                <div className="flex items-center gap-2 text-xs text-black/50">
                  <Tag className="w-3.5 h-3.5 shrink-0" />
                  {selected.interest}
                </div>
              )}
            </div>

            {/* Subject + Message */}
            <div className="px-6 py-5 flex-1 overflow-y-auto">
              <p className="text-xs font-semibold text-black/40 uppercase tracking-wide mb-1">Subject</p>
              <p className="text-sm font-semibold text-black/80 mb-5">{selected.subject}</p>
              <p className="text-xs font-semibold text-black/40 uppercase tracking-wide mb-2">Message</p>
              <p className="text-sm text-black/70 leading-relaxed whitespace-pre-line">{selected.message}</p>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-black/[0.07] flex items-center gap-3">
              {/* Status selector */}
              <div className="relative flex-1">
                <select
                  value={selected.status}
                  onChange={e => changeStatus(selected.id, e.target.value)}
                  disabled={updating}
                  className="appearance-none w-full px-3 py-2 pr-8 rounded-xl border border-black/[0.1] text-xs font-semibold text-black/70 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30" />
              </div>

              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                onClick={() => changeStatus(selected.id, 'replied')}
                className="px-4 py-2 rounded-xl bg-[#0072BC] text-white text-xs font-semibold hover:bg-[#005a96] transition-colors"
              >
                Reply via email
              </a>

              <button
                onClick={() => remove(selected.id)}
                className="p-2 rounded-xl text-black/30 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
