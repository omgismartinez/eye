'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_RECOMMENDED_IMAGE_SIZE = 4
const MAX_FILE_SIZE = MAX_RECOMMENDED_IMAGE_SIZE * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const newDiagnosticsFormSchema = z.object({
    image: z
        .custom<File>()
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            `Los formatos soportados son: ${ACCEPTED_IMAGE_TYPES.map((type) => '.' + type.split('/')[1]).join(' | ')}`
        )
        .refine((file) => file.size <= MAX_FILE_SIZE, `Maximo tamaño de archivo: ${MAX_RECOMMENDED_IMAGE_SIZE}MB`)
        .nullable()
    ,
    name: z
        .string()
        .min(2, {
            message: 'El nombre del paciente debe tener al menos 2 caracteres.',
        })
        .max(30, {
            message: 'El nombre del paciente no debe tener más de 30 caracteres.',
        }),
    prediction: z
        .string()
        .optional(),
    age: z
        .coerce
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
    gender: 'M',
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
                                                    Las imágenes deben tener menos de <strong>{MAX_RECOMMENDED_IMAGE_SIZE} MB</strong> de tamaño.
                                                </p>
                                                <Button type='button' className='px-10 rounded-xl pointer-events-none'>
                                                    Subir
                                                </Button>
                                            </div>
                                            <input
                                                type='file'
                                                id='upload'
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        field.onChange(e.target.files && e.target.files[0])
                                                    }
                                                }}
                                                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                                                className='sr-only bottom-20'
                                                required
                                            />
                                            <FormMessage className='absolute inset-x-0 bottom-12 text-center' />
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
                                            <Input className='bg-_gray-F9F9F9' placeholder='Paciente' autoComplete='off' required {...field} />
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
                                            <Input disabled className='bg-_main text-_white' placeholder='Paciente' autoComplete='off' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='age'
                                render={({ field }) => (
                                    <FormItem className='col-span-1'>
                                        <FormLabel>Edad</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                max={150}
                                                min={10}
                                                className='bg-_gray-F9F9F9'
                                                placeholder='18'
                                                autoComplete='off'
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='extra'
                                render={({ field }) => (
                                    <FormItem className='col-span-2 row-span-2'>
                                        <FormLabel>Datos adicionales</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={5}
                                                className='bg-_gray-F9F9F9'
                                                placeholder='Escribe datos adicionales del paciente'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='gender'
                                render={({ field }) => (
                                    <FormItem className='col-span-1'>
                                        <FormLabel>Género</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecciona una opción' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='M'>Masculino</SelectItem>
                                                <SelectItem value='F'>Femenino</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button>Predecir</Button>
                    </div>
                </div>
            </form>
        </Form >
    )
}
