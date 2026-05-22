import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { api, cn } from '@/lib/utils'
import { GlassLocationCard } from '@/components/ui/glass-location-card'

const ACCENT = '#0072BC'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  phone: z.string().optional(),
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
  { city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪', role: 'Global Headquarters & Business Development', badge: 'HQ', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80' },
  { city: 'Kathmandu', country: 'Nepal', flag: '🇳🇵', role: 'Technology & Delivery Hub', image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=900&q=80' },
]

const inputCls = 'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]/40 transition-colors'

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
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: ACCENT }}>
            <CheckCircle size={28} className="text-white" />
          </div>
          <h3 className="text-2xl font-black text-[#0A0A0A] mb-3">Message received</h3>
          <p className="text-[#0A0A0A]/50 max-w-sm mx-auto mb-6">
            Our team will get back to you within one business day.
          </p>
          <button onClick={() => setStatus('idle')} className="btn-secondary mx-auto">
            Send another message
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={compact ? 'bg-white py-16' : 'bg-white pt-32 pb-24'}>
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Two-column: sidebar + form ── */}
        <div className={cn('grid gap-12', compact ? 'grid-cols-1' : 'lg:grid-cols-5 lg:gap-16')}>

          {/* Left sidebar */}
          {!compact && (
            <div className="lg:col-span-2 flex flex-col gap-10">

              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: ACCENT }}>
                  Get In Touch
                </p>
                <h1 className="hero-heading text-[#0A0A0A] mb-8">
                  Let's talk about
                  <br />
                  <span className="gradient-text">your project.</span>
                </h1>

              </div>


            </div>
          )}

          {/* Form */}
          <div className={cn(compact ? 'col-span-1' : 'lg:col-span-3')}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0072BC] mb-1.5 uppercase tracking-wider">Full Name *</label>
                  <input {...register('name')} className={inputCls} placeholder="John Smith" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0072BC] mb-1.5 uppercase tracking-wider">Work Email *</label>
                  <input {...register('email')} type="email" className={inputCls} placeholder="john@company.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0072BC] mb-1.5 uppercase tracking-wider">Company</label>
                  <input {...register('company')} className={inputCls} placeholder="Your organisation" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0072BC] mb-1.5 uppercase tracking-wider">Phone</label>
                  <input {...register('phone')} className={inputCls} placeholder="+971 50 000 0000" />
                </div>
              </div>

              {/* Interest pills */}
              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A]/50 mb-2 uppercase tracking-wider">Area of Interest</label>
                <div className="flex flex-wrap gap-2">
                  {interests.map(i => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedInterest(selectedInterest === i ? '' : i)}
                      className={cn(
                        'text-xs px-3 py-1.5 rounded-full border transition-all',
                        selectedInterest === i
                          ? 'border-[#0072BC] text-[#0072BC]'
                          : 'border-black/10 text-[#0A0A0A]/50 hover:border-[#0072BC]/30 hover:text-[#0072BC]'
                      )}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0072BC] mb-1.5 uppercase tracking-wider">Message *</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className={cn(inputCls, 'resize-none')}
                  placeholder="Tell us about your project, timeline, and what you're looking to achieve…"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again or email us directly.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 w-full rounded-full font-semibold text-sm py-3.5 px-8 transition-colors disabled:opacity-60 border-[1.5px] border-[#0072BC] text-[#0072BC] bg-transparent hover:bg-[#0072BC] hover:text-white"
              >
                {status === 'loading' ? 'Sending…' : 'Send Message'} <ArrowRight size={16} />
              </button>

            </form>
          </div>

        </div>

        {/* ── Office locations ── */}
        {!compact && (
          <div className="mt-16 grid md:grid-cols-2 gap-5">
            {offices.map(o => (
              <GlassLocationCard key={o.city} {...o} height="h-[340px]" />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
