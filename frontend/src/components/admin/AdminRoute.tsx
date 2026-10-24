'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/store/adminStore'

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const token = useAdminStore(s => s.token)
  const router = useRouter()
  // localStorage-backed store: token is only known after mount, so gate on it to avoid an SSR hydration mismatch
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (mounted && !token) router.replace('/admin/login')
  }, [mounted, token, router])

  if (!mounted || !token) return null
  return <>{children}</>
}
