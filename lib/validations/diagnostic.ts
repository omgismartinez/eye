import { Eye } from '@prisma/client'
import * as z from 'zod'

export const MAX_RECOMMENDED_IMAGE_SIZE = 4
export const MAX_FILE_SIZE = MAX_RECOMMENDED_IMAGE_SIZE * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const newDiagnosticFormSchema = z.object({
  image: z
    .custom<File | null>()
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
            `Los formatos soportados son: ${ACCEPTED_IMAGE_TYPES.map((type) => '.' + type.split('/')[1]).join(' | ')}`
    )
    .refine((file) => file && file.size <= MAX_FILE_SIZE, `Maximo tamaño de archivo: ${MAX_RECOMMENDED_IMAGE_SIZE}MB`),
  eye: z
    .nativeEnum(Eye, {
      required_error: 'Especifique el ojo a diagnosticar.'
    }),
  extra: z
    .string()
    .max(160)
    .min(4)
    .optional(),
  prediction: z
    .string()
    .optional(),
  disease: z
    .string({
      required_error: 'La enfermedad es requerida.'
    }),
  doctor: z
    .string({
      required_error: 'El doctor se infiere del usuario actual.'
    }),
  firstName: z
    .string()
    .min(2, {
      message: 'El nombre del paciente debe tener al menos 2 caracteres.'
    })
    .max(30, {
      message: 'El nombre del paciente no debe tener más de 30 caracteres.'
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'El apellido del paciente debe tener al menos 2 caracteres.'
    })
    .max(30, {
      message: 'El apellido del paciente no debe tener más de 30 caracteres.'
    }),
  gender: z
    .enum(['M', 'F']),
  age: z
    .coerce
    .number(),
  dob: z
    .date()
    .max(new Date(), {
      message: 'La fecha de nacimiento no puede ser mayor a la fecha actual.'
    } as any)
    .min(new Date(1900, 1, 1), {
      message: 'La fecha de nacimiento no puede ser menor a 1900.'
    } as any),
  occupation: z
    .string()
    .max(160)
    .min(4)
    .optional(),
  address: z
    .string()
    .max(160)
    .min(4)
    .optional(),
  email: z
    .string()
    .email({
      message: 'El correo electrónico no es válido.'
    }),
  phone: z
    .string({
      required_error: 'El teléfono es requerido.'
    })
})
