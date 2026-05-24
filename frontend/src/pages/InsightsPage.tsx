import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBlogCard } from '@/components/ui/glass-blog-card'
import { getBlogPosts } from '@/services/api'
import type { InsightPost } from '@/data/insights'

const categories = ['All', 'Fintech', 'E-Governance', 'AI & ML', 'BI & Data', 'IT Services', 'Staff Augmentation', 'Company News']

const PAGE_SIZE = 6

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [allPosts, setAllPosts] = useState<InsightPost[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getBlogPosts().then(setAllPosts).catch(() => {})
  }, [])

  const featured = allPosts.filter(p => p.featured)

  const filtered = activeCategory === 'All'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleCategory(cat: string) {
    setActiveCategory(cat)
    setPage(1)
  }

  function handlePage(next: number) {
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: '#0072BC' }}>
              Insights
            </p>
            <h1 className="hero-heading text-[#0A0A0A] mb-5">
              From the
              <br />
              <span style={{ color: '#0072BC' }}>infrastructure layer.</span>
            </h1>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">
              Analysis, lessons learned, and practical guides from practitioners who've built fintech and government platforms at national scale.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=80"
              alt="Insights"
              className="w-full h-[460px] object-cover rounded-3xl"
            />
          </div>
        </div>

        {/* Featured posts — only on page 1, no category filter active */}
        {featured.length > 0 && page === 1 && activeCategory === 'All' && (
          <div className="grid md:grid-cols-2 gap-5 mb-14">
            {featured.map(post => (
              <GlassBlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                author={post.author}
                date={post.publishedAt}
                readTime={post.readTime}
                tags={[post.category]}
                className="h-[500px]"
                onClick={() => navigate(`/insights/${post.slug}`)}
              />
            ))}
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={cn(
                'text-xs px-4 py-2 rounded-full border transition-all',
                activeCategory === cat
                  ? 'border-[#0072BC] bg-[#0072BC]/08 text-[#0072BC]'
                  : 'border-black/10 text-[#0A0A0A]/40 hover:border-black/25 hover:text-[#0A0A0A]/70'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {paginated.map(post => (
              <GlassBlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                author={post.author}
                date={post.publishedAt}
                readTime={post.readTime}
                tags={[post.category]}
                accentColor={post.accentColor}
                onClick={() => navigate(`/insights/${post.slug}`)}
              />
            ))}
          </div>
        ) : (
          <p className="text-[#0A0A0A]/40 text-sm py-16 text-center">No insights in this category yet.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-black/[0.06] pt-8">
            <p className="text-xs text-[#0A0A0A]/35">
              Page {page} of {totalPages} · {filtered.length} articles
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePage(page - 1)}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium border border-black/10 text-[#0A0A0A]/50 hover:border-[#0072BC] hover:text-[#0072BC] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-3 w-3" /> Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => handlePage(n)}
                  className={cn(
                    'w-8 h-8 rounded-full text-xs font-medium border transition-all',
                    n === page
                      ? 'border-[#0072BC] bg-[#0072BC] text-white'
                      : 'border-black/10 text-[#0A0A0A]/50 hover:border-[#0072BC] hover:text-[#0072BC]'
                  )}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => handlePage(page + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium border border-black/10 text-[#0A0A0A]/50 hover:border-[#0072BC] hover:text-[#0072BC] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
