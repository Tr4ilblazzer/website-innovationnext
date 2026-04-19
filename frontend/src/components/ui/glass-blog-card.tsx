import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { BookOpen, Clock } from 'lucide-react'

interface GlassBlogCardProps {
  title?: string
  excerpt?: string
  image?: string
  author?: {
    name: string
    avatar?: string
  }
  date?: string
  readTime?: string
  tags?: string[]
  accentColor?: string
  className?: string
  onClick?: () => void
}

export function GlassBlogCard({
  title = 'The Future of Digital Infrastructure',
  excerpt = 'How production-grade fintech platforms are reshaping financial services across emerging markets.',
  image = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  author = { name: 'Innovation Next Team' },
  date = 'Apr 2026',
  readTime = '5 min read',
  tags = ['Fintech'],
  accentColor = '#3C53FF',
  className,
  onClick,
}: GlassBlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('w-full', className)}
      onClick={onClick}
    >
      <Card className="group relative h-full overflow-hidden cursor-pointer hover:border-[#3C53FF]/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(60,83,255,0.12)]">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040404]/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          {/* Tags */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {tags?.map((tag, i) => (
              <Badge
                key={i}
                className="backdrop-blur-sm"
                style={{ background: `${accentColor}18`, borderColor: `${accentColor}35`, color: accentColor }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Hover CTA overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#040404]/30 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-black shadow-lg"
              style={{ background: 'linear-gradient(135deg, #3C53FF, #0DFFFF)', boxShadow: '0 0 30px rgba(60,83,255,0.4)' }}
            >
              <BookOpen className="h-4 w-4" />
              Read Article
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-5">
          <div className="space-y-2">
            <h3 className="text-base font-bold leading-snug text-white transition-colors group-hover:text-[#3C53FF] line-clamp-2">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm text-white/45 leading-relaxed">
              {excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 border border-white/[0.1]">
                {author.avatar && <AvatarImage src={author.avatar} alt={author.name} />}
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white/70">{author.name}</span>
                <span className="text-[10px] text-white/30">{date}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-white/30">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
