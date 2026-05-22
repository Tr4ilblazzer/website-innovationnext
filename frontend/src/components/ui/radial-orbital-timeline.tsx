import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ElementType
  relatedIds: number[]
  status: 'completed' | 'in-progress' | 'pending'
  energy: number
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle]   = useState(0)
  const [autoRotate, setAutoRotate]         = useState(true)
  const [pulseEffect, setPulseEffect]       = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId]     = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef     = useRef<HTMLDivElement>(null)
  const nodeRefs     = useRef<Record<number, HTMLDivElement | null>>({})

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const toggleItem = (id: number) => {
    setExpandedItems(prev => {
      const next = Object.fromEntries(Object.keys(prev).map(k => [k, false]))
      next[id] = !prev[id]
      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const related: Record<number, boolean> = {}
        const item = timelineData.find(i => i.id === id)
        item?.relatedIds.forEach(r => { related[r] = true })
        setPulseEffect(related)
        // Rotate so the clicked node comes to the top
        const idx = timelineData.findIndex(i => i.id === id)
        setRotationAngle(270 - (idx / timelineData.length) * 360)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }
      return next
    })
  }

  useEffect(() => {
    if (!autoRotate) return
    const t = setInterval(() => setRotationAngle(a => Number(((a + 0.3) % 360).toFixed(3))), 50)
    return () => clearInterval(t)
  }, [autoRotate])

  const calcPos = (index: number) => {
    const angle  = ((index / timelineData.length) * 360 + rotationAngle) % 360
    const rad    = (angle * Math.PI) / 180
    const radius = 210
    return {
      x:       radius * Math.cos(rad),
      y:       radius * Math.sin(rad),
      zIndex:  Math.round(100 + 50 * Math.cos(rad)),
      opacity: 1,
    }
  }

  const isRelated = (id: number) => {
    if (!activeNodeId) return false
    return timelineData.find(i => i.id === activeNodeId)?.relatedIds.includes(id) ?? false
  }

return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="w-full h-[600px] flex items-center justify-center relative overflow-hidden"
    >
      <div
        ref={orbitRef}
        className="absolute w-full h-full flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        {/* Radial glow */}
        <div className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,114,188,0.12) 0%, transparent 70%)' }} />

        {/* Centre orb */}
        <div className="absolute w-16 h-16 rounded-full flex items-center justify-center z-10"
          style={{ background: 'linear-gradient(135deg,#0072BC,#0DFFFF)' }}>
          <div className="absolute w-20 h-20 rounded-full border border-[#0072BC]/30 animate-ping opacity-60" />
          <div className="absolute w-24 h-24 rounded-full border border-[#0DFFFF]/20 animate-ping opacity-40" style={{ animationDelay: '0.5s' }} />
          <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md" />
        </div>

        {/* Outer ring — dotted */}
        <div className="absolute w-[560px] h-[560px] rounded-full border border-dashed border-[#0072BC]/25" />
        {/* Inner orbit ring — dotted */}
        <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-[#0072BC]/50" />
        {/* Decorative inner ring — dotted */}
        <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-[#0072BC]/30" />

        {timelineData.map((item, index) => {
          const pos        = calcPos(index)
          const isExpanded = expandedItems[item.id]
          const related    = isRelated(item.id)
          const pulsing    = pulseEffect[item.id]
          const Icon       = item.icon

          return (
            <div
              key={item.id}
              ref={el => { nodeRefs.current[item.id] = el }}
              className="absolute transition-all duration-700 cursor-pointer group"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex:    isExpanded ? 200 : pos.zIndex,
                opacity:   isExpanded ? 1   : pos.opacity,
              }}
              onClick={e => { e.stopPropagation(); toggleItem(item.id) }}
            >
              {/* Pulse halo */}
              {pulsing && (
                <div className="absolute inset-0 rounded-full animate-pulse"
                  style={{ background: 'radial-gradient(circle,rgba(0,114,188,0.25) 0%,transparent 70%)', width: 80, height: 80, left: -10, top: -10 }} />
              )}

              {/* Node circle */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0072BC] group-hover:border-[#0072BC] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(0,114,188,0.35)] ${
                isExpanded
                  ? 'scale-125 bg-[#0072BC] border-[#0072BC] text-white shadow-[0_0_24px_rgba(0,114,188,0.5)]'
                  : related
                  ? 'bg-[#0072BC]/20 border-[#0072BC] text-[#0072BC] animate-pulse'
                  : 'bg-[#EBF5FF] border-[#0072BC]/60 text-[#0072BC]'
              }`}>
                <Icon size={22} />
              </div>

              {/* Label */}
              <div className={`absolute top-16 whitespace-nowrap text-[11px] font-semibold tracking-wider text-center transition-all duration-300 left-1/2 -translate-x-1/2 ${
                isExpanded ? 'text-[#0072BC] scale-110' : 'text-[#0A0A0A]/50'
              }`}>
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-white border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.10)] overflow-visible">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#0072BC]/40" />
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono text-[#0A0A0A]/35">{item.date}</span>
                    </div>
                    <CardTitle className="text-sm text-[#0A0A0A]">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-[11px] text-[#0A0A0A]/55 leading-relaxed px-4 pb-4">
                    <p>{item.content}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
