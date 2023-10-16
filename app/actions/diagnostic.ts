'use server'

import { type z } from 'zod'
import { type diagnosticSchema } from '@/lib/validations/diagnostic'
import { type ImageClassificationOutput } from '@huggingface/inference'
import { prisma } from '@/lib/prisma'
import { put } from '@vercel/blob'

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
  const pathname = `diagnostic/${input.disease}/${input.email}/${input.eye}.${file.type.split('/')[1]}`
  const blob = await put(pathname, buffer, {
    access: 'public'
  })

  const diagnostic = await prisma.diagnostic.create({
    data: {
      eye: input.eye,
      extra: input.extra,
      classification: JSON.stringify(input.classification),
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
      },
      disease: {
        connect: {
          key: input.disease
        }
      },
      label: {
        connect: {
          key: input.prediction
        }
      },
      doctor: {
        connect: {
          id: input.doctor
        }
      },
      patient: {
        connect: {
          email: input.email
        }
      }
    }
  })

  return diagnostic
}

export async function getDiseasesAction () {
  const diseases = await prisma.disease.findMany()
  return diseases
}
