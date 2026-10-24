export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-6 pt-40">
        <div className="h-3 bg-black/[0.04] rounded-full w-1/5 mb-8" />
        <div className="h-14 bg-black/[0.04] rounded-2xl w-3/4 mb-4" />
        <div className="h-14 bg-black/[0.04] rounded-2xl w-1/2 mb-8" />
        <div className="h-4 bg-black/[0.04] rounded-full w-2/3 mb-3" />
        <div className="h-4 bg-black/[0.04] rounded-full w-1/2" />
      </div>
    </div>
  )
}
