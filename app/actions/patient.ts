'use server'

import { prisma } from '@/lib/prisma'
import { type patientSchema } from '@/lib/validations/patient'
import { type z } from 'zod'

export async function getPatientAction (input: {
  id: string
}) {
  if (!input.id) throw new Error('ID is required.')

  const patient = await prisma.patient.findUnique({
    where: {
      id: input.id
    },
    include: {
      user: true,
      diagnostics: {
        include: {
          image: true,
          disease: true
        }
      }
    }
  })

  return patient
}

export async function updatePatientAction (input: z.infer<typeof patientSchema> & {
  id: string
}) {
  const patient = await prisma.patient.update({
    where: {
      id: input.id
    },
    data: {
      ...input
    }
  })

  return patient
}
