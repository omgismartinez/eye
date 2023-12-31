import { type User } from '@clerk/nextjs/server'
import { type ClassValue, clsx } from 'clsx'
import { isClerkAPIResponseError } from '@clerk/nextjs'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { PROTECTED_ROUTES } from '@/config/site'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function catchError (err: unknown) {
  const unknownErr = 'Something went wrong, please try again later.'

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join('\n'))
  } else if (err instanceof Error) {
    return toast(err.message)
  } else {
    return toast(unknownErr)
  }
}

export function catchClerkError (err: unknown) {
  const unknownErr = 'Something went wrong, please try again later.'

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join('\n'))
  } else if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0]?.longMessage ?? unknownErr)
  } else {
    return toast.error(unknownErr)
  }
}

export function getUserEmail (user: User | null) {
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ''

  return email
}

export const getRole = (user: User | null) => {
  const role = user?.privateMetadata?.role
  if (role === 'PATIENT') {
    return 'Paciente'
  }
  if (role === 'RESEARCHER') {
    return 'Investigador'
  }
  if (role === 'DEVELOPER') {
    return 'Desarrollador'
  }
  if (role === 'DOCTOR') {
    return 'Doctor'
  }
  if (role === 'ADMIN') {
    return 'Administrador'
  }
  return 'No definido'
}

export const canAccess = (path: string, user: User | null) => {
  const role = user?.privateMetadata?.role
  if (!role) return false
  if (role === 'ADMIN') return true
  if (PROTECTED_ROUTES[role].includes(`/${path.split('/')[1]}`)) return true
}
