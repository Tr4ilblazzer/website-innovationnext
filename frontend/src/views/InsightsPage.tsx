'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { InsightCarousel } from '@/components/ui/insight-carousel'
import type { InsightPost } from '@/data/insights'

const categories = ['All', 'Fintech', 'E-Governance', 'AI & ML', 'BI & Data', 'Software Engineering', 'Managed Services', 'Company News']

export default function InsightsPage({ initialPosts }: { initialPosts: InsightPost[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const allPosts = initialPosts

  const filtered = activeCategory === 'All'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory)

  // Featured posts lead the strip
  const ordered = [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured))

  return (
    <main className="pt-28 pb-12 md:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h1 className="hero-heading gradient-text mb-5">Insights</h1>
            <p className="text-[#0A0A0A]/60 text-base leading-relaxed">
              Articles and practical guides from our team on fintech, e-governance, AI and data.
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
                  ? 'border-[#0A4FD6] bg-[#0A4FD6]/08 text-[#0A4FD6]'
                  : 'border-black/10 text-[#0A0A0A]/60 hover:border-black/25 hover:text-[#0A0A0A]/70'
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
          <p className="text-[#0A0A0A]/60 text-sm py-16 text-center">No insights in this category yet.</p>
        )}

      </div>
    </main>
  )
}
