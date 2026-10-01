'use client'

import { ClosingCta } from '@/components/sections/ClosingCta'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Upload, CheckCircle, MapPin, Briefcase, Clock } from 'lucide-react'
import { api, cn } from '@/lib/utils'
import { getVacancies } from '@/services/api'
import type { Vacancy } from '@/types'

const ACCENT = '#0040C1'

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

const inputCls = 'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-2.5 text-sm text-[#0A0A0A] placeholder-[#0A0A0A]/30 focus:outline-none focus:border-[#0040C1] transition-colors'

function ApplicationForm({ vacancy, onClose }: { vacancy: Vacancy; onClose: () => void }) {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [cvError, setCvError] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<AppValues>({
    resolver: zodResolver(appSchema),
  })

  const onSubmit = async (data: AppValues) => {
    if (!cvFile) { setCvError(true); return }
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
        <h3 className="text-xl font-medium text-[#0A0A0A] mb-2">Application submitted!</h3>
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
          <h3 className="text-lg font-medium text-[#0A0A0A]">Apply for {vacancy.title}</h3>
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
          cvFile ? 'border-[#0040C1]/40 bg-[#EBF5FF]' : 'border-black/[0.10] hover:border-[#0040C1]/30'
        )}>
          <Upload size={24} className={cvFile ? 'text-[#0040C1]' : 'text-[#0A0A0A]/30'} />
          <div className="text-center">
            <p className="text-sm text-[#0A0A0A]/60">
              {cvFile ? cvFile.name : 'Click to upload or drag & drop'}
            </p>
            <p className="text-xs text-[#0A0A0A]/30 mt-0.5">PDF or DOCX, max 5MB</p>
          </div>
          <input type="file" className="sr-only" accept=".pdf,.docx,.doc"
            onChange={e => { setCvFile(e.target.files?.[0] || null); setCvError(false) }} />
        </label>
        {cvError && <p className="text-red-500 text-xs mt-1">Please upload your CV</p>}
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm">Submission failed. Please try again or email us.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm py-3.5 px-8 bg-transparent text-[#0040C1] border-[1.5px] border-[#0040C1] hover:bg-[#0040C1] hover:text-white transition-colors disabled:opacity-60"
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
          <div className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-xs font-medium mb-4" style={{ color: ACCENT }}>Careers at Innovation Next</p>
            <h1 className="hero-heading text-[#0A0A0A] mb-5">
              Build what <span className="gradient-text">nations run on.</span>
            </h1>
            <p className="text-[#0A0A0A]/55 leading-relaxed mb-8 max-w-3xl mx-auto">
              Join the team behind national digital government platforms and fintech systems used by millions of people. Work on real systems, in production, from day one.
            </p>
            <a href="#openings" className="btn-secondary">View Open Roles</a>
          </div>
          <img
            src="/team-photo.png"
            alt="Innovation Next team"
            className="w-full h-[240px] md:h-[340px] object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* ── Stats band ────────────────────────────────── */}
      <section className="bg-[#F7F7F7] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: '13M+', label: 'Users on platforms we built' },
            { value: '7', label: 'Live national government deployments' },
            { value: '20+', label: 'AI models in production' },
            { value: '3.5M+', label: 'Daily transactions' },
          ].map(c => (
            <div key={c.label}>
              <div className="text-4xl md:text-5xl font-medium mb-2" style={{ color: ACCENT }}>{c.value}</div>
              <div className="text-sm text-[#575757]">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why work here ─────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-3xl mx-auto text-center">
            <p className="text-xs font-medium mb-2" style={{ color: ACCENT }}>Culture</p>
            <h2 className="section-heading text-[#0A0A0A] mb-3">
              Why work <span className="section-accent">here</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-base leading-relaxed">
              What the work looks like at Innovation Next.
            </p>
          </div>
          <div className="rounded-3xl bg-[#EBF5FF] p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { title: 'Real systems, real scale', desc: 'Platforms used by millions of people, including national government systems — not proofs of concept.' },
                { title: 'AI in production', desc: 'Over 20 AI models running in live financial and government environments, with MLOps to keep them accurate.' },
                { title: 'Based in Kathmandu', desc: 'Our headquarters are in Kathmandu, Nepal, where our engineering teams build for clients in Nepal, Malaysia, and beyond.' },
              ].map(c => (
                <div key={c.title} className="bg-white rounded-2xl p-7">
                  <div className="w-1.5 h-6 rounded-full mb-5" style={{ background: ACCENT }} />
                  <h3 className="text-base font-bold text-[#0A0A0A] mb-2">{c.title}</h3>
                  <p className="text-sm text-[#0A0A0A]/50 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
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
              {vacancies.length} open {vacancies.length === 1 ? 'role' : 'roles'} right now.
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
                    ? 'border-[#0040C1] text-[#0040C1] font-semibold'
                    : 'border-black/[0.10] text-[#0A0A0A]/40 hover:border-[#0040C1]/30'
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
            <div className="rounded-3xl bg-[#EBF5FF] p-8 md:p-10 space-y-5">
              {filtered.map(v => (
                <div key={v.id} className="bg-white rounded-2xl p-7">
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
                      <h3 className="text-xl font-medium text-[#0A0A0A] mb-1">{v.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#0A0A0A]/40 mb-3">
                        <span className="flex items-center gap-1.5"><Briefcase size={12} />{v.department}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={12} />{v.location}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} />Posted {new Date(v.postedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <p className="text-sm text-[#0A0A0A]/50 leading-relaxed mb-4">{v.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {v.requirements.map(r => (
                          <span key={r} className="text-xs px-2.5 py-1 rounded-full bg-[#F7F7F7] text-[#575757]">{r}</span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setApplying(v)}
                      className="inline-flex items-center gap-2 rounded-full font-semibold text-sm py-3 px-7 flex-shrink-0 self-start bg-transparent text-[#0040C1] border-[1.5px] border-[#0040C1] hover:bg-[#0040C1] hover:text-white transition-colors"
                    >
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <p className="text-[#0A0A0A]/40">No open positions in this department right now.</p>
                  <button onClick={() => setFilter('All')} className="btn-secondary mt-4 mx-auto">View all openings</button>
                </div>
              )}
            </div>
          )}

          {/* Speculative */}
          <div className="border border-black/[0.08] rounded-3xl p-8 mt-6 text-center">
            <h3 className="text-lg font-medium text-[#0A0A0A] mb-2">Don't see your role?</h3>
            <p className="text-[#0A0A0A]/45 text-sm mb-5 max-w-md mx-auto">
              We're always open to exceptional talent. Send us your CV and we'll be in touch when the right opportunity opens.
            </p>
            <a
              href="mailto:careers@innovationnext.com"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 text-[#0A0A0A] font-semibold text-sm py-3 px-7 hover:border-[#0040C1] hover:text-[#0040C1] transition-colors mx-auto"
            >
              Send speculative application <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ClosingCta />
        </div>
      </section>

    </main>
  )
}
