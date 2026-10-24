import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="pt-40 pb-24 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/50 mb-4">404</p>
      <h1 className="section-heading text-[#0A0A0A] mb-4">Page not found</h1>
      <p className="text-[#0A0A0A]/60 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-primary inline-flex mx-auto">Back to Home</Link>
    </main>
  )
}
