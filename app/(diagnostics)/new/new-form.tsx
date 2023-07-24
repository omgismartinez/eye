'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_RECOMMENDED_IMAGE_SIZE = 2
const MAX_FILE_SIZE = MAX_RECOMMENDED_IMAGE_SIZE * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const newDiagnosticsFormSchema = z.object({
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Maximo tamaño de archivo: ${MAX_RECOMMENDED_IMAGE_SIZE}MB`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            `Solo se permiten los siguientes tipos de archivo: ${ACCEPTED_IMAGE_TYPES.join(', ')}`
        ),
    name: z
        .string()
        .min(2, {
            message: 'El nombre del paciente debe tener al menos 2 caracteres.',
        })
        .max(30, {
            message: 'El nombre del paciente no debe tener más de 30 caracteres.',
        }),
    prediction: z
        .string(),
    age: z
        .number(),
    extra: z
        .string()
        .max(160)
        .min(4)
        .optional(),
    gender: z
        .string(),
})

type NewDiagnosticsFormValues = z.infer<typeof newDiagnosticsFormSchema>

const defaultValues: Partial<NewDiagnosticsFormValues> = {
    name: 'Alvaro Martinez Martinez',
    prediction: 'Sin predicción',
    age: 23,
    extra: `El paciente no presenta ninguna enfermedad.`,
    gender: 'Masculino',
}

export default function NewForm() {
    const form = useForm<NewDiagnosticsFormValues>({
        resolver: zodResolver(newDiagnosticsFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    function onSubmit(data: NewDiagnosticsFormValues) {
        // TODO: Send data to API
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex flex-col gap-10'>
                                    <div className='border border-_gray-border' />
                                    <label htmlFor='upload'>
                                        <div className={`
                                                flex
                                                flex-col
                                                items-center
                                                justify-center
                                                gap-5
                                                h-80
                                                bg-_gray-F9F9F9
                                                hover:bg-_gray-select
                                                cursor-pointer
                                                border-2
                                                border-dashed
                                                border-_gray-808080
                                                rounded-lg
                                                p-4
                                                relative
                                            `}
                                        >
                                            <ImageIcon size={28} />
                                            <div className='flex flex-col items-center gap-3'>
                                                <h1 className='font-bold text-base'>Subir Media</h1>
                                                <p className='text-xs text-_gray-808080'>
                                                    Las imágenes deben tener menos de <strong>${MAX_RECOMMENDED_IMAGE_SIZE} MB</strong> de tamaño.
                                                </p>
                                                <Button type='button' className='px-10 rounded-xl pointer-events-none'>
                                                    Subir
                                                </Button>
                                            </div>
                                            <input type='file' id='upload' className='sr-only bottom-20' required {...field} />
                                        </div>
                                    </label>
                                    <div className='border border-_gray-border' />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div>
                    <h1 className='text-base font-bold text-center my-4'>Datos del paciente</h1>
                    <div className='flex flex-col gap-3'>
                        <div className='grid grid-cols-3 grid-rows-3 gap-3'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='col-span-2'>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input className='bg-_gray-F9F9F9' placeholder='Paciente' autoComplete='off' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='prediction'
                                render={({ field }) => (
                                    <FormItem className='col-span-1'>
                                        <FormLabel>Predicción</FormLabel>
                                        <FormControl>
                                            <Input className='bg-_gray-F9F9F9' placeholder='Paciente' autoComplete='off' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <div className='flex flex-col gap-2 col-span-1'>
                                <label htmlFor='prediccion' className='text-xs font-medium'>Prediccion</label>
                                <div className='px-5 py-3 bg-_main text-_white rounded-lg'>
                                    <input type='text' id='prediccion' disabled className='w-full bg-transparent outline-none text-sm font-semibold' placeholder='Sin predicción' />
                                </div>
                            </div> */}
                            <div className='flex flex-col gap-2 col-span-1'>
                                <label htmlFor='edad' className='text-xs font-medium'>Edad</label>
                                <div className='px-5 py-3 bg-_gray-F9F9F9 rounded-lg'>
                                    <input type='number' id='edad' max={150} min={10} className='w-full bg-transparent outline-none text-sm font-semibold' placeholder='18' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 col-span-2 row-span-2'>
                                <label htmlFor='extra' className='text-xs font-medium'>Datos adicionales</label>
                                <div className='px-5 py-3 bg-_gray-F9F9F9 rounded-lg h-full'>
                                    <textarea id='extra' rows={5} className='w-full bg-transparent outline-none text-sm font-semibold' placeholder='Escribe datos adicionales del paciente' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 col-span-1'>
                                <label htmlFor='sexo' className='text-xs font-medium'>Sexo</label>
                                <div className='px-5 py-3 bg-_gray-F9F9F9 rounded-lg'>
                                    <select name='sexo' id='sexo' className='w-full bg-transparent outline-none text-sm font-semibold' >
                                        <option value='masculino'>Masculino</option>
                                        <option value='femenino'>Femenino</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <Button>Predecir</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}
