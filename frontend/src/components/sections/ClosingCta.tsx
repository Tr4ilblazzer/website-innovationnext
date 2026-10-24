'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'

// Loaded client-side only; the solid brand-blue card below is the placeholder and the no-WebGL fallback.
const GradientBlinds = dynamic(() => import('@/components/ui/gradient-blinds'), { ssr: false })

const BLINDS_COLORS = ['#2F6BF0', '#0A4FD6', '#0841B3', '#062A78']

// Fixed brand blue (#0A4FD6) — never bind to a page accent colour.
export function ClosingCta() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl p-12 text-center" style={{ background: '#0A4FD6' }}>
      <GradientBlinds gradientColors={BLINDS_COLORS} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={{ background: 'radial-gradient(70% 90% at 50% 50%, rgba(4,18,46,0.35), transparent 75%)' }}
      />
      <div className="relative z-10 pointer-events-none">
        <h2 className="section-heading text-white mb-3">Let&apos;s talk about your project</h2>
        <p className="text-white/80 mb-8 max-w-lg mx-auto leading-relaxed">
          Tell us what you are working on, and we will get back to you.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white text-[#040404] font-semibold text-sm py-3.5 px-8 hover:bg-white/90 transition-colors"
          >
            Get in Touch <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
