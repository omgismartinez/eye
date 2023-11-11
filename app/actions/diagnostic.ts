'use server'

import { type z } from 'zod'
import { type diagnosticSchema } from '@/lib/validations/diagnostic'
import { type ImageClassificationOutput } from '@huggingface/inference'
import { prisma } from '@/lib/prisma'
import { put, del } from '@vercel/blob'
import { type Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { type User } from '@clerk/nextjs/dist/types/server'
import { getUserEmail } from '@/lib/utils'

export async function getDiagnosticsAction (input: {
  email: string
}) {
  const diagnostics = await prisma.diagnostic.findMany({
    where: {
      OR: [
        {
          doctor: {
            email: input.email
          }
        },
        {
          patient: {
            email: input.email
          }
        }
      ]
    },
    include: {
      image: true,
      label: true,
      disease: true,
      patient: true
    }
  })

  return diagnostics
}

export async function createDiagnosticAction (
  input: Omit<z.infer<typeof diagnosticSchema>, 'image'> & {
    imageFormData: FormData
    classification: ImageClassificationOutput
  }
) {
  const file = input.imageFormData.get('file') as unknown as File

  if (!file) throw new Error('Image is required.')

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Upload image to Vercel Blob Storage
  const pathname = `diagnostic/${input.disease}/${input.prediction}/${input.email}/${input.eye}.${file.type.split('/')[1]}`
  const blob = await put(pathname, buffer, {
    access: 'public'
  })

  /**
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#reading-from-a-json-field
   */
  const classification = input.classification as unknown as Prisma.JsonArray

  const diagnostic = await prisma.diagnostic.create({
    data: {
      eye: input.eye,
      classification,
      extra: input.extra,
      label: {
        connect: {
          key: input.prediction
        }
      },
      doctor: {
        connect: {
          email: input.doctor
        }
      },
      patient: {
        connectOrCreate: {
          where: {
            email: input.email
          },
          create: {
            firstName: input.firstName,
            lastName: input.lastName,
            age: input.age,
            phone: input.phone,
            dob: input.dob,
            gender: input.gender,
            user: {
              connectOrCreate: {
                where: {
                  email: input.email
                },
                create: {
                  firstName: input.firstName,
                  lastName: input.lastName,
                  email: input.email
                }
              }
            }
          }
        }
      },
      disease: {
        connect: {
          key: input.disease
        }
      },
      image: {
        create: {
          eye: input.eye,
          url: blob.url,
          labelKey: {
            connect: {
              key: input.prediction
            }
          },
          disease: {
            connect: {
              key: input.disease
            }
          }
        }
      }
    }
  })

  if (!diagnostic) {
    // Delete image from Vercel Blob Storage
    await del(blob.url)
      .then(() => console.log('Image deleted.'))
      .catch(() => console.log('Image not deleted.'))
  }

  revalidatePath('/all')

  return diagnostic
}

export async function getDiseasesAction () {
  const diseases = await prisma.disease.findMany()
  return diseases
}

export async function getPatientsAction (input: {
  user: User | null
}) {
  if (!input.user) throw new Error('User is required.')

  const email = getUserEmail(input.user)

  const patients = await prisma.patient.findMany({
    where: {
      doctor: {
        every: {
          email: {
            equals: email
          }
        }
      }
    },
    include: {
      user: true,
      diagnostics: true
    }
  })

  return patients
}
