import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ProductFeatureCardProps {
  name: string
  tagline: string
  desc: string
  href: string
  accent: string
  image: string
  features: string[]
}

export function ProductFeatureCard({ name, tagline, desc, href, accent, image, features }: ProductFeatureCardProps) {
  return (
    <Link
      to={href}
      className="glass-card overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300"
    >
      {/* Mockup image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay to blend into card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/30 to-transparent" />

        {/* Accent pill on image */}
        <div
          className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ background: `${accent}20`, border: `1px solid ${accent}40`, color: accent }}
        >
          {tagline}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-black text-white group-hover:text-[#0072BC] transition-colors">
            {name}
          </h3>
          <ArrowRight
            size={16}
            className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5"
          />
        </div>

        <p className="text-sm text-white/45 leading-relaxed flex-1">{desc}</p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {features.map(f => (
            <span
              key={f}
              className="text-[11px] px-2.5 py-0.5 rounded-full"
              style={{ background: `${accent}08`, border: `1px solid ${accent}20`, color: `${accent}cc` }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

interface FeaturedProductProps {
  name: string
  tagline: string
  desc: string
  href: string
  accent: string
  image: string
  features: { icon: React.ReactNode; label: string; sub: string }[]
}

export function FeaturedProduct({ name, tagline, desc, href, accent, image, features }: FeaturedProductProps) {
  return (
    <div className="glass-card overflow-hidden grid md:grid-cols-2 group">
      {/* Image side */}
      <div className="relative overflow-hidden min-h-[280px]">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/80" />
      </div>

      {/* Details side */}
      <div className="p-8 flex flex-col justify-center gap-5">
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: accent }}
          >
            {tagline}
          </div>
          <h3 className="text-2xl font-black text-white mb-2">{name}</h3>
          <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
        </div>

        <div className="space-y-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3 px-4 rounded-xl transition-colors"
              style={{ background: `${accent}06`, border: `1px solid ${accent}15` }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent}15`, color: accent }}
              >
                {f.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{f.label}</div>
                <div className="text-xs text-white/40">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <Link
          to={href}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color: accent }}
        >
          Explore {name} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
