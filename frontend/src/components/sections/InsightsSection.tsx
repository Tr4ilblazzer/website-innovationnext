import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { GlassBlogCard } from '@/components/ui/glass-blog-card'
import { getBlogPosts } from '@/services/api'
import type { InsightPost } from '@/data/insights'

interface InsightsSectionProps {
  category?: string
}

export function InsightsSection({ category }: InsightsSectionProps) {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<InsightPost[]>([])

  useEffect(() => {
    getBlogPosts(category).then(all => setPosts(all.slice(0, 3))).catch(() => {})
  }, [category])

  if (posts.length === 0) return null

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-4">
              Insights
            </p>
            <h2
              className="text-[#0A0A0A] font-black leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              {category ? `From the ${category} layer.` : 'Thinking from the\ninfrastructure layer.'}
            </h2>
          </div>
          <button
            onClick={() => navigate('/insights')}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0072BC] hover:gap-3 transition-all"
          >
            View all insights <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map(post => (
            <GlassBlogCard
              key={post.slug}
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

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={() => navigate('/insights')}
            className="flex items-center gap-2 text-sm font-semibold text-[#0072BC]"
          >
            View all insights <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  )
}
