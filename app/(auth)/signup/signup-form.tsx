'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { OAuthButtons } from '@/components/auth/oauth-buttons'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupAuthForm ({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit (event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Correo electrónico
            </Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
                <svg
                  className='mr-2 h-4 w-4 animate-spin'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
                </svg>
            )}
            Continuar
          </Button>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            O continua con
          </span>
        </div>
      </div>
      <OAuthButtons />
    </div>
  )
}
