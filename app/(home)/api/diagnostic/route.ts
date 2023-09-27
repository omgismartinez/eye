import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Eye, Gender, Status } from '@prisma/client'

export async function POST (req: Request) {
  const data = await req.formData()

  if (!data) {
    return NextResponse.json({ success: false })
  }

  const name = data.get('name') as string
  const prediction = data.get('prediction') as Status
  const patient_email = data.get('patient_email') as string
  const age = data.get('age') as string
  const extra = data.get('extra') as string
  const gender = data.get('gender') as Gender
  const eye = data.get('eye') as Eye

  const res = await prisma.diagnostic.create({
    data: {
      eye,
      extra,
      prediction,
      patient: {
        connectOrCreate: {
          where: {
            email: patient_email
          },
          create: {
            first_name: name,
            last_name: 'example',
            avatar: `https://avatars.dicebear.com/api/open-peeps/${name}.svg`,
            prediction,
            phone: '1234567890',
            age,
            gender,
            address: 'Calle 123',
            email: patient_email,
            birthdate: new Date('4/16/2000'),
            occupation: 'Estudiante'
          }
        }
      },
      image: {
        create: {
          eye,
          url: {
            create: {
              value: 'https://i.imgur.com/3QXQYRw.png'
            }
          },
          description: 'Imagen de ejemplo',
          label: prediction,
          patient: {
            connect: {
              email: 'patient_email'
            }
          }
        }
      },
      medic: {
        connect: {
          id: 'id_of_current_user_logged_in'
        }
      }
    }
  })

  if (!res) {
    return NextResponse.json({ success: false })
  }

  return NextResponse.json(res)
}
