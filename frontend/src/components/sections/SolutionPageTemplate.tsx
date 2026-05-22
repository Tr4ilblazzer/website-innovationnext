import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { TechOrbit } from '@/components/ui/tech-orbit'

interface Feature { title: string; desc: string }
interface Stat { value: string; label: string }

interface SolutionPageTemplateProps {
  tag: string
  headline: string
  headlineAccent: string
  quote: string
  description: string
  accentColor?: string
  heroImage: string
  heroImageAlt: string
  stats: Stat[]
  featuresSubheadline: string
  features: Feature[]
  capabilitiesSubtext: string
  capabilities: string[]
  showTechOrbit?: boolean
  insightsCategory: string
}

export function SolutionPageTemplate({
  tag, headline, headlineAccent, quote, description,
  accentColor = '#0072BC',
  heroImage, heroImageAlt,
  stats, featuresSubheadline, features,
  capabilitiesSubtext, capabilities,
  showTechOrbit = false,
  insightsCategory,
}: SolutionPageTemplateProps) {
  const ACCENT = accentColor
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: ACCENT }}>
                {tag}
              </p>
              <h1 className="hero-heading text-[#0A0A0A] mb-5">
                {headline}
                <br />
                <span className="gradient-text">{headlineAccent}</span>
              </h1>
              <p className="text-[#0A0A0A]/40 italic text-lg leading-relaxed mb-4">
                &ldquo;{quote}&rdquo;
              </p>
              <p className="text-[#0A0A0A]/55 leading-relaxed mb-8">
                {description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/company" className="btn-secondary">Our Credentials</Link>
              </div>
            </div>
            <div>
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-[520px] object-cover rounded-3xl"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 border-t border-black/[0.06]">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black mb-1" style={{ color: ACCENT }}>{s.value}</div>
                <div className="text-sm text-[#0A0A0A]/45 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 grid md:grid-cols-2 md:items-end gap-6">
            <h2 className="section-heading text-[#0A0A0A]">
              What we <span className="section-accent">deliver.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">{featuresSubheadline}</p>
          </div>
          <div className="rounded-3xl bg-[#EBF5FF] p-8 md:p-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map(f => (
                <div key={f.title} className="bg-white rounded-2xl p-7">
                  <div className="w-1.5 h-6 rounded-full mb-5" style={{ background: ACCENT }} />
                  <h3 className="text-base font-bold text-[#0A0A0A] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#0A0A0A]/50 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showTechOrbit && (
        <section className="py-16 bg-[#EBF5FF] relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-6">
              <h2 className="section-heading text-[#0A0A0A] mb-4">
                Built with the{' '}
                <span style={{ color: '#0072BC' }}>right tools.</span>
              </h2>
              <p className="text-[#0A0A0A]/50 max-w-xl mx-auto">
                36 technologies across frontend, backend, data, and cloud — chosen for production reliability, not resume padding.
              </p>
            </div>
            <TechOrbit />
          </div>
        </section>
      )}

      <TrustedBySection />
      <InsightsSection category={insightsCategory} />

      {/* ── Capabilities + CTA ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="section-heading text-[#0A0A0A] mb-4">Built for production.</h2>
              <p className="text-[#0A0A0A]/50 text-lg leading-relaxed">{capabilitiesSubtext}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {capabilities.map(c => (
                <div key={c} className="flex items-center gap-2.5">
                  <CheckCircle size={14} style={{ color: ACCENT }} className="flex-shrink-0" />
                  <span className="text-sm text-[#0A0A0A]/60">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: ACCENT }}>
            <AnimatedBackground />
            <div className="relative z-10">
              <h2 className="section-heading text-white mb-3">Ready to get started?</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                Talk to our team about your requirements. We&apos;ll tell you straight whether we&apos;re the right fit.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#040404] font-semibold text-sm py-3.5 px-8 hover:bg-white/90 transition-colors"
                >
                  Get in Touch <ArrowRight size={14} />
                </Link>
                <Link
                  to="/insights/case-studies"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-semibold text-sm py-3.5 px-8 hover:bg-white/10 transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
