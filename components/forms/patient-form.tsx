'use client'

import { type z } from 'zod'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { catchError } from '@/lib/utils'

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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/date-picker'
import { patientSchema } from '@/lib/validations/patient'
import { updatePatientAction } from '@/app/actions/patient'
import { type PatientModel } from '@/types'
import { Autocomplete } from '../autocomplete'

type PatientFormValues = z.infer<typeof patientSchema>

interface PatientFormProps {
  patient: PatientModel | null
}

export function PatientForm ({ patient }: PatientFormProps) {
  const [isPending, startTransition] = useTransition()
  const [emails] = useState([
    {
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'jperez@example.com'
    },
    {
      firstName: 'Eduardo',
      lastName: 'Ortega',
      email: 'eortega@example.com'
    },
    {
      firstName: 'Alejandro',
      lastName: 'Perez',
      email: 'aeeeee@example.com'
    },
    {
      firstName: 'Alvaro',
      lastName: 'Martinez',
      email: 'amartinez@example.com'
    }
  ])

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: patient?.firstName,
      lastName: patient?.lastName,
      email: patient?.email,
      age: patient?.age,
      gender: patient?.gender,
      phone: patient?.phone,
      dob: patient?.dob,
      address: patient?.address ?? '',
      occupation: patient?.occupation ?? ''
    }
  })

  async function onSubmit (data: PatientFormValues) {
    startTransition(async () => {
      try {
        toast.promise(
          updatePatientAction({
            id: patient?.id ?? '',
            ...data
          }),
          {
            loading: 'Guardando cambios...',
            success: 'Cambios guardados',
            error: 'No se pudo guardar los cambios'
          })
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Input placeholder='Apellidos del paciente' autoComplete='off' required {...field} />
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
                      <Autocomplete
                        placeholder='a@example.com'
                        autoComplete='off'
                        required
                        values={new Set(emails.map((email) => email.email))}
                        onSelected={(value) => {
                          field.onChange(value)
                        }}
                        {...field}
                      />
                      {/* <Input placeholder='a@example.com' autoComplete='off' required {...field} /> */}
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
                      onValueChange={(value: PatientFormValues['gender']) => field.onChange(value)}
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

            <Button disabled={isPending}>
              Guardar
            </Button>
          </div>
        </section>
      </form>
    </Form >
  )
}
