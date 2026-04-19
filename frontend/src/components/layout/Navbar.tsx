import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const solutions = [
  { label: 'Digital Financial Services', href: '/solutions/fintech', desc: 'Neo-banking, payments, wallets & settlement infrastructure', icon: '', color: '#3C53FF' },
  { label: 'E-Governance', href: '/solutions/egovernance', desc: 'Citizen platforms, immigration, traffic & smart infrastructure', icon: '', color: '#10b981' },
  { label: 'AI & Machine Learning', href: '/solutions/ai-ml', desc: 'AI for fintech, signature verification & custom models', icon: '', color: '#8b5cf6' },
  { label: 'BI & Data Solutions', href: '/solutions/bi-data', desc: 'Dashboards, data warehousing & big data analytics', icon: '', color: '#f59e0b' },
  { label: 'IT Services', href: '/solutions/it-services', desc: 'Software dev, infrastructure & security management', icon: '', color: '#ef4444' },
  { label: 'Staff Augmentation', href: '/solutions/staff-augmentation', desc: 'Senior engineers onboarded in 2–4 weeks', icon: '', color: '#ec4899' },
]

const products = [
  { label: 'Groot Neo', href: '/products/groot-neo', desc: 'Neo-banking platform' },
  { label: 'Groot Pay', href: '/products/groot-pay', desc: 'Digital wallet infrastructure' },
  { label: 'PFM', href: '/products/pfm', desc: 'Personal finance manager' },
  { label: 'Loyalty Engine', href: '/products/loyalty', desc: 'Points & rewards platform' },
  { label: 'Merchant AI', href: '/products/merchant-ai', desc: 'AI-powered merchant tools' },
]

const industries = [
  { label: 'Banks & Digital Banks', href: '/industries/banking' },
  { label: 'Governments & Public Sector', href: '/industries/government' },
  { label: 'Telecoms & MFIs', href: '/industries/telecom' },
  { label: 'Enterprises & Corporates', href: '/industries/enterprise' },
  { label: 'Fintechs & Startups', href: '/industries/fintech-startups' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [location])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#040404]/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/next_logo.png"
              alt="Innovation Next"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 nav-pill px-3 py-1.5">
            {/* Solutions */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('solutions')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeMenu === 'solutions' ? 'text-white bg-white/08' : 'text-white/70 hover:text-white'
              )}>
                Solutions
                <ChevronDown size={14} className={cn('transition-transform', activeMenu === 'solutions' && 'rotate-180')} />
              </button>
              {activeMenu === 'solutions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] glass-card p-5 grid grid-cols-2 gap-2">
                  {solutions.map(s => (
                    <Link
                      key={s.href}
                      to={s.href}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
                    >
                      <span className="text-2xl mt-0.5">{s.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-[#3C53FF] transition-colors">{s.label}</div>
                        <div className="text-xs text-white/50 mt-0.5 leading-relaxed">{s.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Products */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('products')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeMenu === 'products' ? 'text-white' : 'text-white/70 hover:text-white'
              )}>
                Products <ChevronDown size={14} className={cn('transition-transform', activeMenu === 'products' && 'rotate-180')} />
              </button>
              {activeMenu === 'products' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 glass-card p-3">
                  {products.map(p => (
                    <Link
                      key={p.href}
                      to={p.href}
                      className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                    >
                      <span className="text-sm font-semibold text-white group-hover:text-[#3C53FF] transition-colors">{p.label}</span>
                      <span className="text-xs text-white/40">{p.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Industries */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('industries')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeMenu === 'industries' ? 'text-white' : 'text-white/70 hover:text-white'
              )}>
                Industries <ChevronDown size={14} className={cn('transition-transform', activeMenu === 'industries' && 'rotate-180')} />
              </button>
              {activeMenu === 'industries' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 glass-card p-3">
                  {industries.map(i => (
                    <Link
                      key={i.href}
                      to={i.href}
                      className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/company" className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors">Company</Link>
            <Link to="/insights" className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors">Insights</Link>
            <Link to="/careers" className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors">Careers</Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="btn-gradient-outline"
              style={{
                background: 'conic-gradient(from var(--border-angle), rgba(60,83,255,0.4), rgba(13,255,255,0.3), rgba(60,83,255,0.4))',
                animationDuration: '8s',
              }}
            >
              <span className="!py-2 !px-5 !text-sm" style={{ background: '#040404' }}>Get in Touch <ArrowRight size={14} /></span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl border border-white/10 text-white/70 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#040404] pt-20 pb-8 px-6 overflow-y-auto lg:hidden">
          <div className="space-y-6">
            <div>
              <p className="section-tag mb-3">Solutions</p>
              <div className="space-y-1">
                {solutions.map(s => (
                  <Link key={s.href} to={s.href} className="flex items-center gap-3 py-3 border-b border-white/[0.05]">
                    <span>{s.icon}</span>
                    <span className="text-white font-medium">{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="section-tag mb-3">Products</p>
              <div className="space-y-1">
                {products.map(p => (
                  <Link key={p.href} to={p.href} className="block py-3 border-b border-white/[0.05] text-white font-medium">{p.label}</Link>
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
                <Link key={item.href} to={item.href} className="block py-2 text-white/70 font-medium text-lg">{item.label}</Link>
              ))}
            </div>
            <Link to="/contact" className="btn-primary w-full justify-center">
              Get in Touch <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
