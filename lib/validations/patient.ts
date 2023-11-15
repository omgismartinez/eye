import { z } from 'zod'

export const patientSchema = z.object({
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
    .optional(),
  address: z
    .string()
    .max(160)
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
