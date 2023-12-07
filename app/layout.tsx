import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers'
import { ClerkProvider, currentUser } from '@clerk/nextjs'
import { Toaster } from '@/components/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Eyescan',
  description: 'Eyescan es una aplicación web para la detección temprana de enfermedades oculares.'
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  return (
    <ClerkProvider>
      <html lang='es' suppressHydrationWarning>
        <body className={`min-h-screen ${inter.className}`}>
          <ThemeProvider
            dbTheme={user?.privateMetadata.theme}
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
