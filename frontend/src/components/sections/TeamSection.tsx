"use client"

import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
} from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Html, Plane, Sphere, OrbitControls } from '@react-three/drei'
import { X, Linkedin, MapPin } from 'lucide-react'

/* ── Types ──────────────────────────────────────────────────────────────────── */

type Member = {
  id: string
  name: string
  role: string
  location: string
  bio: string
  imageUrl: string
  accent: string
  linkedin: string
}

type CtxType = {
  selected: Member | null
  setSelected: (m: Member | null) => void
  members: Member[]
}

/* ── Data ───────────────────────────────────────────────────────────────────── */

const MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Aayat Ahmed',
    role: 'Co-Founder & CEO',
    location: 'Dubai, UAE',
    bio: 'Visionary behind Innovation Next. Leads strategy, partnerships, and the expansion of digital infrastructure across MENA and South Asia.',
    imageUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop&crop=top&auto=format',
    accent: '#3C53FF',
    linkedin: '#',
  },
  {
    id: '2',
    name: 'Grishma Kunwar',
    role: 'Head of Design',
    location: 'Kathmandu, Nepal',
    bio: 'Shapes the visual identity and UX across all Innovation Next products. Champions design systems that work at national scale.',
    imageUrl:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=700&fit=crop&crop=top&auto=format',
    accent: '#0DFFFF',
    linkedin: '#',
  },
  {
    id: '3',
    name: 'Kaushal Thapa',
    role: 'Lead Engineer',
    location: 'Kathmandu, Nepal',
    bio: 'Architects core infrastructure. Led engineering on payment switches, e-governance platforms, and AI-driven fintech systems.',
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=700&fit=crop&crop=top&auto=format',
    accent: '#8b5cf6',
    linkedin: '#',
  },
  {
    id: '4',
    name: 'Sabu Tha Shrestha',
    role: 'Product Manager',
    location: 'Kathmandu, Nepal',
    bio: 'Bridges business needs and engineering execution. Drives product roadmaps from discovery to delivery across government and fintech verticals.',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=top&auto=format',
    accent: '#10b981',
    linkedin: '#',
  },
]

/* ── Context ────────────────────────────────────────────────────────────────── */

const TeamCtx = createContext<CtxType | undefined>(undefined)

function useTeam() {
  const ctx = useContext(TeamCtx)
  if (!ctx) throw new Error('useTeam must be used inside TeamProvider')
  return ctx
}

function TeamProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Member | null>(null)
  return (
    <TeamCtx.Provider value={{ selected, setSelected, members: MEMBERS }}>
      {children}
    </TeamCtx.Provider>
  )
}

/* ── Starfield ──────────────────────────────────────────────────────────────── */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x040404, 1)
    el.appendChild(renderer.domElement)

    const geo = new THREE.BufferGeometry()
    const count = 6000
    const pos   = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 1800
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1800
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1800
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat   = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, sizeAttenuation: true })
    const stars = new THREE.Points(geo, mat)
    scene.add(stars)
    camera.position.z = 10

    let frameId: number
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      stars.rotation.y += 0.00008
      stars.rotation.x += 0.00004
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      geo.dispose(); mat.dispose(); renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />
}

/* ── Floating Card ──────────────────────────────────────────────────────────── */

function FloatingCard({
  member,
  position,
}: {
  member: Member
  position: { x: number; y: number; z: number }
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelected } = useTeam()

  useFrame(({ camera }) => {
    groupRef.current?.lookAt(camera.position)
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        args={[4.2, 5.8]}
        onClick={(e) => { e.stopPropagation(); setSelected(member) }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true);  document.body.style.cursor = 'pointer' }}
        onPointerOut={(e)  => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'    }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: 'transform 0.35s ease, filter 0.35s ease',
          transform:  hovered ? 'scale(1.12)' : 'scale(1)',
          filter:     hovered ? `drop-shadow(0 0 18px ${member.accent}99)` : 'none',
          pointerEvents: 'none',
        }}
      >
        <div
          className="w-36 h-48 rounded-xl overflow-hidden select-none"
          style={{
            background: '#111111',
            border: hovered
              ? `1.5px solid ${member.accent}80`
              : '1px solid rgba(255,255,255,0.08)',
            boxShadow: hovered
              ? `0 20px 40px rgba(0,0,0,0.7), 0 0 24px ${member.accent}44`
              : '0 12px 28px rgba(0,0,0,0.6)',
          }}
        >
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-36 object-cover object-top"
            loading="lazy"
            draggable={false}
          />
          <div className="px-2 pt-1.5 pb-2">
            <p className="text-white text-[11px] font-semibold leading-tight truncate">{member.name}</p>
            <p className="text-[10px] leading-tight mt-0.5 truncate" style={{ color: member.accent }}>
              {member.role}
            </p>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* ── Galaxy ─────────────────────────────────────────────────────────────────── */

function TeamGalaxy() {
  const { members } = useTeam()

  // 4 cards placed evenly around a tight sphere
  const positions = useMemo(() => [
    { x: -6,  y:  3,  z:  2  },
    { x:  6,  y:  3,  z: -2  },
    { x: -5,  y: -3,  z: -3  },
    { x:  5,  y: -3,  z:  3  },
  ], [])

  return (
    <>
      {/* Wireframe orbs — brand colours */}
      <Sphere args={[2.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3C53FF" transparent opacity={0.12} wireframe />
      </Sphere>
      <Sphere args={[10, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3C53FF" transparent opacity={0.04} wireframe />
      </Sphere>
      <Sphere args={[14, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0DFFFF" transparent opacity={0.025} wireframe />
      </Sphere>

      {members.map((m, i) => (
        <FloatingCard key={m.id} member={m} position={positions[i]} />
      ))}
    </>
  )
}

/* ── Modal ──────────────────────────────────────────────────────────────────── */

function MemberModal() {
  const { selected, setSelected } = useTeam()
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selected) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const r  = cardRef.current.getBoundingClientRect()
    const rx = ((e.clientY - r.top)  - r.height / 2) / 18
    const ry = (r.width  / 2 - (e.clientX - r.left)) / 18
    cardRef.current.style.transition = 'none'
    cardRef.current.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transition = 'transform 0.5s ease-out'
    cardRef.current.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}
    >
      <div className="relative max-w-sm w-full mx-4">
        {/* Close */}
        <button
          onClick={() => setSelected(null)}
          className="absolute -top-11 right-0 text-white/60 hover:text-white transition-colors"
        >
          <X size={26} />
        </button>

        {/* Card */}
        <div
          ref={cardRef}
          className="rounded-2xl overflow-hidden"
          style={{
            background: '#111111',
            border: `1px solid ${selected.accent}30`,
            boxShadow: `0 32px 64px rgba(0,0,0,0.8), 0 0 40px ${selected.accent}22`,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Photo */}
          <div className="relative h-72 w-full overflow-hidden">
            <img
              src={selected.imageUrl}
              alt={selected.name}
              className="w-full h-full object-cover object-top"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
            {/* Accent glow */}
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse 80% 40% at 50% 100%, ${selected.accent}22, transparent 70%)` }}
            />
          </div>

          {/* Info */}
          <div className="px-6 pb-6 -mt-6 relative">
            <div
              className="w-8 h-[2px] rounded-full mb-3"
              style={{ background: selected.accent }}
            />
            <h3 className="text-white text-xl font-bold leading-tight">{selected.name}</h3>
            <p className="text-sm font-semibold mt-0.5 mb-1" style={{ color: selected.accent }}>
              {selected.role}
            </p>
            <div className="flex items-center gap-1.5 text-white/35 text-xs mb-4">
              <MapPin size={11} />
              {selected.location}
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">{selected.bio}</p>

            <a
              href={selected.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-colors duration-200 hover:bg-white/5"
              style={{ color: selected.accent, borderColor: `${selected.accent}40` }}
            >
              <Linkedin size={13} /> View LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Section Export ─────────────────────────────────────────────────────────── */

export function TeamSection() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <h2 className="section-heading text-white">
            The people behind<br />
            <span className="gradient-text italic">the infrastructure</span>
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-sm lg:text-right">
            A focused team with deep production experience — fintech founders,
            engineers, and designers who have shipped systems at national scale.
          </p>
        </div>

        {/* 3D canvas */}
        <TeamProvider>
          <div
            className="relative w-full rounded-3xl overflow-hidden border border-white/[0.06]"
            style={{ height: '560px' }}
          >
            {/* Starfield layer */}
            <StarfieldBackground />

            {/* Three.js canvas */}
            <Canvas
              camera={{ position: [0, 0, 18], fov: 55 }}
              className="absolute inset-0 z-10"
              onCreated={({ gl }) => { gl.domElement.style.pointerEvents = 'auto' }}
            >
              <Suspense fallback={null}>
                <Environment preset="night" />
                <ambientLight intensity={0.5} />
                <pointLight position={[8, 8, 8]}   color="#3C53FF" intensity={0.8} />
                <pointLight position={[-8, -8, -8]} color="#0DFFFF" intensity={0.4} />
                <TeamGalaxy />
                <OrbitControls
                  enablePan={false}
                  enableZoom
                  enableRotate
                  minDistance={8}
                  maxDistance={30}
                  autoRotate
                  autoRotateSpeed={0.4}
                  rotateSpeed={0.5}
                  zoomSpeed={0.8}
                />
              </Suspense>
            </Canvas>

            {/* Modal lives inside the bounded container */}
            <MemberModal />

            {/* Hint */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white/25 text-xs tracking-wider pointer-events-none whitespace-nowrap">
              drag to orbit · scroll to zoom · click a card
            </p>
          </div>
        </TeamProvider>
      </div>
    </section>
  )
}
