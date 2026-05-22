import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { Smartphone, Package, CreditCard, BarChart3, Brain, Shield, Cloud } from 'lucide-react'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

const ACCENT = '#0072BC'

const stats = [
  { value: '13M+', label: 'End users on our platforms' },
  { value: '$275M+', label: 'Monthly transactions processed' },
  { value: '52+', label: 'Banks on Fonepay network' },
  { value: '95%', label: "Nepal's banks connected" },
]

const features = [
  { title: 'Neo-Banking Platform', desc: 'Full-stack digital bank — consumer app to settlement engine. From contract to live digital bank in months, not years.' },
  { title: 'Digital Wallet Infrastructure', desc: 'White-label wallet with QR payments, P2P transfers, bill pay, merchant integration, and omnichannel engagement.' },
  { title: 'Payment Switch & Settlement', desc: 'Interoperable QR, interbank, NFC, and card rails — PCI DSS certified architecture equivalent to DuitNow/PayNet.' },
  { title: 'Cross-Border Remittance', desc: 'End-to-end remittance platform with 20+ corridor integrations — Remitly, WorldRemit, HomeSend, Western Union.' },
  { title: 'Personal Finance Manager', desc: 'AI-powered PFM with spend analytics, budget tracking, financial health scoring, and personalised recommendations.' },
  { title: 'Loyalty Engine', desc: 'Points, cashback, and rewards with real-time issuance, partner merchant network, and AI-driven offer targeting.' },
  { title: 'Merchant AI', desc: 'AI-powered onboarding, risk scoring, and document verification — reducing merchant onboarding from weeks to hours.' },
  { title: 'Compliance & Regulatory', desc: 'Built-in AML, KYC/eKYC, transaction monitoring, and reporting designed for central bank regulatory environments.' },
  { title: 'Settlement Engine', desc: 'Real-time and batch settlement across multi-bank, multi-scheme environments — reconciliation, dispute management, reporting.' },
]

const capabilities = [
  'NRB / Central bank compliance',
  'PCI DSS certified infrastructure',
  'Real-time settlement engine',
  'Multi-bank reconciliation',
  'eKYC / biometric onboarding',
  'AML / transaction monitoring',
  'National QR scheme certification',
  'Cross-border FX engine',
  'Merchant risk AI scoring',
  'Microservices / API-first architecture',
  'ISO 27001 security framework',
  'Multi-tenancy SaaS delivery',
]

const PLATFORM_LAYERS = [
  {
    id: 1,
    title: 'Consumer & Merchant Apps',
    date: 'Layer 1',
    content: 'Groot Neo, Groot Pay, Merchant App, Agent App, USSD Channel, Web Portal — delivered across iOS & Android.',
    category: 'Applications',
    icon: Smartphone,
    relatedIds: [2],
    status: 'completed' as const,
    energy: 98,
  },
  {
    id: 2,
    title: 'Products & Features',
    date: 'Layer 2',
    content: 'PFM, Loyalty & Rewards, Merchant AI, Digital Lending, Virtual Card Issuance, Multi-Currency Wallets, Bill & Bulk Payments, International Remittance.',
    category: 'Products',
    icon: Package,
    relatedIds: [1, 3],
    status: 'completed' as const,
    energy: 95,
  },
  {
    id: 3,
    title: 'Payments Infrastructure',
    date: 'Layer 3',
    content: 'QR, NFC / Tap & Pay, Payment Gateway, DuitNow / PayNet RPP, ISO 8583 / API Interbank Switch, RTGS, Cross-Border Remittance Rails, Visa & MC Card Rails, Real-Time FX Engine.',
    category: 'Infrastructure',
    icon: CreditCard,
    relatedIds: [2, 4],
    status: 'completed' as const,
    energy: 92,
  },
  {
    id: 4,
    title: 'Settlement & Reconciliation',
    date: 'Layer 4',
    content: 'Multi-Scheme Settlement, Merchant Hierarchy & Split Settlement, Automated 3-Way Reconciliation, Recurring & Instalment Settlement, RTGS-Linked Settlement Windows, Dispute & Chargeback, Liquidity & Exposure Monitoring.',
    category: 'Settlement',
    icon: BarChart3,
    relatedIds: [3, 5],
    status: 'completed' as const,
    energy: 90,
  },
  {
    id: 5,
    title: 'Intelligent AI Platform',
    date: 'Layer 5',
    content: 'AI Digital Assistant (LLM/NLP), Fraud & Risk AI, Personalised Financial Insights, AI Campaign Intelligence, AI Customer Support, MLOps Infrastructure, Explainable AI & Bias Monitoring.',
    category: 'AI / ML',
    icon: Brain,
    relatedIds: [4, 6],
    status: 'in-progress' as const,
    energy: 78,
  },
  {
    id: 6,
    title: 'Engagement & Compliance',
    date: 'Layer 6',
    content: 'Unified CDP, Omnichannel Messaging, Campaign Automation, KYC/KYB Automation, AML / CFT / STR, PCI DSS / PDPA / GDPR, PKI / JWT / MFA / HSM, Regulatory Reporting.',
    category: 'Compliance',
    icon: Shield,
    relatedIds: [5, 7],
    status: 'completed' as const,
    energy: 96,
  },
  {
    id: 7,
    title: 'Cloud Infrastructure',
    date: 'Foundation',
    content: 'AWS, Azure, GCP, Kubernetes, Apache Kafka, RabbitMQ, Microservices, CI/CD pipelines. Spring Boot, Django, Node.js, Flutter, React Native, Swift, Kotlin, MySQL, Redis, MongoDB.',
    category: 'Cloud',
    icon: Cloud,
    relatedIds: [6],
    status: 'completed' as const,
    energy: 100,
  },
]

export default function FintechSolutionPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Two-column */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

            {/* Left */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: ACCENT }}>
                Digital Financial Services
              </p>
              <h1 className="hero-heading text-[#0A0A0A] mb-5">
                We built the infrastructure
                <br />
                <span className="gradient-text">nations run on.</span>
              </h1>
              <p className="text-[#0A0A0A]/40 italic text-lg leading-relaxed mb-4">
                "Not consultants who designed it. Builders who launched it, scaled it, and operated it under central bank oversight."
              </p>
              <p className="text-[#0A0A0A]/55 leading-relaxed mb-8">
                Innovation Next is a full-stack fintech technology company. Our leadership co-founded eSewa — South Asia's first digital wallet serving 13M+ users — and Fonepay — Nepal's national payment switch, connecting 52+ banks and processing $275M+ monthly. We bring that operational depth to every engagement.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/company" className="btn-secondary">Our Credentials</Link>
              </div>
            </div>

            {/* Right: domain image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80"
                alt="Digital financial services"
                className="w-full h-[520px] object-cover rounded-3xl"
              />
            </div>
          </div>

          {/* Stats strip */}
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

      {/* ── Capabilities ──────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 grid md:grid-cols-2 md:items-end gap-6">
            <h2 className="section-heading text-[#0A0A0A]">
              What we <span className="section-accent">deliver.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">
              Every capability has been built and operated in live, regulated environments — not proof-of-concept systems.
            </p>
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

      {/* ── Platform Architecture ─────────────────────── */}
      <section className="py-24 bg-[#EBF5FF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="section-heading text-[#0A0A0A] mb-4">
              Seven layers, one{' '}
              <span style={{ color: ACCENT }}>unified platform.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 max-w-2xl mx-auto text-base leading-relaxed">
              Click any layer to explore the components. Connected layers illuminate automatically.
            </p>
          </div>
          <RadialOrbitalTimeline timelineData={PLATFORM_LAYERS} />
        </div>
      </section>


      {/* ── Trusted By ── */}
      <TrustedBySection />
      <InsightsSection category="Fintech" />

      {/* ── Technical depth + CTA ─────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Capabilities checklist */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="section-heading text-[#0A0A0A] mb-4">
                Built for production.
              </h2>
              <p className="text-[#0A0A0A]/50 text-lg leading-relaxed">
                Every capability listed has been delivered in real, live systems — not in proof-of-concept environments.
              </p>
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

          {/* CTA card */}
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
              <h2 className="section-heading text-white mb-3">Ready to get started?</h2>
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
