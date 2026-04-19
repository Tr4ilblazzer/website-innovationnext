import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ContactSection } from '@/components/sections/ContactSection'

interface SolutionConfig {
  icon: string
  label: string
  tagline: string
  description: string
  accent: string
  stats: { value: string; label: string }[]
  capabilities: { title: string; desc: string; icon: string }[]
  products?: { name: string; href: string; desc: string }[]
  deployments?: { name: string; desc: string; badge: string }[]
}

const SOLUTIONS: Record<string, SolutionConfig> = {
  fintech: {
    icon: '💳',
    label: 'Digital Financial Services',
    tagline: 'We built the infrastructure that runs a country\'s financial system. Now we deploy it for you.',
    description: 'From digital wallets and neo-banking platforms to national payment switches and settlement engines — Innovation Next delivers production-grade financial infrastructure built from real operational experience, not assembled from third-party components.',
    accent: '#3C53FF',
    stats: [
      { value: '13M+', label: 'End users on our platforms' },
      { value: '$275M+', label: 'Monthly transactions processed' },
      { value: '95%', label: "Nepal's banks connected" },
      { value: '20+', label: 'Years building at scale' },
    ],
    capabilities: [
      { icon: '🏦', title: 'Neo-Banking Platform', desc: 'Full-stack digital bank — core banking, consumer app, compliance, settlement — in months, not years.' },
      { icon: '📱', title: 'Digital Wallet Infrastructure', desc: 'White-label wallet with QR, P2P, merchants, bill payments, and remittance.' },
      { icon: '🔄', title: 'Payment Switch & Settlement', desc: 'Interoperable QR, interbank, NFC, and card rails — PCI DSS certified architecture.' },
      { icon: '🌍', title: 'Cross-Border Remittance', desc: 'HomeSend, Western Union, Remitly, WorldRemit — full remittance connectivity.' },
      { icon: '📈', title: 'Personal Finance Manager', desc: 'AI-powered spend analytics, budgets, goals, and financial coaching embedded in your app.' },
      { icon: '⭐', title: 'Loyalty & Rewards', desc: 'Points engine, tiered rewards, merchant-funded offers, and gamification at scale.' },
    ],
    products: [
      { name: 'Groot Neo', href: '/products/groot-neo', desc: 'Neo-banking platform' },
      { name: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet infrastructure' },
      { name: 'PFM', href: '/products/pfm', desc: 'Personal finance manager' },
      { name: 'Loyalty Engine', href: '/products/loyalty', desc: 'Points & rewards' },
      { name: 'Merchant AI', href: '/products/merchant-ai', desc: 'AI merchant tools' },
    ],
    deployments: [
      { name: 'eSewa', desc: 'South Asia\'s first digital wallet — 13M+ users', badge: 'Founder Credential' },
      { name: 'Fonepay', desc: 'Nepal\'s national payment switch — 52+ banks', badge: 'Founder Credential' },
      { name: 'DuitNow QR / PayNet RPP', desc: 'Malaysian national QR payment scheme integration', badge: 'Live Deployment' },
    ],
  },
  egovernance: {
    icon: '🏛️',
    label: 'E-Governance & Digital Government',
    tagline: 'We don\'t just design digital government. We built the citizen platforms that a government runs on.',
    description: 'Innovation Next has designed, built, and operates seven live e-governance products for the Government of Nepal — including the national Nagarik App serving 15M+ citizens, the Interpol-integrated Immigration System, and a Government e-Payment layer. These are not case studies. These are live national systems.',
    accent: '#10b981',
    stats: [
      { value: '7+', label: 'Live government products' },
      { value: '15M+', label: 'Citizens served' },
      { value: '52+', label: 'Govt. integrations' },
      { value: 'GoN', label: 'Certified nationally' },
    ],
    capabilities: [
      { icon: '📱', title: 'Citizen Super-App', desc: 'National ID, PAN, voter ID, driving licence, tax services — one app, all ministries.' },
      { icon: '✈️', title: 'Immigration & Border Control', desc: 'e-Visa, PRM integration, biometric scanning, Interpol connectivity.' },
      { icon: '🚦', title: 'Traffic & Transport Management', desc: 'ANPR cameras, fine management, vehicle registration, payment integration.' },
      { icon: '💧', title: 'Smart Infrastructure (IoT)', desc: 'Smart water meters, sensor networks, real-time monitoring, billing integration.' },
      { icon: '💰', title: 'Government e-Payment', desc: 'Unified payment layer across all ministries and public services.' },
      { icon: '📊', title: 'PMO Monitoring System', desc: 'Programme and project monitoring for the Prime Minister\'s Office.' },
    ],
    deployments: [
      { name: 'Nagarik App', desc: 'Government of Nepal national citizen platform — 15M+ users', badge: 'Live / GoN' },
      { name: 'Immigration System', desc: 'Interpol-integrated border control and e-Visa platform', badge: 'Live / GoN' },
      { name: 'PMO Monitoring', desc: 'Prime Minister\'s Office programme monitoring', badge: 'Live / GoN' },
      { name: 'Traffic Violation System', desc: 'ANPR-based fine management with payment integration', badge: 'Live / GoN' },
    ],
  },
  'ai-ml': {
    icon: '🤖',
    label: 'AI & Machine Learning',
    tagline: 'AI built for the real conditions of financial and government systems — not lab benchmarks.',
    description: 'Our AI practice is embedded inside live fintech and e-governance platforms — not offered as a standalone product. We build fraud detection, signature verification, merchant risk scoring, predictive analytics, and custom models that run in production at national scale.',
    accent: '#8b5cf6',
    stats: [
      { value: 'Production', label: 'AI in live systems' },
      { value: 'Edge + Cloud', label: 'Deployment modes' },
      { value: 'Custom', label: 'Model development' },
      { value: 'Fintech + Gov', label: 'Domain speciality' },
    ],
    capabilities: [
      { icon: '🔍', title: 'Fraud Detection', desc: 'Real-time transaction monitoring with ML-powered anomaly detection for payment systems.' },
      { icon: '✍️', title: 'Signature Verification', desc: 'AI-powered signature and handwriting verification for KYC and document authentication.' },
      { icon: '🏪', title: 'Merchant AI', desc: 'Risk scoring, onboarding automation, and AI campaign recommendations for merchant networks.' },
      { icon: '📊', title: 'Predictive Analytics', desc: 'Churn prediction, credit scoring, and behavioural analytics for financial platforms.' },
      { icon: '🤖', title: 'Custom Model Development', desc: 'Bespoke model design, training, and productionisation for your specific use case.' },
      { icon: '🔒', title: 'Compliance AI', desc: 'Automated AML screening, KYC validation, and regulatory reporting.' },
    ],
  },
  'bi-data': {
    icon: '📊',
    label: 'BI & Data Solutions',
    tagline: 'Turning raw operational data into strategic intelligence — for financial institutions and governments.',
    description: 'From data warehousing and ETL pipelines to executive dashboards and real-time analytics, our BI & Data practice builds the full data infrastructure that enterprises and governments need to make evidence-based decisions.',
    accent: '#f59e0b',
    stats: [
      { value: 'Real-time', label: 'Dashboard analytics' },
      { value: 'Multi-source', label: 'Data integration' },
      { value: 'Scale', label: 'Big data pipelines' },
      { value: 'Governance', label: 'Master data management' },
    ],
    capabilities: [
      { icon: '📈', title: 'BI Dashboards', desc: 'Executive and operational dashboards with real-time KPIs across your business or government programme.' },
      { icon: '🏗️', title: 'Data Warehousing', desc: 'Scalable data warehouse architecture — on-premise or cloud — with automated ETL pipelines.' },
      { icon: '🌊', title: 'Big Data Pipelines', desc: 'High-volume streaming and batch data processing for transaction, IoT, and citizen data.' },
      { icon: '🗃️', title: 'Master Data Management', desc: 'Single source of truth for customer, product, and organisational data across systems.' },
      { icon: '🔗', title: 'Data Integration', desc: 'API, file, and database integration across legacy and modern systems.' },
      { icon: '🔍', title: 'Data Quality & Governance', desc: 'Automated data validation, lineage tracking, and governance framework implementation.' },
    ],
  },
  'it-services': {
    icon: '⚙️',
    label: 'IT Services',
    tagline: 'Full-service digital & technology partner',
    description: 'Innovation Next delivers end-to-end IT services: UI/UX and brand design, bespoke software development, web and mobile applications, infrastructure management, cloud architecture, and security & compliance. We build the products and platforms that power your business.',
    accent: '#ef4444',
    stats: [
      { value: 'Full-stack', label: 'Design to deployment' },
      { value: 'Cloud native', label: 'Modern architecture' },
      { value: 'DevSecOps', label: 'Security-first delivery' },
      { value: 'Agile', label: 'Delivery methodology' },
    ],
    capabilities: [
      { icon: '🎨', title: 'Design & Brand', desc: 'UI/UX design, visual identity, design systems, and interface design that performs.' },
      { icon: '💻', title: 'Bespoke Software', desc: 'Consumer and enterprise applications built to your exact specification.' },
      { icon: '📱', title: 'Web & Mobile', desc: 'Responsive web apps, native and cross-platform mobile — performant and accessible.' },
      { icon: '☁️', title: 'Infrastructure & Cloud', desc: 'Cloud architecture, DevOps, containerisation, and infrastructure management at scale.' },
      { icon: '🔒', title: 'Security & Compliance', desc: 'Security audits, penetration testing, compliance frameworks, and ongoing monitoring.' },
      { icon: '🔧', title: 'Legacy Modernisation', desc: 'Migration and re-architecture of legacy systems to modern, maintainable stacks.' },
    ],
  },
  'staff-augmentation': {
    icon: '👥',
    label: 'Staff Augmentation',
    tagline: 'Put Nepal\'s top tech talent on your team. Skip the hiring hassle.',
    description: 'Access pre-screened senior developers across AI/ML, data engineering, full-stack, mobile, and cloud/DevOps. Onboard in 2–4 weeks. Flexible contracts — monthly, dedicated team, project-based, or on-demand. Work with experts who have shipped production systems at national scale.',
    accent: '#ec4899',
    stats: [
      { value: '2–4wk', label: 'Average onboarding time' },
      { value: 'Senior', label: 'Pre-screened talent' },
      { value: 'Flexible', label: 'Contract models' },
      { value: 'Real-time', label: 'Collaboration' },
    ],
    capabilities: [
      { icon: '🤖', title: 'AI & Data Engineers', desc: 'ML engineers, data scientists, and data engineers across Python, PyTorch, and Spark.' },
      { icon: '⚛️', title: 'Frontend Developers', desc: 'React, Vue, Angular, TypeScript — senior frontend engineers with fintech experience.' },
      { icon: '⚙️', title: 'Backend Developers', desc: 'Node.js, Go, Python, Java — backend engineers who ship production API systems.' },
      { icon: '📱', title: 'Mobile Developers', desc: 'Flutter, React Native, iOS, Android — cross-platform and native mobile specialists.' },
      { icon: '☁️', title: 'Cloud & DevOps', desc: 'AWS, Azure, GCP, Kubernetes, Terraform — infrastructure and CI/CD specialists.' },
      { icon: '🎨', title: 'UI/UX Designers', desc: 'Product designers with fintech and enterprise application experience.' },
    ],
  },
}

export default function SolutionPage({ domain }: { domain: string }) {
  const config = SOLUTIONS[domain]
  if (!config) return <div className="pt-32 text-center text-white/50">Solution not found.</div>

  return (
    <main className="pt-32 pb-0 relative">
      <div
        className="glow-orb w-[600px] h-[600px] top-0 right-0 opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${config.accent}30, transparent 70%)` }}
      />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="max-w-3xl">
          <div className="section-tag mb-6" style={{ color: config.accent, background: `${config.accent}10`, border: `1px solid ${config.accent}25` }}>
            <span className="text-lg">{config.icon}</span>
            {config.label}
          </div>
          <h1 className="hero-heading text-white mb-6 italic leading-[0.95]">
            "{config.tagline}"
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-8">{config.description}</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">Get in Touch <ArrowRight size={14} /></Link>
            <Link to="/company" className="btn-secondary">Our Credentials</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {config.stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="stat-number mb-1" style={{ background: `linear-gradient(135deg, ${config.accent}, #0DFFFF)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </div>
                <div className="text-white/40 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-tag mb-6" style={{ color: config.accent, background: `${config.accent}10`, border: `1px solid ${config.accent}25` }}>
            Capabilities
          </div>
          <h2 className="section-heading text-white mb-12">What we deliver.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.capabilities.map(c => (
              <div key={c.title} className="glass-card p-6">
                <div className="text-2xl mb-4">{c.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products (if any) */}
      {config.products && (
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="section-tag mb-6">White-Label Products</div>
            <h2 className="section-heading text-white mb-10">Production-ready products.</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {config.products.map(p => (
                <Link key={p.href} to={p.href} className="glass-card p-5 group text-center">
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#3C53FF] transition-colors">{p.name}</h3>
                  <p className="text-xs text-white/35">{p.desc}</p>
                  <ArrowRight size={12} className="mx-auto mt-3 text-white/20 group-hover:text-white/60 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live deployments */}
      {config.deployments && (
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="section-tag mb-6">Proven Deployments</div>
            <h2 className="section-heading text-white mb-10">Live in production.</h2>
            <div className="space-y-3">
              {config.deployments.map(d => (
                <div key={d.name} className="glass-card px-7 py-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5">{d.name}</h3>
                    <p className="text-sm text-white/45">{d.desc}</p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ background: `${config.accent}15`, border: `1px solid ${config.accent}30`, color: config.accent }}
                  >
                    {d.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <ContactSection compact />
        </div>
      </section>
    </main>
  )
}
