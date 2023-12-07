'use client'

import { ChevronLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { AvatarApp } from './avatar-app'
import { MobileSidebar } from './mobile-sidebar'
import type { User } from '@clerk/nextjs/server'

export default function Navbar ({ user }: { user: User | null }) {
  const pathname = usePathname()
  const router = useRouter()

  const routes = {
    '/new': 'Nuevo Diagnóstico',
    '/all': 'Todos los Diagnósticos',
    '/patients': 'Administrar Pacientes',
    '/terms': 'Términos y Condiciones',
    '/settings': 'Perfil',
    '/settings/account': 'Cuenta',
    '/settings/appearance': 'Apariencia'
  }

  return (
    <nav
      className='
        sticky
        top-0
        z-50
        backdrop-blur-sm
        border-b
        bg-background/40
        border-_gray-border
        dark:border-_dark-gray
      '
    >
      <div className='flex items-center max-w-screen-2xl mx-auto overflow-hidden'>
        <div className='flex flex-1 justify-between w-full'>
          <div className='lg:w-72 p-4 lg:border-r border-_gray-border dark:border-_dark-gray'>
            <AvatarApp />
          </div>
          <div className='lg:hidden p-4 -mx-2'>
            <MobileSidebar user={user} />
          </div>
        </div>
        <div className='hidden lg:flex items-center lg:px-6 py-4 w-full'>
          {pathname !== '/' && (
            <button onClick={() => router.back()} className='bg-_gray-F7F7F7 dark:bg-_dark-gray hidden lg:block rounded-full p-1'>
              <ChevronLeft size={18} />
            </button>
          )}
          <h2 className='text-_main dark:text-_white font-bold text-base lg:ml-6 whitespace-nowrap'>
            {routes[pathname as keyof typeof routes]}
          </h2>
        </div>
      </div>
    </nav>
  )
}
