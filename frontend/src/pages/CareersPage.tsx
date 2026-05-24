import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Upload, CheckCircle, MapPin, Briefcase, Clock } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { api, cn } from '@/lib/utils'
import { getVacancies } from '@/services/api'
import type { Vacancy } from '@/types'

const ACCENT = '#0072BC'

const MOCK_VACANCIES: Vacancy[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    department: 'Digital Financial Services',
    location: 'Kathmandu (Remote-friendly)',
    type: 'Full-time',
    level: 'Senior',
    description: 'Build next-generation fintech frontends for our banking and wallet platforms. Work with TypeScript, React, and modern tooling on production systems used by millions.',
    requirements: ['5+ years React', 'TypeScript proficiency', 'Experience with financial apps', 'REST/GraphQL APIs'],
    postedAt: '2026-04-01',
    active: true,
  },
  {
    id: '2',
    title: 'Backend Engineer — Node.js / Go',
    department: 'Platform Engineering',
    location: 'Kathmandu / Remote',
    type: 'Full-time',
    level: 'Senior',
    description: 'Design and build high-throughput payment processing systems, settlement engines, and microservices architecture for fintech and e-governance platforms.',
    requirements: ['Node.js or Go', 'Distributed systems', 'PostgreSQL / Redis', 'Payment systems experience a plus'],
    postedAt: '2026-03-25',
    active: true,
  },
  {
    id: '3',
    title: 'AI/ML Engineer',
    department: 'AI & Data',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid',
    description: 'Develop and productionise ML models for fraud detection, merchant risk scoring, and signature verification across our fintech and government platforms.',
    requirements: ['Python / PyTorch or TensorFlow', 'MLOps experience', 'Financial data modelling', 'Computer vision a plus'],
    postedAt: '2026-04-05',
    active: true,
  },
  {
    id: '4',
    title: 'Business Development Manager — Middle East',
    department: 'Sales & Partnerships',
    location: 'Dubai, UAE',
    type: 'Full-time',
    level: 'Senior',
    description: "Drive growth across the GCC for Innovation Next's fintech and e-governance solutions. Build relationships with banks, government entities, and enterprise clients.",
    requirements: ['5+ years B2B sales in tech', 'UAE/GCC market experience', 'Fintech or GovTech knowledge', 'Arabic a plus'],
    postedAt: '2026-04-08',
    active: true,
  },
]

const appSchema = z.object({
  firstName: z.string().min(2, 'Required'),
  lastName: z.string().min(2, 'Required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone required'),
  currentRole: z.string().optional(),
  experience: z.string().min(10, 'Please describe your experience'),
  coverLetter: z.string().optional(),
  portfolioUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})
type AppValues = z.infer<typeof appSchema>

const inputCls = 'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-2.5 text-sm text-[#0A0A0A] placeholder-[#0A0A0A]/30 focus:outline-none focus:border-[#0072BC] transition-colors'

function ApplicationForm({ vacancy, onClose }: { vacancy: Vacancy; onClose: () => void }) {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors } } = useForm<AppValues>({
    resolver: zodResolver(appSchema),
  })

  const onSubmit = async (data: AppValues) => {
    if (!cvFile) return alert('Please upload your CV')
    setStatus('loading')
    const fd = new FormData()
    fd.append('vacancyId', vacancy.id)
    fd.append('cvFile', cvFile)
    Object.entries(data).forEach(([k, v]) => v && fd.append(k, v as string))
    try {
      await api.submitApplication(fd)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: ACCENT }}>
          <CheckCircle size={28} className="text-white" />
        </div>
        <h3 className="text-xl font-black text-[#0A0A0A] mb-2">Application submitted!</h3>
        <p className="text-[#0A0A0A]/50 mb-6 max-w-sm mx-auto">
          We'll review your application and be in touch within 3–5 business days.
        </p>
        <button onClick={onClose} className="btn-secondary mx-auto">Back to vacancies</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-black text-[#0A0A0A]">Apply for {vacancy.title}</h3>
          <p className="text-[#0A0A0A]/40 text-sm">{vacancy.department} · {vacancy.location}</p>
        </div>
        <button type="button" onClick={onClose} className="text-[#0A0A0A]/30 hover:text-[#0A0A0A] text-2xl transition-colors">×</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">First Name *</label>
          <input {...register('firstName')} className={inputCls} placeholder="Jane" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">Last Name *</label>
          <input {...register('lastName')} className={inputCls} placeholder="Smith" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">Email *</label>
          <input {...register('email')} type="email" className={inputCls} placeholder="jane@company.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">Phone *</label>
          <input {...register('phone')} className={inputCls} placeholder="+977 98XX XXX XXX" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">Current Role</label>
        <input {...register('currentRole')} className={inputCls} placeholder="e.g. Senior Developer at XYZ" />
      </div>

      <div>
        <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">Your Experience *</label>
        <textarea {...register('experience')} rows={4} className={cn(inputCls, 'resize-none')}
          placeholder="Briefly describe your relevant experience and why you're a great fit…" />
        {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
      </div>

      <div>
        <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">Cover Letter</label>
        <textarea {...register('coverLetter')} rows={3} className={cn(inputCls, 'resize-none')}
          placeholder="Optional — anything else you'd like us to know" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
          <input {...register('linkedinUrl')} className={inputCls} placeholder="https://linkedin.com/in/..." />
          {errors.linkedinUrl && <p className="text-red-500 text-xs mt-1">{errors.linkedinUrl.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">Portfolio / GitHub</label>
          <input {...register('portfolioUrl')} className={inputCls} placeholder="https://github.com/..." />
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#0A0A0A]/50 uppercase tracking-wider mb-1.5">Upload CV *</label>
        <label className={cn(
          'flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all',
          cvFile ? 'border-[#0072BC]/40 bg-[#EBF5FF]' : 'border-black/[0.10] hover:border-[#0072BC]/30'
        )}>
          <Upload size={24} className={cvFile ? 'text-[#0072BC]' : 'text-[#0A0A0A]/30'} />
          <div className="text-center">
            <p className="text-sm text-[#0A0A0A]/60">
              {cvFile ? cvFile.name : 'Click to upload or drag & drop'}
            </p>
            <p className="text-xs text-[#0A0A0A]/30 mt-0.5">PDF or DOCX, max 5MB</p>
          </div>
          <input type="file" className="sr-only" accept=".pdf,.docx,.doc"
            onChange={e => setCvFile(e.target.files?.[0] || null)} />
        </label>
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm">Submission failed. Please try again or email us.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm py-3.5 px-8 text-white transition-colors"
        style={{ background: ACCENT }}
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Application'} <ArrowRight size={16} />
      </button>
    </form>
  )
}

export default function CareersPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>(MOCK_VACANCIES)
  const [applying, setApplying] = useState<Vacancy | null>(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    getVacancies().then(setVacancies).catch(() => {})
  }, [])

  const departments = ['All', ...Array.from(new Set(vacancies.map(v => v.department)))]
  const filtered = filter === 'All' ? vacancies : vacancies.filter(v => v.department === filter)

  return (
    <main className="bg-white">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: ACCENT }}>
                Careers at Innovation Next
              </p>
              <h1 className="hero-heading text-[#0A0A0A] mb-5">
                Build what
                <br />
                <span className="gradient-text">nations run on.</span>
              </h1>
              <p className="text-[#0A0A0A]/55 text-lg leading-relaxed mb-8">
                Join the team behind South Asia's largest fintech platforms and national digital government infrastructure. Work on real systems. Make real impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#openings" className="btn-secondary">View Open Roles</a>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                alt="Innovation Next team"
                className="w-full h-[520px] object-cover rounded-3xl"
              />
            </div>
          </div>

          {/* Culture callouts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-14 border-t border-black/[0.06]">
            {[
              { stat: '50+', label: 'Remote-friendly', sub: 'Work from anywhere' },
              { stat: '13M+', label: 'Real systems', sub: 'Production scale, day one' },
              { stat: '6', label: 'Domains', sub: 'Startup pace, serious tech' },
              { stat: '10yr', label: 'Senior-first', sub: 'Average engineer experience' },
            ].map(c => (
              <div key={c.label}>
                <div className="text-3xl font-black mb-1" style={{ color: ACCENT }}>{c.stat}</div>
                <div className="text-sm font-bold text-[#0A0A0A] mb-0.5">{c.label}</div>
                <div className="text-xs text-[#0A0A0A]/40">{c.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Open Roles ────────────────────────────────── */}
      <section id="openings" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-14 grid md:grid-cols-2 md:items-end gap-6">
            <h2 className="section-heading text-[#0A0A0A]">
              Open <span className="section-accent">positions.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">
              {vacancies.length} open roles across engineering, data, and business development.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map(d => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={cn(
                  'text-xs px-4 py-2 rounded-full border transition-all',
                  filter === d
                    ? 'border-[#0072BC] text-[#0072BC] font-semibold'
                    : 'border-black/[0.10] text-[#0A0A0A]/40 hover:border-[#0072BC]/30'
                )}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Application form */}
          {applying ? (
            <div className="border border-black/[0.08] rounded-3xl p-8 max-w-2xl mx-auto">
              <ApplicationForm vacancy={applying} onClose={() => setApplying(null)} />
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(v => (
                <div key={v.id} className="border border-black/[0.08] rounded-2xl p-7 hover:border-[#0072BC]/25 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: 'transparent', color: ACCENT, border: `1px solid ${ACCENT}40` }}
                        >
                          {v.level}
                        </span>
                        <span className="text-xs text-[#0A0A0A]/30">{v.type}</span>
                      </div>
                      <h3 className="text-xl font-black text-[#0A0A0A] mb-1">{v.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#0A0A0A]/40 mb-3">
                        <span className="flex items-center gap-1.5"><Briefcase size={12} />{v.department}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={12} />{v.location}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} />Posted {new Date(v.postedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <p className="text-sm text-[#0A0A0A]/50 leading-relaxed mb-4">{v.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {v.requirements.map(r => (
                          <span key={r} className="text-xs px-2.5 py-1 rounded-full border border-[#0072BC]/30 text-[#0072BC]">{r}</span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setApplying(v)}
                      className="inline-flex items-center gap-2 rounded-full font-semibold text-sm py-3 px-7 text-white flex-shrink-0 self-start transition-opacity hover:opacity-90"
                      style={{ background: ACCENT }}
                    >
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="border border-black/[0.08] rounded-2xl p-12 text-center">
                  <p className="text-[#0A0A0A]/40">No open positions in this department right now.</p>
                  <button onClick={() => setFilter('All')} className="btn-secondary mt-4 mx-auto">View all openings</button>
                </div>
              )}
            </div>
          )}

          {/* Speculative */}
          <div className="border border-black/[0.08] rounded-2xl p-8 mt-6 text-center">
            <h3 className="text-lg font-black text-[#0A0A0A] mb-2">Don't see your role?</h3>
            <p className="text-[#0A0A0A]/45 text-sm mb-5 max-w-md mx-auto">
              We're always open to exceptional talent. Send us your CV and we'll be in touch when the right opportunity opens.
            </p>
            <a
              href="mailto:careers@innovationnext.com"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 text-[#0A0A0A] font-semibold text-sm py-3 px-7 hover:border-[#0072BC] hover:text-[#0072BC] transition-colors mx-auto"
            >
              Send speculative application <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: ACCENT }}>
            <AnimatedBackground />
            <div className="relative z-10">
              <h2 className="section-heading text-white mb-3">Ready to work with us?</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                Serious about your craft? We want to hear from you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="mailto:careers@innovationnext.com"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#040404] font-semibold text-sm py-3.5 px-8 hover:bg-white/90 transition-colors"
                >
                  Get in Touch <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
