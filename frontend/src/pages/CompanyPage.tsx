import { Link } from 'react-router-dom'
import { ArrowRight, Check, Users, Lightbulb, Sprout } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TrustedBySection } from '@/components/sections/TrustedBySection'

const ACCENT = '#0040C1'

const pillars = [
  {
    label: 'We Partner',
    icon: Users,
    body: 'We work as an extension of your organization, not above it. From strategy to deployment, we share accountability for outcomes — not just deliverables.',
  },
  {
    label: 'We Illuminate',
    icon: Lightbulb,
    body: 'Experience from regulated, high-stakes environments shapes how we think. We bring that perspective to every problem — challenging assumptions and asking the questions that lead to better results.',
  },
  {
    label: 'We Grow',
    icon: Sprout,
    body: 'Every engagement is designed to leave your organization stronger. We are invested in your independence, not your dependency on us.',
  },
]

const capabilities = [
  'AI & Machine Learning',
  'BI & Data Solutions',
  'Digital Transformation Consulting',
  'Bespoke Software Development',
  'Managed Services',
  'Digital Financial Services',
  'E-Governance',
]

const proofStats = [
  { value: '150+', label: 'Clients served' },
  { value: '15M+', label: 'Citizens served' },
  { value: '13M+', label: 'Users on platforms we built' },
  { value: '20+', label: 'Years in the industry' },
]

export default function CompanyPage() {
  return (
    <main className="bg-white">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12 text-center">
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>About us</p>
            <h1 className="text-3xl md:text-[46px] md:leading-[64px] font-medium text-[#0A0A0A]">
              Build By Operators <span style={{ color: ACCENT }}>For Operators</span>
            </h1>
          </div>
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="Innovation Next headquarters"
            className="w-full h-[240px] md:h-[348px] object-cover rounded-3xl"
          />
          <p className="max-w-4xl text-lg md:text-2xl md:leading-8 font-medium text-[#575757]">
            Innovation Next is a technology company headquartered in Kathmandu, Nepal. We advise, build, and run digital platforms for financial institutions, large enterprises, and governments — from first requirement through live, national-scale operation, with AI built into every solution.
          </p>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────── */}
      <section className="bg-[#FAFAFA] py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: '150+', label: 'Clients' },
            { value: '13M+', label: 'Users on platforms we built' },
            { value: '15M+', label: 'Citizens served' },
            { value: '20+', label: 'AI models in production' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-5xl md:text-[64px] leading-[1.2] font-semibold" style={{ color: ACCENT }}>{s.value}</div>
              <div className="text-base text-[#575757]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What We Do ────────────────────────────────── */}
      <section className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="max-w-3xl text-center">
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>What we do</p>
            <h2 className="text-3xl md:text-[38px] md:leading-[46px] font-medium text-[#0A0A0A] mb-4">
              <span style={{ color: ACCENT }}>Full-stack technology</span>, end to end.
            </h2>
            <p className="text-base leading-6 text-[#575757]">
              We advise, build, and run digital platforms for financial institutions, large enterprises, and governments — one accountable partner from the first requirement to live operation.
            </p>
          </div>
          <img
            src="/team-photo.png"
            alt="The Innovation Next team"
            className="w-full h-[240px] md:h-[299px] object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* ── How We Work ───────────────────────────────── */}
      <section className="bg-white pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-14">
          <div className="max-w-3xl text-center">
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>How we work</p>
            <h2 className="text-3xl md:text-[38px] md:leading-[46px] font-medium text-[#0A0A0A] mb-4">
              Not consultants. Partners.
            </h2>
            <p className="text-base leading-6 text-[#575757]">
              Our consultants write requirements that engineers can build from, because our engineers build from them. We start from proven platforms where they fit, and stay to run what we deliver.
            </p>
          </div>

          <div className="relative w-full max-w-3xl">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: ACCENT, opacity: 0.25 }} />
            <div className="flex flex-col gap-10 md:gap-16">
              {pillars.map((p, i) => {
                const Icon = p.icon
                const right = i % 2 === 1
                return (
                  <div key={p.label} className={`relative md:w-1/2 ${right ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <div
                      className={`hidden md:flex absolute top-0 w-10 h-10 rounded-full bg-[#EFF4FF] items-center justify-center ${right ? '-left-5' : '-right-5'}`}
                    >
                      <Icon size={18} style={{ color: ACCENT }} />
                    </div>
                    <div className="md:hidden w-10 h-10 rounded-full bg-[#EFF4FF] flex items-center justify-center mb-3">
                      <Icon size={18} style={{ color: ACCENT }} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A0A0A] mb-3">{p.label}</h3>
                    <p className="text-base leading-6 text-[#575757]">{p.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Seven Domains ─────────────────────────────── */}
      <section className="bg-[#FAFAFA] py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-14">
          <div className="max-w-3xl text-center">
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>Capabilities</p>
            <h2 className="text-3xl md:text-[38px] md:leading-[46px] font-medium text-[#0A0A0A] mb-4">
              Seven Domains. <span style={{ color: ACCENT }}>One Partner.</span>
            </h2>
            <p className="text-base leading-6 text-[#575757]">
              From digital financial services to national e-governance platforms — every capability has been delivered in production.
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
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5 border-t border-black/10 pt-10">
            {proofStats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-medium" style={{ color: ACCENT }}>{s.value}</p>
                <p className="text-sm text-[#575757] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <TrustedBySection />

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* CTA */}
          <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: ACCENT }}>
            <AnimatedBackground />
            <img
              src="/skyline.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              style={{ mixBlendMode: 'multiply', opacity: 0.35, filter: 'hue-rotate(-30deg) saturate(2) brightness(1.3)' }}
            />
            <div className="relative z-10">
              <h2 className="section-heading text-white mb-3">Ready to work with us?</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                Talk to our team about your requirements. We'll tell you straight whether we're the right fit.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#040404] font-semibold text-sm py-3.5 px-8 hover:bg-white/90 transition-colors"
                >
                  Get in Touch <ArrowRight size={14} />
                </Link>
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-semibold text-sm py-3.5 px-8 hover:bg-white/10 transition-colors"
                >
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
