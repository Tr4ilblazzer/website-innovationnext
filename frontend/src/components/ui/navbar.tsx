import { useState } from 'react'
import { Link } from 'react-router-dom'
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

  const linkBase  = theme === 'dark' ? 'text-white/70 hover:text-white'       : 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'
  const linkHover = theme === 'dark' ? 'bg-white/[0.07] text-white'           : 'bg-black/[0.05] text-[#0A0A0A]'

  return (
    <MotionConfig transition={{ bounce: 0, type: 'tween' }}>
      <nav className="relative">
        <ul className="flex items-center">
          {list.map((item) => (
            <li key={item.id} className="relative">
              <Link
                to={item.url}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative flex items-center justify-center rounded px-5 py-2.5 text-sm font-medium transition-colors ${linkBase} ${
                  hovered === item.id ? linkHover : ''
                }`}
              >
                {item.title}
              </Link>

              {/* Animated underline for non-dropdown items */}
              {hovered === item.id && !item.dropdown && (
                <motion.div
                  layout
                  layoutId="cursor"
                  className="absolute bottom-0 h-0.5 w-full bg-[#0072BC]"
                />
              )}

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
                    className="mt-3 flex w-56 flex-col rounded-2xl bg-white border border-black/[0.08] shadow-lg shadow-black/[0.06] overflow-hidden py-1.5"
                  >
                    {item.items?.map((nav) => (
                      <Link
                        key={nav.id}
                        to={nav.url}
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
