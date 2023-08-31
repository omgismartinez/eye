import Link from 'next/link'
import { type Metadata } from 'next'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { LoginAuthForm } from './login-form'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Inicia sesión y administra tus pacientes.'
}

export default function LoginPage () {
  return (
    <div>
      <Link
        href='/signup'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Crear cuenta
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Inicia sesión
          </h1>
          <p className='text-sm text-muted-foreground'>
            Accede a tu cuenta y administra tus pacientes
          </p>
        </div>
        <LoginAuthForm />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          Al hacer clic en continuar, acepta nuestros{' '}
          <Link
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Términos de servicio
          </Link>{' '}
          y{' '}
          <Link
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Política de privacidad
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
