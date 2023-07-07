import { Metadata } from 'next'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './components/sidebar'


export const metadata: Metadata = {
    title: 'Cuenta y Perfil',
    description: 'Administra tu cuenta y perfil.',
}

const sidebarNavItems = [
    {
        title: 'Cuenta',
        href: '/account',
    },
    {
        title: 'Perfil',
        href: '/account/profile',
    },
    {
        title: 'Apariencia',
        href: '/account/appearance',
    },
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className='space-y-6'>
            <div className='space-y-0.5'>
                <h2 className='text-2xl font-bold tracking-tight'>Configuración</h2>
                <p className='text-_gray-808080 text-sm'>
                    Administra tu perfil, apariencia y configuración de cuenta.
                </p>
            </div>
            <Separator className='my-6' />
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <aside className='lg:w-1/5'>
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className='flex-1 lg:max-w-2xl'>{children}</div>
            </div>
        </div>
    )
}