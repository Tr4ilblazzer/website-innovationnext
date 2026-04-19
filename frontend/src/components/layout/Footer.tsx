import { Link } from 'react-router-dom'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { ArrowRight, Linkedin, Twitter, Mail } from 'lucide-react'
import * as Color from 'color-bits'
import { api } from '@/lib/utils'
import { ShaderBackground } from '@/components/ui/shader-background'

// ── FlickeringGrid ────────────────────────────────────────────────────────────

const getRGBA = (cssColor: string, fallback = 'rgba(180,180,180)'): string => {
  if (typeof window === 'undefined') return fallback
  try {
    return Color.formatRGBA(Color.parse(cssColor))
  } catch {
    return fallback
  }
}

const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith('rgb')) return color
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity))
}

interface FlickeringGridProps {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
  text?: string
  fontSize?: number
  fontWeight?: number | string
}

function FlickeringGrid({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = '#B4B4B4',
  width,
  height,
  className = '',
  maxOpacity = 0.15,
  text = '',
  fontSize = 140,
  fontWeight = 600,
}: FlickeringGridProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView]   = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const memoizedColor = useMemo(() => getRGBA(color), [color])

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number, h: number,
      cols: number, rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, w, h)
      const maskCanvas = document.createElement('canvas')
      maskCanvas.width  = w
      maskCanvas.height = h
      const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true })
      if (!maskCtx) return
      if (text) {
        maskCtx.save()
        maskCtx.scale(dpr, dpr)
        maskCtx.fillStyle = 'white'
        maskCtx.font = `${fontWeight} ${fontSize}px "Inter", system-ui, sans-serif`
        maskCtx.textAlign = 'center'
        maskCtx.textBaseline = 'middle'
        maskCtx.fillText(text, w / (2 * dpr), h / (2 * dpr))
        maskCtx.restore()
      }
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr
          const y = j * (squareSize + gridGap) * dpr
          const sw = squareSize * dpr
          const sh = squareSize * dpr
          const maskData = maskCtx.getImageData(x, y, sw, sh).data
          const hasText  = maskData.some((v, idx) => idx % 4 === 0 && v > 0)
          const opacity  = squares[i * rows + j]
          const finalOp  = hasText ? Math.min(1, opacity * 3 + 0.4) : opacity
          ctx.fillStyle  = colorWithOpacity(memoizedColor, finalOp)
          ctx.fillRect(x, y, sw, sh)
        }
      }
    },
    [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight],
  )

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const dpr  = window.devicePixelRatio || 1
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      const cols    = Math.ceil(w / (squareSize + gridGap))
      const rows    = Math.ceil(h / (squareSize + gridGap))
      const squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity
      return { cols, rows, squares, dpr }
    },
    [squareSize, gridGap, maxOpacity],
  )

  const updateSquares = useCallback(
    (squares: Float32Array, delta: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * delta) squares[i] = Math.random() * maxOpacity
      }
    },
    [flickerChance, maxOpacity],
  )

  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId: number
    let gridParams: ReturnType<typeof setupCanvas>

    const updateSize = () => {
      const nw = width  || container.clientWidth
      const nh = height || container.clientHeight
      setCanvasSize({ width: nw, height: nh })
      gridParams = setupCanvas(canvas, nw, nh)
    }
    updateSize()

    let lastTime = 0
    const animate = (time: number) => {
      if (!isInView) return
      const delta = (time - lastTime) / 1000
      lastTime = time
      updateSquares(gridParams.squares, delta)
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr)
      frameId = requestAnimationFrame(animate)
    }

    const ro = new ResizeObserver(() => updateSize())
    ro.observe(container)

    const io = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0 })
    io.observe(canvas)

    if (isInView) frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()
      io.disconnect()
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

  return (
    <div ref={containerRef} className={`h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
    </div>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

export function Footer() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      await api.subscribeNewsletter({ email })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="bg-[#040404] border-t border-white/[0.06] relative overflow-hidden">
      {/* WebGL shader background — very subtle, blended into the dark footer */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <ShaderBackground className="absolute inset-0" opacity={0.18} />
        {/* Dark overlay to keep footer readable */}
        <div className="absolute inset-0 bg-[#040404]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* CTA */}
        <div className="py-20 border-b border-white/[0.06]">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="section-tag mx-auto mb-6">Ready to build?</div>
            <h2 className="section-heading text-white mb-4">
              Let's build something
              <span className="gradient-text"> extraordinary</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
              From national payment infrastructure to citizen platforms — we bring production-grade experience to every engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-transparent text-white font-semibold text-base hover:border-[#3C53FF]/50 hover:bg-[#3C53FF]/06 transition-all"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
              <Link
                to="/company"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-transparent text-white font-semibold text-base hover:border-[#3C53FF]/50 hover:bg-[#3C53FF]/06 transition-all"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src="/next_logo.png"
                alt="Innovation Next"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Full-stack digital technology company. Headquartered in Dubai with a technology hub in Kathmandu, Nepal.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors">
                <Linkedin size={15} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors">
                <Twitter size={15} />
              </a>
              <a href="mailto:hello@innovationnext.com"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors">
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Solutions</p>
            <ul className="space-y-2.5">
              {[
                ['Digital Financial Services', '/solutions/fintech'],
                ['E-Governance', '/solutions/egovernance'],
                ['AI & Machine Learning', '/solutions/ai-ml'],
                ['BI & Data Solutions', '/solutions/bi-data'],
                ['IT Services', '/solutions/it-services'],
                ['Staff Augmentation', '/solutions/staff-augmentation'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-white/50 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Company</p>
            <ul className="space-y-2.5">
              {[
                ['About Us', '/company'],
                ['Products', '/products'],
                ['Industries', '/industries'],
                ['Case Studies', '/insights/case-studies'],
                ['Blog', '/insights'],
                ['Careers', '/careers'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-white/50 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Newsletter</p>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              Insights on fintech, e-governance & digital infrastructure. No spam.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input-field text-sm py-2.5"
                required
              />
              {status === 'success' ? (
                <p className="text-[#0DFFFF] text-xs font-medium py-2">✓ You're subscribed!</p>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center text-sm py-2.5"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-xs">Something went wrong. Try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Innovation Next (Four Symmetrons Innovation). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              ['Privacy Policy', '/privacy'],
              ['Terms of Service', '/terms'],
              ['Cookie Policy', '/cookies'],
            ].map(([label, href]) => (
              <Link key={href} to={href} className="text-xs text-white/25 hover:text-white/60 transition-colors">{label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0DFFFF] animate-pulse" />
            <span className="text-xs text-white/25">Systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
