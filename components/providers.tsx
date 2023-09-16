'use client'

import { useMounted } from '@/hooks/use-mounted'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

interface Props {
  dbTheme?: string | undefined
}

export function ThemeProvider ({ children, dbTheme, ...props }: ThemeProviderProps & Props) {
  if (dbTheme && useMounted()) localStorage.setItem('theme', dbTheme)
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
