import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAdminPosts, deletePost, type BlogPost } from '@/services/adminApi'
import { AdminPageHeader, StatusBadge } from '@/components/admin/AdminLayout'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const CATEGORY_COLORS: Record<string, string> = {
  'Fintech': '#0072BC',
  'E-Governance': '#10b981',
  'AI & ML': '#8b5cf6',
  'BI & Data': '#f59e0b',
  'IT Services': '#ef4444',
  'Staff Augmentation': '#ec4899',
}

export default function AdminInsightsPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  function load() {
    setLoading(true)
    getAdminPosts()
      .then(r => setPosts(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function remove(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await deletePost(id)
      setPosts(prev => prev.filter(p => p.id !== id))
    } catch (e) { console.error(e) }
  }

  const visible = posts.filter(p =>
    filter === 'all' ? true : filter === 'published' ? p.published : !p.published
  )

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Insights"
        subtitle={`${posts.length} total posts`}
        breadcrumb="Insights"
        action={
          <Link
            to="/admin/insights/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0072BC] text-white text-sm font-semibold rounded-xl hover:bg-[#005a96] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New post
          </Link>
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-1 bg-black/[0.04] rounded-xl p-1 w-fit mb-5">
        {(['all', 'published', 'draft'] as const).map(f => (
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
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 bg-black/[0.04] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-black/25 text-sm mb-4">No posts yet</p>
            <Link to="/admin/insights/new" className="text-xs font-semibold text-[#0072BC] hover:underline">
              Write your first post →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.06]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Author</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-black/40 uppercase tracking-wide">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {visible.map(post => (
                <tr key={post.id} className="border-b border-black/[0.04] last:border-0 hover:bg-black/[0.015]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {post.featured && <Star className="w-3 h-3 text-amber-400 shrink-0" fill="currentColor" />}
                      <span className="font-semibold text-black/80 line-clamp-1">{post.title}</span>
                    </div>
                    <p className="text-xs text-black/30 mt-0.5">{post.readTime} min read</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{
                        background: `${CATEGORY_COLORS[post.category] ?? '#6b7280'}18`,
                        color: CATEGORY_COLORS[post.category] ?? '#6b7280',
                      }}
                    >
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={post.published ? 'published' : 'draft'} />
                  </td>
                  <td className="px-5 py-4 text-sm text-black/50">{post.authorName}</td>
                  <td className="px-5 py-4 text-xs text-black/40">
                    {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => navigate(`/admin/insights/${post.id}`)}
                        className="p-1.5 rounded-lg text-black/30 hover:text-[#0072BC] hover:bg-[#EBF5FF] transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => remove(post.id, post.title)}
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
