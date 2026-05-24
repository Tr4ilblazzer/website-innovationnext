import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu as MenuIcon, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Menu, { type IMenu } from '@/components/ui/navbar'
import { useHeroTheme } from '@/context/HeroThemeContext'

const menuItems: IMenu[] = [
  {
    id: 1,
    title: 'Solutions',
    url: '/solutions/fintech',
    dropdown: true,
    items: [
      { id: 11, title: 'Digital Financial Services', url: '/solutions/fintech' },
      { id: 12, title: 'E-Governance', url: '/solutions/egovernance' },
      { id: 13, title: 'AI & Machine Learning', url: '/solutions/ai-ml' },
      { id: 14, title: 'BI & Data Solutions', url: '/solutions/bi-data' },
      { id: 15, title: 'IT Services', url: '/solutions/it-services' },
      { id: 16, title: 'Staff Augmentation', url: '/solutions/staff-augmentation' },
    ],
  },
  {
    id: 2,
    title: 'Products',
    url: '/products',
    dropdown: true,
    items: [
      { id: 21, title: 'Groot Neo', url: '/products/groot-neo' },
      { id: 22, title: 'Groot Pay', url: '/products/groot-pay' },
      { id: 23, title: 'PFM', url: '/products/pfm' },
      { id: 24, title: 'Loyalty Engine', url: '/products/loyalty' },
      { id: 25, title: 'Merchant AI', url: '/products/merchant-ai' },
    ],
  },
  {
    id: 3,
    title: 'Industries',
    url: '/industries',
    dropdown: true,
    items: [
      { id: 31, title: 'Banks & Digital Banks', url: '/industries/banking' },
      { id: 32, title: 'Governments & Public Sector', url: '/industries/government' },
      { id: 33, title: 'Telecoms & MFIs', url: '/industries/telecom' },
      { id: 34, title: 'Enterprises & Corporates', url: '/industries/enterprise' },
      { id: 35, title: 'Fintechs & Startups', url: '/industries/fintech-startups' },
    ],
  },
  { id: 4, title: 'Company', url: '/company' },
  { id: 5, title: 'Insights', url: '/insights' },
  { id: 6, title: 'Careers', url: '/careers' },
]

const mobileSolutions = [
  { label: 'Digital Financial Services', href: '/solutions/fintech' },
  { label: 'E-Governance', href: '/solutions/egovernance' },
  { label: 'AI & Machine Learning', href: '/solutions/ai-ml' },
  { label: 'BI & Data Solutions', href: '/solutions/bi-data' },
  { label: 'IT Services', href: '/solutions/it-services' },
  { label: 'Staff Augmentation', href: '/solutions/staff-augmentation' },
]

const mobileProducts = [
  { label: 'Groot Neo', href: '/products/groot-neo' },
  { label: 'Groot Pay', href: '/products/groot-pay' },
  { label: 'PFM', href: '/products/pfm' },
  { label: 'Loyalty Engine', href: '/products/loyalty' },
  { label: 'Merchant AI', href: '/products/merchant-ai' },
]

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location                    = useLocation()
  const { isDark }                  = useHeroTheme()

  // Hero theme only applies on the home page before the user has scrolled
  const isHome           = location.pathname === '/'
  const heroThemeActive  = isHome && !scrolled

  // Derived tokens
  const logoSrc    = scrolled
    ? '/next_logo_dark.png'
    : heroThemeActive
      ? (isDark ? '/next_logo_light.png' : '/next_logo_dark.png')
      : '/next_logo_light.png'

  const menuTheme  = heroThemeActive && isDark ? 'dark' : 'light'

  const mobileToggleCls = heroThemeActive && isDark
    ? 'border-white/20 text-white/60 hover:text-white'
    : 'border-black/10 text-[#0A0A0A]/70 hover:text-[#0A0A0A]'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.06] py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={logoSrc}
              alt="Innovation Next"
              className="h-8 w-auto object-contain transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center px-2 py-1">
            <Menu list={menuItems} theme={menuTheme} />
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0072BC] text-white text-sm font-semibold border border-[#0072BC] hover:bg-white hover:text-[#0072BC] transition-all duration-200"
            >
              Get in Touch <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn('lg:hidden p-2 rounded-xl border transition-colors', mobileToggleCls)}
          >
            {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 pb-8 px-6 overflow-y-auto lg:hidden">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#0A0A0A]/30 mb-3">Solutions</p>
              <div className="space-y-1">
                {mobileSolutions.map(s => (
                  <Link key={s.href} to={s.href} className="block py-3 border-b border-black/[0.05] text-[#0A0A0A] font-medium">
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#0A0A0A]/30 mb-3">Products</p>
              <div className="space-y-1">
                {mobileProducts.map(p => (
                  <Link key={p.href} to={p.href} className="block py-3 border-b border-black/[0.05] text-[#0A0A0A] font-medium">
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Industries', href: '/industries' },
                { label: 'Company', href: '/company' },
                { label: 'Insights', href: '/insights' },
                { label: 'Careers', href: '/careers' },
              ].map(item => (
                <Link key={item.href} to={item.href} className="block py-2 text-[#0A0A0A]/70 font-medium text-lg">
                  {item.label}
                </Link>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-full bg-[#0072BC] text-white font-semibold hover:bg-[#005A96] transition-colors">
              Get in Touch <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
