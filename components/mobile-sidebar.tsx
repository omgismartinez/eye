'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMounted } from '@/hooks/use-mounted'
import { Menu } from 'lucide-react'
import type { User } from '@clerk/nextjs/server'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from './ui/separator'
import { AvatarApp } from './avatar-app'
import { SignoutButton } from './auth/signout-button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from './ui/avatar'
import { getRole } from '@/lib/utils'
import { sidebarNav } from '@/config/site'

export const MobileSidebar = ({ user }: { user: User | null }) => {
  const pathname = usePathname()
  const initials = `${user?.firstName?.charAt(0) ?? ''}${user?.lastName?.charAt(0) ?? ''}`
  const role = getRole(user)

  const mounted = useMounted()

  if (!mounted) {
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
            <AvatarApp />
          </header>
          <h1 className='text-_main dark:text-_white font-medium text-xs uppercase px-4 py-6'>Menu</h1>
          <div className='px-4'>
            <section className='flex flex-col justify-between gap-1 min-h-[650px]'>
              <div className='flex flex-col gap-2 text-_gray-808080 text-sm font-bold'>
                {sidebarNav.top.map((route, index) => {
                  const protectedRoute = route.children?.filter(child => child.permissions?.includes(role))
                  const IconChildren = protectedRoute?.[0]?.icon ?? null
                  const IconRoute = route.icon
                  return (
                  <div key={index}>
                    {route.children
                      ? protectedRoute?.length === 1 && IconChildren
                        ? (
                            <SheetClose asChild>
                              <Link
                                href={protectedRoute[0].path}
                                className={clsx(
                                  'flex items-center gap-4 px-2 py-3 whitespace-nowrap rounded-lg hover:text-_main/80 dark:hover:text-_white/80',
                                  {
                                    'text-_main bg-_gray-select dark:bg-_dark-gray dark:text-_white':
                                      pathname === protectedRoute[0].path
                                  }
                                )}
                              >
                                {<IconChildren size={20} />} {protectedRoute[0].name}
                              </Link>
                            </SheetClose>
                          )
                        : (
                            <div className='flex flex-col gap-2'>
                              <button
                                className={clsx(
                                  'flex items-center gap-4 px-2 py-3 whitespace-nowrap rounded-lg hover:text-_main/80 dark:hover:text-_white/80',
                                  {
                                    'text-_main dark:text-_white':
                                      pathname === route.path
                                  }
                                )}
                              >
                                {<IconRoute size={20} />} {route.name}
                              </button>
                              <div className='flex gap-2'>
                                <div className='mx-4'>
                                  <Separator orientation='vertical' />
                                </div>
                                <div className='flex flex-col gap-1 w-full font-semibold text-_gray-C2C2C2'>
                                  {route.children.map((child, index) => {
                                    return (
                                      <SheetClose key={index} asChild>
                                        <Link
                                          href={child.path}
                                          className={clsx(
                                            'flex items-center gap-4 px-4 py-3 w-full whitespace-nowrap rounded-lg hover:bg-_gray-select dark:hover:bg-_dark-gray',
                                            {
                                              'bg-_gray-select text-_main dark:bg-_dark-gray dark:text-_white':
                                                pathname === child.path,
                                              hidden: !child.permissions.includes(role)
                                            }
                                          )}
                                        >
                                          {child.name}
                                        </Link>
                                      </SheetClose>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                          )
                      : (
                          <SheetClose asChild>
                            <Link
                              href={route.path}
                              className={clsx(
                                'flex items-center gap-4 px-2 py-3 whitespace-nowrap rounded-lg hover:text-_main/80 dark:hover:text-_white/80',
                                {
                                  'text-_main bg-_gray-select dark:bg-_dark-gray dark:text-_white':
                                    pathname === route.path,
                                  hidden: route.permissions && !route.permissions.includes(role)
                                }
                              )}
                            >
                              {<IconRoute size={20} />} {route.name}
                            </Link>
                          </SheetClose>
                        )}
                  </div>
                  )
                })}
              </div>
            <div className='flex flex-col gap-6 text-_gray-C2C2C2 text-sm font-bold'>
              <div className='flex flex-col gap-2 text-_gray-808080'>
                {sidebarNav.bottom.map((route, index) => {
                  const IconRoute = route.icon
                  return (
                    <SheetClose key={index} asChild>
                      <Link
                        href={route.path}
                        className={clsx(
                          'flex items-center gap-4 px-2 py-3 whitespace-nowrap rounded-lg hover:text-_main/80 dark:hover:text-_white/80',
                          {
                            'text-_main bg-_gray-select dark:bg-_dark-gray dark:text-_white':
                              pathname.startsWith(route.path),
                            hidden: route.permissions && !route.permissions.includes(role)
                          }
                        )}
                      >
                        {<IconRoute size={20} />} {route.name}
                      </Link>
                    </SheetClose>
                  )
                })}
                <button className='flex items-center gap-4 whitespace-nowrap group'>
                  <div className='flex items-center gap-4 py-3 border-y border-_gray-border dark:border-_dark-gray w-full'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src={user?.imageUrl}
                        alt={user?.username ?? ''}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start'>
                      <span className='text-xs font-bold text-_main dark:text-_white'>
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className='text-[10px] font-normal leading-tight capitalize'>
                        {role}
                      </span>
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
