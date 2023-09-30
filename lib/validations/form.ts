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
    .string()
    .refine((eye) => ['left', 'right'].includes(eye), 'El ojo debe ser izquierdo o derecho.'),
  extra: z
    .string()
    .max(160)
    .min(4)
    .optional(),
  prediction: z
    .string()
    .optional(),
  disease: z
    .string(),
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
  age: z
    .coerce
    .number(),
  gender: z
    .enum(['M', 'F']),
  address: z
    .string()
    .max(160)
    .min(4)
    .optional(),
  phone: z
    .string()
    .max(10)
    .min(10),
  birthdate: z
    .date()
    .max(new Date(), {
      message: 'La fecha de nacimiento no puede ser mayor a la fecha actual.'
    } as any)
    .min(new Date(1900, 1, 1), {
      message: 'La fecha de nacimiento no puede ser menor a 1900.'
    } as any)
    .optional(),
  email: z
    .string()
    .email({
      message: 'El correo electrónico no es válido.'
    })
})
