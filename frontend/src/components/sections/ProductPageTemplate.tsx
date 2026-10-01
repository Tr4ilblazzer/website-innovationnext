import { ClosingCta } from '@/components/sections/ClosingCta'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { InsightsSection } from '@/components/sections/InsightsSection'

const PRODUCT_IMAGES: Record<string, string> = {
  '/products/groot-neo': '/groot-neo-mockup.png',
  '/products/groot-pay': '/groot-pay-mockup.png',
  '/products/pfm': '/pfm-mockup.png',
  '/products/loyalty': '/loyalty-mockup.png',
  '/products/onboarding': '/merchant-ai-mockup.png',
  '/products/allxtract': '/allxtract-mockup.svg',
}

interface Feature { title: string; desc: string }
interface RelatedProduct { name: string; href: string; desc: string }
interface Stat { value: string; label: string }

interface ProductPageTemplateProps {
  tag: string
  headline: string
  headlineAccent: string
  quote: string
  description: string
  accentColor?: string
  mockup: string
  mockupAlt: string
  mockupHeight?: string
  stats: Stat[]
  featuresSubheadline: string
  features: Feature[]
  capabilitiesSubtext: string
  capabilities: string[]
  relatedProducts?: RelatedProduct[]
  insightsCategory: string
}

export function ProductPageTemplate({
  tag, headline, headlineAccent, quote, description,
  accentColor = '#0040C1',
  mockup, mockupAlt, mockupHeight = 'h-[500px]',
  stats, featuresSubheadline, features,
  capabilitiesSubtext, capabilities,
  relatedProducts, insightsCategory,
}: ProductPageTemplateProps) {
  const ACCENT = accentColor
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: ACCENT }}>
                {tag}
              </p>
              <h1 className="hero-heading text-[#0A0A0A] mb-5">
                {headline}
                <br />
                <span className="gradient-text">{headlineAccent}</span>
              </h1>
              <p className="text-[#0A0A0A]/40 italic text-lg leading-relaxed mb-4">
                &ldquo;{quote}&rdquo;
              </p>
              <p className="text-[#0A0A0A]/55 leading-relaxed mb-8">
                {description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-secondary">Request a Demo</Link>
              </div>
            </div>
            <div className="flex items-center justify-center min-h-[520px]">
              <img
                src={mockup}
                alt={mockupAlt}
                className={`${mockupHeight} w-auto object-contain drop-shadow-2xl`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="bg-[#F7F7F7] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-medium mb-2" style={{ color: ACCENT }}>{s.value}</div>
              <div className="text-sm text-[#575757]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 grid md:grid-cols-2 md:items-end gap-6">
            <h2 className="section-heading text-[#0A0A0A]">
              What&apos;s <span className="section-accent">included.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">{featuresSubheadline}</p>
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

      <TrustedBySection />
      <InsightsSection category={insightsCategory} />

      {/* ── Capabilities + Related + CTA ── */}
      <section className="bg-[#FAFAFA] py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-14">
          <div className="max-w-3xl text-center">
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>Capabilities</p>
            <h2 className="text-3xl md:text-[38px] md:leading-[46px] font-medium text-[#0A0A0A] mb-4">
              Built for <span style={{ color: ACCENT }}>production.</span>
            </h2>
            <p className="text-base leading-6 text-[#575757]">
              {capabilitiesSubtext}
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

          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mb-20">
              <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>Related Products</p>
              <h2 className="section-heading text-[#0A0A0A] mb-10">
                Explore More <span className="section-accent">Technology Solutions</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProducts.map(p => (
                  <Link key={p.name} href={p.href} className="group block">
                    <div className="h-[265px] rounded-2xl bg-[#E5E5E5] flex items-center justify-center overflow-hidden mb-6">
                      {PRODUCT_IMAGES[p.href] && (
                        <img
                          src={PRODUCT_IMAGES[p.href]}
                          alt={p.name}
                          className="h-[85%] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="px-2.5">
                      <div className="text-2xl font-medium text-[#0A0A0A] mb-2">{p.name}</div>
                      <div className="text-base text-[#0A0A0A]/50">{p.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <ClosingCta />
        </div>
      </section>
    </>
  )
}
