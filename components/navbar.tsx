'use client'

import { Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { AvatarApp } from './avatar-app'
import { MobileSidebar } from './mobile-sidebar'
import type { User } from '@clerk/nextjs/server'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Navbar ({ user }: { user: User | null }) {
  const pathname = usePathname()

  const routes = {
    '/': 'Inicio',
    '/new': 'Nuevo Diagnóstico',
    '/diagnostics': 'Todos los Diagnósticos',
    '/patients': 'Administrar Pacientes',
    '/terms': 'Términos y Condiciones',
    '/settings': 'Configuración',
    '/profile': 'Perfil',
    '/account': 'Cuenta',
    '/appearance': 'Apariencia',
    '/diagnostic': 'Diagnóstico'
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
          <Link
            href={'/'}
            className='flex items-center p-1.5 gap-2 hover:bg-_gray-select h-min dark:hover:bg-_dark-gray/40 w-min rounded-full transition overflow-hidden'
          >
            <Home size={18} />
          </Link>
          {pathname.split('/').map((path, index) => {
            const route = routes[`/${path}` as keyof typeof routes]
            if (!route) return null
            if (path === '' && (index === 0 && path === '')) return null
            return (
              <div key={index} className='flex items-center'>
                {index !== 0 && (
                  <div className='flex items-center px-2 text-xl text-_gray-border dark:text-_gray-808080'>
                    /
                  </div>
                )}
                <Link
                  href={path === '' ? '/' : `${pathname.split(path)[0]}${path}`}
                  className={cn(
                    'flex hover:bg-_gray-select h-min dark:hover:bg-_dark-gray/40 w-min rounded-full transition overflow-hidden', {
                      'bg-_gray-select dark:bg-_dark-gray': pathname === `/${path}` || pathname.endsWith(`/${path}`)
                    }
                  )}
                >
                  <h2 className='text-_main dark:text-_white font-bold text-base whitespace-nowrap px-2'>
                    {route}
                  </h2>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
