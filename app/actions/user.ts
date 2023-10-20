'use server'

import { type z } from 'zod'
import { prisma } from '@/lib/prisma'
import { currentUser, clerkClient } from '@clerk/nextjs'
import { type startedSchema } from '@/lib/validations/auth'
import { getUserEmail } from '@/lib/utils'

export async function getUserAction () {
  const user = await currentUser()

  if (!user) {
    throw new Error('User not found')
  }

  const userById = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })

  return userById
}

export async function startedAction (
  input: z.infer<typeof startedSchema>
) {
  const user = await currentUser()

  if (!user) {
    throw new Error('User not found')
  }

  const email = getUserEmail(user)

  if (input.role === 'PATIENT') {
    await prisma.patient.create({
      data: {
        firstName: user.firstName ?? 'John',
        lastName: user.lastName ?? 'Doe',
        email,
        age: 18,
        phone: '',
        dob: new Date('2000-01-01'),
        gender: 'M',
        user: {
          connect: {
            id: user.id
          }
        }
      }
    })
  }

  if (input.role === 'DOCTOR') {
    await prisma.doctor.create({
      data: {
        firstName: user.firstName ?? 'John',
        lastName: user.lastName ?? 'Doe',
        email,
        age: 18,
        phone: '',
        birthdate: new Date('2000-01-01'),
        gender: 'M',
        specialty: 'N/A',
        user: {
          connect: {
            id: user.id
          }
        }
      }
    })
  }

  // Update Clerk user metadata
  await clerkClient.users.updateUserMetadata(user.id, {
    privateMetadata: {
      role: input.role,
      started: true
    }
  })

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      role: input.role,
      started: true
    }
  })
}
