import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Upload, CheckCircle, MapPin, Briefcase, Clock } from 'lucide-react'
import { api, cn } from '@/lib/utils'
import type { Vacancy } from '@/types'

// ── Mock vacancies for dev/demo ─────────────────────────────────
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
    description: 'Drive growth across the GCC for Innovation Next\'s fintech and e-governance solutions. Build relationships with banks, government entities, and enterprise clients.',
    requirements: ['5+ years B2B sales in tech', 'UAE/GCC market experience', 'Fintech or GovTech knowledge', 'Arabic a plus'],
    postedAt: '2026-04-08',
    active: true,
  },
]

// ── Application form schema ──────────────────────────────────────
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
        <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-black" />
        </div>
        <h3 className="text-xl font-black text-white mb-2">Application submitted!</h3>
        <p className="text-white/50 mb-6 max-w-sm mx-auto">
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
          <h3 className="text-lg font-black text-white">Apply for {vacancy.title}</h3>
          <p className="text-white/40 text-sm">{vacancy.department} · {vacancy.location}</p>
        </div>
        <button type="button" onClick={onClose} className="text-white/30 hover:text-white text-2xl transition-colors">×</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">First Name *</label>
          <input {...register('firstName')} className="input-field" placeholder="Jane" />
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Last Name *</label>
          <input {...register('lastName')} className="input-field" placeholder="Smith" />
          {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Email *</label>
          <input {...register('email')} type="email" className="input-field" placeholder="jane@company.com" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Phone *</label>
          <input {...register('phone')} className="input-field" placeholder="+977 98XX XXX XXX" />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Current Role</label>
        <input {...register('currentRole')} className="input-field" placeholder="e.g. Senior Developer at XYZ" />
      </div>

      <div>
        <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Your Experience *</label>
        <textarea {...register('experience')} rows={4} className="input-field resize-none"
          placeholder="Briefly describe your relevant experience and why you're a great fit…" />
        {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience.message}</p>}
      </div>

      <div>
        <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Cover Letter</label>
        <textarea {...register('coverLetter')} rows={3} className="input-field resize-none"
          placeholder="Optional — anything else you'd like us to know" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
          <input {...register('linkedinUrl')} className="input-field" placeholder="https://linkedin.com/in/..." />
          {errors.linkedinUrl && <p className="text-red-400 text-xs mt-1">{errors.linkedinUrl.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Portfolio / GitHub</label>
          <input {...register('portfolioUrl')} className="input-field" placeholder="https://github.com/..." />
        </div>
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-xs text-white/50 uppercase tracking-wider mb-1.5">Upload CV *</label>
        <label className={cn(
          'flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all',
          cvFile ? 'border-[#3C53FF]/40 bg-[#3C53FF]/05' : 'border-white/10 hover:border-white/20'
        )}>
          <Upload size={24} className={cvFile ? 'text-[#3C53FF]' : 'text-white/30'} />
          <div className="text-center">
            <p className="text-sm text-white/60">
              {cvFile ? cvFile.name : 'Click to upload or drag & drop'}
            </p>
            <p className="text-xs text-white/30 mt-0.5">PDF or DOCX, max 5MB</p>
          </div>
          <input
            type="file"
            className="sr-only"
            accept=".pdf,.docx,.doc"
            onChange={e => setCvFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">Submission failed. Please try again or email us.</p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-3.5">
        {status === 'loading' ? 'Submitting…' : 'Submit Application'} <ArrowRight size={16} />
      </button>
    </form>
  )
}

export default function CareersPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>(MOCK_VACANCIES)
  const [applying, setApplying] = useState<Vacancy | null>(null)
  const [filter, setFilter] = useState('All')

  const departments = ['All', ...Array.from(new Set(MOCK_VACANCIES.map(v => v.department)))]
  const filtered = filter === 'All' ? vacancies : vacancies.filter(v => v.department === filter)

  return (
    <main className="pt-32 pb-24 relative">
      <div className="glow-orb glow-blue w-96 h-96 top-0 right-0 opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="section-tag mb-4">Careers at Innovation Next</div>
          <h1 className="hero-heading text-white mb-5">
            Build what
            <br />
            <span className="gradient-text">nations run on.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Join the team behind South Asia's largest fintech platforms and national digital government infrastructure. Work on real systems. Make real impact.
          </p>
        </div>

        {/* Culture callouts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { icon: '🌍', label: 'Remote-friendly', sub: 'Work from anywhere' },
            { icon: '⚡', label: 'Real systems', sub: 'Production scale, day one' },
            { icon: '📈', label: 'Fast growth', sub: 'Startup pace, serious tech' },
            { icon: '🤝', label: 'Senior-first', sub: 'Work with the best' },
          ].map(c => (
            <div key={c.label} className="glass-card p-5 text-center">
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-sm font-bold text-white">{c.label}</div>
              <div className="text-xs text-white/40 mt-0.5">{c.sub}</div>
            </div>
          ))}
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
                  ? 'border-[#3C53FF] bg-[#3C53FF]/10 text-[#3C53FF]'
                  : 'border-white/10 text-white/40 hover:border-white/20'
              )}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Vacancies list */}
        {applying ? (
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <ApplicationForm vacancy={applying} onClose={() => setApplying(null)} />
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(v => (
              <div key={v.id} className="glass-card p-7 group">
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#3C53FF]/10 border border-[#3C53FF]/20 text-[#3C53FF] font-medium">
                        {v.level}
                      </span>
                      <span className="text-xs text-white/30">{v.type}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-1">{v.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 mb-3">
                      <span className="flex items-center gap-1.5"><Briefcase size={12} />{v.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={12} />{v.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} />Posted {new Date(v.postedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">{v.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {v.requirements.map(r => (
                        <span key={r} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/40">{r}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setApplying(v)}
                    className="btn-primary flex-shrink-0 self-start"
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="glass-card p-12 text-center">
                <p className="text-white/40">No open positions in this department right now.</p>
                <button onClick={() => setFilter('All')} className="btn-secondary mt-4 mx-auto">View all openings</button>
              </div>
            )}
          </div>
        )}

        {/* Speculative */}
        <div className="glass-card p-8 mt-8 text-center">
          <h3 className="text-lg font-black text-white mb-2">Don't see your role?</h3>
          <p className="text-white/45 text-sm mb-5 max-w-md mx-auto">
            We're always open to exceptional talent. Send us your CV and we'll be in touch when the right opportunity opens.
          </p>
          <a href="mailto:careers@innovationnext.com" className="btn-secondary inline-flex mx-auto">
            Send speculative application <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </main>
  )
}
