import { Smartphone, Package, CreditCard, BarChart3, Brain, Shield, Cloud } from 'lucide-react'
import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

const PLATFORM_LAYERS = [
  {
    id: 1,
    title: 'Consumer & Merchant Apps',
    date: 'Layer 1',
    content:
      'Groot Neo, Groot Pay, Merchant App, Agent App, USSD Channel, Web Portal — delivered across iOS & Android. The user-facing surface of the entire stack.',
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
    content:
      'PFM, Loyalty & Rewards, Merchant AI, Digital Lending, Virtual Card Issuance, Multi-Currency Wallets, Bill & Bulk Payments, International Remittance.',
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
    content:
      'QR, NFC / Tap & Pay, Payment Gateway, DuitNow / PayNet RPP, ISO 8583 / API Interbank Switch, RTGS, Cross-Border Remittance Rails, Visa & MC Card Rails, Real-Time FX Engine.',
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
    content:
      'Multi-Scheme Settlement, Merchant Hierarchy & Split Settlement, Automated 3-Way Reconciliation, Recurring & Instalment Settlement, RTGS-Linked Settlement Windows, Dispute & Chargeback, Liquidity & Exposure Monitoring.',
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
    content:
      'AI Digital Assistant (LLM/NLP), Fraud & Risk AI, Personalised Financial Insights, AI Campaign Intelligence, AI Customer Support, MLOps Infrastructure, Explainable AI & Bias Monitoring.',
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
    content:
      'Unified CDP, Omnichannel Messaging, Campaign Automation, KYC/KYB Automation, AML / CFT / STR, PCI DSS / PDPA / GDPR, PKI / JWT / MFA / HSM, Regulatory Reporting.',
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
    content:
      'AWS, Azure, GCP, Kubernetes, Apache Kafka, RabbitMQ, Microservices, CI/CD pipelines. Built on Spring Boot, Django, Node.js, Flutter, React Native, Swift, Kotlin, MySQL, Redis, MongoDB.',
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
      <SolutionPageTemplate
        tag="Digital Financial Services"
        headline="We built the infrastructure"
        headlineAccent="nations run on."
        subheadline='"Not consultants who designed it. Builders who launched it, scaled it, and operated it under central bank oversight."'
        description="Innovation Next is a full-stack fintech technology company. Our leadership team co-founded eSewa — South Asia's first digital wallet serving 13M users — and Fonepay — Nepal's national payment switch, connecting 52+ banks and processing over $275M monthly. We bring that operational depth to every fintech engagement."
        accentColor="#3C53FF"
        icon="💳"
        credentialBadge="Our founders co-founded eSewa (South Asia's first digital wallet) and Fonepay (Nepal's national payment switch, PCI DSS certified)"
        stats={[
          { value: '13M+', label: 'End users on our platforms' },
          { value: '$275M+', label: 'Monthly transactions processed' },
          { value: '52+', label: 'Banks on Fonepay network' },
          { value: '95%', label: "Nepal's banks connected" },
        ]}
        features={[
          {
            title: 'Neo-Banking Platform (Groot Neo)',
            description: 'Full-stack digital banking platform — consumer app to settlement engine. From contract to live digital bank in months, not years.',
          },
          {
            title: 'Digital Wallet (Groot Pay)',
            description: 'White-label mobile wallet with QR payments, P2P transfers, bill pay, merchant integration, and omnichannel engagement.',
          },
          {
            title: 'National Payment Switch',
            description: 'Interoperable payment infrastructure connecting banks across QR, interbank, NFC, and card rails — architecturally equivalent to DuitNow/PayNet.',
          },
          {
            title: 'Settlement Engine',
            description: 'Real-time and batch settlement across multi-bank, multi-scheme environments. Handles reconciliation, dispute management, and reporting.',
          },
          {
            title: 'Cross-Border Remittance',
            description: 'End-to-end remittance platform with 20+ corridor integrations including Remitly, WorldRemit, HomeSend, and Western Union Mobile Money Transfer.',
          },
          {
            title: 'Personal Finance Manager (PFM)',
            description: 'AI-powered PFM layer with spend analytics, budget tracking, financial health scoring, and personalised recommendations.',
          },
          {
            title: 'Loyalty Engine',
            description: 'Points, cashback, and rewards platform with real-time issuance, partner merchant network management, and AI-driven offer targeting.',
          },
          {
            title: 'Merchant AI',
            description: 'AI-powered merchant onboarding, risk scoring, document verification, and performance analytics — reducing onboarding from weeks to hours.',
          },
          {
            title: 'Compliance & Regulatory',
            description: 'Built-in AML, KYC/eKYC, transaction monitoring, and reporting — designed for central bank and national scheme regulatory environments.',
          },
        ]}
        deployments={[
          {
            name: "eSewa — South Asia's First Digital Wallet",
            description:
              "Co-founded by our Director. Launched 2009. Nepal's first licensed Payment Service Provider. 13M+ customers, 80%+ market share, 3.5M+ daily transactions across 3M+ merchants.",
            tags: ['13M+ users', 'PCI DSS', 'Central Bank Licensed', 'Nepal Rastra Bank'],
          },
          {
            name: 'Fonepay — National Payment Switch',
            description:
              "Co-founded by our Director. Nepal's first non-card-based Payment System Operator (PSO). Connects 52+ banks across QR, interbank, NFC, and card rails. First PSO with PCI DSS certification.",
            tags: ['52+ banks', '$275M/month', 'PCI DSS Certified', 'Interpay equivalent'],
          },
          {
            name: 'DuitNow QR / PayNet RPP Integration',
            description:
              'Full DuitNow QR and PayNet RPP certification and integration for Malaysian market deployment. National scheme certified.',
            tags: ['Malaysia', 'DuitNow QR', 'PayNet RPP', 'National scheme'],
          },
          {
            name: 'Cross-Border Remittance Platform',
            description:
              'Pioneer of digital remittance in Nepal. First to integrate HomeSend (2011) and Western Union Mobile Money Transfer (2013). Now connected to 20+ global corridors.',
            tags: ['20+ corridors', 'Remitly', 'WorldRemit', 'Western Union'],
          },
        ]}
        capabilities={[
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
        ]}
      />

      {/* Platform Architecture */}
      <section className="py-24 bg-[#040404] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(60,83,255,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-4">
            <div className="section-tag mx-auto mb-6">Platform Architecture</div>
            <h2 className="section-heading text-white mb-4">
              Seven layers, one{' '}
              <span className="gradient-text">unified platform.</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed">
              Click any layer to explore the components. Connected layers illuminate automatically.
            </p>
          </div>

          <RadialOrbitalTimeline timelineData={PLATFORM_LAYERS} />

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {[
              { label: 'Live / Deployed', color: '#3C53FF' },
              { label: 'In Development', color: '#0DFFFF' },
              { label: 'Planned', color: 'rgba(255,255,255,0.3)' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2 text-[12px] text-white/40">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
