import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FinancialHeroProps {
  title: React.ReactNode
  description: string
  buttonText: string
  buttonLink: string
  imageUrl1: string
  imageUrl2: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const cardsVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.3 },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}

const gridBackgroundStyle = {
  backgroundImage:
    'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)',
  backgroundSize: '3rem 3rem',
}

export const FinancialHero = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl1,
  imageUrl2,
  className,
}: FinancialHeroProps) => {
  return (
    <section className={cn('relative w-full overflow-hidden bg-background text-foreground', className)}>
      <div className="absolute inset-0" style={gridBackgroundStyle} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <motion.div
        className="relative container mx-auto flex min-h-[80vh] flex-col items-center justify-between gap-12 px-6 py-20 lg:flex-row"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left: Text Content */}
        <div className="flex flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          <motion.h1
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          <motion.p className="mt-6 max-w-xl text-lg text-muted-foreground" variants={itemVariants}>
            {description}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <a href={buttonLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-12 px-8 text-base">
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Right: Card Images */}
        <motion.div className="relative flex h-full w-full items-center justify-center lg:w-1/2" variants={cardsVariants}>
          <motion.img
            src={imageUrl2}
            alt="Financial Card Back"
            variants={cardItemVariants}
            whileHover={{ y: -10, rotate: -5, transition: { duration: 0.3 } }}
            className="absolute h-48 translate-x-24 rotate-[-6deg] transform rounded-2xl object-cover shadow-2xl md:h-80"
          />
          <motion.img
            src={imageUrl1}
            alt="Financial Card Front"
            variants={cardItemVariants}
            whileHover={{ y: -10, rotate: 5, transition: { duration: 0.3 } }}
            className="absolute h-48 -translate-x-16 rotate-[6deg] transform rounded-2xl object-cover shadow-2xl md:h-80"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
