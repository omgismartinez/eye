'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<{
    href: string
    title: string
  }>
}

export function SidebarNav ({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
        <nav
            className={cn(
              'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
              className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'justify-start px-4 py-3 rounded-lg font-semibold text-sm text-_gray-C2C2C2 hover:bg-_gray-select dark:hover:bg-_dark-gray',
                      pathname === item.href && 'bg-_gray-select text-_main dark:bg-_dark-gray dark:text-_white'
                    )}>
                    {item.title}
                </Link>
            ))}
        </nav>
  )
}
