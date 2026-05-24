import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getAdminPost, createPost, updatePost, type BlogPost,
} from '@/services/adminApi'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { AdminPageHeader } from '@/components/admin/AdminLayout'
import { Save, Globe, Eye, X } from 'lucide-react'

const CATEGORIES = ['Fintech', 'E-Governance', 'AI & ML', 'BI & Data', 'IT Services', 'Staff Augmentation']

const EMPTY: Partial<BlogPost> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  authorName: '',
  authorRole: '',
  featuredImage: '',
  published: false,
  featured: false,
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-')
}

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

function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] text-sm text-black/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]/40 placeholder:text-black/20 ${className}`}
    />
  )
}

function Textarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] text-sm text-black/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]/40 placeholder:text-black/20 resize-none ${className}`}
    />
  )
}

export default function AdminBlogEditorPage() {
  const { id } = useParams<{ id?: string }>()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()

  const [form, setForm] = useState<Partial<BlogPost>>(EMPTY)
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [slugManual, setSlugManual] = useState(false)

  useEffect(() => {
    if (!isNew && id) {
      getAdminPost(id)
        .then(r => {
          setForm(r.data)
          setTagInput(r.data.tags?.join(', ') || '')
          setSlugManual(true)
        })
        .catch(() => navigate('/admin/insights'))
        .finally(() => setLoading(false))
    }
  }, [id, isNew, navigate])

  function set<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleTitleChange(val: string) {
    set('title', val)
    if (!slugManual) set('slug', slugify(val))
  }

  const handleContent = useCallback((html: string) => set('content', html), [])

  function handleTagsBlur() {
    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean)
    set('tags', tags)
  }

  async function save(publish?: boolean) {
    setError('')
    setSaving(true)
    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean)
    const data = { ...form, tags, published: publish !== undefined ? publish : form.published }
    try {
      if (isNew) {
        const res = await createPost(data)
        navigate(`/admin/insights/${res.data.id}`)
      } else {
        await updatePost(id!, data)
        if (publish !== undefined) set('published', publish)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 space-y-4 animate-pulse">
        <div className="h-8 bg-black/[0.04] rounded-xl w-1/3" />
        <div className="h-64 bg-black/[0.04] rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="p-8 pb-12">
      <AdminPageHeader
        title={isNew ? 'New post' : 'Edit post'}
        breadcrumb="Insights"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin/insights')}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-black/40 hover:text-black/60 hover:bg-black/[0.04] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={() => save(false)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-black/[0.12] text-xs font-semibold text-black/60 hover:bg-black/[0.04] transition-colors disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              Save draft
            </button>
            <button
              onClick={() => save(!form.published)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0072BC] text-white text-xs font-semibold hover:bg-[#005a96] transition-colors disabled:opacity-50"
            >
              {form.published ? <Eye className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
              {saving ? 'Saving…' : form.published ? 'Unpublish' : 'Publish'}
            </button>
          </div>
        }
      />

      {error && (
        <div className="mx-0 mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Main — col-span-2 */}
        <div className="col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-black/[0.07] p-6 space-y-5">
            <Field label="Title" required>
              <Input
                value={form.title || ''}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Post title"
                className="text-base font-semibold"
              />
            </Field>

            <Field label="Slug" hint="Auto-generated from title. Edit to customise.">
              <Input
                value={form.slug || ''}
                onChange={e => { setSlugManual(true); set('slug', e.target.value) }}
                placeholder="post-url-slug"
                className="font-mono text-xs"
              />
            </Field>

            <Field label="Excerpt" required>
              <Textarea
                value={form.excerpt || ''}
                onChange={e => set('excerpt', e.target.value)}
                placeholder="A short summary shown on the blog list (max 300 chars)"
                rows={3}
                maxLength={600}
              />
            </Field>
          </div>

          <div className="bg-white rounded-2xl border border-black/[0.07] p-6">
            <Field label="Content" required>
              <div className="mt-1">
                <RichTextEditor
                  content={form.content || ''}
                  onChange={handleContent}
                  placeholder="Start writing the post…"
                />
              </div>
            </Field>
          </div>
        </div>

        {/* Sidebar — col-span-1 */}
        <div className="space-y-4">
          {/* Publish state */}
          <div className="bg-white rounded-2xl border border-black/[0.07] p-5 space-y-3">
            <p className="text-xs font-bold text-black/50 uppercase tracking-wide">Status</p>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${form.published ? 'bg-green-500' : 'bg-amber-400'}`} />
              <span className="text-sm font-semibold text-black/70">{form.published ? 'Published' : 'Draft'}</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured || false}
                onChange={e => set('featured', e.target.checked)}
                className="w-4 h-4 rounded accent-[#0072BC]"
              />
              <span className="text-xs text-black/60">Featured post</span>
            </label>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border border-black/[0.07] p-5 space-y-3">
            <Field label="Category" required>
              <select
                value={form.category || ''}
                onChange={e => set('category', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] text-sm text-black/80 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 appearance-none cursor-pointer"
              >
                <option value="">Select category…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          {/* Author */}
          <div className="bg-white rounded-2xl border border-black/[0.07] p-5 space-y-3">
            <p className="text-xs font-bold text-black/50 uppercase tracking-wide">Author</p>
            <Field label="Name" required>
              <Input value={form.authorName || ''} onChange={e => set('authorName', e.target.value)} placeholder="Full name" />
            </Field>
            <Field label="Role">
              <Input value={form.authorRole || ''} onChange={e => set('authorRole', e.target.value)} placeholder="e.g. Head of Fintech" />
            </Field>
          </div>

          {/* Image & Tags */}
          <div className="bg-white rounded-2xl border border-black/[0.07] p-5 space-y-4">
            <Field label="Featured image URL">
              <Input value={form.featuredImage || ''} onChange={e => set('featuredImage', e.target.value)} placeholder="https://..." />
            </Field>
            <Field label="Tags" hint="Comma-separated">
              <Input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onBlur={handleTagsBlur}
                placeholder="fintech, wallet, api"
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  )
}
