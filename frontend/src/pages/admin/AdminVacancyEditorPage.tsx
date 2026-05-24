import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAdminVacancy, createVacancy, updateVacancy, type Vacancy } from '@/services/adminApi'
import { AdminPageHeader } from '@/components/admin/AdminLayout'
import { Save, X, Plus, Trash2 } from 'lucide-react'

type FormData = {
  title: string
  department: string
  location: string
  type: string
  level: string
  description: string
  requirements: string[]
  niceToHave: string[]
  salary: string
  closingDate: string
  active: boolean
}

const EMPTY: FormData = {
  title: '',
  department: '',
  location: 'Dubai, UAE',
  type: 'Full-time',
  level: 'Mid',
  description: '',
  requirements: [''],
  niceToHave: [''],
  salary: '',
  closingDate: '',
  active: true,
}

const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Sales', 'Operations', 'HR', 'Finance', 'Marketing']
const TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote']
const LEVELS = ['Junior', 'Mid', 'Senior', 'Lead', 'Manager']

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-black/30 mt-1">{hint}</p>}
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] text-sm text-black/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]/40 placeholder:text-black/20"
    />
  )
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] text-sm text-black/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 appearance-none cursor-pointer"
    >
      {children}
    </select>
  )
}

function ListEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder: string
}) {
  function updateItem(i: number, val: string) {
    const next = [...items]
    next[i] = val
    onChange(next)
  }
  function addItem() { onChange([...items, '']) }
  function removeItem(i: number) { onChange(items.filter((_, idx) => idx !== i)) }

  return (
    <div>
      <label className="block text-xs font-semibold text-black/50 uppercase tracking-wide mb-1.5">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={item}
              onChange={e => updateItem(i, e.target.value)}
              placeholder={placeholder}
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="p-2.5 rounded-xl text-black/30 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#0072BC] hover:underline mt-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add item
        </button>
      </div>
    </div>
  )
}

export default function AdminVacancyEditorPage() {
  const { id } = useParams<{ id?: string }>()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()

  const [form, setForm] = useState<FormData>(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew && id) {
      getAdminVacancy(id)
        .then(r => {
          const v = r.data
          setForm({
            title: v.title,
            department: v.department,
            location: v.location,
            type: v.type,
            level: v.level,
            description: v.description,
            requirements: v.requirements.length ? v.requirements : [''],
            niceToHave: v.niceToHave.length ? v.niceToHave : [''],
            salary: v.salary || '',
            closingDate: v.closingDate ? v.closingDate.split('T')[0] : '',
            active: v.active,
          })
        })
        .catch(() => navigate('/admin/vacancies'))
        .finally(() => setLoading(false))
    }
  }, [id, isNew, navigate])

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setError('')
    setSaving(true)
    const payload: Partial<Vacancy> = {
      ...form,
      requirements: form.requirements.filter(Boolean),
      niceToHave: form.niceToHave.filter(Boolean),
      salary: form.salary || undefined,
      closingDate: form.closingDate ? new Date(form.closingDate).toISOString() : undefined,
    }
    try {
      if (isNew) {
        await createVacancy(payload)
      } else {
        await updateVacancy(id!, payload)
      }
      navigate('/admin/vacancies')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8 animate-pulse space-y-4"><div className="h-8 bg-black/[0.04] rounded-xl w-1/3" /><div className="h-64 bg-black/[0.04] rounded-2xl" /></div>
  }

  return (
    <div className="p-8 pb-12">
      <AdminPageHeader
        title={isNew ? 'New vacancy' : 'Edit vacancy'}
        breadcrumb="Vacancies"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin/vacancies')}
              className="p-2 rounded-xl text-black/30 hover:text-black/60 hover:bg-black/[0.04] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0072BC] text-white text-sm font-semibold rounded-xl hover:bg-[#005a96] transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving…' : isNew ? 'Post vacancy' : 'Save changes'}
            </button>
          </div>
        }
      />

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Main */}
        <div className="col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-black/[0.07] p-6 space-y-5">
            <Field label="Job title" required>
              <Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Senior Backend Engineer" />
            </Field>
            <Field label="Description" required>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Describe the role, responsibilities, and what success looks like…"
                rows={8}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] text-sm text-black/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]/40 placeholder:text-black/20 resize-none"
              />
            </Field>
          </div>

          <div className="bg-white rounded-2xl border border-black/[0.07] p-6 space-y-5">
            <ListEditor
              label="Requirements *"
              items={form.requirements}
              onChange={v => set('requirements', v)}
              placeholder="e.g. 3+ years of Node.js experience"
            />
            <ListEditor
              label="Nice to have"
              items={form.niceToHave}
              onChange={v => set('niceToHave', v)}
              placeholder="e.g. Experience with Kubernetes"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/[0.07] p-5">
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={form.active}
                onChange={e => set('active', e.target.checked)}
                className="w-4 h-4 rounded accent-[#0072BC]"
              />
              <span className="text-sm font-semibold text-black/70">Active / Accepting applications</span>
            </label>
          </div>

          <div className="bg-white rounded-2xl border border-black/[0.07] p-5 space-y-4">
            <Field label="Department" required>
              <Select value={form.department} onChange={e => set('department', e.target.value)}>
                <option value="">Select…</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </Select>
            </Field>
            <Field label="Location" required>
              <Input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Dubai, UAE" />
            </Field>
            <Field label="Employment type" required>
              <Select value={form.type} onChange={e => set('type', e.target.value)}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Level" required>
              <Select value={form.level} onChange={e => set('level', e.target.value)}>
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </Select>
            </Field>
          </div>

          <div className="bg-white rounded-2xl border border-black/[0.07] p-5 space-y-4">
            <Field label="Salary range" hint="Optional — leave blank to show 'Competitive'">
              <Input value={form.salary} onChange={e => set('salary', e.target.value)} placeholder="e.g. AED 18,000 – 24,000/mo" />
            </Field>
            <Field label="Closing date" hint="Optional">
              <Input type="date" value={form.closingDate} onChange={e => set('closingDate', e.target.value)} />
            </Field>
          </div>
        </div>
      </div>
    </div>
  )
}
