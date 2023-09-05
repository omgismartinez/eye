import { type userPrivateMetadataSchema } from '@/lib/validations/auth'
import { type z } from 'zod'

export type Status = 'no dr' | 'leve' | 'moderada' | 'severa' | 'proliferativa'

export interface Diagnostic {
  id: string
  patient: Patient
  prediction: Status
  date: string
}

export interface Patient {
  id: string
  name: string
  prediction: Status
  image: string
  birthdate: Date
  phone: number
  email: string
  age: number
  gender: 'M' | 'F'
  address: string
  occupation: string
}

export type UserRole = z.infer<typeof userPrivateMetadataSchema>['role']
