import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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

function BentoItem({ className = '', children, accent = '#0040C1' }: BentoItemProps) {
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
      className={`bento-item ${className}`}
      style={{ '--bento-accent': accent } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

interface CyberneticBentoGridProps {
  domains: Domain[]
}

export function CyberneticBentoGrid({ domains }: CyberneticBentoGridProps) {
  // Order matters for grid auto-placement (4 cols × 3 rows):
  // fintech (2×2) · e-gov (1×1) · ai (1×2) · consulting (1×1) · bespoke (2×1) · bi (1×1) · managed (1×1)
  const [fintech, egov, ai, consulting, bespoke, bi, managed] = domains

  const small = (d: Domain) => (
    <BentoItem className="relative" accent={d.accent}>
      <img src={d.image} alt={d.label} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">{d.short}</span>
        <div>
          <h3 className="text-base font-bold text-white leading-snug mb-3">{d.label}</h3>
          <Link to={d.href} className="inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors">
            Explore <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </BentoItem>
  )

  return (
    <div className="bento-grid">

      {/* Fintech — large hero card */}
      <BentoItem className="col-span-2 row-span-2 relative" accent={fintech.accent}>
        <img src={fintech.image} alt={fintech.label} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="relative z-10 h-full flex flex-col justify-between p-7">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">{fintech.short}</span>
          <div>
            <h3 className="text-2xl font-bold text-white leading-snug mb-2">{fintech.label}</h3>
            <p className="text-white/55 text-sm leading-relaxed mb-5">{fintech.desc}</p>
            <Link to={fintech.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors">
              Explore <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </BentoItem>

      {small(egov)}

      {/* AI/ML — tall */}
      <BentoItem className="row-span-2 relative" accent={ai.accent}>
        <img src={ai.image} alt={ai.label} className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">{ai.short}</span>
          <div>
            <h3 className="text-base font-bold text-white leading-snug mb-2">{ai.label}</h3>
            <p className="text-white/55 text-xs leading-relaxed mb-3">{ai.desc}</p>
            <Link to={ai.href} className="inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors">
              Explore <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </BentoItem>

      {small(consulting)}

      {/* Bespoke Software — wide */}
      <BentoItem className="col-span-2 relative" accent={bespoke.accent}>
        <img src={bespoke.image} alt={bespoke.label} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">{bespoke.short}</span>
          <div>
            <h3 className="text-base font-bold text-white leading-snug mb-3">{bespoke.label}</h3>
            <Link to={bespoke.href} className="inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors">
              Explore <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </BentoItem>

      {small(bi)}
      {small(managed)}

    </div>
  )
}
