import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ProductsPage() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-6">

      {/* Radial glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,114,188,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative text-center max-w-xl mx-auto">

        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#0072BC' }}>
          Products
        </p>

        <h1 className="hero-heading text-[#0A0A0A] mb-5">
          Something big
          <br />
          <span className="gradient-text">is being built.</span>
        </h1>

        <p className="text-[#0A0A0A]/50 text-base leading-relaxed mb-10">
          Our product suite — Groot Neo, Groot Pay, PFM, Loyalty Engine, and Merchant AI — is launching soon. Production-ready platforms built from real operational experience at national scale.
        </p>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{ background: '#0072BC', opacity: 0.4 + i * 0.2, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-secondary">
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full font-semibold text-sm py-3 px-7 text-white transition-colors hover:opacity-90"
            style={{ background: '#0072BC' }}
          >
            Get in Touch <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </main>
  )
}
