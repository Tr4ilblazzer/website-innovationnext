import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState, Suspense } from 'react'
import { GenerativeArtScene } from '@/components/ui/anomalous-matter-hero'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24" style={{ overflowX: 'clip' }}>

      {/* ── Three.js wireframe background ───────────────────────── */}
      <Suspense fallback={null}>
        <GenerativeArtScene />
      </Suspense>

      {/* Thin bottom fade — just enough to blend into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#040404] to-transparent z-[1] pointer-events-none" />

      {/* ── Content — centred ───────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 text-center">
        <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1
            className="hero-heading text-white mb-10"
            style={{ textShadow: '0 2px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.7)' }}
          >
            Building the
            <br />
            <span
              className="italic"
              style={{
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '1.5px #FFFFFF',
                filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5)) drop-shadow(0 0 18px rgba(255,255,255,0.2))',
              }}
            >
              Infrastructure
            </span>
            <br />
            Behind Digital Economies
          </h1>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/solutions/fintech"
              className="btn-gradient-outline"
              style={{
                background: 'conic-gradient(from var(--border-angle), rgba(255,255,255,0.8), rgba(255,255,255,0.2), rgba(255,255,255,0.8))',
                animationDuration: '8s',
              }}
            >
              <span>Explore Solutions <ArrowRight size={16} /></span>
            </Link>
            <Link
              to="/company"
              className="btn-gradient-outline"
              style={{
                background: 'conic-gradient(from var(--border-angle), rgba(255,255,255,0.8), rgba(255,255,255,0.2), rgba(255,255,255,0.8))',
                animationDuration: '8s',
              }}
            >
              <span>Our Story</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/20">
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}
