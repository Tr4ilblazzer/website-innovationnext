import { createContext, useContext, useState } from 'react'

interface HeroThemeContextType {
  isDark: boolean
  setIsDark: (v: boolean) => void
}

const HeroThemeContext = createContext<HeroThemeContextType>({
  isDark: true,
  setIsDark: () => {},
})

export function HeroThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true)
  return (
    <HeroThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </HeroThemeContext.Provider>
  )
}

export function useHeroTheme() {
  return useContext(HeroThemeContext)
}
