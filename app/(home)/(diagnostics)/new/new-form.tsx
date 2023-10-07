'use client'

import { useState } from 'react'
import { type ImageClassificationOutput } from '@huggingface/inference'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dot, ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useAuth } from '@clerk/nextjs'
import DiagnosticForm from '@/components/forms/diagnostic-form'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_RECOMMENDED_IMAGE_SIZE,
  newDiagnosticFormSchema
} from '@/lib/validations/diagnostic'

type NewDiagnosticFormValues = z.infer<typeof newDiagnosticFormSchema>

const defaultValues: Partial<NewDiagnosticFormValues> = {
  doctor: 'Alvaro Martinez Martinez',
  prediction: 'Sin predicción',
  eye: 'RIGHT',
  extra: 'El paciente no presenta ninguna enfermedad.',
  firstName: 'Alvaro',
  lastName: 'Martinez Martinez',
  email: 'martinez@example.com',
  age: 23,
  gender: 'M',
  phone: '1234567890'
}

export default function NewForm () {
  const { userId } = useAuth()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [predictions, setPredictions] = useState<ImageClassificationOutput>([])

  const form = useForm<NewDiagnosticFormValues>({
    resolver: zodResolver(newDiagnosticFormSchema),
    defaultValues,
    mode: 'onChange'
  })

  async function onSubmit (data: NewDiagnosticFormValues) {
    setLoading(true)

    const formData = new FormData()
    formData.append('image', data.image as File)

    const classification = async () => {
      const res = await fetch('/api/classification', {
        method: 'POST',
        body: formData
      })

      const prediction: ImageClassificationOutput = await res.json()

      form.setValue('prediction', prediction[0].label)
      setPredictions(prediction)

      return prediction
    }

    const diagnostic = async (classification: ImageClassificationOutput) => {
      // Diagnostic
      formData.append('eye', data.eye)
      formData.append('extra', data.extra as string)
      formData.append('classification', JSON.stringify(classification))
      formData.append('prediction', classification[0].label)
      formData.append('disease', data.disease)
      formData.append('doctor', userId as string)

      // Patient
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('age', data.age.toString())
      formData.append('gender', data.gender)
      formData.append('address', data.address as string)
      formData.append('phone', data.phone)
      formData.append('birthdate', data.birthdate as unknown as string)
      formData.append('email', data.email)

      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        body: formData
      })

      const diagnostic = await res.json()

      return diagnostic
    }

    toast.promise(classification, {
      loading: 'Prediciendo imagen...',
      success: (classification) => {
        toast.promise(diagnostic(classification), {
          loading: 'Guardando diagnóstico...',
          success: 'Diagnóstico guardado exitosamente.',
          error: 'Error al guardar diagnóstico.'
        })
        return <span>Predicción exitosa: <strong className='capitalize'>{classification[0].label}</strong></span>
      },
      error: 'Error al predecir imagen.'
    })

    setLoading(false)
  }

  return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-8'>
                    <Separator className='h-[2px]' />
                    <FormField
                        control={form.control}
                        name='image'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
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
                                                dark:bg-_dark-gray/30
                                                dark:hover:bg-_dark-gray/20
                                                cursor-pointer
                                                border-2
                                                border-dashed
                                                border-_gray-808080
                                                data-[active="true"]:border-_gray-C2C2C2
                                                dark:border-_dark-gray
                                                dark:data-[active="true"]:border-_dark-gray/50
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
                                                    <p data-active={!!image} className='text-xs text-_gray-808080 backdrop-blur-sm text-center data-[active="true"]:text-_main dark:data-[active="true"]:text-_white'>
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
                                                  if (e.target.files?.[0]) {
                                                    field.onChange(e.target.files[0])
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
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Separator className='h-[2px]' />
                    <DiagnosticForm form={form} predictions={predictions} loading={loading} />
                    <section>
                        <h1 className='text-base font-bold text-center mb-4'>Datos del paciente</h1>
                        <div className='flex flex-col gap-6'>
                            <div className='grid grid-cols-3 gap-3'>
                                <FormField
                                    control={form.control}
                                    name='firstName'
                                    render={({ field }) => (
                                        <FormItem className='col-span-3 sm:col-span-1'>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Nombre del paciente' autoComplete='off' required {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='lastName'
                                    render={({ field }) => (
                                        <FormItem className='col-span-3 sm:col-span-2'>
                                            <FormLabel>Apellidos</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Apellidos del paciente'autoComplete='off' required {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem className='col-span-3'>
                                            <FormLabel>Correo electrónico</FormLabel>
                                            <FormControl>
                                                <Input placeholder='a@example.com' autoComplete='off' required {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='age'
                                    render={({ field }) => (
                                        <FormItem className='col-span-3 sm:col-span-1'>
                                            <FormLabel>Edad</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    max={150}
                                                    min={10}
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
                                    name='gender'
                                    render={({ field }) => (
                                        <FormItem className='col-span-3 sm:col-span-1'>
                                            <FormLabel>Género</FormLabel>
                                            <Select
                                                onValueChange={(value: NewDiagnosticFormValues['gender']) => field.onChange(value)}
                                                defaultValue={field.value}
                                                required
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Selecciona una opción' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent side='top'>
                                                    <SelectItem value='M'>Masculino</SelectItem>
                                                    <SelectItem value='F'>Femenino</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='phone'
                                    render={({ field }) => (
                                        <FormItem className='col-span-3 sm:col-span-1'>
                                            <FormLabel>Teléfono</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='tel'
                                                    placeholder='000-000-0000'
                                                    pattern='[0-9]{10}'
                                                    autoComplete='off'
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
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
                                        <Dot className='text-_white dark:text-_main animate-pulse m-0 duration-700 delay-1000' />
                                        <Dot className='text-_white dark:text-_main animate-pulse m-0 duration-700 delay-500' />
                                        <Dot className='text-_white dark:text-_main animate-pulse m-0 duration-700' />
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </section>
                </div>
            </form>
        </Form >
  )
}
