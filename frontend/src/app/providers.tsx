'use client'

import { HeroThemeProvider } from '@/context/HeroThemeContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeroThemeProvider>{children}</HeroThemeProvider>
}
