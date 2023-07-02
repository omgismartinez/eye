'use client'

import {
    BadgeCheck,
    BarChart4,
    LogOut,
    Settings,
    Users
} from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <aside
            className='
                fixed
                top-0
                z-30
                -translate-x-full 
                lg:translate-x-0
                border-r
                border-_gray-border
                bg-_white
                pt-[73px]
                pb-6
                min-h-screen
                w-72
            '
        >
            <h1 className='text-_main font-medium text-xs uppercase px-4 py-6'>Menu</h1>
            <div className='px-4'>
                <section className='flex flex-col justify-between gap-1 min-h-[650px]'>
                    <div className='flex flex-col gap-2 text-_gray-808080 text-sm font-bold'>
                        <div className='flex flex-col gap-4'>
                            <button className='flex items-center gap-4 py-3 whitespace-nowrap rounded-lg text-_main hover:text-_main/80'>
                                <BarChart4 size={18} /> Administrar Diagnósticos
                            </button>
                            <div className='flex gap-6 pl-6p'>
                                <div className='px-[10px]'>
                                    <div className='w-[2px] h-[120px] bg-_gray-border' />
                                </div>
                                <div className='flex flex-col gap-1 font-semibold text-_gray-C2C2C2'>
                                    <Link
                                        href='/new'
                                        className={clsx(`flex items-center gap-4 px-6 py-3 w-full whitespace-nowrap rounded-lg hover:bg-_gray-select`, {
                                            'bg-_gray-select text-_main': pathname === '/new'
                                        })}>
                                        Nuevo Diagnóstico
                                    </Link>
                                    <Link
                                        href='/all'
                                        className={clsx(`flex items-center gap-4 px-6 py-3 w-full whitespace-nowrap rounded-lg hover:bg-_gray-select`, {
                                            'bg-_gray-select text-_main': pathname === '/all'
                                        })}>
                                        Todos los Diagnósticos
                                    </Link>
                                    <button className='flex items-center gap-4 px-6 py-3 whitespace-nowrap rounded-lg hover:bg-_gray-select'>
                                        Nuevo Diagnóstico
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Link
                            href='/patients'
                            className={clsx('flex items-center gap-4 py-3 whitespace-nowrap rounded-lg hover:text-_main/80', {
                                'text-_main': pathname === '/patients'
                            })}>
                            <Users size={18} /> Administrar Pacientes
                        </Link>
                        <Link
                            href='/terms'
                            className={clsx('flex items-center gap-4 py-3 whitespace-nowrap rounded-lg hover:text-_main/80', {
                                'text-_main': pathname === '/terms'
                            })}>
                            <BadgeCheck size={18} /> Términos y Condiciones
                        </Link>
                    </div>
                    <div className='flex flex-col gap-6 text-_gray-C2C2C2 text-sm font-bold'>
                        <div className='flex flex-col gap-2 text-_gray-808080'>
                            <Link
                                href='/account'
                                className={clsx('flex items-center gap-4 px-6p py-3 whitespace-nowrap rounded-lg hover:text-_main/80', {
                                    'text-_main': pathname === '/account'
                                })}>
                                <Settings size={18} /> Cuenta y Perfil
                            </Link>
                            <button className='flex items-center gap-4 px-6p whitespace-nowrap group'>
                                <div className='flex items-center gap-4 py-3 border-y border-_gray-border w-full'>
                                    <div className='w-8 h-8 rounded-full bg-_main group-hover:bg-_main/80' />
                                    <div className='flex flex-col items-start'>
                                        <span className='text-xs font-bold text-_main'>Alvaro Martinez</span>
                                        <span className='text-[10px] font-normal leading-tight'>Administrador</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className='w-full'>
                            <button className='px-6 py-3 rounded-lg bg-_main hover:bg-_main/80 w-full'>
                                <span className='flex items-center justify-between gap-4 whitespace-nowrap text-xs text-_white font-normal'>
                                    Desconectar <LogOut size={18} />
                                </span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </aside>
    )
}
