import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const industries = [
  {
    icon: '',
    label: 'Banks & Digital Banks',
    href: '/industries/banking',
    desc: 'Launch neo-banks, upgrade legacy cores, deploy payment rails — with a team that has done it under central bank oversight.',
    solutions: ['Groot Neo', 'Groot Pay', 'PFM', 'Settlement Engine'],
  },
  {
    icon: '',
    label: 'Governments & Public Sector',
    href: '/industries/government',
    desc: 'Citizen platforms, immigration systems, smart infrastructure, and e-payment layers — built by teams that delivered for national governments.',
    solutions: ['Nagarik App', 'Immigration System', 'e-Payment', 'Smart Water'],
  },
  {
    icon: '',
    label: 'Telecoms & MFIs',
    href: '/industries/telecom',
    desc: 'Mobile money, agent networks, USSD integration, microfinance platforms — bridging digital finance for underserved populations.',
    solutions: ['Mobile Money', 'Agent Banking', 'USSD Layer', 'Merchant AI'],
  },
  {
    icon: '',
    label: 'Enterprises & Corporates',
    href: '/industries/enterprise',
    desc: 'Digital transformation, bespoke software, BI dashboards, API integrations, and IT infrastructure for enterprise-scale operations.',
    solutions: ['IT Services', 'BI & Data', 'Staff Aug', 'Security'],
  },
  {
    icon: '',
    label: 'Fintechs & Startups',
    href: '/industries/fintech-startups',
    desc: 'Accelerate your build with senior engineers, white-label products, and infrastructure you can grow into — without starting from scratch.',
    solutions: ['Staff Aug', 'Groot Pay', 'Loyalty Engine', 'AI/ML'],
  },
]

export function IndustriesSection() {
  return (
    <section className="py-24 relative">
      <div className="glow-orb glow-cyan w-96 h-96 bottom-0 right-0 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between mb-14">
          <div>
            <h2 className="section-heading text-white">
              Industries that trust
              <br />
              <span className="gradient-text">production-grade</span> teams.
            </h2>
          </div>
          <Link to="/industries" className="btn-secondary self-start lg:self-auto">
            All industries <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {industries.map((ind, i) => (
            <Link
              key={ind.href}
              to={ind.href}
              className="glass-card px-8 py-6 flex flex-col md:flex-row md:items-center gap-5 group hover:border-white/15 transition-all"
            >
              {/* Number + icon */}
              <div className="flex items-center gap-4 md:w-48 flex-shrink-0">
                <span className="text-xs font-mono text-white/20 w-5">0{i + 1}</span>
                <span className="text-2xl">{ind.icon}</span>
                <h3 className="text-base font-bold text-white group-hover:gradient-text transition-colors">{ind.label}</h3>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-10 bg-white/[0.06]" />

              {/* Desc */}
              <p className="flex-1 text-sm text-white/45 leading-relaxed">{ind.desc}</p>

              {/* Solution pills */}
              <div className="flex flex-wrap gap-2 md:w-64 flex-shrink-0">
                {ind.solutions.map(s => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/50">
                    {s}
                  </span>
                ))}
              </div>

              <ArrowRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all flex-shrink-0 hidden md:block" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
