const ACCENT = '#0072BC'

interface GlassLocationCardProps {
  city: string
  country: string
  flag: string
  role: string
  desc?: string
  image: string
  badge?: string
  height?: string
  className?: string
}

export function GlassLocationCard({
  city,
  country,
  flag,
  role,
  desc,
  image,
  badge,
  height = 'h-[400px]',
  className = '',
}: GlassLocationCardProps) {
  return (
    <div className={`relative rounded-3xl overflow-hidden ${height} ${className}`}>
      <img
        src={image}
        alt={city}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-x-4 bottom-4 rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.76)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '1px solid rgba(255,255,255,0.6)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">{flag}</span>
          {badge && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
              style={{ background: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
            >
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-xl font-black text-[#0A0A0A] mb-1">{city}</h3>
        <p className="text-[#0A0A0A]/40 text-xs mb-2">{country} · {role}</p>
        {desc && <p className="text-[#0A0A0A]/55 text-sm leading-relaxed">{desc}</p>}
      </div>
    </div>
  )
}
