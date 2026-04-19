import { Warp } from '@paper-design/shaders-react'

interface FeatureItem {
  title: string
  description: string
}

interface FeatureShaderCardsProps {
  features: FeatureItem[]
}

const SHADER_CONFIGS = [
  {
    proportion: 0.32,
    softness: 0.9,
    distortion: 0.14,
    swirl: 0.65,
    swirlIterations: 9,
    shape: 'checks' as const,
    shapeScale: 0.09,
    colors: ['hsl(232, 100%, 12%)', 'hsl(232, 100%, 30%)', 'hsl(240, 90%, 20%)', 'hsl(232, 100%, 62%)'],
  },
  {
    proportion: 0.38,
    softness: 1.1,
    distortion: 0.18,
    swirl: 0.85,
    swirlIterations: 12,
    shape: 'stripes' as const,
    shapeScale: 0.11,
    colors: ['hsl(240, 80%, 14%)', 'hsl(232, 100%, 35%)', 'hsl(235, 90%, 24%)', 'hsl(180, 100%, 52%)'],
  },
  {
    proportion: 0.28,
    softness: 0.8,
    distortion: 0.16,
    swirl: 0.7,
    swirlIterations: 8,
    shape: 'edge' as const,
    shapeScale: 0.1,
    colors: ['hsl(232, 100%, 10%)', 'hsl(180, 100%, 50%)', 'hsl(235, 100%, 18%)', 'hsl(185, 100%, 62%)'],
  },
  {
    proportion: 0.42,
    softness: 1.0,
    distortion: 0.2,
    swirl: 0.75,
    swirlIterations: 11,
    shape: 'checks' as const,
    shapeScale: 0.08,
    colors: ['hsl(235, 85%, 14%)', 'hsl(232, 100%, 32%)', 'hsl(240, 90%, 22%)', 'hsl(232, 100%, 58%)'],
  },
  {
    proportion: 0.35,
    softness: 0.95,
    distortion: 0.15,
    swirl: 0.8,
    swirlIterations: 10,
    shape: 'stripes' as const,
    shapeScale: 0.12,
    colors: ['hsl(232, 80%, 11%)', 'hsl(185, 100%, 48%)', 'hsl(238, 80%, 18%)', 'hsl(180, 100%, 58%)'],
  },
  {
    proportion: 0.40,
    softness: 1.05,
    distortion: 0.17,
    swirl: 0.72,
    swirlIterations: 13,
    shape: 'edge' as const,
    shapeScale: 0.13,
    colors: ['hsl(232, 100%, 9%)', 'hsl(232, 100%, 38%)', 'hsl(240, 90%, 16%)', 'hsl(180, 100%, 55%)'],
  },
]

export function FeatureShaderCards({ features }: FeatureShaderCardsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((feature, index) => {
        const cfg = SHADER_CONFIGS[index % SHADER_CONFIGS.length]
        return (
          <div key={index} className="relative h-64 group">
            {/* Shader background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Warp
                style={{ height: '100%', width: '100%' }}
                proportion={cfg.proportion}
                softness={cfg.softness}
                distortion={cfg.distortion}
                swirl={cfg.swirl}
                swirlIterations={cfg.swirlIterations}
                shape={cfg.shape}
                shapeScale={cfg.shapeScale}
                scale={1}
                rotation={0}
                speed={0.6}
                colors={cfg.colors}
              />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 h-full flex flex-col p-7 rounded-2xl bg-black/80 border border-white/[0.08] transition-all duration-300 group-hover:border-[#3C53FF]/30 group-hover:bg-black/75">
              {/* Accent line */}
              <div className="w-8 h-0.5 mb-5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #3C53FF, #0DFFFF)' }} />

              <h3 className="text-base font-bold text-white mb-3 leading-snug">
                {feature.title}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed flex-grow">
                {feature.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
