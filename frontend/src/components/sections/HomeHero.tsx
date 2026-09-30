import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import roomLines from '@/assets/hero-room-lines.svg'
import { LogoMarquee } from '@/components/sections/TrustedBySection'

const ACCENT = '#0040C1'
const PUBLIC_SANS = { fontFamily: "'Public Sans', system-ui, sans-serif" }
const POPPINS = { fontFamily: "'Poppins', system-ui, sans-serif" }

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Figma "image hero 1" vector export (1440x900 frame, layer is 2038px wide and centred).
function RoomBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-50">
      <img
        src={roomLines}
        alt=""
        className="absolute max-w-none"
        style={{ left: '-20.76%', right: '-20.76%', top: 0, bottom: '-0.13%', width: '141.52%', height: '100.13%' }}
      />
    </div>
  )
}

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[720px] items-center justify-center overflow-hidden bg-white px-6 pt-[80px] pb-[100px] lg:min-h-[900px]">
      <RoomBackdrop />

      <motion.div
        className="flex w-full max-w-[815px] flex-col items-center gap-8 text-center"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.h1
            variants={fadeUp}
            className="max-w-[734px] text-[32px] font-medium leading-[44px] text-[#0B0B0D] md:text-[46px] md:leading-[64px]"
            style={POPPINS}
          >
            Build the Infrastructure Behind
            <br />
            <span style={{ color: ACCENT }}>Digital Economies</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-[673px] text-base leading-6 text-[#575757]" style={PUBLIC_SANS}>
            We advise, build &amp; run digital platforms for financial institutions &amp; governments with AI built into every solution.
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full px-5 text-base font-medium text-[#FAFAFA] transition-colors hover:bg-[#0034A0]"
            style={{ background: ACCENT, ...PUBLIC_SANS }}
          >
            Talk To Our Team
          </Link>
          <Link
            to="/solutions/ai-ml"
            className="inline-flex h-11 items-center justify-center rounded-full border border-[#3C53FF] bg-[#FAFAFA] px-5 text-base font-medium transition-colors hover:bg-[#EFF4FF]"
            style={{ color: ACCENT, ...PUBLIC_SANS }}
          >
            Explore Solution
          </Link>
        </motion.div>
      </motion.div>

      {/* Logo strip — pinned to the bottom of the hero */}
      <div className="absolute inset-x-0 bottom-0">
        <LogoMarquee />
      </div>
    </section>
  )
}
