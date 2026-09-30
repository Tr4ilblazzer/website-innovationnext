import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { InsightCarousel } from '@/components/ui/insight-carousel'
import { getBlogPosts } from '@/services/api'
import type { InsightPost } from '@/data/insights'

const categories = ['All', 'Fintech', 'E-Governance', 'AI & ML', 'BI & Data', 'Software Engineering', 'Managed Services', 'Company News']

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [allPosts, setAllPosts] = useState<InsightPost[]>([])

  useEffect(() => {
    getBlogPosts().then(setAllPosts).catch(() => {})
  }, [])

  const filtered = activeCategory === 'All'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory)

  // Featured posts lead the strip
  const ordered = [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured))

  return (
    <main className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: '#0040C1' }}>
              Insights
            </p>
            <h1 className="hero-heading text-[#0A0A0A] mb-5">
              From the
              <br />
              <span style={{ color: '#0040C1' }}>infrastructure layer.</span>
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

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'text-xs px-4 py-2 rounded-full border transition-all',
                activeCategory === cat
                  ? 'border-[#0040C1] bg-[#0040C1]/08 text-[#0040C1]'
                  : 'border-black/10 text-[#0A0A0A]/40 hover:border-black/25 hover:text-[#0A0A0A]/70'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post carousel */}
        {ordered.length > 0 ? (
          <InsightCarousel key={activeCategory} posts={ordered} />
        ) : (
          <p className="text-[#0A0A0A]/40 text-sm py-16 text-center">No insights in this category yet.</p>
        )}

      </div>
    </main>
  )
}
