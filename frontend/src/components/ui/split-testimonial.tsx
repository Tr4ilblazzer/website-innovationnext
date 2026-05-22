import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  company: string
  image: string
}

interface TestimonialsSplitProps {
  testimonials: Testimonial[]
}

export function TestimonialsSplit({ testimonials }: TestimonialsSplitProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const active = testimonials[activeIndex]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      <div
        className="relative grid grid-cols-[1fr_auto] gap-12 items-center cursor-pointer"
        onClick={nextTestimonial}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Left: Quote */}
        <div className="space-y-8">
          {/* Company tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.company}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#0A0A0A]/40"
            >
              <span className="w-8 h-px bg-[#0A0A0A]/20" />
              {active.company}
            </motion.div>
          </AnimatePresence>

          {/* Quote text */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl font-light leading-[1.3] tracking-tight text-[#0A0A0A]"
              >
                {active.quote}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-px bg-[#0A0A0A]/15" />
              <div>
                <p className="text-sm font-semibold text-[#0A0A0A]">{active.name}</p>
                <p className="text-xs text-[#0A0A0A]/45 mt-0.5">{active.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Photo */}
        <div className="relative w-48 h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden border border-black/[0.08]">
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Hover hint */}
          <motion.div
            animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-[#0A0A0A]/40 whitespace-nowrap"
          >
            <span>Next</span>
            <ArrowUpRight className="w-3 h-3" />
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="absolute -bottom-14 left-0 flex items-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(index) }}
              className="relative p-1"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[#0A0A0A] scale-100"
                    : "bg-[#0A0A0A]/20 scale-75 hover:bg-[#0A0A0A]/40 hover:scale-100"
                }`}
              />
              {index === activeIndex && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute inset-0 border border-[#0A0A0A]/25 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
