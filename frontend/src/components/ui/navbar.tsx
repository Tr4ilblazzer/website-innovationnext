'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, MotionConfig } from 'framer-motion'

export type IMenu = {
  id: number
  title: string
  url: string
  dropdown?: boolean
  items?: IMenu[]
}

type MenuProps = {
  list: IMenu[]
  theme?: 'light' | 'dark'
}

export default function Menu({ list, theme = 'light' }: MenuProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const pathname = usePathname()
  const isActive = (item: IMenu) =>
    [item.url, ...(item.items?.map(i => i.url) ?? [])].some(u => u !== '/' && pathname.startsWith(u.split('/').slice(0, 2).join('/')))

  const linkBase  = theme === 'dark' ? 'text-white/70 hover:text-white'       : 'text-black'
  const linkHover = theme === 'dark' ? 'bg-white/[0.07] text-white'           : 'bg-[#EFF4FF] text-[#0040C1]'
  const linkActive = theme === 'dark' ? 'bg-white/[0.07] text-white'          : 'bg-[#EFF4FF] text-[#0040C1]'

  return (
    <MotionConfig transition={{ bounce: 0, type: 'tween' }}>
      <nav className="relative">
        <ul className="flex items-center">
          {list.map((item) => (
            <li key={item.id} className="relative">
              <Link
                href={item.url}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative flex items-center justify-center rounded-3xl px-5 py-2 text-base font-normal transition-colors ${linkBase} ${
                  hovered === item.id ? linkHover : isActive(item) ? linkActive : ''
                }`}
              >
                {item.title}
              </Link>

              {/* Animated underline for non-dropdown items */}

              {/* Dropdown */}
              {item.dropdown && hovered === item.id && (
                <div
                  className="absolute left-0 top-full z-50"
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.div
                    layout
                    layoutId="cursor"
                    transition={{ bounce: 0 }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-3 flex w-64 flex-col rounded-2xl bg-white border border-black/[0.08] shadow-lg shadow-black/[0.06] overflow-hidden py-1.5"
                  >
                    {item.items?.map((nav) => (
                      <Link
                        key={nav.id}
                        href={nav.url}
                        className="w-full px-4 py-2.5 text-sm text-[#0A0A0A]/70 hover:text-[#0A0A0A] hover:bg-black/[0.04] transition-colors"
                      >
                        {nav.title}
                      </Link>
                    ))}
                  </motion.div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </MotionConfig>
  )
}
