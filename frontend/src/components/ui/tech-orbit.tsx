import { useState, useEffect, useRef } from 'react'

interface Tech {
  name: string
  logo: string
  darkIcon?: boolean
}

// 4 → 7 → 11 → 14 — larger rings carry more icons
const INNER: Tech[] = [
  { name: 'React',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-plain.svg', darkIcon: true },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Vue.js',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
]

const MIDDLE: Tech[] = [
  { name: 'Flutter',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Swift',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'Kotlin',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'Node.js',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Go',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg' },
  { name: 'Figma',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
]

const OUTER: Tech[] = [
  { name: 'Java',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: '.NET',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
  { name: 'Laravel',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'Django',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', darkIcon: true },
  { name: 'GraphQL',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'MySQL',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'PostgreSQL',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Redis',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'Elasticsearch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg' },
  { name: 'Jupyter',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
]

const FAR: Tech[] = [
  { name: 'PyTorch',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Kafka',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', darkIcon: true },
  { name: 'Scala',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg' },
  { name: 'AWS',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Azure',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'GCP',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Docker',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'Terraform',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
  { name: 'GitHub',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', darkIcon: true },
  { name: 'Jenkins',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
  { name: 'Linux',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Nginx',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
]

interface OrbitProps {
  techs: Tech[]
  radius: number
  centerX: number
  centerY: number
  iconSize: number
  offset: number
}

function OrbitRing({ techs, radius, centerX, centerY, iconSize, offset }: OrbitProps) {
  const count = techs.length
  return (
    <>
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: centerX * 2, height: centerY + 20 }}
      >
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="rgba(0,114,188,0.48)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>

      {techs.map((tech, index) => {
        const angle = (index / (count - 1)) * 180 + offset
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
            <div
              className="w-full h-full rounded-xl flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-125"
              style={{ background: 'transparent', border: '1px solid rgba(0,114,188,0.35)' }}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                style={{ width: iconSize * 0.58, height: iconSize * 0.58, objectFit: 'contain' }}
              />
            </div>
            <div
              className={`absolute ${tooltipAbove ? 'bottom-[calc(100%+2px)]' : 'top-[calc(100%+2px)]'}
                hidden group-hover:flex items-center gap-1.5 whitespace-nowrap
                px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#0072BC]
                pointer-events-none z-20`}
              style={{
                background: 'rgba(0,114,188,0.18)',
                border: '1px solid rgba(0,114,188,0.35)',
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
  const [dims, setDims] = useState({ width: 700, height: 364 })
  const [tick, setTick] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      const w = Math.min(el.clientWidth, 900)
      setDims({ width: w, height: w * 0.52 })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      setTick(ts - startRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const { width, height } = dims
  const cx = width / 2
  const cy = height - 24
  const iconSize = Math.max(30, Math.min(46, width * 0.052))

  const t = tick / 1000
  const innerOffset  = Math.sin(t * 0.40)        * 12
  const middleOffset = Math.sin(t * 0.30 + 1.0)  * 10
  const outerOffset  = Math.sin(t * 0.25 + 2.0)  * 8
  const farOffset    = Math.sin(t * 0.20 + 3.2)  * 6

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: width * 0.7,
          height: width * 0.35,
          background: 'radial-gradient(ellipse at center bottom, rgba(0,114,188,0.12) 0%, transparent 70%)',
          bottom: 0,
        }}
      />
      <div className="relative mx-auto overflow-visible" style={{ width, height: height + 48 }}>
        <OrbitRing techs={INNER}  radius={width * 0.17} centerX={cx} centerY={cy} iconSize={iconSize} offset={innerOffset} />
        <OrbitRing techs={MIDDLE} radius={width * 0.27} centerX={cx} centerY={cy} iconSize={iconSize} offset={middleOffset} />
        <OrbitRing techs={OUTER}  radius={width * 0.37} centerX={cx} centerY={cy} iconSize={iconSize} offset={outerOffset} />
        <OrbitRing techs={FAR}    radius={width * 0.47} centerX={cx} centerY={cy} iconSize={iconSize} offset={farOffset} />
      </div>
    </div>
  )
}
