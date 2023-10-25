import { type userRoleSchema } from '@/lib/validations/auth'
import type {
  Disease,
  Image,
  Label,
  Diagnostic,
  Patient
} from '@prisma/client'
import { type z } from 'zod'

export type Status =
| 'NO_DR'
| 'MILD'
| 'MODERATE'
| 'SEVERE'
| 'PROLIFERATIVE'

export interface DiagnosticModel extends Diagnostic {
  image: Image
  label: Label
  disease: Disease
  patient: Patient
}

// export interface Patient {
//   id: string
//   name: string
//   prediction: Status
//   image: string
//   birthdate: Date
//   phone: number
//   email: string
//   age: number
//   gender: 'M' | 'F'
//   address: string
//   occupation: string
// }

export type UserRole = z.infer<typeof userRoleSchema>
