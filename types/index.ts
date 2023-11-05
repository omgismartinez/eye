import { type userRoleSchema } from '@/lib/validations/auth'
import type {
  Disease,
  Image,
  Label,
  Diagnostic,
  Patient,
  User
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

export interface PatientModel extends Patient {
  user: User
  diagnostics: Diagnostic[]
}

export type UserRole = z.infer<typeof userRoleSchema>

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
  id?: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}
