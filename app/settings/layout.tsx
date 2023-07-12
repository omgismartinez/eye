import { Metadata } from 'next'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './components/sidebar'

export const metadata: Metadata = {
    title: 'Configuración',
    description: 'Administra la configuración de tu cuenta y establezca las preferencias',
}

const sidebarNavItems = [
    {
        title: 'Perfil',
        href: '/settings',
    },
    {
        title: 'Cuenta',
        href: '/settings/account',
    },
    {
        title: 'Apariencia',
        href: '/settings/appearance',
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
                    Administrar la configuración de su cuenta y establecer las preferencias de su perfil.
                </p>
            </div>
            <Separator className='my-6' />
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0'>
                <aside className='lg:w-1/5'>
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className='flex-1 lg:max-w-2xl'>{children}</div>
            </div>
        </div>
    )
}