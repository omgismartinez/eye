import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Eye, Gender } from '@prisma/client'

export async function POST (req: Request) {
  const data = await req.formData()

  if (!data) {
    return NextResponse.json({ success: false })
  }

  // Diagnostic
  const eye = data.get('eye') as Eye
  const extra = data.get('extra') as string
  const classification = data.get('classification') as object
  const predictionKey = data.get('predictionKey') as string
  const diseaseKey = data.get('diseaseKey') as string
  const doctorId = data.get('doctorId') as string

  // Patient
  const firstName = data.get('firstName') as string
  const lastName = data.get('lastName') as string
  const age = Number(data.get('age'))
  const gender = data.get('gender') as Gender
  const address = data.get('address') as string
  const occupation = data.get('occupation') as string
  const phone = data.get('phone') as string
  const dob = data.get('dob') as string
  const email = data.get('email') as string

  const res = await prisma.diagnostic.create({
    data: {
      eye,
      extra,
      classification: { toJSON: () => classification },
      image: {
        create: {
          eye,
          url: 'https://storage.googleapis.com/kagglesdsdata/datasets/131128/418031/resized_train_cropped/resized_train_cropped/10003_right.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20230928%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230928T200525Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=85a754e5554454ad4a49d272320834fea133e305892d433b8e73c2660c5555cfcd8f08cefcd2de37e68bab7c773dc8c0b5771b535de985d025d3e36a8a472d7836cc200c7f2b39a81bd5b1c6b3d6b52f742520798e56660743eac3bae994b8a612ac739cad5e2d2a289f27f2d0e8e1b35c59bcf8afc03cd0114188508184b360839eba95afcce0a5a106fadbfc1b9210b491db9e80fdfc22dee7035485f59e9c0560b7bc8e789713d0f03f50a64142e7d6e37ae2adb90197c6628ccc35b95abc3a982ac1727484cb802fbb16fedb610e71be60bd53b3b844f3b5febef3065827e4437f68f1e6eaa830948170261366d43919e8208b1cbd1c60876541867a5728',
          labelKey: {
            connect: {
              key: predictionKey
            }
          },
          disease: {
            connect: {
              key: diseaseKey
            }
          }
        }
      },
      disease: {
        connect: {
          key: diseaseKey
        }
      },
      label: {
        connect: {
          key: predictionKey
        }
      },
      doctor: {
        connect: {
          id: doctorId
        }
      },
      patient: {
        connectOrCreate: {
          where: {
            email
          },
          create: {
            firstName,
            lastName,
            age,
            gender,
            address,
            phone,
            email,
            dob,
            occupation,
            user: {
              connectOrCreate: {
                where: {
                  email
                },
                create: {
                  email,
                  firstName,
                  lastName
                }
              }
            }
          }
        }
      }
    }
  })

  if (!res) {
    return NextResponse.json({ success: false })
  }

  return NextResponse.json(res)
}
