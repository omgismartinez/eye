import { ChevronLeft } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className='fixed inset-x-0 py-4 z-50 border-b border-_gray-border'>
            <div className='flex max-w-7xl mx-auto px-4'>
                <div>
                    <div className='w-[269px]'>
                        <div className='bg-_main w-10 h-10 rounded-full' />
                    </div>
                </div>
                <div className='flex items-center px-6'>
                    <div className='bg-_gray-F7F7F7 rounded-full p-1'>
                        <ChevronLeft size={18} />
                    </div>
                    <h2 className='text-_main font-bold text-base ml-6 whitespace-nowrap'>Nuevo Diagnóstico</h2>
                </div>
            </div>
        </nav>
    )
}
