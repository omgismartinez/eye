'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { catchClerkError, cn } from '@/lib/utils'
import { startedSchema } from '@/lib/validations/auth'
import { CheckIcon } from 'lucide-react'
import { type z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { LabelInfoForm } from './components/label-info-form'
import { useTransition } from 'react'
import { startedAction } from '@/app/actions/user'
import { Icons } from '../icons'

type StartedFormValues = z.infer<typeof startedSchema>

export function StartedForm () {
  const [isPending, startTransition] = useTransition()

  const form = useForm<StartedFormValues>({
    resolver: zodResolver(startedSchema)
  })

  async function onSubmit (data: StartedFormValues) {
    startTransition(async () => {
      try {
        await startedAction(data)
      } catch (err) {
        console.error(err)
        catchClerkError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(async (data) => await onSubmit(data))} className='space-y-8'>
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange as any}
                defaultValue={field.value}
                value={field.value}
                className='grid grid-cols-2 gap-8 pt-2'
              >
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:bg-secondary/20'>
                    <FormControl>
                      <RadioGroupItem value='PATIENT' className='sr-only' />
                    </FormControl>
                    <Card className='hover:bg-secondary/20 h-full'>
                      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3 p-4'>
                        <CardTitle className='text-sm font-medium'>
                          <div className='p-2 border rounded-md bg-secondary'>
                            <svg
                              viewBox='0 0 24 24'
                              fill='currentColor'
                              className='h-6 w-6'
                            >
                              <path fill='none' d='M0 0h24v24H0z' />
                              <path d='M17.841 15.659l.176.177.178-.177a2.25 2.25 0 013.182 3.182l-3.36 3.359-3.358-3.359a2.25 2.25 0 013.182-3.182zM12 14v2a6 6 0 00-6 6H4a8 8 0 017.75-7.996L12 14zm0-13c3.315 0 6 2.685 6 6a5.998 5.998 0 01-5.775 5.996L12 13c-3.315 0-6-2.685-6-6a5.998 5.998 0 015.775-5.996L12 1zm0 2C9.79 3 8 4.79 8 7s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z' />
                            </svg>
                          </div>
                        </CardTitle>
                        <div className={cn(
                          'p-[2px] rounded-full bg-primary',
                          field.value === 'PATIENT'
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}>
                          <CheckIcon className='ml-auto h-4 w-4 text-background' />
                        </div>
                      </CardHeader>
                      <CardContent className='p-4 pt-0 space-y-1'>
                        <div className='text-base font-bold'>Paciente</div>
                        <p className='text-xs text-muted-foreground'>
                          Accede a tus diagnósticos.
                        </p>
                      </CardContent>
                    </Card>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:bg-secondary/20'>
                    <FormControl>
                      <RadioGroupItem value='DOCTOR' className='sr-only' />
                    </FormControl>
                    <Card className='hover:bg-secondary/20 h-full'>
                      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3 p-4'>
                        <CardTitle className='text-sm font-medium'>
                          <div className='p-2 border rounded-md bg-secondary'>
                            <svg
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='lucide lucide-stethoscope'
                            >
                                <path d='M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3'/><path d='M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4'/><circle cx='20' cy='10' r='2'/>
                            </svg>
                          </div>
                        </CardTitle>
                        <div className={cn(
                          'p-[2px] rounded-full bg-primary',
                          field.value === 'DOCTOR'
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}>
                          <CheckIcon className='ml-auto h-4 w-4 text-background' />
                        </div>
                      </CardHeader>
                      <CardContent className='p-4 pt-0 space-y-1'>
                        <div className='text-base font-bold'>
                          Doctor {' '}
                          <LabelInfoForm>
                            Una vez registrado, tu cuenta será revisada por un administrador.
                          </LabelInfoForm>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          Administra tus pacientes.
                        </p>
                      </CardContent>
                    </Card>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button type='submit'>
            {isPending && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Continuar
          </Button>
        </div>
      </form>
    </Form>
  )
}
