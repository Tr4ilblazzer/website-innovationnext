import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface TabContent {
  title: string
  description: string
  stats: { value: string; label: string }[]
  href: string
  buttonText: string
  imageSrc: string
  imageAlt: string
  accent: string
}

interface Tab {
  value: string
  icon: ReactNode
  label: string
  content: TabContent
}

interface Feature108Props {
  tabs: Tab[]
}

export function Feature108({ tabs }: Feature108Props) {
  return (
    <Tabs defaultValue={tabs[0].value}>
      {/* Tab triggers */}
      <TabsList className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="
              flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
              text-white/45 border border-transparent
              transition-all duration-200
              data-[state=active]:text-white
              data-[state=active]:border-white/15
              data-[state=active]:bg-white/[0.06]
              hover:text-white/70
            "
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab panels */}
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="glass-card overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left — content */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                {/* Accent line */}
                <div
                  className="w-10 h-0.5 rounded-full mb-7"
                  style={{ background: `linear-gradient(90deg, ${tab.content.accent}, transparent)` }}
                />

                <h3 className="section-heading text-white mb-5 !text-[clamp(1.75rem,3vw,2.6rem)]">
                  {tab.content.title}
                </h3>

                <p className="text-white/50 text-base leading-relaxed mb-8">
                  {tab.content.description}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mb-10">
                  {tab.content.stats.map((s) => (
                    <div key={s.label}>
                      <div
                        className="text-2xl font-black leading-none mb-0.5"
                        style={{ color: tab.content.accent }}
                      >
                        {s.value}
                      </div>
                      <div className="text-xs text-white/35 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  to={tab.content.href}
                  className="btn-secondary self-start"
                >
                  {tab.content.buttonText} <ArrowRight size={14} />
                </Link>
              </div>

              {/* Right — image */}
              <div className="relative min-h-72 lg:min-h-0 overflow-hidden">
                <img
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                {/* Left fade blend */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)',
                  }}
                />
                {/* Accent glow */}
                <div
                  className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none"
                  style={{ background: tab.content.accent }}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
