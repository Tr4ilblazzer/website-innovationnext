'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { InsightCarousel } from '@/components/ui/insight-carousel'
import { getBlogPosts } from '@/services/api'
import type { InsightPost } from '@/data/insights'

// Home blog block follows the Figma spec (#0040C1 + Public Sans body)
const FIGMA_BLUE = '#0040C1'
const PUBLIC_SANS = { fontFamily: "'Public Sans', system-ui, sans-serif" }
const POPPINS = { fontFamily: "'Poppins', 'Public Sans', sans-serif" }

function PostMeta({ post }: { post: InsightPost }) {
  return (
    <div className="flex items-center gap-4 text-base leading-6" style={PUBLIC_SANS}>
      <span className="flex items-center gap-[7px]" style={{ color: FIGMA_BLUE }}>
        {post.category}
        <span className="w-[5px] h-[5px] rounded-full" style={{ background: FIGMA_BLUE }} />
      </span>
      <span className="text-[#8C8C8C]">{post.publishedAt}</span>
    </div>
  )
}

function HomeInsights({ posts }: { posts: InsightPost[] }) {
  const [lead, ...rest] = posts
  return (
    <section className="pt-[60px] pb-[120px] bg-white">
      <div className="max-w-[1312px] mx-auto px-6 flex flex-col items-center gap-[60px]">

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs leading-[18px] font-medium" style={{ color: FIGMA_BLUE, ...PUBLIC_SANS }}>Insights</p>
          <h2 className="font-medium text-[28px] leading-9 md:text-[38px] md:leading-[46px] text-[#0B0B0D]" style={POPPINS}>
            Read the Articles
            <br />
            <span style={{ color: FIGMA_BLUE }}>Written By Professionals</span>
          </h2>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-8">
          {/* Lead post */}
          <Link href={`/insights/${lead.slug}`} className="group flex flex-col gap-6 lg:w-[640px] flex-none">
            <img
              src={lead.image}
              alt={lead.title}
              className="w-full h-[260px] md:h-[396px] object-cover rounded-3xl"
            />
            <div className="flex flex-col gap-6">
              <PostMeta post={lead} />
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-[28px] leading-8 text-black group-hover:text-[#0040C1] transition-colors" style={POPPINS}>
                  {lead.title}
                </h3>
                <p className="text-base leading-6 text-[#575757] line-clamp-3" style={PUBLIC_SANS}>{lead.excerpt}</p>
              </div>
            </div>
          </Link>

          {/* Side list */}
          <div className="flex flex-col gap-8 flex-1 min-w-0">
            {rest.slice(0, 3).map(post => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className="group flex flex-col sm:flex-row gap-8 flex-1"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full sm:w-[192px] h-[185px] sm:h-auto object-cover rounded-2xl flex-none"
                />
                <div className="flex flex-col gap-6 min-w-0">
                  <PostMeta post={post} />
                  <h3 className="font-medium text-[22px] leading-7 text-black group-hover:text-[#0040C1] transition-colors line-clamp-3" style={POPPINS}>
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

interface InsightsSectionProps {
  category?: string
}

export function InsightsSection({ category }: InsightsSectionProps) {
  const router = useRouter()
  const [posts, setPosts] = useState<InsightPost[]>([])
  useEffect(() => {
    getBlogPosts(category).then(all => setPosts(all.slice(0, 8))).catch(() => {})
  }, [category])

  if (posts.length === 0) return null
  if (!category && posts.length >= 4) return <HomeInsights posts={posts} />

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
            onClick={() => router.push('/insights')}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#0040C1] hover:gap-3 transition-all"
          >
            View all insights <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <InsightCarousel
          posts={posts}
          footerLeft={
            <button
              onClick={() => router.push('/insights')}
              className="md:hidden flex items-center gap-2 text-sm font-semibold text-[#0040C1]"
            >
              View all insights <ArrowRight className="h-4 w-4" />
            </button>
          }
        />

      </div>
    </section>
  )
}
