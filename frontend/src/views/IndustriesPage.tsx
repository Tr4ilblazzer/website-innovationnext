'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ClosingCta } from '@/components/sections/ClosingCta'

const industries = [
  {
    id: 'banking-finance',
    span: 'lg:col-span-4',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80',
    imageAlt: 'Paying by card on a laptop',
    title: 'Banking & Finance',
    desc: 'Banks, wallet providers and fintechs. We cover core mobile banking, loyalty and onboarding, built on our own products.',
    links: [
      { label: 'Digital Financial Services', href: '/solutions/digital-financial-services' },
      { label: 'Groot Neo', href: '/products/groot-neo' },
      { label: 'Groot Pay', href: '/products/groot-pay' },
      { label: 'PFM', href: '/products/pfm' },
      { label: 'Loyalty Engine', href: '/products/loyalty' },
    ],
  },
  {
    id: 'hospitality-retail',
    span: 'lg:col-span-2',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80',
    imageAlt: 'Restaurant dining room',
    title: 'Hospitality & Retail',
    desc: 'Restaurant, cafe and retail groups — customer reviews, messages and complaints in one inbox, with tickets and SLAs.',
    links: [{ label: 'Summa', href: '/products/summa' }],
  },
  {
    id: 'e-governance',
    span: 'lg:col-span-2',
    image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1600&q=80',
    imageAlt: 'Government chamber',
    title: 'E-Governance & Digital Government',
    desc: 'Citizen super-apps, governance monitoring, smart infrastructure, and digital revenue collection, across seven live national deployments.',
    links: [{ label: 'E-Governance', href: '/solutions/e-governance' }],
  },
  {
    id: 'enterprise',
    span: 'lg:col-span-4',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
    imageAlt: 'Office towers seen from below',
    title: 'Enterprise',
    desc: 'Custom platforms, data and AI for large organisations — built to the standard of live national systems, with SLA-governed managed services.',
    links: [
      { label: 'Bespoke Software Development', href: '/solutions/bespoke-software' },
      { label: 'BI & Data Solutions', href: '/solutions/bi-data' },
      { label: 'Managed Services', href: '/solutions/managed-services' },
    ],
  },
]

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-white pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="hero-heading gradient-text mb-5">Industries</h1>
          <p className="text-[#0A0A0A]/65 leading-relaxed max-w-3xl mx-auto">
            We work with banks and financial institutions, government bodies, hospitality and retail groups, and large enterprises.
          </p>
        </div>
      </section>

      <section className="bg-white pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
            {industries.map(i => (
              <article
                key={i.id}
                id={i.id}
                className={`group relative isolate flex min-h-[26rem] scroll-mt-28 flex-col justify-end overflow-hidden rounded-3xl bg-[#040404] ${i.span}`}
              >
                <Image
                  src={i.image}
                  alt={i.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div
                  className="relative z-10 m-3 rounded-2xl p-6 md:p-7 text-white backdrop-blur-xl"
                  style={{ background: 'rgba(4,4,4,0.45)', border: '1px solid rgba(255,255,255,0.18)' }}
                >
                  <h2 className="text-xl font-medium tracking-tight">{i.title}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">{i.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {i.links.map(l => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/70 text-white text-xs font-medium px-3.5 py-1.5 transition-colors hover:bg-white hover:text-[#0A4FD6]"
                      >
                        {l.label} <ArrowRight size={12} />
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <ClosingCta />
        </div>
      </section>
    </>
  )
}
