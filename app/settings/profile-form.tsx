'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
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
import { Textarea } from '@/components/ui/textarea'

const profileFormSchema = z.object({
    name: z
        .string({
            required_error: 'Por favor ingresa un nombre de usuario.',
        })
        .min(2, {
            message: 'El nombre de usuario debe tener al menos 2 caracteres.',
        })
        .max(30, {
            message: 'El nombre de usuario no debe tener más de 30 caracteres.',
        }),
    bio: z.string().max(160).min(4),
    urls: z
        .array(
            z.object({
                value: z.string().url({ message: 'Por favor ingresa una URL valida.' }),
            })
        )
        .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    name: 'Alvaro Martinez Martinez',
    bio: `I'm a software engineer and I love to build things.`,
    urls: [
        { value: 'https://martinez.vercel.app' },
        { value: 'https://twitter.com/omgismartinez' },
    ],
}

export function ProfileForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    const { fields, append } = useFieldArray({
        name: 'urls',
        control: form.control,
    })

    function onSubmit(data: ProfileFormValues) {
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
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder='shadcn' {...field} />
                            </FormControl>
                            <FormDescription>
                                Esto es tu nombre publico. Puede ser tu nombre real o un pseudonimo.
                                Solo puedes cambiarlo una vez cada 30 dias.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Tell us a little bit about yourself'
                                    className='resize-none'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Escribe una breve descripción sobre ti.
                                Puedes usar hasta 160 caracteres.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    {fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`urls.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                                        URLs
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                                        Agrega enlaces a tu sitio web, blog o perfiles de redes sociales.
                                    </FormDescription>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        className='mt-2'
                        onClick={() => append({ value: '' })}
                    >
                        Agregar URL
                    </Button>
                </div>
                <Button type='submit'>Actualizar perfil</Button>
            </form>
        </Form>
    )
}