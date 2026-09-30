'use client'


import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { Smartphone, Package, CreditCard, BarChart3, Brain, Shield, Cloud } from 'lucide-react'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

const ACCENT = '#0040C1'

const stats = [
  { value: '13M+', label: 'Users on platforms we built' },
  { value: '3.5M+', label: 'Daily transactions' },
  { value: '20+', label: 'Remittance corridors' },
  { value: 'Live', label: 'Nepal and Malaysia' },
]

const features = [
  { title: 'Neo-Banking — Groot Neo', desc: 'A pre-integrated digital banking stack — mobile banking, wallet, AI layer, engagement, payments, settlement, onboarding, lending, and virtual accounts — under one vendor.' },
  { title: 'Digital Wallets — Groot Pay', desc: 'P2P transfers, QR and NFC merchant payments, bill pay, top-up, cardless ATM, agent banking, and a Mini-App SDK so partners list services in the wallet.' },
  { title: 'Personal Finance — PFM', desc: 'ML-based categorisation, budgets with breach alerts, savings goals, subscription detection, and 7–30 day cash-flow forecasts in plain language.' },
  { title: 'Loyalty & Rewards', desc: 'Configurable points, tiers, campaigns, and redemption through an open partner API — rules changed from an admin console, not code.' },
  { title: 'AI Onboarding — KYC / KYB', desc: 'Document intelligence, liveness, business verification, risk scoring, and Video KYC — live for merchant onboarding at Boost (Axiata), Malaysia.' },
  { title: 'Payment Infrastructure', desc: 'Implementation and integration for DuitNow QR and PayNet RPP — scheme certification, switch integration, merchant onboarding at scale, and dispute and reconciliation frameworks.' },
  { title: 'Settlement Engine', desc: 'Multi-bank, multi-currency, multi-rail settlement — gross, net, and deferred net — with automated reconciliation and regulatory-grade reporting.' },
  { title: 'Cross-Border Remittance', desc: 'A remittance gateway integrating 20+ remittance companies, with wallet credit, bank credit, and agent cash-out, and AML/CFT monitoring.' },
]

const capabilities = [
  'Real-time and batch settlement',
  'Multi-bank reconciliation',
  'eKYC and document OCR with liveness',
  'AML / CFT transaction monitoring',
  'DuitNow QR and PayNet RPP',
  'Real-time FX integration',
  'Fraud & risk AI — sub-second decisions',
  'Multi-currency: USD, AED, MYR, NPR and more',
  'Mini-App Framework and SDK',
  'REST APIs (OpenAPI 3.0)',
  'Cloud or on-premise deployment',
  'PCI DSS-aligned security',
]

const PLATFORM_LAYERS = [
  {
    id: 1,
    title: 'Consumer & Merchant Apps',
    date: 'Layer 1',
    content: 'Groot Neo, Groot Pay, Merchant App, Agent App, Web Portal — delivered across iOS & Android.',
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
    content: 'PFM, Loyalty Engine, Onboarding Platform, Digital Lending, Virtual Accounts, Multi-Currency Wallets, Bill Payments, International Remittance.',
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
    content: 'QR (EMVCo), NFC, Payment Gateway, DuitNow QR / PayNet RPP, RTGS integration, Cross-Border Remittance Rails, Real-Time FX Integration.',
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
    content: 'Multi-Currency, Multi-Rail Settlement, Automated Reconciliation with Exception Management, T+0 and T+1 Settlement, Dispute Framework, Regulatory-Grade Reporting.',
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
    content: 'Customer Data Platform, Omnichannel Messaging, Campaign Automation, KYC/KYB Automation, AML / CFT Monitoring, Audit Trails, Regulatory Reporting.',
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
                Wallets, neo-banking, payments,
                <br />
                <span className="gradient-text">in production.</span>
              </h1>
              <p className="text-[#0A0A0A]/40 italic text-lg leading-relaxed mb-4">
                "Platforms we built, launched, and operate — not systems we only designed."
              </p>
              <p className="text-[#0A0A0A]/55 leading-relaxed mb-8">
                We design, build, and scale production-grade fintech infrastructure for banks, digital banks, fintechs, telecoms, and microfinance institutions — digital wallets, neo-banking platforms, QR and real-time payments, and cross-border remittance, live in Nepal and Malaysia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/company" className="btn-secondary">Our Credentials</Link>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 border-t border-black/[0.06] text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-medium mb-1" style={{ color: ACCENT }}>{s.value}</div>
                <div className="text-sm text-[#575757]">{s.label}</div>
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
              Platforms we ship as named products, plus the payment infrastructure and integration work around them.
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
      <section className="bg-[#FAFAFA] py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-14">
          <div className="max-w-3xl text-center">
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>Capabilities</p>
            <h2 className="text-3xl md:text-[38px] md:leading-[46px] font-medium text-[#0A0A0A] mb-4">
              Built for <span style={{ color: ACCENT }}>production.</span>
            </h2>
            <p className="text-base leading-6 text-[#575757]">
              Every capability listed has been delivered in real, live systems — not in proof-of-concept environments.
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

          {/* CTA card */}
          <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: '#0040C1' }}>
            <AnimatedBackground />
            <div className="relative z-10">
              <h2 className="section-heading text-white mb-3">Ready to get started?</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                Talk to our team about your requirements. We'll tell you straight whether we're the right fit.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#040404] font-semibold text-sm py-3.5 px-8 hover:bg-white/90 transition-colors"
                >
                  Get in Touch <ArrowRight size={14} />
                </Link>
                <Link
                  href="/insights/case-studies"
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
