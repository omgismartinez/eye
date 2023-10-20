'use client'

import { type z } from 'zod'
import { type Disease } from '@prisma/client'
import { type ImageClassificationOutput } from '@huggingface/inference'
import { type ModelEntry } from '@huggingface/hub'
import { type User } from '@clerk/nextjs/server'

import Image from 'next/image'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { catchError, cn } from '@/lib/utils'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_RECOMMENDED_IMAGE_SIZE,
  diagnosticSchema
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
  CommandItem,
  CommandList,
  CommandLoading
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
import { DatePicker } from '@/components/date-picker'
import { Badge } from '@/components/ui/badge'
import { createDiagnosticAction, getDiseasesAction } from '@/app/actions/diagnostic'
import { getModelsAction, startClassificationAction } from '@/app/actions/huggingface'

type DiagnosticFormValues = z.infer<typeof diagnosticSchema>

interface DiagnosticFormProps {
  user: User | null
}

export function DiagnosticForm ({ user }: DiagnosticFormProps) {
  const [isPending, startTransition] = useTransition()
  const [isLoading, startInitialLoading] = useTransition()
  const [file, setFile] = useState<File | null>(null)
  const [classification, setClassification] = useState<ImageClassificationOutput>([])
  const [open, setOpen] = useState({ disease: false, model: false })
  const [diseases, setDiseases] = useState<Disease[]>([])
  const [models, setModels] = useState<ModelEntry[]>([])
  const [selected, setSelected] = useState<{ disease?: Disease, model?: ModelEntry }>()

  const form = useForm<DiagnosticFormValues>({
    resolver: zodResolver(diagnosticSchema),
    defaultValues: {
      doctor: `${user?.firstName} ${user?.lastName}`,
      prediction: 'Sin predicción',
      eye: 'RIGHT',
      extra: 'El paciente no presenta ninguna enfermedad.',
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@example.com',
      age: 23,
      gender: 'M',
      phone: '1234567890',
      dob: new Date('2000-04-16'),
      address: 'Av. 000, Col. Centro',
      occupation: 'Estudiante'
    }
  })

  useEffect(() => {
    startInitialLoading(async () => {
      try {
        const models = await getModelsAction()
        setModels(models)
        const diseases = await getDiseasesAction()
        setDiseases(diseases)

        // Set default values
        setSelected({
          model: models[0],
          disease: diseases[0]
        })
        form.setValue('model', models[0].name)
        form.setValue('disease', diseases[0].key)
      } catch (error) {
        catchError(error)
      }
    })
  }, [])

  async function onSubmit (data: DiagnosticFormValues) {
    const formData = new FormData()
    formData.append('file', file as File)

    startTransition(async () => {
      try {
        toast.promise(
          startClassificationAction({
            image: formData,
            model: data.model
          }), {
            loading: 'Prediciendo imagen...',
            success: (output) => {
              // Set classification
              setClassification(output)
              form.setValue('prediction', output[0].label)

              // Filter data
              const {
                image,
                doctor,
                prediction,
                ...dataFiltered
              } = data

              // Save diagnostic
              toast.promise(
                createDiagnosticAction({
                  classification: output,
                  imageFormData: formData,
                  doctor: user?.id as string,
                  prediction: output[0].label,
                  ...dataFiltered
                }), {
                  loading: 'Guardando diagnóstico...',
                  success: 'Diagnóstico guardado exitosamente.',
                  error: (err) => err
                }
              )

              return <>Predicción exitosa: <b className='capitalize'>{output[0].label}</b></>
            },
            error: (err) => err
          })
      } catch (error) {
        catchError(error)
      }
    })
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
                      data-active={!!file}
                      data-loading={isPending}
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
                      {file && <Image alt='image-preview' src={URL.createObjectURL(file)} className='object-cover opacity-50' fill />}
                      <div className='z-10 p-4 rounded-lg flex flex-col justify-center items-center gap-5'>
                        <ImageIcon size={28} />
                        <div className='flex flex-col items-center gap-3'>
                          <h1 className='font-bold text-base'>Subir Media</h1>
                          <p data-active={!!file} className='text-xs text-_gray-808080 backdrop-blur-sm text-center data-[active="true"]:text-_main dark:data-[active="true"]:text-_white'>
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
                            setFile(e.target.files[0])
                          } else {
                            field.onChange(null)
                            setFile(null)
                          }
                        }}
                        accept={ACCEPTED_IMAGE_TYPES.join(',')}
                        className='sr-only bottom-20'
                        disabled={isPending}
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
                      <Popover
                        open={open.disease}
                        onOpenChange={(open) => setOpen((prev) => ({ ...prev, disease: open }))}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant='secondary'
                            role='combobox'
                            aria-label='Selecciona una enfermedad'
                            aria-expanded={open.disease}
                            className='flex-1 justify-between w-full'
                          >
                            <span className='text-sm truncate'>
                              {selected?.disease ? selected.disease.name : 'Selecciona una enfermedad'}
                            </span>
                            <Icons.caret className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
                          <Command>
                            <CommandInput placeholder='Buscar enfermedad' />
                            <CommandEmpty>No se encontraron enfermedades</CommandEmpty>
                            <CommandList>
                              <CommandGroup heading='Enfermedades'>
                                {diseases.length === 0 &&
                                  <CommandLoading>
                                    <CommandItem>
                                      Buscando enfermedades...
                                    </CommandItem>
                                  </CommandLoading>}
                                {diseases.map((disease) => (
                                  <CommandItem
                                    key={disease.key}
                                    onSelect={() => {
                                      setSelected((prev) => ({ ...prev, disease }))
                                      field.onChange(disease.key)
                                      setOpen((prev) => ({ ...prev, disease: false }))
                                    }}
                                  >
                                    {disease.name}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        disease?.key === selected?.disease?.key
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
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
                name='model'
                render={({ field }) => (
                  <FormItem className='col-span-3 sm:col-span-3'>
                    <FormLabel className='flex items-center gap-2'>
                      Modelo
                      <LabelInfoForm>
                        <strong>Los modelos estan ligados a una enfermedad</strong> y se encargan de realizar el diagnóstico.
                      </LabelInfoForm>
                    </FormLabel>
                    <FormControl>
                      <Popover
                        open={open.model}
                        onOpenChange={(open) => setOpen((prev) => ({ ...prev, model: open }))}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant='secondary'
                            role='combobox'
                            aria-label='Selecciona una enfermedad'
                            aria-expanded={open.model}
                            className='flex-1 justify-between w-full'
                          >
                            <span className='text-sm truncate'>
                              {selected?.model ? selected.model.name : 'Selecciona un modelo'}
                            </span>
                            <Icons.caret className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
                          <Command>
                            <CommandInput placeholder='Buscar modelo' />
                            <CommandEmpty>No se encontraron modelos</CommandEmpty>
                            <CommandList>
                              <CommandGroup heading='Modelos'>
                                {models.length === 0 &&
                                  <CommandLoading>
                                    <CommandItem>
                                      Buscando modelos...
                                    </CommandItem>
                                  </CommandLoading>}
                                {models.map((model, index) => (
                                  <CommandItem
                                    key={model.id}
                                    onSelect={() => {
                                      setSelected((prev) => ({ ...prev, model }))
                                      field.onChange(model.name)
                                      setOpen((prev) => ({ ...prev, model: false }))
                                    }}
                                  >
                                    {model.name}
                                    <div className='ml-auto flex items-center gap-2'>
                                      <CheckIcon
                                        className={cn(
                                          'h-4 w-4',
                                          model?.name === selected?.model?.name
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                      {index === 0 &&
                                        <Badge className='hidden sm:block'>Recomendado</Badge>}
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
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
                      <LabelInfoForm icon={classification.length > 0 ? LayersIcon : null}>
                          {classification.length > 0
                            ? (
                                <div className='flex flex-col gap-2'>
                                  <h1 className='text-base font-bold text-center'>Predicciones</h1>
                                  <div className='grid gap-3'>
                                    {classification.length > 0 &&
                                      classification.map((prediction) => {
                                        const value = Math.ceil((prediction.score / Math.max(...classification.map((p) => p.score))) * 80)
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
                        disabled={field.value?.includes('Sin predicción') ?? isPending}
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

              <Button disabled={isLoading || isPending}>
                <div className='relative'>
                  Predecir
                  <div
                    data-loading={isPending}
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
