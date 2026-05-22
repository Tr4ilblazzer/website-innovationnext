import React from 'react'
import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'

interface GlassBlogCardProps {
  title?: string
  excerpt?: string
  image?: string
  author?: { name: string; avatar?: string }
  date?: string
  readTime?: string
  tags?: string[]
  accentColor?: string
  className?: string
  onClick?: () => void
}

export function GlassBlogCard({
  title = 'The Future of Digital Infrastructure',
  excerpt = 'How production-grade fintech platforms are reshaping financial services across emerging markets.',
  image = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  author = { name: 'Innovation Next Team' },
  date = 'Apr 2026',
  readTime = '5 min read',
  tags = ['Fintech'],
  accentColor = '#0072BC',
  className,
  onClick,
}: GlassBlogCardProps) {
  const ACCENT = accentColor
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-3xl overflow-hidden cursor-pointer group h-[420px]',
        className
      )}
    >
      {/* Background image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Glass panel */}
      <div
        className="absolute inset-x-4 bottom-4 rounded-2xl p-5 transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.76)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '1px solid rgba(255,255,255,0.6)',
        }}
      >
        {/* Category + date */}
        <div className="flex items-center gap-2 mb-2">
          {tags?.map((tag, i) => (
            <span key={i} className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: ACCENT }}>
              {tag}
            </span>
          ))}
          <span className="text-[10px] text-[#0A0A0A]/35">· {date}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#0A0A0A] leading-snug mb-1.5 line-clamp-2 transition-colors" style={{ ['--hover-color' as string]: ACCENT } as React.CSSProperties}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = '')}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-[#0A0A0A]/55 leading-relaxed line-clamp-2 mb-3">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#0A0A0A]/50">{author.name}</span>
          <div className="flex items-center gap-1 text-[11px] text-[#0A0A0A]/35">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
