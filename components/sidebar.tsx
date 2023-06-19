import {
    BadgeCheck,
    BarChart4,
    LogOut,
    Settings,
    Users
} from 'lucide-react'

export default function Sidebar() {
    return (
        <aside className='border-r-2 border-_gray-border'>
            <h1 className='text-_main font-medium text-xs uppercase px-4 py-6'>Menu</h1>
            <div className='px-4'>
                <section className='flex flex-col justify-between gap-1 min-h-[600px]'>
                    <div className='flex flex-col gap-2 text-_gray-C2C2C2 text-sm font-bold'>
                        <div className='flex flex-col gap-4'>
                            <button className='flex items-center gap-4 px-6p py-3 whitespace-nowrap rounded-lg text-_main hover:text-_main/80'>
                                <BarChart4 /> Administrar Diagnósticos
                            </button>
                            <div className='flex gap-6 pl-6p'>
                                <div className='px-[10px]'>
                                    <div className='w-[2px] h-[120px] bg-_gray-border' />
                                </div>
                                <div className='flex flex-col gap-1 font-semibold'>
                                    <button className='flex items-center gap-4 px-6 py-3 whitespace-nowrap rounded-lg bg-_gray-select text-_main'>
                                        Nuevo Diagnóstico
                                    </button>
                                    <button className='flex items-center gap-4 px-6 py-3 whitespace-nowrap rounded-lg hover:bg-_gray-select'>
                                        Todos los Diagnósticos
                                    </button>
                                    <button className='flex items-center gap-4 px-6 py-3 whitespace-nowrap rounded-lg hover:bg-_gray-select'>
                                        Nuevo Diagnóstico
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className='flex items-center gap-4 px-6p py-3 whitespace-nowrap rounded-lg hover:text-_main/80'>
                            <Users /> Administrar Pacientes
                        </button>
                        <button className='flex items-center gap-4 px-6p py-3 whitespace-nowrap rounded-lg hover:text-_main/80'>
                            <BadgeCheck /> Soporte y Términos
                        </button>
                    </div>
                    <div className='flex flex-col gap-6 text-_gray-C2C2C2 text-sm font-bold'>
                        <div className='flex flex-col gap-2'>
                            <button className='flex items-center gap-4 px-6p py-3 whitespace-nowrap rounded-lg hover:text-_main/80'>
                                <Settings /> Cuenta y Perfil
                            </button>
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
                                <span className='flex items-center justify-between gap-4 whitespace-nowrap text-xs text-_white font-medium'>
                                    Desconectar <LogOut />
                                </span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </aside>
    )
}
