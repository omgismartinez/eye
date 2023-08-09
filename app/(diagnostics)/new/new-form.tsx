'use client'

import { useState } from 'react'
import type { ImageClassificationOutput } from '@huggingface/inference'
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
import { Dot, ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'

const MAX_RECOMMENDED_IMAGE_SIZE = 4
const MAX_FILE_SIZE = MAX_RECOMMENDED_IMAGE_SIZE * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const newDiagnosticFormSchema = z.object({
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

export type NewDiagnosticFormValues = z.infer<typeof newDiagnosticFormSchema>

const defaultValues: Partial<NewDiagnosticFormValues> = {
    name: 'Alvaro Martinez Martinez',
    prediction: 'Sin predicción',
    age: 23,
    extra: `El paciente no presenta ninguna enfermedad.`,
    gender: 'M',
}

export default function NewForm() {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const form = useForm<NewDiagnosticFormValues>({
        resolver: zodResolver(newDiagnosticFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    async function onSubmit(data: NewDiagnosticFormValues) {
        setLoading(true)
        const formData = new FormData()
        formData.append('image', data.image as File)
        formData.append('name', data.name)
        formData.append('age', data.age.toString())
        formData.append('extra', data.extra as string)
        formData.append('gender', data.gender)

        const res = await fetch('/api/classification', {
            method: 'POST',
            body: formData,
        })

        const prediction: ImageClassificationOutput = await res.json()
        form.setValue('prediction', prediction[0].label)
        setLoading(false)
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
                                        <div
                                            data-active={!!image}
                                            data-loading={loading}
                                            className={`
                                                flex
                                                items-center
                                                justify-center
                                                h-80
                                                bg-_gray-F9F9F9
                                                hover:bg-_gray-select
                                                cursor-pointer
                                                border-2
                                                border-dashed
                                                border-_gray-808080
                                                data-[active="true"]:border-_gray-C2C2C2
                                                data-[loading="true"]:animate-pulse
                                                rounded-lg
                                                overflow-hidden
                                                p-4
                                                relative
                                            `}
                                        >
                                            {image && <Image alt='image-preview' src={URL.createObjectURL(image)} className='object-cover opacity-50' fill />}
                                            <div className='z-10 p-4 rounded-lg flex flex-col justify-center items-center gap-5'>
                                                <ImageIcon size={28} />
                                                <div className='flex flex-col items-center gap-3'>
                                                    <h1 className='font-bold text-base'>Subir Media</h1>
                                                    <p data-active={!!image} className='text-xs text-_gray-808080 backdrop-blur-sm text-center data-[active="true"]:text-_main'>
                                                        La imagen debe tener un tamaño inferior a <strong>{MAX_RECOMMENDED_IMAGE_SIZE} MB</strong>.
                                                    </p>
                                                    <Button type='button' className='px-10 rounded-xl pointer-events-none'>
                                                        Subir
                                                    </Button>
                                                </div>
                                            </div>
                                            <input
                                                type='file'
                                                id='upload'
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        field.onChange(e.target.files && e.target.files[0])
                                                        setImage(e.target.files[0])
                                                    } else {
                                                        field.onChange(null)
                                                        setImage(null)
                                                    }
                                                }}
                                                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                                                className='sr-only bottom-20'
                                                disabled={loading}
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
                                            <Input
                                                disabled={field.value?.includes('Sin predicción') || loading}
                                                className='bg-_main text-_white capitalize'
                                                placeholder='Paciente'
                                                autoComplete='off'
                                                readOnly
                                                {...field}
                                            />
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
                        <Button disabled={loading}>
                            <div className='relative'>
                                Predecir
                                <div
                                    data-loading={loading}
                                    className='absolute -top-1 -right-10 flex opacity-0 -space-x-4 ease-in-out duration-300 data-[loading="true"]:opacity-100'
                                >
                                    <Dot className='text-_white animate-pulse m-0 duration-700 delay-1000' />
                                    <Dot className='text-_white animate-pulse m-0 duration-700 delay-500' />
                                    <Dot className='text-_white animate-pulse m-0 duration-700' />
                                </div>
                            </div>
                        </Button>
                    </div>
                </div>
            </form>
        </Form >
    )
}
