import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle, MapPin, Mail, Phone } from 'lucide-react'
import { api, cn } from '@/lib/utils'
import type { ContactFormData } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Please enter a subject'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  interest: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const interests = [
  'Digital Financial Services',
  'E-Governance',
  'AI & Machine Learning',
  'BI & Data Solutions',
  'IT Services',
  'Staff Augmentation',
  'General Enquiry',
]

const offices = [
  { city: 'Dubai', country: 'UAE', address: 'Dubai, United Arab Emirates', icon: '🇦🇪', primary: true },
  { city: 'Kathmandu', country: 'Nepal', address: 'Kathmandu, Nepal', icon: '🇳🇵', primary: false },
]

export function ContactSection({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [selectedInterest, setSelectedInterest] = useState<string>('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    setStatus('loading')
    try {
      await api.submitContact({ ...data, interest: selectedInterest })
      setStatus('success')
      reset()
      setSelectedInterest('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-black" />
        </div>
        <h3 className="text-2xl font-black text-white mb-3">Message received</h3>
        <p className="text-white/50 max-w-sm mx-auto">
          Our team will get back to you within one business day.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-secondary mt-6 mx-auto">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className={cn('grid gap-10', compact ? 'grid-cols-1' : 'lg:grid-cols-5')}>
      {/* Info panel */}
      {!compact && (
        <div className="lg:col-span-2 space-y-5">
          <div>
            <div className="section-tag mb-4">Contact Us</div>
            <h2 className="section-heading text-white mb-3">
              Let's talk about
              <br />
              <span className="gradient-text">your project.</span>
            </h2>
            <p className="text-white/45 text-base leading-relaxed">
              Whether you're launching a digital bank, digitising government services, or scaling your tech team — we're ready to help.
            </p>
          </div>

          {/* Offices */}
          <div className="space-y-3 mt-8">
            {offices.map(o => (
              <div key={o.city} className="glass-card p-5 flex items-center gap-4">
                <span className="text-2xl">{o.icon}</span>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {o.city} {o.primary && <span className="text-[10px] ml-1 px-1.5 py-0.5 rounded-full gradient-bg text-black font-bold uppercase tracking-wider">HQ</span>}
                  </div>
                  <div className="text-white/40 text-xs">{o.address}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <a href="mailto:hello@innovationnext.com" className="glass-card p-4 flex items-center gap-3 group hover:border-white/15 transition-all">
              <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <Mail size={14} className="text-black" />
              </div>
              <span className="text-sm text-white/60 group-hover:text-white transition-colors">hello@innovationnext.com</span>
            </a>
          </div>
        </div>
      )}

      {/* Form */}
      <div className={cn('glass-card p-8', compact ? '' : 'lg:col-span-3')}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Full Name *</label>
              <input {...register('name')} className="input-field" placeholder="John Smith" />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Work Email *</label>
              <input {...register('email')} type="email" className="input-field" placeholder="john@company.com" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Company</label>
              <input {...register('company')} className="input-field" placeholder="Your organisation" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Phone</label>
              <input {...register('phone')} className="input-field" placeholder="+971 50 000 0000" />
            </div>
          </div>

          {/* Interest pills */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Area of Interest</label>
            <div className="flex flex-wrap gap-2">
              {interests.map(i => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedInterest(selectedInterest === i ? '' : i)}
                  className={cn(
                    'text-xs px-3 py-1.5 rounded-full border transition-all',
                    selectedInterest === i
                      ? 'border-[#3C53FF] bg-[#3C53FF]/10 text-[#3C53FF]'
                      : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
                  )}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Subject *</label>
            <input {...register('subject')} className="input-field" placeholder="e.g. Digital bank launch in UAE" />
            {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Message *</label>
            <textarea
              {...register('message')}
              rows={5}
              className="input-field resize-none"
              placeholder="Tell us about your project, timeline, and what you're looking to achieve…"
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full justify-center text-base py-3.5"
          >
            {status === 'loading' ? 'Sending…' : 'Send Message'} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}
