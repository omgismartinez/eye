'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { CalendarIcon, ChevronsUpDownIcon, CheckIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'

const accountFormSchema = z.object({
    email: z
        .string({
            required_error: 'Por favor selecciona un email para mostrar.',
        })
        .email(),
    dob: z.date({
        required_error: 'Fecha de nacimiento requerida.',
    }),
    language: z.string({
        required_error: 'Por favor selecciona un idioma.',
    }),
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
    { label: 'Chinese', value: 'zh' },
] as const

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
    email: 'martnzomg@gmail.com',
    dob: new Date('2000-04-16'),
    language: 'es',
}

export function AccountForm() {
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    function onSubmit(data: AccountFormValues) {
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
                                    // value={field.value}
                                    defaultValue={field.value}
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
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[240px] pl-3 text-left font-normal',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Elije una fecha</span>
                                            )}
                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0' align='start'>
                                    <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={() => field.onChange}
                                        disabled={(date: Date) =>
                                            date > new Date() || date < new Date('1900-01-01')
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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