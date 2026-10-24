'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Domain {
  label: string
  short: string
  href: string
  desc: string
  accent: string
  image: string
}

interface BentoItemProps {
  className?: string
  children: React.ReactNode
  accent?: string
}

function BentoItem({ className = '', children, accent = '#0A4FD6' }: BentoItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const item = itemRef.current
    if (!item) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect()
      item.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      item.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }
    item.addEventListener('mousemove', handleMouseMove)
    return () => item.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={itemRef}
      className={`bento-item group ${className}`}
      style={{ '--bento-accent': accent } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

interface CyberneticBentoGridProps {
  domains: Domain[]
}

// Frosted panel shared with the Industries cards; the whole card is clickable via the stretched link.
export function DomainCardBody({ d, size }: { d: Domain; size: 'sm' | 'md' | 'lg' }) {
  return (
    <>
      <img
        src={d.image}
        alt={d.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div
        className={`absolute inset-x-3 bottom-3 z-10 rounded-2xl text-white backdrop-blur-xl ${size === 'sm' ? 'p-4' : 'p-5 md:p-6'}`}
        style={{ background: 'rgba(4,4,4,0.45)', border: '1px solid rgba(255,255,255,0.18)' }}
      >
        <h3 className={`font-medium tracking-tight leading-snug ${size === 'lg' ? 'text-2xl' : 'text-base'}`}>{d.label}</h3>
        {size !== 'sm' && <p className="mt-2 text-xs md:text-sm leading-relaxed text-white/80">{d.desc}</p>}
        <Link
          href={d.href}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/90 hover:text-white transition-colors after:absolute after:inset-0 after:content-['']"
        >
          Explore <ArrowRight size={12} />
        </Link>
      </div>
    </>
  )
}

export function CyberneticBentoGrid({ domains }: CyberneticBentoGridProps) {
  // Order matters for grid auto-placement (4 cols × 3 rows):
  // fintech (2×2) · e-gov (1×1) · ai (1×2) · consulting (1×1) · bespoke (2×1) · bi (1×1) · managed (1×1)
  const [fintech, egov, ai, consulting, bespoke, bi, managed] = domains

  const card = (d: Domain, size: 'sm' | 'md' | 'lg', className = '') => (
    <BentoItem className={`relative ${className}`} accent={d.accent}>
      <DomainCardBody d={d} size={size} />
    </BentoItem>
  )

  return (
    <div className="bento-grid">
      {card(fintech, 'lg', 'col-span-2 row-span-2')}
      {card(egov, 'sm')}
      {card(ai, 'md', 'row-span-2')}
      {card(consulting, 'sm')}
      {card(bespoke, 'sm', 'col-span-2')}
      {card(bi, 'sm')}
      {card(managed, 'sm')}
    </div>
  )
}
