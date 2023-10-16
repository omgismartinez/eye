import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function AuthLayout ({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (user?.privateMetadata.role) redirect('/')
  return (
    <main className='container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 px-4 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          Eye
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;La lámpara del cuerpo es el ojo; así que, si tu ojo es sincero, todo tu cuerpo estará lleno de luz;&rdquo;
            </p>
            <footer className='text-sm italic'>Mateo 6:22</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        {children}
      </div>
    </main>
  )
}
