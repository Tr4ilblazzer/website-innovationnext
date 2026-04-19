import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { GlassBlogCard } from '@/components/ui/glass-blog-card'

// ── Mock data ────────────────────────────────────────────────────
const MOCK_POSTS = [
  {
    id: '1', slug: 'building-national-payment-switch',
    title: 'What it actually takes to build a national payment switch',
    excerpt: 'From licensing with the central bank to PCI DSS certification — the operational reality of deploying financial infrastructure at national scale.',
    category: 'Fintech',
    author: { name: 'Innovation Next Team' },
    publishedAt: '10 Apr 2026', readTime: '8 min read', featured: true,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  },
  {
    id: '2', slug: 'citizen-app-design-principles',
    title: 'Designing for 15 million citizens: lessons from the Nagarik App',
    excerpt: 'Offline-first UX, USSD fallback, and multi-ministry interoperability — the design decisions that made Nepal\'s citizen super-app work for everyone.',
    category: 'E-Governance',
    author: { name: 'Innovation Next Team' },
    publishedAt: '28 Mar 2026', readTime: '6 min read', featured: true,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    id: '3', slug: 'ai-in-fintech-fraud-detection',
    title: 'AI fraud detection in emerging market payment systems',
    excerpt: 'Why traditional ML models fail for QR and mobile money in low-data environments — and what actually works in production.',
    category: 'AI & ML',
    author: { name: 'Innovation Next Team' },
    publishedAt: '15 Mar 2026', readTime: '7 min read', featured: false,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
  },
  {
    id: '4', slug: 'staff-augmentation-vs-outsourcing',
    title: 'Staff augmentation vs. outsourcing: what your CFO isn\'t telling you',
    excerpt: 'The hidden cost of outsourcing and why embedded senior engineers outperform on every metric that matters.',
    category: 'Staff Augmentation',
    author: { name: 'Innovation Next Team' },
    publishedAt: '5 Mar 2026', readTime: '5 min read', featured: false,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  },
  {
    id: '5', slug: 'bi-dashboards-for-government',
    title: 'BI dashboards for government: beyond the vanity metric',
    excerpt: 'How data warehousing and real-time analytics transformed programme monitoring for a national government executive office.',
    category: 'BI & Data',
    author: { name: 'Innovation Next Team' },
    publishedAt: '20 Feb 2026', readTime: '6 min read', featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
]

const categories = ['All', 'Fintech', 'E-Governance', 'AI & ML', 'BI & Data', 'IT Services', 'Staff Augmentation', 'Company News']

const categoryColors: Record<string, string> = {
  'Fintech': '#3C53FF',
  'E-Governance': '#10b981',
  'AI & ML': '#8b5cf6',
  'BI & Data': '#f59e0b',
  'IT Services': '#ef4444',
  'Staff Augmentation': '#ec4899',
  'Company News': '#ffffff',
}

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const navigate = useNavigate()

  const featured = MOCK_POSTS.filter(p => p.featured)
  const filtered = activeCategory === 'All'
    ? MOCK_POSTS
    : MOCK_POSTS.filter(p => p.category === activeCategory)

  return (
    <main className="pt-32 pb-0 relative">
      <div className="glow-orb glow-blue w-96 h-96 top-0 left-1/3 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-tag mx-auto mb-4">Insights</div>
          <h1 className="section-heading text-white mb-4">
            From the
            <span className="gradient-text"> infrastructure layer</span>.
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Analysis, lessons learned, and practical guides from practitioners who've built fintech and government platforms at national scale.
          </p>
        </div>

        {/* Featured posts */}
        {featured.length > 0 && (
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
                accentColor={categoryColors[post.category] ?? '#3C53FF'}
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
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'text-xs px-4 py-2 rounded-full border transition-all',
                activeCategory === cat
                  ? 'border-[#3C53FF] bg-[#3C53FF]/10 text-[#3C53FF]'
                  : 'border-white/10 text-white/40 hover:border-white/20'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {filtered.map(post => (
            <GlassBlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              author={post.author}
              date={post.publishedAt}
              readTime={post.readTime}
              tags={[post.category]}
              accentColor={categoryColors[post.category] ?? '#3C53FF'}
              onClick={() => navigate(`/insights/${post.slug}`)}
            />
          ))}
        </div>
      </div>

    </main>
  )
}
