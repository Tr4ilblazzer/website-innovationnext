import { cn } from '@/lib/utils'

interface AvatarProps {
  className?: string
  children: React.ReactNode
}

interface AvatarImageProps {
  src: string
  alt: string
  className?: string
}

interface AvatarFallbackProps {
  children: React.ReactNode
  className?: string
}

export function Avatar({ className, children }: AvatarProps) {
  return (
    <span className={cn('relative flex shrink-0 overflow-hidden rounded-full', className)}>
      {children}
    </span>
  )
}

export function AvatarImage({ src, alt, className }: AvatarImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('aspect-square h-full w-full object-cover', className)}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
    />
  )
}

export function AvatarFallback({ children, className }: AvatarFallbackProps) {
  return (
    <span className={cn('flex h-full w-full items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white/70', className)}>
      {children}
    </span>
  )
}
