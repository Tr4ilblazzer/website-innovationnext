import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Link as LinkIcon, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
      opacity: Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2))),
    }
  }

  const isRelated = (id: number) => {
    if (!activeNodeId) return false
    return timelineData.find(i => i.id === activeNodeId)?.relatedIds.includes(id) ?? false
  }

  const statusStyles = (s: TimelineItem['status']) =>
    s === 'completed'  ? 'border-[#3C53FF] bg-[#3C53FF]/20 text-[#3C53FF]' :
    s === 'in-progress'? 'border-[#0DFFFF] bg-[#0DFFFF]/10 text-[#0DFFFF]' :
                         'border-white/30 bg-white/5 text-white/50'

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
        {/* Centre orb */}
        <div className="absolute w-16 h-16 rounded-full flex items-center justify-center z-10"
          style={{ background: 'linear-gradient(135deg,#3C53FF,#0DFFFF)' }}>
          <div className="absolute w-20 h-20 rounded-full border border-[#3C53FF]/30 animate-ping opacity-60" />
          <div className="absolute w-24 h-24 rounded-full border border-[#0DFFFF]/20 animate-ping opacity-40" style={{ animationDelay: '0.5s' }} />
          <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md" />
        </div>

        {/* Orbit ring */}
        <div className="absolute w-[420px] h-[420px] rounded-full border border-white/[0.07]" />

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
              className="absolute transition-all duration-700 cursor-pointer"
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
                  style={{ background: 'radial-gradient(circle,rgba(60,83,255,0.25) 0%,transparent 70%)', width: 60, height: 60, left: -10, top: -10 }} />
              )}

              {/* Node circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isExpanded
                  ? 'scale-150 bg-[#3C53FF] border-[#3C53FF] text-black shadow-[0_0_20px_rgba(60,83,255,0.6)]'
                  : related
                  ? 'bg-[#3C53FF]/20 border-[#3C53FF] text-[#3C53FF] animate-pulse'
                  : 'bg-[#040404] border-white/30 text-white/70'
              }`}>
                <Icon size={16} />
              </div>

              {/* Label */}
              <div className={`absolute top-12 whitespace-nowrap text-[11px] font-semibold tracking-wider text-center transition-all duration-300 left-1/2 -translate-x-1/2 ${
                isExpanded ? 'text-white scale-110' : 'text-white/60'
              }`}>
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-[#0d0d0d]/95 backdrop-blur-xl border-[#3C53FF]/25 shadow-[0_0_40px_rgba(60,83,255,0.15)] overflow-visible">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#3C53FF]/50" />
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex justify-between items-center mb-1">
                      <Badge className={`text-[10px] px-2 py-0.5 border ${statusStyles(item.status)}`}>
                        {item.status === 'completed' ? 'LIVE' : item.status === 'in-progress' ? 'IN PROGRESS' : 'PLANNED'}
                      </Badge>
                      <span className="text-[10px] font-mono text-white/40">{item.date}</span>
                    </div>
                    <CardTitle className="text-sm text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-[11px] text-white/70 leading-relaxed px-4 pb-4">
                    <p>{item.content}</p>

                    {/* Energy bar */}
                    <div className="mt-4 pt-3 border-t border-white/[0.06]">
                      <div className="flex justify-between items-center text-[10px] mb-1.5">
                        <span className="flex items-center gap-1 text-white/50"><Zap size={9} />Maturity</span>
                        <span className="font-mono text-white/50">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.energy}%`, background: 'linear-gradient(90deg,#3C53FF,#0DFFFF)' }} />
                      </div>
                    </div>

                    {/* Related nodes */}
                    {item.relatedIds.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/[0.06]">
                        <div className="flex items-center gap-1 mb-2">
                          <LinkIcon size={9} className="text-white/40" />
                          <span className="text-[10px] uppercase tracking-wider text-white/40">Connected</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map(rid => {
                            const rel = timelineData.find(i => i.id === rid)
                            return (
                              <Button
                                key={rid}
                                variant="outline"
                                size="sm"
                                className="h-6 px-2 text-[10px] border-white/15 text-white/60 hover:text-white hover:border-[#3C53FF]/50"
                                onClick={e => { e.stopPropagation(); toggleItem(rid) }}
                              >
                                {rel?.title}<ArrowRight size={8} className="ml-1" />
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    )}
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
