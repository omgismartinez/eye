'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    const routes = {
        '/new': 'Nuevo Diagnóstico',
        '/all': 'Todos los Diagnósticos',
        '/patients': 'Administrar Pacientes',
        '/terms': 'Términos y Condiciones',
        '/settings': 'Configuración',
    }

    return (
        <nav className='fixed inset-x-0 z-50 border-b bg-_white/50 backdrop-blur-sm border-_gray-border'>
            <div className='flex max-w-screen-2xl mx-auto'>
                <div>
                    <div className='lg:w-72 p-4 lg:border-r border-_gray-border'>
                        <div className='bg-_main w-10 h-10 rounded-full' />
                    </div>
                </div>
                <div className='flex items-center lg:px-6 py-4 w-full'>
                    {pathname !== '/' && (
                        <Link href='/' className='bg-_gray-F7F7F7 hidden lg:block rounded-full p-1'>
                            <ChevronLeft size={18} />
                        </Link>
                    )}
                    <h2 className='text-_main font-bold text-base lg:ml-6 whitespace-nowrap'>
                        {routes[pathname as keyof typeof routes]}
                    </h2>
                </div>
            </div>
        </nav>
    )
}
