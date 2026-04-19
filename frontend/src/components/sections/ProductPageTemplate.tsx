import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface ProductPageProps {
  name: string
  tagline: string
  description: string
  accentColor: string
  icon: string
  tag: string
  useCases: string[]
  features: { title: string; description: string }[]
  techSpecs: string[]
  metrics: { value: string; label: string }[]
  relatedProducts?: { name: string; href: string; desc: string }[]
}

export function ProductPageTemplate({
  name, tagline, description, accentColor, icon, tag,
  useCases, features, techSpecs, metrics, relatedProducts,
}: ProductPageProps) {
  return (
    <main className="pt-32 pb-24 relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] -top-32 left-1/4 opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor}50, transparent 70%)` }} />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="mb-20">
          <div className="section-tag mb-5" style={{ color: accentColor, borderColor: `${accentColor}30`, background: `${accentColor}10` }}>
            {tag}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center"
              style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}>
              {icon}
            </div>
            <div>
              <h1 className="text-4xl font-black text-white leading-none">{name}</h1>
              <p className="text-white/40 italic mt-1">{tagline}</p>
            </div>
          </div>
          <p className="text-white/55 text-lg leading-relaxed max-w-3xl mb-8">{description}</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">Request Demo <ArrowRight size={15} /></Link>
            <Link to="/insights/case-studies" className="btn-secondary">View Case Studies</Link>
          </div>
        </div>

        {/* ── Metrics ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {metrics.map((m, i) => (
            <div key={i} className="glass-card p-6 text-center">
              <div className="text-2xl font-black mb-1"
                style={{ background: `linear-gradient(135deg, ${accentColor}, #0DFFFF)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {m.value}
              </div>
              <div className="text-xs text-white/40">{m.label}</div>
            </div>
          ))}
        </div>

        {/* ── Features ── */}
        <div className="mb-20">
          <div className="section-tag mb-6">Product features</div>
          <h2 className="text-3xl font-black text-white mb-10">What's inside</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-7">
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Use Cases + Tech Specs side by side ── */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="glass-card p-8">
            <h3 className="font-black text-white text-lg mb-5">Ideal for</h3>
            <div className="space-y-3">
              {useCases.map((u, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ArrowRight size={14} style={{ color: accentColor }} className="flex-shrink-0 mt-1" />
                  <span className="text-sm text-white/65">{u}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-8">
            <h3 className="font-black text-white text-lg mb-5">Technical specs</h3>
            <div className="space-y-2.5">
              {techSpecs.map((s, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle size={13} style={{ color: accentColor }} className="flex-shrink-0" />
                  <span className="text-sm text-white/65">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {relatedProducts && (
          <div className="mb-12">
            <h3 className="text-xl font-black text-white mb-5">Related products</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedProducts.map((r, i) => (
                <Link key={i} to={r.href} className="glass-card p-6 group hover:border-white/15 transition-all">
                  <div className="font-bold text-white group-hover:text-[#3C53FF] transition-colors mb-1">{r.name}</div>
                  <div className="text-sm text-white/40">{r.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="glass-card p-10 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Ready to see {name} in action?</h2>
          <p className="text-white/45 mb-6 max-w-md mx-auto">Book a demo. We'll walk you through the platform live, with real data.</p>
          <Link to="/contact" className="btn-primary mx-auto inline-flex">
            Book a Demo <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  )
}
