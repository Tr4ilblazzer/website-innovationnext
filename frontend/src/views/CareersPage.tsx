'use client'

import Image from 'next/image'
import { ClosingCta } from '@/components/sections/ClosingCta'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Upload, CheckCircle, MapPin, Briefcase, Clock, Lightbulb, Handshake, ShieldCheck, Target, Users, Compass, Globe2, Sprout, Scale } from 'lucide-react'
import { api, cn } from '@/lib/utils'
import { getVacancies } from '@/services/api'
import type { Vacancy } from '@/types'

const ACCENT = '#0A4FD6'

const VALUES = [
  { icon: Lightbulb, title: 'Innovate Relentlessly', desc: 'Embrace change and explore new ideas. Challenge the status quo to drive continuous improvement.' },
  { icon: Handshake, title: 'Collaborate as One', desc: 'Work together with open minds and a shared purpose. Support and uplift each other for collective success.' },
  { icon: ShieldCheck, title: 'Lead with Integrity', desc: "Act honestly and transparently. Uphold your commitments and do what's right in every situation." },
  { icon: Target, title: 'Pursue Excellence', desc: 'Strive for high standards in everything you do. Pay attention to detail and take pride in your work.' },
  { icon: Users, title: 'Empower and Inspire', desc: 'Encourage growth in yourself and others. Share knowledge and create opportunities for development.' },
  { icon: Compass, title: 'Stay Curious', desc: 'Curiosity drives innovation and discovery. Ask questions, seek answers, and never stop learning.' },
]

const PERKS = [
  { icon: Globe2, title: 'Varied Work', desc: 'We work with banks, governments and large enterprises, which makes for a dynamic place to learn and work.' },
  { icon: Sprout, title: 'Room to Grow', desc: 'We encourage growth in yourself and others, with knowledge sharing and opportunities for development.' },
  { icon: Scale, title: 'Work-Life Balance', desc: 'We understand the importance of work-life balance and support our people through family time.' },
]

const MOCK_VACANCIES: Vacancy[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    department: 'Digital Financial Services',
    location: 'Kathmandu (Remote-friendly)',
    type: 'Full-time',
    level: 'Senior',
    description: 'Build next-generation fintech frontends for our banking and wallet platforms. Work with TypeScript, React, and modern tooling on live systems used by millions.',
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
    description: 'Develop and deploy ML models for fraud detection, merchant risk scoring, and signature verification across our fintech and government platforms.',
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

const inputCls = 'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-2.5 text-sm text-[#0A0A0A] placeholder-[#0A0A0A]/30 focus:outline-none focus:border-[#0A4FD6] transition-colors'

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
        <p className="text-[#0A0A0A]/60 mb-6 max-w-sm mx-auto">
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
          <p className="text-[#0A0A0A]/60 text-sm">{vacancy.department} · {vacancy.location}</p>
        </div>
        <button type="button" onClick={onClose} className="text-[#0A0A0A]/50 hover:text-[#0A0A0A] text-2xl transition-colors">×</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">First Name *</label>
          <input {...register('firstName')} className={inputCls} placeholder="Jane" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">Last Name *</label>
          <input {...register('lastName')} className={inputCls} placeholder="Smith" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">Email *</label>
          <input {...register('email')} type="email" className={inputCls} placeholder="jane@company.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">Phone *</label>
          <input {...register('phone')} className={inputCls} placeholder="+977 98XX XXX XXX" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">Current Role</label>
        <input {...register('currentRole')} className={inputCls} placeholder="e.g. Senior Developer at XYZ" />
      </div>

      <div>
        <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">Your Experience *</label>
        <textarea {...register('experience')} rows={4} className={cn(inputCls, 'resize-none')}
          placeholder="Briefly describe your relevant experience and why you're a great fit…" />
        {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
      </div>

      <div>
        <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">Cover Letter</label>
        <textarea {...register('coverLetter')} rows={3} className={cn(inputCls, 'resize-none')}
          placeholder="Optional — anything else you'd like us to know" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
          <input {...register('linkedinUrl')} className={inputCls} placeholder="https://linkedin.com/in/..." />
          {errors.linkedinUrl && <p className="text-red-500 text-xs mt-1">{errors.linkedinUrl.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">Portfolio / GitHub</label>
          <input {...register('portfolioUrl')} className={inputCls} placeholder="https://github.com/..." />
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#0A0A0A]/60 uppercase tracking-wider mb-1.5">Upload CV *</label>
        <label className={cn(
          'flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all',
          cvFile ? 'border-[#0A4FD6]/40 bg-[#EBF5FF]' : 'border-black/[0.10] hover:border-[#0A4FD6]/30'
        )}>
          <Upload size={24} className={cvFile ? 'text-[#0A4FD6]' : 'text-[#0A0A0A]/50'} />
          <div className="text-center">
            <p className="text-sm text-[#0A0A0A]/60">
              {cvFile ? cvFile.name : 'Click to upload or drag & drop'}
            </p>
            <p className="text-xs text-[#0A0A0A]/50 mt-0.5">PDF or DOCX, max 5MB</p>
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
        className="w-full inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm py-3.5 px-8 bg-transparent text-[#0A4FD6] border-[1.5px] border-[#0A4FD6] hover:bg-[#0A4FD6] hover:text-white transition-colors disabled:opacity-60"
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
      <section className="bg-white pt-28 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="hero-heading gradient-text mb-5">Careers</h1>
            <p className="text-[#0A0A0A]/60 italic text-lg leading-relaxed mb-4">
              &ldquo;We use our expertise to take on real-world challenges.&rdquo;
            </p>
            <p className="text-[#0A0A0A]/65 leading-relaxed mb-8 max-w-3xl mx-auto">
              Our team works to understand the dynamics of each situation, so we can decide which approach and evidence fit best. That is how we deliver solutions that meet your specific needs.
            </p>
            <a href="#openings" className="btn-secondary">View Open Roles</a>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80"
            alt="A large open-plan office with people working at laptops"
            width={1600}
            height={680}
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="w-full h-[240px] md:h-[340px] object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* ── Values ────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 max-w-3xl mx-auto text-center">
            <h2 className="section-heading text-[#0A0A0A]">
              Our vision. <span className="section-accent">Your impact.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 max-w-5xl mx-auto">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <Icon size={28} strokeWidth={1.5} className="mx-auto mb-4" style={{ color: ACCENT }} />
                <h3 className="text-base font-medium text-[#0A0A0A] mb-2">{title}</h3>
                <p className="text-sm text-[#0A0A0A]/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inside look ───────────────────────────────── */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 max-w-3xl mx-auto text-center">
            <h2 className="section-heading text-[#0A0A0A]">
              An <span className="section-accent">inside</span> look
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 max-w-5xl mx-auto mb-16">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <Icon size={28} strokeWidth={1.5} className="mx-auto mb-4" style={{ color: ACCENT }} />
                <h3 className="text-base font-medium text-[#0A0A0A] mb-2">{title}</h3>
                <p className="text-sm text-[#0A0A0A]/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <div className="flex flex-col justify-center rounded-3xl p-10 md:p-14" style={{ background: '#0A4FD6' }}>
              <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
                Engaging.<br />Dynamic.<br />Fulfilling.
              </h2>
              <p className="text-white/80 leading-relaxed max-w-2xl">
                We are always looking for people who bring more to the table and share our values. Look at the open positions below for a match and apply. You can always send us your CV, and we will get in touch if something comes up.
              </p>
            </div>
            <div className="relative min-h-72 overflow-hidden rounded-3xl bg-[#B4BFE0]">
              <Image src="/careers-hello.jpg" alt="Neon wire sign reading hello on a wall" fill sizes="(min-width: 1024px) 352px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Open Roles ────────────────────────────────── */}
      <section id="openings" className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-10 grid md:grid-cols-2 md:items-end gap-6">
            <h2 className="section-heading text-[#0A0A0A]">
              Discover your <span className="section-accent">potential.</span>
            </h2>
            <p className="text-[#0A0A0A]/60 text-base leading-relaxed">
              We invite applications year-round from people who are passionate about their work. We hire at all levels, so there is a place for talent that wants to contribute and grow.
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
                    ? 'border-[#0A4FD6] text-[#0A4FD6] font-semibold'
                    : 'border-black/[0.10] text-[#0A0A0A]/60 hover:border-[#0A4FD6]/30'
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
                        <span className="text-xs text-[#0A0A0A]/50">{v.type}</span>
                      </div>
                      <h3 className="text-xl font-medium text-[#0A0A0A] mb-1">{v.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#0A0A0A]/60 mb-3">
                        <span className="flex items-center gap-1.5"><Briefcase size={12} />{v.department}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={12} />{v.location}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} />Posted {new Date(v.postedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <p className="text-sm text-[#0A0A0A]/60 leading-relaxed mb-4">{v.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {v.requirements.map(r => (
                          <span key={r} className="text-xs px-2.5 py-1 rounded-full bg-[#F7F7F7] text-[#575757]">{r}</span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setApplying(v)}
                      className="inline-flex items-center gap-2 rounded-full font-semibold text-sm py-3 px-7 flex-shrink-0 self-start bg-transparent text-[#0A4FD6] border-[1.5px] border-[#0A4FD6] hover:bg-[#0A4FD6] hover:text-white transition-colors"
                    >
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <p className="text-[#0A0A0A]/60">{vacancies.length === 0 ? "No open positions at the moment, but we're always looking for strong talent. Check back soon." : 'No open positions in this department right now.'}</p>
                  <button onClick={() => setFilter('All')} className="btn-secondary mt-4 mx-auto">View all openings</button>
                </div>
              )}
            </div>
          )}

          {/* Speculative */}
          <div className="border border-black/[0.08] rounded-3xl p-8 mt-6 text-center">
            <h3 className="text-lg font-medium text-[#0A0A0A] mb-2">Don't see your role?</h3>
            <p className="text-[#0A0A0A]/60 text-sm mb-5 max-w-md mx-auto">
              We're always open to exceptional talent. Send us your CV and we'll be in touch when the right opportunity opens.
            </p>
            <a
              href="mailto:careers@innovationnext.com"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 text-[#0A0A0A] font-semibold text-sm py-3 px-7 hover:border-[#0A4FD6] hover:text-[#0A4FD6] transition-colors mx-auto"
            >
              Send speculative application <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <ClosingCta />
        </div>
      </section>

    </main>
  )
}
