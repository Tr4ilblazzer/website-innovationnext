import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'

// Fixed brand blue (#0040C1) — never bind to a page accent colour.
export function ClosingCta() {
  return (
    <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: '#0040C1' }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <h2 className="section-heading text-white mb-3">Ready to get started?</h2>
        <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
          Talk to our team about your requirements. We&apos;ll tell you straight whether we&apos;re the right fit.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white text-[#040404] font-semibold text-sm py-3.5 px-8 hover:bg-white/90 transition-colors"
          >
            Get in Touch <ArrowRight size={14} />
          </Link>
          <Link
            href="/insights/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-semibold text-sm py-3.5 px-8 hover:bg-white/10 transition-colors"
          >
            View Case Studies
          </Link>
        </div>
      </div>
    </div>
  )
}
