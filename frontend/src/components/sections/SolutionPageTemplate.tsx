import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { FeatureShaderCards } from '@/components/ui/feature-shader-cards'

interface Feature {
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
}

interface Deployment {
  name: string
  description: string
  tags: string[]
}

interface SolutionPageProps {
  tag: string
  headline: string
  headlineAccent: string
  subheadline: string
  description: string
  accentColor: string
  icon: string
  stats?: Stat[]
  features: Feature[]
  deployments?: Deployment[]
  capabilities: string[]
  ctaLabel?: string
  ctaHref?: string
  credentialBadge?: string
}

export function SolutionPageTemplate({
  tag,
  headline,
  headlineAccent,
  subheadline,
  description,
  accentColor,
  icon,
  stats,
  features,
  deployments,
  capabilities,
  ctaLabel = 'Talk to Our Team',
  ctaHref = '/contact',
  credentialBadge,
}: SolutionPageProps) {
  return (
    <main className="pt-32 pb-24 relative overflow-hidden">
      {/* Glows */}
      <div className="glow-orb w-[600px] h-[600px] -top-40 -right-40 opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor}40, transparent 70%)` }} />
      <div className="glow-orb glow-blue w-96 h-96 bottom-40 left-0 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Hero ───────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="section-tag mb-5" style={{ color: accentColor, borderColor: `${accentColor}30`, background: `${accentColor}10` }}>
              {tag}
            </div>
            <h1 className="section-heading text-white mb-4">
              {headline}
              <br />
              <span style={{ background: `linear-gradient(135deg, ${accentColor}, #0DFFFF)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="text-lg text-white/40 italic mb-3">{subheadline}</p>
            <p className="text-white/55 leading-relaxed mb-8">{description}</p>
            {credentialBadge && (
              <div className="flex items-center gap-3 glass-card p-4 mb-8 w-fit">
                <span className="text-2xl">🏆</span>
                <span className="text-sm text-white/70">{credentialBadge}</span>
              </div>
            )}
            <Link to={ctaHref} className="btn-primary">
              {ctaLabel} <ArrowRight size={15} />
            </Link>
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <div
                    className="text-3xl font-black mb-2"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, #0DFFFF)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm text-white/40">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Features ────────────────────────────────── */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto mb-4" style={{ color: accentColor, borderColor: `${accentColor}30`, background: `${accentColor}10` }}>
              Capabilities
            </div>
            <h2 className="text-3xl font-black text-white">What we deliver</h2>
          </div>
          <FeatureShaderCards features={features} />
        </div>

        {/* ── Deployments ─────────────────────────────── */}
        {deployments && deployments.length > 0 && (
          <div className="mb-24">
            <div className="text-center mb-12">
              <div className="section-tag mx-auto mb-4">Live Deployments</div>
              <h2 className="text-3xl font-black text-white">
                In production. <span className="gradient-text">At scale.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {deployments.map((d, i) => (
                <div key={i} className="glass-card p-7">
                  <h3 className="font-bold text-white mb-2">{d.name}</h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{d.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/40">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tech Capabilities Checklist ─────────────── */}
        <div className="glass-card p-10 mb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="section-tag mb-4">Technical depth</div>
              <h2 className="text-3xl font-black text-white mb-3">Built for production.</h2>
              <p className="text-white/50 leading-relaxed">Every capability listed below has been delivered in real, live systems — not in proof-of-concept environments.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {capabilities.map((c, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle size={14} style={{ color: accentColor }} className="flex-shrink-0" />
                  <span className="text-sm text-white/65">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────── */}
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div className="glow-orb w-64 h-64 absolute -top-20 left-1/2 -translate-x-1/2"
            style={{ background: `radial-gradient(circle, ${accentColor}30, transparent 70%)` }} />
          <span className="text-4xl mb-4 block">{icon}</span>
          <h2 className="text-3xl font-black text-white mb-3">Ready to get started?</h2>
          <p className="text-white/45 mb-8 max-w-lg mx-auto">
            Talk to our team about your requirements. We'll tell you straight whether we're the right fit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary py-3.5 px-8">
              Get in Touch <ArrowRight size={15} />
            </Link>
            <Link to="/insights/case-studies" className="btn-secondary py-3.5 px-8">
              View Case Studies
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
