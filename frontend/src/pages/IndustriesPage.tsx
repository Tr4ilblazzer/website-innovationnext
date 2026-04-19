import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const industries = [
  {
    id: 'banking',
    label: 'Banks & Digital Banks',
    icon: '🏦',
    href: '/industries/banking',
    accentColor: '#3C53FF',
    headline: 'Launch or transform your digital banking offering.',
    description: 'From neo-banking platforms and digital wallet infrastructure to national payment switch connectivity and AI-powered onboarding — we give banks the full technology stack to compete in a digital-first world.',
    solutions: ['Groot Neo — full-stack neo-banking', 'Groot Pay — digital wallet', 'Settlement & reconciliation engine', 'eKYC / biometric onboarding', 'PFM & financial wellness layer', 'AML / compliance tooling'],
    cta: '/solutions/fintech',
    ctaLabel: 'Explore Fintech Solutions',
    stats: [{ v: '13M+', l: 'Users on our banking platforms' }, { v: '$275M+', l: 'Monthly transactions' }],
  },
  {
    id: 'government',
    label: 'Governments & Public Sector',
    icon: '🏛️',
    href: '/industries/government',
    accentColor: '#10b981',
    headline: 'Digitise government services. Serve every citizen.',
    description: 'Seven live national deployments across the Government of Nepal. We build citizen super-apps, immigration systems, traffic enforcement platforms, IoT smart infrastructure, and government payment layers — from procurement through to operation.',
    solutions: ['Nagarik App (Citizen super-app)', 'Immigration & border control', 'Government e-payment platform', 'PMO monitoring system', 'Traffic violation management', 'Smart water meter (IoT)'],
    cta: '/solutions/egovernance',
    ctaLabel: 'Explore E-Governance',
    stats: [{ v: '7+', l: 'Live national deployments' }, { v: '15M+', l: 'Citizens served' }],
  },
  {
    id: 'telecom',
    label: 'Telecoms & MFIs',
    icon: '📡',
    href: '/industries/telecom',
    accentColor: '#8b5cf6',
    headline: 'Mobile money and financial inclusion at scale.',
    description: 'Telecoms and microfinance institutions need mobile financial platforms that reach every user — including those on feature phones, in low-connectivity regions, and without formal banking access. We build for all of them.',
    solutions: ['USSD-capable mobile wallet', 'Agent banking network tools', 'Airtime & data top-up integration', 'Rural loan management', 'Remittance corridor integration', 'Subscriber financial analytics'],
    cta: '/solutions/fintech',
    ctaLabel: 'Explore Fintech Solutions',
    stats: [{ v: 'USSD+App', l: 'Dual-channel delivery' }, { v: '20+', l: 'Remittance corridors' }],
  },
  {
    id: 'enterprise',
    label: 'Enterprises & Corporates',
    icon: '🏢',
    href: '/industries/enterprise',
    accentColor: '#f59e0b',
    headline: 'Digital products and data infrastructure for enterprise.',
    description: 'Large enterprises need technology partners who can build at scale, manage complexity, and deliver without re-explanation. We provide full-stack software development, BI and data solutions, and dedicated engineering teams that integrate with your existing organisation.',
    solutions: ['Bespoke software development', 'BI dashboards & reporting', 'Data warehouse & ETL pipelines', 'Legacy system modernisation', 'Staff augmentation', 'Security & infrastructure management'],
    cta: '/solutions/it-services',
    ctaLabel: 'Explore IT Services',
    stats: [{ v: '100+', l: 'Enterprise projects delivered' }, { v: '50+', l: 'BI dashboards deployed' }],
  },
  {
    id: 'fintech-startups',
    label: 'Fintechs & Startups',
    icon: '🚀',
    href: '/industries/fintech-startups',
    accentColor: '#ec4899',
    headline: 'Production infrastructure. Startup speed.',
    description: 'Fintechs and startups need infrastructure-grade technology without infrastructure-grade timelines. We deliver white-label fintech platforms, dedicated engineering teams, and AI tooling that lets you go to market fast — without rebuilding from scratch.',
    solutions: ['White-label neo-banking (Groot Neo)', 'Wallet infrastructure (Groot Pay)', 'Merchant AI & onboarding', 'Senior engineers — 2–4 week onboarding', 'AI model development', 'Regulatory compliance tooling'],
    cta: '/solutions/staff-augmentation',
    ctaLabel: 'Explore Staff Augmentation',
    stats: [{ v: '2–4 wks', l: 'Engineer onboarding time' }, { v: 'Months', l: 'Platform time-to-live' }],
  },
]

export default function IndustriesPage() {
  const [active, setActive] = useState<string | null>(null)
  const displayed = active ? industries.filter(i => i.id === active) : industries

  return (
    <main className="pt-32 pb-24 relative overflow-hidden">
      <div className="glow-orb glow-blue w-[500px] h-[500px] top-0 right-0 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="section-tag mb-5">Industries we serve</div>
          <h1 className="section-heading text-white mb-5">
            We know your industry
            <br />
            <span className="gradient-text">because we've built for it.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Five industries. One technology partner with production experience across all of them — from central bank-regulated fintech to national government digital infrastructure.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActive(null)}
            className={cn(
              'text-xs px-4 py-2 rounded-full border transition-all font-medium',
              !active ? 'border-[#3C53FF] bg-[#3C53FF]/10 text-[#3C53FF]' : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/70'
            )}
          >
            All Industries
          </button>
          {industries.map(i => (
            <button
              key={i.id}
              onClick={() => setActive(active === i.id ? null : i.id)}
              className={cn(
                'text-xs px-4 py-2 rounded-full border transition-all font-medium',
                active === i.id
                  ? 'text-black font-bold'
                  : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/70'
              )}
              style={active === i.id ? { background: i.accentColor, borderColor: i.accentColor } : {}}
            >
              {i.icon} {i.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {displayed.map(industry => (
            <div key={industry.id} className="glass-card p-8 md:p-10 group">
              <div className="grid lg:grid-cols-3 gap-8 items-start">

                {/* Left — info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${industry.accentColor}12`, border: `1px solid ${industry.accentColor}25` }}>
                      {industry.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                        style={{ color: industry.accentColor }}>{industry.label}</div>
                      <h2 className="text-xl font-black text-white leading-tight">{industry.headline}</h2>
                    </div>
                  </div>

                  <p className="text-white/55 leading-relaxed mb-6 text-sm">{industry.description}</p>

                  {/* Metrics */}
                  <div className="flex gap-6 mb-6">
                    {industry.stats.map((s, i) => (
                      <div key={i}>
                        <div className="text-xl font-black" style={{ color: industry.accentColor }}>{s.v}</div>
                        <div className="text-xs text-white/35 mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={industry.cta}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                    style={{ color: industry.accentColor }}
                  >
                    {industry.ctaLabel} <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Right — solution list */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Relevant solutions</p>
                  <div className="space-y-2">
                    {industry.solutions.map((s, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: industry.accentColor }} />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="glass-card p-10 mt-10 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Not sure where to start?</h2>
          <p className="text-white/45 mb-6 max-w-md mx-auto text-sm">
            Tell us about your project. We'll map the right solution to your use case in a single call.
          </p>
          <Link to="/contact" className="btn-primary mx-auto inline-flex">
            Talk to Our Team <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  )
}
