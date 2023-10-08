'use client'

import { type z } from 'zod'
import { type Disease } from '@prisma/client'
import { type ImageClassificationOutput } from '@huggingface/inference'

import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_RECOMMENDED_IMAGE_SIZE,
  newDiagnosticFormSchema
} from '@/lib/validations/diagnostic'

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Dot,
  CheckIcon,
  ImageIcon,
  LayersIcon
} from 'lucide-react'
import { LabelInfoForm } from '@/components/forms/components/label-info-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Marker } from '@/components/marker'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'
import { DatePicker } from '../date-picker'

type DiagnosticFormValues = z.infer<typeof newDiagnosticFormSchema>

const defaultValues: Partial<DiagnosticFormValues> = {
  doctor: 'Alvaro Martinez Martinez',
  prediction: 'Sin predicción',
  eye: 'RIGHT',
  disease: 'dr',
  extra: 'El paciente no presenta ninguna enfermedad.',
  firstName: 'Alvaro',
  lastName: 'Martinez Martinez',
  email: 'martinez@example.com',
  age: 23,
  gender: 'M',
  phone: '1234567890',
  dob: new Date('2000-04-16'),
  address: 'Av. 000, Col. Centro',
  occupation: 'Estudiante'
}

export const diseases: Disease[] = [
  {
    id: 'c305f976-8e38-42b1-9fb7-d21b2e34f0da',
    key: 'dr',
    name: 'Retinopatía Diabética',
    description:
      `La retinopatía diabética es una complicación de la diabetes que afecta a los ojos. 
      Es causada por daño a los vasos sanguíneos del tejido sensible a la luz en la parte posterior del ojo (retina). 
      Al principio, la retinopatía diabética puede no causar síntomas o solo problemas de visión leves. 
      Con el tiempo, puede causar ceguera.`
  },
  {
    id: 'c305f976-8e38-42b1-9fb7-d21b2e34f0db',
    key: 'amd',
    name: 'Degeneración Macular',
    description:
      `La degeneración macular es una enfermedad ocular que afecta la parte central de la retina,
      que es la capa de tejido sensible a la luz en la parte posterior del ojo que registra las imágenes y las envía al cerebro a través del nervio óptico.
      La degeneración macular causa una pérdida de la visión central, pero la visión periférica (lateral) permanece intacta.`
  },
  {
    id: 'c305f976-8e38-42b1-9fb7-d21b2e34f0dc',
    key: 'gl',
    name: 'Glaucoma',
    description:
      `El glaucoma es una enfermedad ocular que daña el nervio óptico.
      El nervio óptico lleva información visual desde el ojo hasta el cerebro.
      En el glaucoma, el aumento de la presión ocular daña el nervio óptico y puede causar pérdida de la visión o ceguera.`
  },
  {
    id: 'c305f976-8e38-42b1-9fb7-d21b2e34f0dd',
    key: 'cataract',
    name: 'Cataratas',
    description:
      `Una catarata es un área nublada en el cristalino del ojo, una lente detrás de la pupila que enfoca la luz en la retina para obtener una imagen nítida.
      La lente de su ojo es en gran parte responsable de enfocar la luz que ingresa al ojo.
      Las cataratas son el resultado del envejecimiento natural del ojo.`
  },
  {
    id: 'c305f976-8e38-42b1-9fb7-d21b2e34f0de',
    key: 'hr',
    name: 'Hemorragia Retiniana',
    description:
      `La hemorragia retiniana es una hemorragia (sangrado) en la retina, el tejido sensible a la luz en la parte posterior del ojo.
      La retina es una capa delgada de tejido que cubre la parte posterior del ojo.
      La retina convierte la luz que ingresa al ojo en señales eléctricas que viajan a través del nervio óptico hasta el cerebro, donde se convierten en las imágenes que vemos.`
  }
]

export function DiagnosticForm () {
  const { userId } = useAuth()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [predictions, setPredictions] = useState<ImageClassificationOutput>([])
  const [open, setOpen] = useState(false)
  const [selectedDisease, setSelectedDisease] = useState<Disease>(diseases[0])

  const form = useForm<DiagnosticFormValues>({
    resolver: zodResolver(newDiagnosticFormSchema),
    defaultValues
  })

  async function onSubmit (data: DiagnosticFormValues) {
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
      formData.append('predictionKey', classification[0].label)
      formData.append('diseaseKey', data.disease)
      formData.append('doctorId', userId as string)

      // Patient
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('age', data.age.toString())
      formData.append('gender', data.gender)
      formData.append('occupation', data.occupation as string)
      formData.append('address', data.address as string)
      formData.append('phone', data.phone)
      formData.append('dob', data.dob as unknown as string)
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
          <section>
            <h1 className='text-base font-bold text-center mb-4'>Datos del diagnóstico</h1>
            <div className='grid grid-cols-3 gap-3'>
              <FormField
                control={form.control}
                name='doctor'
                render={({ field }) => (
                  <FormItem className='col-span-3'>
                    <FormLabel>Doctor</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder='Nombre del doctor'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='eye'
                render={({ field }) => (
                  <FormItem className='col-span-3 sm:col-span-1'>
                    <FormLabel className='flex items-center gap-2'>
                      Ojo
                      <LabelInfoForm>
                        Se debe seleccionar el ojo que se desea diagnosticar,
                        en caso de que se desee diagnosticar ambos ojos,
                        se debe realizar <strong>un diagnóstico por cada ojo</strong>.
                      </LabelInfoForm>
                    </FormLabel>
                      <FormControl>
                        <div className='grid grid-cols-2 p-1 bg-secondary rounded-md'>
                          <Button
                            onClick={() => field.onChange('LEFT')}
                            variant={field.value === 'LEFT' ? 'default' : 'ghost'}
                            className='text-sm h-8'
                            asChild
                          >
                            <Label>Izquierdo</Label>
                          </Button>
                          <Button
                            onClick={() => field.onChange('RIGHT')}
                            variant={field.value === 'RIGHT' ? 'default' : 'ghost'}
                            className='text-sm h-8'
                            asChild
                          >
                            <Label>Derecho</Label>
                          </Button>
                        </div>
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='disease'
                render={({ field }) => (
                  <FormItem className='col-span-3 sm:col-span-2'>
                    <FormLabel className='flex items-center gap-2'>
                      Enfermedad
                      <LabelInfoForm>
                        <strong>Las enfermedades estan ligadas a un modelo</strong> de inteligencia artificial
                        que se encarga de realizar el diagnóstico.
                      </LabelInfoForm>
                    </FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant='secondary'
                            role='combobox'
                            aria-label='Selecciona una enfermedad'
                            aria-expanded={open}
                            className='flex-1 justify-between w-full'
                          >
                            <span className='text-sm truncate'>
                              {selectedDisease ? selectedDisease.name : 'Selecciona una enfermedad'}
                            </span>
                            <Icons.caret className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='min-w-full p-0'>
                          <Command loop>
                            <CommandInput placeholder='Buscar enfermedad' />
                            <CommandEmpty>No se encontraron enfermedades</CommandEmpty>
                            <CommandGroup heading='Enfermedades'>
                              {diseases.map((disease) => (
                                <CommandItem
                                  key={disease.key}
                                  onSelect={() => {
                                    setSelectedDisease(disease)
                                    field.onChange(disease.key)
                                    setOpen(false)
                                  }}
                                >
                                  {disease.name}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      selectedDisease?.key === disease.key
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='prediction'
                render={({ field }) => (
                  <FormItem className='col-span-3'>
                    <FormLabel className='flex items-center gap-2'>
                      Predicción
                      <LabelInfoForm icon={predictions.length > 0 ? LayersIcon : null}>
                          {predictions.length > 0
                            ? (
                                <div className='flex flex-col gap-2'>
                                  <h1 className='text-base font-bold text-center'>Predicciones</h1>
                                  <div className='grid gap-3'>
                                      {predictions.length > 0 &&
                                      predictions.map((prediction) => {
                                        const value = Math.ceil((prediction.score / Math.max(...predictions.map((p) => p.score))) * 80)
                                        return (
                                          <div key={prediction.label} className='grid text-xs'>
                                            <div className='grid gap-1'>
                                              <Marker label={prediction.label} type={'badge'} value={value} />
                                              <div className='flex justify-between'>
                                                  <p className='capitalize text-xs'>{prediction.label}</p>
                                                  <p className='text-_gray-808080'>{(prediction.score).toFixed(3)}</p>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })}
                                  </div>
                                </div>
                              )
                            : (
                                <p>
                                  <strong>La predicción se realiza en base a la imagen cargada</strong>,
                                  por lo que se debe cargar una imagen para poder realizar la predicción.
                                  <br /><br />
                                  Después de cargar la imagen y llenar los campos, se debe esperar a que la predicción se realice,
                                  esto puede tardar unos segundos. Una vez que la predicción se haya realizado,
                                  se mostrará la predicción en este campo.
                                </p>
                              )}
                      </LabelInfoForm>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={field.value?.includes('Sin predicción') ?? loading}
                        className='bg-_main text-_white dark:bg-_white dark:text-_main capitalize'
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
                name='extra'
                render={({ field }) => (
                  <FormItem className='col-span-3'>
                    <FormLabel>Datos adicionales</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder='Escriba aquí los datos adicionales que considere necesarios para el diagnóstico'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
          <Separator className='h-[2px]' />
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
                        onValueChange={(value: DiagnosticFormValues['gender']) => field.onChange(value)}
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
                <FormField
                  control={form.control}
                  name='dob'
                  render={({ field }) => (
                    <FormItem className='col-span-3 sm:col-span-1'>
                      <FormLabel>Fecha de nacimiento</FormLabel>
                      <FormControl>
                        <DatePicker
                          currentDate={field.value}
                          onSelect={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='occupation'
                  render={({ field }) => (
                    <FormItem className='col-span-3 sm:col-span-1'>
                      <FormLabel>Ocupación</FormLabel>
                      <FormControl>
                        <Input placeholder='Estudiante' autoComplete='off' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem className='col-span-3 sm:col-span-1'>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder='Av. Centro, #000' autoComplete='off' {...field} />
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
