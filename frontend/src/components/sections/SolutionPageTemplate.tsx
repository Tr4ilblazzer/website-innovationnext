import { ClosingCta } from '@/components/sections/ClosingCta'
import Link from 'next/link'
import { Check } from 'lucide-react'
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
  stats?: Stat[]
  featuresSubheadline: string
  features: Feature[]
  capabilitiesSubtext: string
  capabilities: string[]
  showTechOrbit?: boolean
  insightsCategory: string
}

export function SolutionPageTemplate({
  tag, headline, headlineAccent, quote, description,
  accentColor = '#0040C1',
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
          <div className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-xs font-medium mb-4" style={{ color: ACCENT }}>{tag}</p>
            <h1 className="hero-heading text-[#0A0A0A] mb-5">
              {headline} <span className="gradient-text">{headlineAccent}</span>
            </h1>
            <p className="text-[#0A0A0A]/40 italic text-lg leading-relaxed mb-4">
              &ldquo;{quote}&rdquo;
            </p>
            <p className="text-[#0A0A0A]/55 leading-relaxed mb-8 max-w-3xl mx-auto">
              {description}
            </p>
            <Link href="/company" className="btn-secondary">Our Credentials</Link>
          </div>
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="w-full h-[240px] md:h-[340px] object-cover rounded-3xl"
          />
        </div>
      </section>

      {stats && stats.length > 0 && (
        <section className="bg-[#F7F7F7] py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-medium mb-2" style={{ color: ACCENT }}>{s.value}</div>
                <div className="text-sm text-[#575757]">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Features ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-3xl mx-auto text-center">
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>Work</p>
            <h2 className="section-heading text-[#0A0A0A] mb-3">
              What we <span className="section-accent">deliver</span>
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
                <span style={{ color: '#0040C1' }}>right tools.</span>
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
      <section className="bg-[#FAFAFA] py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-14">
          <div className="max-w-3xl text-center">
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>Capabilities</p>
            <h2 className="text-3xl md:text-[38px] md:leading-[46px] font-medium text-[#0A0A0A] mb-4">
              Built for <span style={{ color: ACCENT }}>production.</span>
            </h2>
            <p className="text-base leading-6 text-[#575757]">
              {capabilitiesSubtext}
            </p>
          </div>
          <div className="w-full flex flex-wrap justify-center gap-x-10 gap-y-5">
            {capabilities.map(c => (
              <div key={c} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                  <Check size={14} className="text-white" />
                </span>
                <span className="text-base text-[#0A0A0A]">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          <ClosingCta />
        </div>
      </section>
    </>
  )
}
