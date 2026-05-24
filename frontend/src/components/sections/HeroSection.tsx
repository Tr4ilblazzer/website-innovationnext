import { motion, AnimatePresence } from 'framer-motion'
import IntroAnimation from '@/components/ui/scroll-morph-hero'
import { useHeroTheme } from '@/context/HeroThemeContext'

// ── Sun icon ─────────────────────────────────────────────────────────────────
function SunIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#040404' : 'currentColor'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
    </svg>
  )
}

// ── Moon icon ─────────────────────────────────────────────────────────────────
function MoonIcon({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#FAFAFA' : 'currentColor'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

// ── Hero section ──────────────────────────────────────────────────────────────
export function HeroSection() {
  const { isDark, setIsDark } = useHeroTheme()

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: isDark ? '#040404' : '#FFFFFF',
        transition: 'background 0.5s ease-in-out',
      }}
    >
      {/* ── Theme toggle ── */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle hero background"
          className="relative flex items-center p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0072BC]"
          style={{
            background:  isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
            border:     `1px solid ${isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.13)'}`,
            transition: 'background 0.4s ease, border-color 0.4s ease',
          }}
        >
          {/* Sliding pill indicator */}
          <motion.div
            animate={{ x: isDark ? 28 : 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="absolute left-1 w-7 h-7 rounded-full"
            style={{ background: isDark ? '#FAFAFA' : '#040404' }}
          />

          {/* Sun — left slot */}
          <span
            className="relative z-10 w-7 h-7 flex items-center justify-center"
            style={{ color: !isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)' }}
          >
            <SunIcon active={!isDark} />
          </span>

          {/* Moon — right slot */}
          <span
            className="relative z-10 w-7 h-7 flex items-center justify-center"
            style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
          >
            <MoonIcon active={isDark} />
          </span>
        </button>

        {/* Mode label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={isDark ? 'dark' : 'light'}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 text-center text-[10px] font-medium tracking-widest uppercase"
            style={{ color: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)' }}
          >
            {isDark ? 'Dark' : 'Light'}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Animation ── */}
      <div className="absolute inset-0 z-0">
        <IntroAnimation isDark={isDark} />
      </div>
    </section>
  )
}
