import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { ArrowRight } from 'lucide-react'

const ACCENT = '#0072BC'


function PhoneShowcase({ image, alt, height = 480 }: { image: string; alt: string; height?: number }) {
  return (
    <div className="flex items-center justify-center w-full select-none" style={{ height }}>
      <img
        src={image}
        alt={alt}
        className="h-full w-auto object-contain hover:-translate-y-2 transition-transform duration-500"
        style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}
      />
    </div>
  )
}

interface FeatureHighlight {
  title: string
  desc: string
}

interface Product {
  value: string
  label: string
  tagline: string
  title: string
  desc: string
  href: string
  accent: string
  image: string
  imageAlt: string
  showcaseHeight?: number
  highlights: FeatureHighlight[]
}

const products: Product[] = [
  {
    value: 'groot-neo',
    label: 'Groot Neo',
    tagline: 'Neo-Banking Platform',
    title: 'From contract to live digital bank in months, not years.',
    desc: 'Pre-built, pre-integrated modules covering consumer app to settlement engine.',
    href: '/products/groot-neo',
    accent: '#0072BC',
    image: '/groot-neo-mockup.png',
    imageAlt: 'Groot Neo neo-banking platform mockup',
    showcaseHeight: 620,
    highlights: [
      { title: 'Core Banking', desc: 'Full ledger, accounts & transaction engine built for regulatory compliance.' },
      { title: 'KYC & AML', desc: 'Automated identity verification, AML screening, and regulatory reporting.' },
      { title: 'Settlement Engine', desc: 'Real-time gross settlement, reconciliation, and multi-currency support.' },
      { title: 'Consumer App', desc: 'White-label mobile and web interface, ready for your brand.' },
    ],
  },
  {
    value: 'groot-pay',
    label: 'Groot Pay',
    tagline: 'Digital Wallet Infrastructure',
    title: 'White-label wallet. Production-ready from day one.',
    desc: 'Built from the same codebase that powered eSewa at 13M users.',
    href: '/products/groot-pay',
    accent: '#0DFFFF',
    image: '/groot-pay-mockup.png',
    imageAlt: 'Groot Pay digital wallet mockup',
    highlights: [
      { title: 'QR Payments', desc: 'Scan-to-pay at any merchant, compatible with national QR standards.' },
      { title: 'P2P Transfers', desc: 'Instant person-to-person transfers with real-time balance updates.' },
      { title: 'Merchant Hub', desc: 'Onboarding, settlement, and analytics for your merchant network.' },
      { title: 'Remittance', desc: 'Cross-border money movement with competitive FX and compliance built in.' },
    ],
  },
  {
    value: 'pfm',
    label: 'PFM',
    tagline: 'Personal Finance Manager',
    title: 'Embedded financial intelligence for your users.',
    desc: 'Designed to increase engagement and lifetime value for digital banking customers.',
    href: '/products/pfm',
    accent: '#8b5cf6',
    image: '/pfm-mockup.png',
    imageAlt: 'Personal Finance Manager mockup',
    highlights: [
      { title: 'Spend Analytics', desc: 'Automatic categorisation and visual breakdowns of spending patterns.' },
      { title: 'Budget Tools', desc: 'Flexible budget templates with real-time tracking and alerts.' },
      { title: 'AI Insights', desc: 'Personalised financial coaching powered by transaction intelligence.' },
      { title: 'Goal Tracking', desc: 'Savings goals with progress visualisation and smart nudges.' },
    ],
  },
  {
    value: 'loyalty',
    label: 'Loyalty Engine',
    tagline: 'Points & Rewards Platform',
    title: 'End-to-end loyalty infrastructure at scale.',
    desc: 'Configurable for banks, wallets, and super-apps without rebuilding from scratch.',
    href: '/products/loyalty',
    accent: '#f59e0b',
    image: '/loyalty-mockup.png',
    imageAlt: 'Loyalty Engine app mockup',
    highlights: [
      { title: 'Points Engine', desc: 'Flexible points issuance, expiry, and redemption logic at any scale.' },
      { title: 'Tiered Rewards', desc: 'Multi-tier loyalty programs with automatic tier progression.' },
      { title: 'Merchant Offers', desc: 'Real-time merchant-funded offers and cashback management.' },
      { title: 'Gamification', desc: 'Challenges, streaks, and badges to drive daily active usage.' },
    ],
  },
  {
    value: 'merchant-ai',
    label: 'Merchant AI',
    tagline: 'AI-Powered Merchant Tools',
    title: 'Intelligent tools for merchant lifecycle management.',
    desc: 'Built for acquiring banks and payment platforms managing large merchant portfolios.',
    href: '/products/merchant-ai',
    accent: '#10b981',
    image: '/merchant-ai-mockup.png',
    imageAlt: 'Merchant AI mockup',
    highlights: [
      { title: 'Smart Onboarding', desc: 'AI-assisted KYC and document verification for faster merchant activation.' },
      { title: 'Risk Scoring', desc: 'Real-time risk assessment and fraud signals across the merchant portfolio.' },
      { title: 'AI Campaigns', desc: 'Predictive campaign recommendations based on merchant transaction data.' },
      { title: 'Sales Analytics', desc: 'Portfolio-level dashboards with merchant performance benchmarking.' },
    ],
  },
]

export function ProductsSection() {
  const [active, setActive] = useState(products[0].value)

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <h2 className="section-heading text-[#0A0A0A]">
            <span className="section-accent">Production-ready.</span><br />
            Not assembled from parts.
          </h2>
          <p className="text-[#0A0A0A]/40 text-base leading-relaxed max-w-sm lg:text-right">
            Every product is built from real operational experience — deployed at national scale, not assembled from third-party components.
          </p>
        </div>

        {/* Tabbed products */}
        <Tabs value={active} onValueChange={setActive}>

          {/* Tab triggers */}
          <TabsList className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-black/[0.06]">
            {products.map((p) => {
              const isActive = p.value === active
              return (
                <TabsTrigger
                  key={p.value}
                  value={p.value}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer hover:text-[#0A0A0A]/70"
                  style={isActive
                    ? { color: ACCENT, borderColor: ACCENT, background: 'transparent' }
                    : { color: 'rgba(10,10,10,0.40)', borderColor: 'transparent', background: 'transparent' }
                  }
                >
                  {p.label}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Tab panels */}
          {products.map((p) => (
            <TabsContent key={p.value} value={p.value}>
              <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">

                {/* Left — phone showcase */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <PhoneShowcase image={p.image} alt={p.imageAlt} height={p.showcaseHeight} />
                </div>

                {/* Right — content + feature highlights */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>
                      {p.tagline}
                    </p>
                    <h3
                      className="font-bold text-[#0A0A0A] leading-tight mb-3"
                      style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-[#0A0A0A]/45 text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Feature highlight cards */}
                  <div className="rounded-3xl bg-[#EBF5FF] p-5">
                    <div className="space-y-3">
                      {p.highlights.map((h) => (
                        <div
                          key={h.title}
                          className="rounded-xl py-4 px-5 bg-white border border-black/[0.06] hover:-translate-y-0.5 transition-transform duration-200 flex gap-4 items-start"
                        >
                          <div className="w-1 h-full min-h-[2rem] rounded-full flex-shrink-0 mt-0.5" style={{ background: ACCENT }} />
                          <div>
                            <h4 className="text-sm font-semibold text-[#0A0A0A] mb-0.5">{h.title}</h4>
                            <p className="text-xs text-[#0A0A0A]/45 leading-relaxed">{h.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={p.href} className="btn-secondary self-start inline-flex">
                    Explore {p.label} <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            </TabsContent>
          ))}
        </Tabs>

      </div>
    </section>
  )
}
