import React, { useState, useEffect, useRef } from 'react'

interface Tech {
  name: string
  logo: string
  darkIcon?: boolean // icons that are black/dark — rendered with a light bg pill
}

const INNER: Tech[] = [
  { name: 'React',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Vue.js',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Flutter',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Figma',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Next.js',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-plain.svg', darkIcon: true },
]

const MIDDLE: Tech[] = [
  { name: 'Node.js',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Go',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg' },
  { name: 'Java',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Redis',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'GraphQL',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
]

const OUTER: Tech[] = [
  { name: 'AWS',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Azure',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'GCP',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Docker',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'Terraform',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
  { name: 'GitHub',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', darkIcon: true },
  { name: 'Linux',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: '.NET',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
  { name: 'Nginx',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
]

interface OrbitProps {
  techs: Tech[]
  radius: number
  centerX: number
  centerY: number
  iconSize: number
}

function OrbitRing({ techs, radius, centerX, centerY, iconSize }: OrbitProps) {
  const count = techs.length
  return (
    <>
      {/* SVG arc */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: centerX * 2, height: centerY + 20 }}
      >
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="rgba(60,83,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>

      {/* Icons */}
      {techs.map((tech, index) => {
        const angle = (index / (count - 1)) * 180
        const rad = (angle * Math.PI) / 180
        const x = centerX + radius * Math.cos(rad) - iconSize / 2
        const y = centerY - radius * Math.sin(rad) - iconSize / 2
        const tooltipAbove = angle > 45 && angle < 135

        return (
          <div
            key={tech.name}
            className="absolute flex flex-col items-center group"
            style={{ left: x, top: y, width: iconSize, height: iconSize, zIndex: 10 }}
          >
            {/* Icon bubble */}
            <div
              className="w-full h-full rounded-xl flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-125"
              style={{
                background: tech.darkIcon
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(60,83,255,0.18)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                style={{ width: iconSize * 0.58, height: iconSize * 0.58, objectFit: 'contain' }}
              />
            </div>

            {/* Tooltip */}
            <div
              className={`absolute ${tooltipAbove ? 'bottom-[calc(100%+6px)]' : 'top-[calc(100%+6px)]'}
                hidden group-hover:flex items-center gap-1.5 whitespace-nowrap
                px-2.5 py-1 rounded-full text-[10px] font-semibold text-white
                pointer-events-none z-20`}
              style={{
                background: 'rgba(60,83,255,0.18)',
                border: '1px solid rgba(60,83,255,0.35)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {tech.name}
            </div>
          </div>
        )
      })}
    </>
  )
}

export function TechOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ width: 700, height: 400 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      const w = Math.min(el.clientWidth, 900)
      setDims({ width: w, height: w * 0.56 })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { width, height } = dims
  const cx = width / 2
  const cy = height
  const iconSize = Math.max(32, Math.min(52, width * 0.058))

  return (
    <div ref={containerRef} className="w-full">
      {/* Glow behind the arc */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: width * 0.7,
          height: width * 0.35,
          background: 'radial-gradient(ellipse at center bottom, rgba(60,83,255,0.12) 0%, transparent 70%)',
          bottom: 0,
        }}
      />

      <div className="relative mx-auto" style={{ width, height }}>
        <OrbitRing techs={INNER}  radius={width * 0.20} centerX={cx} centerY={cy} iconSize={iconSize} />
        <OrbitRing techs={MIDDLE} radius={width * 0.34} centerX={cx} centerY={cy} iconSize={iconSize} />
        <OrbitRing techs={OUTER}  radius={width * 0.48} centerX={cx} centerY={cy} iconSize={iconSize} />
      </div>
    </div>
  )
}
