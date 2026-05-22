import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { ALL_POSTS, type ContentBlock } from '@/data/insights'
import { GlassBlogCard } from '@/components/ui/glass-blog-card'

function renderBlock(block: ContentBlock, i: number, accent: string) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="text-2xl font-black text-[#0A0A0A] mt-12 mb-4 leading-snug">
          {block.text}
        </h2>
      )
    case 'p':
      return (
        <p key={i} className="text-base text-[#0A0A0A]/65 leading-[1.85] mb-5">
          {block.text}
        </p>
      )
    case 'blockquote':
      return (
        <blockquote
          key={i}
          className="pl-6 my-8 italic text-[#0A0A0A]/55 text-lg leading-relaxed"
          style={{ borderLeft: `3px solid ${accent}` }}
        >
          {block.text}
        </blockquote>
      )
    case 'ul':
      return (
        <ul key={i} className="mb-5 space-y-2 pl-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-base text-[#0A0A0A]/65">
              <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
              {item}
            </li>
          ))}
        </ul>
      )
  }
}

export default function InsightDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const post = ALL_POSTS.find(p => p.slug === slug)

  if (!post) {
    return (
      <main className="pt-40 pb-24 text-center bg-white">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-4">Not Found</p>
        <h1 className="section-heading text-[#0A0A0A] mb-6">Article not found</h1>
        <Link to="/insights" className="btn-primary inline-flex">Back to Insights</Link>
      </main>
    )
  }

  const related = ALL_POSTS
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  const ACCENT = post.accentColor

  return (
    <main className="bg-white">

      {/* ── Hero image ──────────────────────────────────────── */}
      <div className="relative h-[480px] md:h-[580px]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

        {/* Back nav */}
        <div className="absolute top-0 inset-x-0 pt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Insights
            </Link>
          </div>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 inset-x-0 pb-12 px-6">
          <div className="max-w-3xl mx-auto">
            <span
              className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
              style={{ background: `${ACCENT}30`, color: ACCENT }}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-[2.75rem] font-black text-white leading-[1.1] mb-5">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/55 text-sm">
              <span className="font-medium text-white/75">{post.author.name}</span>
              <span>·</span>
              <span>{post.publishedAt}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article body ────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Lead excerpt */}
        <p className="text-lg md:text-xl text-[#0A0A0A]/55 leading-relaxed mb-10 pb-10 border-b border-black/[0.07] font-medium italic">
          {post.excerpt}
        </p>

        {/* Content blocks */}
        <div>
          {post.body.map((block, i) => renderBlock(block, i, ACCENT))}
        </div>

        {/* Category tag */}
        <div className="mt-14 pt-8 border-t border-black/[0.07] flex items-center gap-3">
          <span className="text-xs text-[#0A0A0A]/35 font-medium tracking-wide uppercase">Filed under</span>
          <span
            className="text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full border"
            style={{ borderColor: `${ACCENT}50`, color: ACCENT }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* ── Related posts ────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-[#FAFAFA] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-2">
                  More to read
                </p>
                <h2 className="text-2xl font-black text-[#0A0A0A]">
                  More in {post.category}
                </h2>
              </div>
              <button
                onClick={() => navigate('/insights')}
                className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0072BC] hover:gap-3 transition-all"
              >
                All insights <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(p => (
                <GlassBlogCard
                  key={p.slug}
                  title={p.title}
                  excerpt={p.excerpt}
                  image={p.image}
                  author={p.author}
                  date={p.publishedAt}
                  readTime={p.readTime}
                  tags={[p.category]}
                  accentColor={p.accentColor}
                  onClick={() => navigate(`/insights/${p.slug}`)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-[#0072BC] p-12 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-3">Want to go deeper?</h2>
              <p className="text-white/65 mb-8 max-w-md mx-auto leading-relaxed">
                Talk to the team that built these systems. We are direct about what works, what does not, and whether we are the right fit.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#040404] font-semibold text-sm py-3.5 px-8 hover:bg-white/90 transition-colors"
              >
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
