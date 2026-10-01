'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import type { InsightPost } from '@/data/insights'

interface InsightCarouselProps {
  posts: InsightPost[]
  /** Rendered on the left of the prev/next controls (e.g. a mobile "view all" link) */
  footerLeft?: React.ReactNode
}

export function InsightCarousel({ posts, footerLeft }: InsightCarouselProps) {
  const router = useRouter()
  const [api, setApi] = useState<CarouselApi>()
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    if (!api) return
    const update = () => {
      setCanPrev(api.canScrollPrev())
      setCanNext(api.canScrollNext())
    }
    update()
    api.on('select', update)
    api.on('reInit', update)
    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api, posts])

  return (
    <>
      <Carousel setApi={setApi} opts={{ align: 'start', dragFree: true }} className="w-full">
        <CarouselContent className="-ml-5 py-2">
          {posts.map(post => (
            <CarouselItem key={post.slug} className="pl-5 basis-auto">
              <div
                onClick={() => router.push(`/insights/${post.slug}`)}
                className="group relative w-[280px] h-[440px] sm:w-[320px] sm:h-[500px] lg:w-[360px] lg:h-[540px] overflow-hidden flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-black/[0.08] cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                <img src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

                <div className="relative z-10 flex flex-col gap-3 text-white">
                  <p className="text-sm font-medium text-white/80">{post.category}</p>
                  <p className="text-xl sm:text-2xl font-medium tracking-tight leading-tight line-clamp-4">
                    {post.title}
                  </p>
                </div>

                <div className="relative z-10 flex items-end justify-between gap-4">
                  <p className="text-xs text-white/60">{post.readTime}</p>
                  <span className="h-10 w-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="h-4 w-4 text-black transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-between mt-6">
        {footerLeft}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => api?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous"
            className="h-10 w-10 rounded-full border border-black/15 bg-white text-[#0A0A0A]/70 flex items-center justify-center hover:border-[#0040C1] hover:text-[#0040C1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            disabled={!canNext}
            aria-label="Next"
            className="h-10 w-10 rounded-full border border-black/15 bg-white text-[#0A0A0A]/70 flex items-center justify-center hover:border-[#0040C1] hover:text-[#0040C1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  )
}
