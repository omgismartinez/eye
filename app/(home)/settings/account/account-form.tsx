'use client'

import * as z from 'zod'
import { type User } from '@clerk/nextjs/dist/types/server'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import { ChevronsUpDownIcon, CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/date-picker'

const accountFormSchema = z.object({
  email: z
    .string({
      required_error: 'Por favor selecciona un email para mostrar.'
    })
    .email(),
  dob: z.date({
    required_error: 'Fecha de nacimiento requerida.'
  }),
  language: z.string({
    required_error: 'Por favor selecciona un idioma.'
  })
})

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' }
] as const

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm ({ user }: { user: User | null }) {
  const defaultValues: Partial<AccountFormValues> = {
    email: user?.emailAddresses[0].emailAddress ?? '',
    dob: user?.birthday !== '' && user?.birthday !== undefined ? new Date(user?.birthday) : new Date(user?.createdAt ?? ''),
    language: user?.privateMetadata.language as string ?? 'es'
  }

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
    mode: 'onChange'
  })

  function onSubmit (data: AccountFormValues) {
    // toast({
    //     title: 'You submitted the following values:',
    //     description: (
    //         <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //             <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //         </pre>
    //     ),
    // })
  }

  return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
                                    placeholder='Ingresa tu correo electrónico'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Este correo electrónico se mostrará en tu perfil y se utilizará
                                para notificaciones.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='dob'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Fecha de nacimiento</FormLabel>
                        <FormControl>
                          <DatePicker
                            currentDate={field.value}
                            onSelect={(date) => field.onChange(date)}
                          />
                        </FormControl>
                        <FormDescription>
                          Tu fecha de nacimiento se usa para calcular tu edad.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='language'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Idioma</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            className={cn(
                                              'w-[200px] justify-between',
                                              !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value
                                              ? languages.find(
                                                (language) => language.value === field.value
                                              )?.label
                                              : 'Selecciona un idioma'}
                                            <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='w-[200px] p-0'>
                                    <Command>
                                        <CommandInput placeholder='Buscar idioma...' />
                                        <CommandEmpty>No se encontró ningún idioma.</CommandEmpty>
                                        <CommandGroup>
                                            {languages.map((language) => (
                                                <CommandItem
                                                    value={language.value}
                                                    key={language.value}
                                                    onSelect={(value) => {
                                                      form.setValue('language', value)
                                                    }}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                          'mr-2 h-4 w-4',
                                                          language.value === field.value
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                        )}
                                                    />
                                                    {language.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Este es el idioma que se utilizará en la interfaz de usuario.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Actualizar cuenta</Button>
            </form>
        </Form>
  )
}
