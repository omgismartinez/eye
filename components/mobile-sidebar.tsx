'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BadgeCheck, BarChart4, Menu, Settings, Users } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from './ui/separator'
import { Avatar } from './avatar'
import { SignoutButton } from './auth/signout-button'

export const MobileSidebar = () => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='lg:hidden'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <aside
                    className='
                        lg:border-r
                        border-_gray-border
                        pb-6
                        h-screen
                        overflow-auto
                    '
                >
                    <header
                        className='
                            sticky
                            top-0
                            p-4
                            backdrop-blur-sm
                            border-b
                            bg-background/40
                            border-_gray-border
                            dark:border-_dark-gray
                        '
                    >
                        <Avatar />
                    </header>
                    <h1 className='text-_main dark:text-_white font-medium text-xs uppercase px-4 py-6'>Menu</h1>
                    <div className='px-4'>
                        <section className='flex flex-col justify-between gap-1 min-h-[650px]'>
                            <div className='flex flex-col gap-2 text-_gray-808080 text-sm font-bold'>
                                <div className='flex flex-col gap-4'>
                                    <button className={clsx('flex items-center gap-4 px-2 py-3 whitespace-nowrap rounded-lg hover:text-_main/80 dark:hover:text-_white/80', {
                                      'text-_main dark:text-_white': pathname === '/new' || pathname === '/all'
                                    })}>
                                        <BarChart4 size={18} /> Administrar Diagnósticos
                                    </button>
                                    <div className='flex gap-2'>
                                        <div className='mx-4'>
                                            <Separator orientation='vertical' />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full font-semibold text-_gray-C2C2C2'>
                                            <SheetClose asChild>
                                                <Link
                                                    href='/new'
                                                    className={clsx('flex items-center gap-4 px-4 py-3 w-full whitespace-nowrap rounded-lg hover:bg-_gray-select dark:hover:bg-_dark-gray', {
                                                      'bg-_gray-select text-_main dark:bg-_dark-gray dark:text-_white': pathname === '/new'
                                                    })}>
                                                    Nuevo Diagnóstico
                                                </Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link
                                                    href='/all'
                                                    className={clsx('flex items-center gap-4 px-4 py-3 w-full whitespace-nowrap rounded-lg hover:bg-_gray-select dark:hover:bg-_dark-gray', {
                                                      'bg-_gray-select text-_main dark:bg-_dark-gray dark:text-_white': pathname === '/all'
                                                    })}>
                                                    Todos los Diagnósticos
                                                </Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <button className='flex items-center gap-4 px-4 py-3 whitespace-nowrap rounded-lg hover:bg-_gray-select dark:hover:bg-_dark-gray'>
                                                    Nuevo Diagnóstico
                                                </button>
                                            </SheetClose>
                                        </div>
                                    </div>
                                </div>
                                <SheetClose asChild>
                                    <Link
                                        href='/patients'
                                        className={clsx('flex items-center gap-4 px-2 py-3 whitespace-nowrap rounded-lg hover:text-_main/80 dark:hover:text-_white/80', {
                                          'text-_main bg-_gray-select dark:bg-_dark-gray dark:text-_white': pathname === '/patients'
                                        })}>
                                        <Users size={18} /> Administrar Pacientes
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link
                                        href='/terms'
                                        className={clsx('flex items-center gap-4 px-2 py-3 whitespace-nowrap rounded-lg hover:text-_main/80 dark:hover:text-_white/80', {
                                          'text-_main bg-_gray-select dark:bg-_dark-gray dark:text-_white': pathname === '/terms'
                                        })}>
                                        <BadgeCheck size={18} /> Términos y Condiciones
                                    </Link>
                                </SheetClose>
                            </div>
                            <div className='flex flex-col gap-6 text-_gray-C2C2C2 text-sm font-bold'>
                                <div className='flex flex-col gap-2 text-_gray-808080'>
                                    <SheetClose asChild>
                                        <Link
                                            href='/settings'
                                            className={clsx('flex items-center gap-4 px-2 py-3 whitespace-nowrap rounded-lg hover:text-_main/80 dark:hover:text-_white/80', {
                                              'text-_main bg-_gray-select dark:bg-_dark-gray dark:text-_white': pathname.startsWith('/settings')
                                            })}>
                                            <Settings size={18} /> Configuración
                                        </Link>
                                    </SheetClose>
                                    <button className='flex items-center gap-4 whitespace-nowrap group'>
                                        <div className='flex items-center gap-4 py-3 border-y border-_gray-border dark:border-_dark-gray w-full'>
                                            <div className='w-8 h-8 rounded-full bg-_main group-hover:bg-_main/80 dark:bg-white dark:group-hover:bg-_white/80' />
                                            <div className='flex flex-col items-start'>
                                                <span className='text-xs font-bold text-_main dark:text-_white'>Alvaro Martinez</span>
                                                <span className='text-[10px] font-normal leading-tight'>Administrador</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <SignoutButton />
                            </div>
                        </section>
                    </div>
                </aside>
            </SheetContent>
        </Sheet>
  )
}
