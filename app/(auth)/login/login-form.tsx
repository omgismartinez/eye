'use client'

import * as React from 'react'

import { catchClerkError, cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { authSchema } from '@/lib/validations/auth'
import { OAuthSignIn } from './oauth-login'
import { PasswordInput } from '@/components/password-input'
import { Icons } from '@/components/icons'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type LoginFormValues = z.infer<typeof authSchema>

const defaultValues: Partial<LoginFormValues> = {
  email: '',
  password: ''
}

export function LoginAuthForm ({ className, ...props }: AuthFormProps) {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [isPending, startTransition] = React.useTransition()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues
  })

  async function onSubmit (data: LoginFormValues) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const result = await signIn.create({
          identifier: data.email,
          password: data.password
        })

        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId })

          router.push(`${window.location.origin}/`)
        } else {
          /* Investigate why the login hasn't completed */
          console.log(result)
        }
      } catch (err) {
        catchClerkError(err)
      }
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <div className='grid gap-1'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='email'>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        placeholder='name@example.com'
                        type='email'
                        autoCapitalize='none'
                        autoComplete='email'
                        autoCorrect='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='password'>Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} placeholder='••••••••' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPending}>
              {isPending && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
              Continuar
            </Button>
          </div>
        </form>
      </Form>
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
      <OAuthSignIn />
    </div>
  )
}
