import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import {
  ArrowRight, Building2, Wallet, PieChart, Gift, Bot,
  Landmark, ShieldCheck, Smartphone, ArrowLeftRight,
  QrCode, Store, Globe,
  Calculator, Brain, Target,
  Coins, Trophy, Tag,
  UserCheck, AlertTriangle, TrendingUp,
} from 'lucide-react'
import type { ReactNode } from 'react'

interface FeatureHighlight {
  icon: ReactNode
  title: string
  desc: string
}

interface Product {
  value: string
  icon: ReactNode
  label: string
  tagline: string
  title: string
  desc: string
  href: string
  accent: string
  image: string
  imageAlt: string
  highlights: FeatureHighlight[]
}

const products: Product[] = [
  {
    value: 'groot-neo',
    icon: <Building2 className="h-4 w-4 shrink-0" />,
    label: 'Groot Neo',
    tagline: 'Neo-Banking Platform',
    title: 'From contract to live digital bank in months, not years.',
    desc: 'Pre-built, pre-integrated modules covering consumer app to settlement engine.',
    href: '/products/groot-neo',
    accent: '#3C53FF',
    image: '/groot-neo-mockup.png',
    imageAlt: 'Groot Neo neo-banking platform mockup',
    highlights: [
      { icon: <Landmark size={18} />, title: 'Core Banking', desc: 'Full ledger, accounts & transaction engine built for regulatory compliance.' },
      { icon: <ShieldCheck size={18} />, title: 'KYC & AML', desc: 'Automated identity verification, AML screening, and regulatory reporting.' },
      { icon: <ArrowLeftRight size={18} />, title: 'Settlement Engine', desc: 'Real-time gross settlement, reconciliation, and multi-currency support.' },
      { icon: <Smartphone size={18} />, title: 'Consumer App', desc: 'White-label mobile and web interface, ready for your brand.' },
    ],
  },
  {
    value: 'groot-pay',
    icon: <Wallet className="h-4 w-4 shrink-0" />,
    label: 'Groot Pay',
    tagline: 'Digital Wallet Infrastructure',
    title: 'White-label wallet. Production-ready from day one.',
    desc: 'Built from the same codebase that powered eSewa at 13M users.',
    href: '/products/groot-pay',
    accent: '#0DFFFF',
    image: '/groot-pay-mockup.png',
    imageAlt: 'Groot Pay digital wallet mockup',
    highlights: [
      { icon: <QrCode size={18} />, title: 'QR Payments', desc: 'Scan-to-pay at any merchant, compatible with national QR standards.' },
      { icon: <ArrowLeftRight size={18} />, title: 'P2P Transfers', desc: 'Instant person-to-person transfers with real-time balance updates.' },
      { icon: <Store size={18} />, title: 'Merchant Hub', desc: 'Onboarding, settlement, and analytics for your merchant network.' },
      { icon: <Globe size={18} />, title: 'Remittance', desc: 'Cross-border money movement with competitive FX and compliance built in.' },
    ],
  },
  {
    value: 'pfm',
    icon: <PieChart className="h-4 w-4 shrink-0" />,
    label: 'PFM',
    tagline: 'Personal Finance Manager',
    title: 'Embedded financial intelligence for your users.',
    desc: 'Designed to increase engagement and lifetime value for digital banking customers.',
    href: '/products/pfm',
    accent: '#8b5cf6',
    image: '/pfm-mockup.png',
    imageAlt: 'Personal Finance Manager mockup',
    highlights: [
      { icon: <PieChart size={18} />, title: 'Spend Analytics', desc: 'Automatic categorisation and visual breakdowns of spending patterns.' },
      { icon: <Calculator size={18} />, title: 'Budget Tools', desc: 'Flexible budget templates with real-time tracking and alerts.' },
      { icon: <Brain size={18} />, title: 'AI Insights', desc: 'Personalised financial coaching powered by transaction intelligence.' },
      { icon: <Target size={18} />, title: 'Goal Tracking', desc: 'Savings goals with progress visualisation and smart nudges.' },
    ],
  },
  {
    value: 'loyalty',
    icon: <Gift className="h-4 w-4 shrink-0" />,
    label: 'Loyalty Engine',
    tagline: 'Points & Rewards Platform',
    title: 'End-to-end loyalty infrastructure at scale.',
    desc: 'Configurable for banks, wallets, and super-apps without rebuilding from scratch.',
    href: '/products/loyalty',
    accent: '#f59e0b',
    image: '/loyalty-mockup.png',
    imageAlt: 'Loyalty Engine app mockup',
    highlights: [
      { icon: <Coins size={18} />, title: 'Points Engine', desc: 'Flexible points issuance, expiry, and redemption logic at any scale.' },
      { icon: <Trophy size={18} />, title: 'Tiered Rewards', desc: 'Multi-tier loyalty programs with automatic tier progression.' },
      { icon: <Tag size={18} />, title: 'Merchant Offers', desc: 'Real-time merchant-funded offers and cashback management.' },
      { icon: <Gift size={18} />, title: 'Gamification', desc: 'Challenges, streaks, and badges to drive daily active usage.' },
    ],
  },
  {
    value: 'merchant-ai',
    icon: <Bot className="h-4 w-4 shrink-0" />,
    label: 'Merchant AI',
    tagline: 'AI-Powered Merchant Tools',
    title: 'Intelligent tools for merchant lifecycle management.',
    desc: 'Built for acquiring banks and payment platforms managing large merchant portfolios.',
    href: '/products/merchant-ai',
    accent: '#10b981',
    image: '/merchant-ai-mockup.png',
    imageAlt: 'Merchant AI mockup',
    highlights: [
      { icon: <UserCheck size={18} />, title: 'Smart Onboarding', desc: 'AI-assisted KYC and document verification for faster merchant activation.' },
      { icon: <AlertTriangle size={18} />, title: 'Risk Scoring', desc: 'Real-time risk assessment and fraud signals across the merchant portfolio.' },
      { icon: <Bot size={18} />, title: 'AI Campaigns', desc: 'Predictive campaign recommendations based on merchant transaction data.' },
      { icon: <TrendingUp size={18} />, title: 'Sales Analytics', desc: 'Portfolio-level dashboards with merchant performance benchmarking.' },
    ],
  },
]

export function ProductsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <h2 className="section-heading text-white">
            Production-ready.<br />
            Not assembled from parts.
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-sm lg:text-right">
            Every product is built from real operational experience — deployed at national scale, not assembled from third-party components.
          </p>
        </div>

        {/* Tabbed products */}
        <Tabs defaultValue={products[0].value}>

          {/* Tab triggers */}
          <TabsList className="flex flex-wrap items-center gap-2 mb-10 border-b border-white/[0.06] pb-6">
            {products.map((p) => (
              <TabsTrigger
                key={p.value}
                value={p.value}
                className="
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  text-white/40 border border-transparent
                  transition-all duration-200 cursor-pointer
                  data-[state=active]:text-white
                  data-[state=active]:border-white/10
                  data-[state=active]:bg-white/[0.05]
                  hover:text-white/70
                "
              >
                {p.icon}
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab panels */}
          {products.map((p) => (
            <TabsContent key={p.value} value={p.value}>
              <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">

                {/* Left — product mockup image */}
                <div className="w-full md:w-1/2 flex-shrink-0 hover:-translate-y-1 transition-transform duration-300">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full rounded-2xl object-contain"
                    style={{ maxHeight: '480px' }}
                  />
                </div>

                {/* Right — content + feature highlights */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">
                      {p.tagline}
                    </p>
                    <h3
                      className="font-bold text-white leading-tight mb-3"
                      style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Feature highlight cards */}
                  <div className="space-y-3">
                    {p.highlights.map((h) => (
                      <div
                        key={h.title}
                        className="flex items-start gap-4 rounded-xl py-4 px-5 border border-white/[0.06] bg-white/[0.02] hover:-translate-y-0.5 transition-transform duration-200"
                      >
                        <div
                          className="flex-shrink-0 p-2 rounded-lg mt-0.5"
                          style={{ background: `${p.accent}14`, color: p.accent }}
                        >
                          {h.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-0.5">{h.title}</h4>
                          <p className="text-xs text-white/45 leading-relaxed">{h.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link to={p.href} className="btn-secondary self-start inline-flex">
                    Explore {p.label} <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link to="/products" className="btn-secondary inline-flex">
            View all products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
