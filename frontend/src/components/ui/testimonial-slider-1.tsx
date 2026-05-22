import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Review = {
  id: string | number
  name: string
  affiliation: string
  quote: string
  imageSrc: string
  thumbnailSrc: string
}

interface TestimonialSliderProps {
  reviews: Review[]
  className?: string
}

export const TestimonialSlider = ({ reviews, className }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const activeReview = reviews[currentIndex]

  const handleNext = () => {
    setDirection("right")
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const handlePrev = () => {
    setDirection("left")
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left")
    setCurrentIndex(index)
  }

  const thumbnailReviews = reviews.filter((_, i) => i !== currentIndex).slice(0, 3)

  const imageVariants = {
    enter: (dir: "left" | "right") => ({ y: dir === "right" ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir: "left" | "right") => ({ y: dir === "right" ? "-100%" : "100%", opacity: 0 }),
  }

  const textVariants = {
    enter: (dir: "left" | "right") => ({ x: dir === "right" ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "left" | "right") => ({ x: dir === "right" ? -50 : 50, opacity: 0 }),
  }

  return (
    <div className={cn("relative w-full min-h-[600px] overflow-hidden bg-white p-8 md:p-12", className)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">

        {/* Left: pagination + thumbnails */}
        <div className="md:col-span-3 flex flex-col justify-between order-2 md:order-1">
          <div className="flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
            <span className="text-sm text-[#0A0A0A]/35 font-mono">
              {String(currentIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex space-x-2 mt-8 md:mt-0">
            {thumbnailReviews.map((review) => {
              const originalIndex = reviews.findIndex((r) => r.id === review.id)
              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="overflow-hidden rounded-lg w-16 h-20 md:w-20 md:h-24 opacity-50 hover:opacity-100 transition-opacity duration-300 focus:outline-none border border-black/[0.08]"
                  aria-label={`View testimonial from ${review.name}`}
                >
                  <img src={review.thumbnailSrc} alt={review.name} className="w-full h-full object-cover" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Center: main photo */}
        <div className="md:col-span-4 relative h-80 min-h-[400px] md:min-h-[500px] order-1 md:order-2">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={activeReview.imageSrc}
              alt={activeReview.name}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
          </AnimatePresence>
        </div>

        {/* Right: quote + nav */}
        <div className="md:col-span-5 flex flex-col justify-between md:pl-8 order-3">
          <div className="relative overflow-hidden pt-4 md:pt-16 min-h-[200px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#0A0A0A]/35">
                  {activeReview.affiliation}
                </p>
                <h3 className="text-lg font-bold text-[#0A0A0A] mt-1">
                  {activeReview.name}
                </h3>
                <blockquote className="mt-6 text-2xl md:text-3xl font-medium leading-snug text-[#0A0A0A] tracking-tight">
                  "{activeReview.quote}"
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-2 mt-8 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-black/15 text-[#0A0A0A]/50 hover:text-[#0A0A0A] hover:border-black/30 hover:bg-transparent"
              onClick={handlePrev}
              aria-label="Previous"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="rounded-full w-12 h-12 bg-[#0072BC] hover:bg-[#005A96] text-white"
              onClick={handleNext}
              aria-label="Next"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
