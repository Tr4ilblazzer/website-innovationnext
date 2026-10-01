import { CyberneticBentoGrid } from '@/components/ui/cybernetic-bento-grid'

const domains = [
  {
    label: 'Digital Financial Services',
    short: 'Fintech',
    href: '/industries/digital-financial-services',
    desc: 'Digital wallets, neo-banking platforms, QR and real-time payments, and cross-border remittance — live in Nepal and Malaysia.',
    accent: '#0040C1',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'E-Governance & Digital Government',
    short: 'E-Gov',
    href: '/industries/e-governance',
    desc: 'Citizen super-apps, governance monitoring, smart infrastructure, and digital revenue collection — seven live national deployments, now deploying in Sri Lanka.',
    accent: '#10b981',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'AI & Machine Learning',
    short: 'AI / ML',
    href: '/solutions/ai-ml',
    desc: 'Signature verification, fraud detection, document intelligence, and analytics — AI models in production, not in the lab.',
    accent: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'Digital Transformation Consulting',
    short: 'Advise',
    href: '/solutions/consulting',
    desc: 'Business requirements, system specifications, tender documents, and process redesign — written by the team that builds and runs national systems.',
    accent: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'Bespoke Software Development',
    short: 'Build',
    href: '/solutions/bespoke-software',
    desc: 'Mobile, web, and backend platforms, security engineering, and legacy modernisation — built to the standard of live national systems.',
    accent: '#0040C1',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'BI & Data Solutions',
    short: 'BI & Data',
    href: '/solutions/bi-data',
    desc: 'Power BI dashboards, data warehousing, data pipelines, and master data management — 50+ dashboards deployed, including live capital-market reporting.',
    accent: '#0040C1',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format',
  },
  {
    label: 'Managed Services',
    short: 'Run',
    href: '/solutions/managed-services',
    desc: 'SLA-governed application and infrastructure management, plus dedicated engineering teams from Kathmandu.',
    accent: '#ec4899',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=600&fit=crop&auto=format',
  },
]

export function DomainsSection() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <h2 className="section-heading text-[#0A0A0A]">
            <span className="section-accent">End-to-End Technology,</span><br />
            Across Every Layer
          </h2>
          <p className="text-[#0A0A0A]/50 text-base leading-relaxed max-w-sm lg:text-right">
            From the first requirement to live operation — we advise, build, and run the
            digital platforms that financial institutions and governments depend on.
          </p>
        </div>

        {/* Bento grid — desktop */}
        <div className="hidden md:block">
          <CyberneticBentoGrid domains={domains} />
        </div>

        {/* Mobile — stacked cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {domains.map((domain) => (
            <a
              key={domain.href}
              href={domain.href}
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
                <h3 className="text-white font-bold text-base leading-snug mb-1">{domain.label}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
