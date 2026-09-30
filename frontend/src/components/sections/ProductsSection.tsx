import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { ArrowRight, CreditCard, Smartphone } from 'lucide-react'

const ACCENT = '#0040C1'
const POPPINS = { fontFamily: "'Poppins', 'Public Sans', sans-serif" }


function PhoneShowcase({ image, alt, height = 478 }: { image: string; alt: string; height?: number }) {
  return (
    <div className="relative flex items-center justify-center w-full select-none" style={{ height }}>
      <div
        aria-hidden
        className="absolute right-0 bottom-0 w-[55%] aspect-square rounded-full"
        style={{ background: '#3F5EB8', mixBlendMode: 'multiply', filter: 'blur(52px)', opacity: 0.6 }}
      />
      <img
        src={image}
        alt={alt}
        className="relative h-full w-auto max-w-full object-contain"
        style={{ filter: 'drop-shadow(0px 6px 14px rgba(0,0,0,0.6))' }}
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
    title: 'A complete digital bank in one pre-integrated product.',
    desc: 'Every component needed to launch a digital bank, delivered as one product — for banks, digital banks, and fintechs.',
    href: '/products/groot-neo',
    accent: '#0040C1',
    image: '/groot-neo-mockup.png',
    imageAlt: 'Groot Neo neo-banking platform mockup',
    showcaseHeight: 478,
    highlights: [
      { title: 'Core Mobile Banking', desc: 'Native iOS and Android apps — accounts, statements, and alerts.' },
      { title: 'AI Intelligence Layer', desc: 'Fraud AI, PFM, campaign intelligence, and an AI digital assistant.' },
      { title: 'Settlement & Reconciliation', desc: 'A multi-rail, multi-currency settlement engine.' },
      { title: 'Merchant, Agent & KYC Onboarding', desc: 'Automated KYC and KYB, powered by the Onboarding Platform.' },
    ],
  },
  {
    value: 'groot-pay',
    label: 'Groot Pay',
    tagline: 'Digital Wallet Platform',
    title: 'The wallet engine — standalone or embedded.',
    desc: 'Live at national scale in Nepal, with a Mini-App SDK so partners list their own services in the wallet.',
    href: '/products/groot-pay',
    accent: '#0DFFFF',
    image: '/groot-pay-mockup.png',
    imageAlt: 'Groot Pay digital wallet mockup',
    highlights: [
      { title: 'P2P & Merchant Payments', desc: 'Transfers by mobile number, QR, or NFC, and QR, NFC, or gateway payments.' },
      { title: 'Bill Pay & Top-Up', desc: 'Utilities, insurance, government fees, telecoms, and airtime.' },
      { title: 'International Remittance', desc: 'Receive from 20+ global corridors.' },
      { title: 'Mini-App Framework & SDK', desc: 'Partners build and publish their own services into the wallet.' },
    ],
  },
  {
    value: 'pfm',
    label: 'PFM',
    tagline: 'Personal Finance Manager',
    title: 'Money intelligence for any bank or wallet.',
    desc: 'An AI-powered module that turns raw transaction data into personalised financial insights.',
    href: '/products/pfm',
    accent: '#8b5cf6',
    image: '/pfm-mockup.png',
    imageAlt: 'Personal Finance Manager mockup',
    highlights: [
      { title: 'Transaction Categorisation', desc: 'ML-based classification across 10+ spend categories.' },
      { title: 'Budget Management', desc: 'User-defined budgets with real-time breach alerts.' },
      { title: 'Cash-Flow Forecasting', desc: 'A 7–30 day forward-looking cash position.' },
      { title: 'Savings Goal Tracking', desc: 'Goal creation with progress visualisation.' },
    ],
  },
  {
    value: 'loyalty',
    label: 'Loyalty Engine',
    tagline: 'Loyalty & Rewards Platform',
    title: 'Configurable loyalty for banks, wallets, and merchant networks.',
    desc: 'An API-first platform — rules and tiers set in an admin console, not code.',
    href: '/products/loyalty',
    accent: '#f59e0b',
    image: '/loyalty-mockup.png',
    imageAlt: 'Loyalty Engine app mockup',
    highlights: [
      { title: 'Points Accumulation', desc: 'Transaction-based, category-based, and merchant-specific rules.' },
      { title: 'Tier Management', desc: 'Fully configurable tiers, from Bronze to Platinum or your own.' },
      { title: 'Campaign Engine', desc: 'Time-based, segment-based, and event-triggered promotions.' },
      { title: 'Reward Redemption', desc: 'Cashback, vouchers, airtime, merchant offers, and donations.' },
    ],
  },
  {
    value: 'onboarding',
    label: 'Onboarding Platform',
    tagline: 'KYC · KYB · Video KYC',
    title: 'Onboard anyone, set by your risk rules.',
    desc: 'Configurable flows from instant AI checks to Video KYC — live for merchant onboarding at Boost (Axiata), Malaysia.',
    href: '/products/onboarding',
    accent: '#10b981',
    image: '/merchant-ai-mockup.png',
    imageAlt: 'Onboarding Platform mockup',
    highlights: [
      { title: 'Document Intelligence', desc: 'Classification, OCR, field extraction, and authenticity checks.' },
      { title: 'Business Verification', desc: 'Registry validation, plus director and beneficial-owner checks.' },
      { title: 'Risk-Based Step-Up', desc: 'Automated for low risk; Video KYC where rules or regulators require it.' },
      { title: 'No-Code Flow Builder', desc: 'Configure flows per country, entity type, and risk tier.' },
    ],
  },
]

export function ProductsSection() {
  const [active, setActive] = useState(products[0].value)

  return (
    <section className="py-[60px] relative">
      <div className="max-w-[1213px] mx-auto px-6 flex flex-col gap-[60px]">

        {/* Title row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-[99px]">
          <h2
            className="font-medium text-[28px] leading-9 md:text-[38px] md:leading-[46px] max-w-[511px]"
            style={{ ...POPPINS, color: ACCENT }}
          >
            Production-ready. Not assembled from parts.
          </h2>
          <p className="text-lg leading-[26px] font-medium text-[#575757] max-w-[592px]">
            Every product is built from real operational experience — deployed at national scale, not assembled from third-party components.
          </p>
        </div>

        <Tabs value={active} onValueChange={setActive} className="flex flex-col gap-[30px]">

          {/* Product list */}
          <TabsList className="flex flex-wrap items-center gap-5">
            {products.map((p, i) => {
              const isActive = p.value === active
              const Icon = i === 0 ? Smartphone : CreditCard
              return (
                <TabsTrigger
                  key={p.value}
                  value={p.value}
                  className="flex items-center gap-1.5 px-4 py-2.5 h-[46px] text-lg leading-[26px] font-medium cursor-pointer transition-colors duration-200 hover:text-[#0040C1]"
                  style={isActive
                    ? { color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 24, padding: '10px 20px' }
                    : { color: '#363636', border: '1px solid transparent', borderRadius: 20 }
                  }
                >
                  <Icon size={20} strokeWidth={1.5} />
                  {p.label}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <div className="h-px w-full bg-[#E4E4E4]" />

          {/* Panels */}
          {products.map((p) => (
            <TabsContent key={p.value} value={p.value}>
              <div className="flex flex-col-reverse lg:flex-row lg:justify-end items-center gap-10 lg:gap-[60px]">

                {/* Details card */}
                <div className="w-full lg:w-[752px] flex-none flex flex-col gap-5 p-6 rounded-[10px] bg-[#FAFAFA]">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <p className="text-xs leading-[18px] font-medium uppercase" style={{ color: ACCENT }}>
                        {p.tagline}
                      </p>
                      <div className="flex flex-col gap-3">
                        <h3 className="font-medium text-[28px] leading-8 text-[#040404]" style={POPPINS}>
                          {p.title}
                        </h3>
                        <p className="text-lg leading-[26px] text-[#575757]">{p.desc}</p>
                      </div>
                    </div>
                    <Link
                      to={p.href}
                      className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-3xl text-xs leading-[18px] font-medium transition-colors text-[#0040C1] border border-[#0040C1] hover:bg-[#0040C1] hover:text-white"
                    >
                      Explore {p.label} <ArrowRight size={20} strokeWidth={1.5} />
                    </Link>
                  </div>

                  <div className="h-px w-full bg-[#E4E4E4]" />

                  <div className="flex flex-col gap-4">
                    <p className="text-xs leading-[18px] font-medium" style={{ color: ACCENT }}>Core Feature</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {p.highlights.map((h) => (
                        <div key={h.title} className="flex flex-col gap-2.5 p-4 rounded-[10px] bg-[#FDFDFD]">
                          <h4 className="text-base leading-6 font-medium text-[#040404]">{h.title}</h4>
                          <p className="text-xs leading-4 text-[#363636]">{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mockup */}
                <div className="w-full lg:w-[400px] flex-none">
                  <PhoneShowcase image={p.image} alt={p.imageAlt} height={p.showcaseHeight} />
                </div>

              </div>
            </TabsContent>
          ))}
        </Tabs>

      </div>
    </section>
  )
}
