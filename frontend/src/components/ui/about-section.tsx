import { Button } from "@/components/ui/button"
import Link from 'next/link'

const pillars = [
  {
    label: "We Partner",
    body: "We work as an extension of your organization, not above it. From strategy to deployment, we share accountability for outcomes — not just deliverables.",
  },
  {
    label: "We Illuminate",
    body: "Experience from regulated, high-stakes environments shapes how we think. We bring that perspective to every problem — challenging assumptions and asking the questions that lead to better results.",
  },
  {
    label: "We Grow",
    body: "Every engagement is designed to leave your organization stronger. We are invested in your independence, not your dependency on us.",
  },
]

const achievements = [
  { label: "Clients",             value: "150+" },
  { label: "AI Models in Production", value: "20+" },
  { label: "BI Dashboards",       value: "50+" },
  { label: "Citizens Served",     value: "15M+" },
]

export function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-4">
              About Innovation Next
            </p>
            <h2 className="section-heading text-[#0A0A0A]">
              Who We Are
            </h2>
          </div>
          <p className="text-[#0A0A0A]/55 text-base leading-relaxed">
            Innovation Next is a technology company headquartered in Kathmandu, Nepal. We advise, build, and run digital platforms for financial institutions, large enterprises, and governments — with AI built into what we deliver.
          </p>
        </div>

        {/* Image grid */}
        <div className="grid gap-5 lg:grid-cols-3 items-stretch mb-14">
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
              alt="Innovation Next headquarters, Kathmandu"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 h-full">
            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-[#f5f5f5] p-7 flex-1">
              <div>
                <p className="mb-2 text-lg font-bold text-[#0A0A0A]">
                  Built at the intersection of strategy and engineering
                </p>
                <p className="text-[#0A0A0A]/50 text-sm leading-relaxed">
                  From our headquarters in Kathmandu, we build and operate live national-scale systems across South Asia and Southeast Asia.
                </p>
              </div>
              <Button variant="outline" className="mr-auto rounded-full border-black/15 text-[#0A0A0A] hover:border-[#0040C1] hover:text-[#0040C1]" asChild>
                <Link href="/company">Learn about us</Link>
              </Button>
            </div>
            <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[160px]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                alt="Innovation Next team"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* What We Do + How We Work + Three pillars */}
        <div className="rounded-3xl bg-[#EBF5FF] p-8 md:p-10 mb-20 flex flex-col gap-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-7">
              <div className="w-1.5 h-6 rounded-full mb-5 bg-[#0040C1]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-[#0040C1]">What We Do</p>
              <h3 className="text-xl font-black text-[#0A0A0A] leading-snug mb-3">Full-stack technology, end to end.</h3>
              <p className="text-[#0A0A0A]/55 text-sm leading-relaxed">
                We work across Digital Financial Services, E-Governance, Digital Transformation Consulting, AI & Machine Learning, and Bespoke Software Development — taking a programme from first requirement through live, national-scale operation.
              </p>
              <p className="text-[#0A0A0A]/55 text-sm leading-relaxed mt-3">
                We write the requirements, build the system, and run it — one accountable partner rather than a hand-off between vendors.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-7">
              <div className="w-1.5 h-6 rounded-full mb-5 bg-[#0040C1]" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-[#0040C1]">How We Work</p>
              <h3 className="text-xl font-black text-[#0A0A0A] leading-snug mb-3">Not consultants. Partners.</h3>
              <p className="text-[#0A0A0A]/55 text-sm leading-relaxed">
                Our consultants write requirements that engineers can build from, because our engineers build from them. We start from proven platforms where they fit, and stay to run what we deliver.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {pillars.map(p => (
              <div key={p.label} className="bg-white rounded-2xl p-7">
                <div className="w-1.5 h-6 rounded-full bg-[#0040C1] mb-5" />
                <h4 className="text-base font-bold text-[#0A0A0A] mb-2">{p.label}</h4>
                <p className="text-[#0A0A0A]/50 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements banner */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0040C1] p-10 md:p-14">
          {/* grid texture */}
          <div className="pointer-events-none absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

          <div className="relative z-10">
            <div className="mb-10 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Proven at scale
              </h2>
              <p className="text-white/65 text-sm leading-relaxed">
                Live national government systems, AI merchant onboarding in production in Malaysia, and platforms serving millions of users.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map(a => (
                <div key={a.label}>
                  <div className="text-4xl md:text-5xl font-black text-white mb-1">{a.value}</div>
                  <p className="text-white/55 text-xs font-medium tracking-wide uppercase">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
