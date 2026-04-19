import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const domains = [
  {
    label: 'Digital Financial Services',
    short: 'Fintech',
    href: '/solutions/fintech',
    desc: 'Neo-banking, digital wallets, payment switches, settlement engines, and cross-border remittance — built by founders of eSewa and Fonepay.',
    accent: '#3C53FF',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'E-Governance & Digital Government',
    short: 'E-Gov',
    href: '/solutions/egovernance',
    desc: 'Citizen super-apps, immigration systems, traffic management, smart-city IoT, and government e-payment — live in production.',
    accent: '#10b981',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'AI & Machine Learning',
    short: 'AI / ML',
    href: '/solutions/ai-ml',
    desc: 'Signature verification, fraud detection, merchant AI, predictive analytics, and custom model development trained on real production data.',
    accent: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'BI & Data Solutions',
    short: 'BI & Data',
    href: '/solutions/bi-data',
    desc: 'Business intelligence dashboards, data warehousing, big-data pipelines, master data management, and real-time analytics infrastructure.',
    accent: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'IT Services',
    short: 'IT',
    href: '/solutions/it-services',
    desc: 'End-to-end software development, mobile and web apps, infrastructure management, security audits, and legacy modernisation.',
    accent: '#ef4444',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'Staff Augmentation',
    short: 'Talent',
    href: '/solutions/staff-augmentation',
    desc: "Nepal's top-tier tech talent — pre-screened, onboarded in 2–4 weeks. Flexible monthly, dedicated team, or project-based contracts.",
    accent: '#ec4899',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop&auto=format',
  },
]

export function DomainsSection() {
  return (
    <section className="py-24 relative">
      <div className="glow-orb glow-blue w-96 h-96 top-1/2 left-1/4 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <h2 className="section-heading text-white">
            End-to-End Technology,<br />
            Across Every Layer
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-sm lg:text-right">
            From the payment layer to the citizen portal — we cover the full
            technology stack that governments and financial institutions depend on.
          </p>
        </div>

        {/* Expanding gallery — desktop */}
        <div className="hidden md:flex items-stretch gap-2 h-[480px] w-full">
          {domains.map((domain) => (
            <Link
              key={domain.href}
              to={domain.href}
              className="group/panel relative flex-[0.6] hover:flex-[3.2] transition-all duration-500 ease-in-out rounded-2xl overflow-hidden min-w-[56px]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              {/* Photo */}
              <img
                src={domain.image}
                alt={domain.label}
                className="absolute inset-0 h-full w-full object-cover object-center scale-105 group-hover/panel:scale-100 transition-transform duration-700"
              />

              {/* Base dark overlay */}
              <div className="absolute inset-0 bg-black/70 group-hover/panel:bg-black/45 transition-colors duration-500" />

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* Accent colour bleed from bottom */}
              <div
                className="absolute inset-0 opacity-0 group-hover/panel:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${domain.accent}33, transparent 70%)`,
                }}
              />

              {/* Collapsed — vertical label */}
              <div className="absolute inset-0 flex items-center justify-center group-hover/panel:opacity-0 transition-opacity duration-200 pointer-events-none">
                <span
                  className="text-white/60 text-xs font-semibold tracking-widest uppercase whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {domain.short}
                </span>
              </div>

              {/* Expanded — content */}
              <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-3 opacity-0 group-hover/panel:translate-y-0 group-hover/panel:opacity-100 transition-all duration-300 delay-100">
                {/* Accent dot */}
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mb-3"
                  style={{ background: domain.accent }}
                />
                <h3 className="text-white font-bold text-xl leading-snug mb-2">
                  {domain.label}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">
                  {domain.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: domain.accent }}
                >
                  Explore <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile — stacked cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {domains.map((domain) => (
            <Link
              key={domain.href}
              to={domain.href}
              className="relative h-56 rounded-2xl overflow-hidden group"
            >
              <img
                src={domain.image}
                alt={domain.label}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/65" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mb-2"
                  style={{ background: domain.accent }}
                />
                <h3 className="text-white font-bold text-base leading-snug mb-1">
                  {domain.label}
                </h3>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold"
                  style={{ color: domain.accent }}
                >
                  Explore <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
