export function ComingSoon({ title }: { title: string }) {
  return (
    <main className="pt-40 pb-16 md:pb-20 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/50 mb-4">
        Coming Soon
      </p>
      <h1 className="section-heading text-[#0A0A0A] mb-4">{title}</h1>
      <p className="text-[#0A0A0A]/60">This page is being built. Check back soon.</p>
    </main>
  )
}
