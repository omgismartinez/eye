import type { User, WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { getUserEmail } from '@/lib/utils'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST (req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  // User is created or updated
  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    const metadata = evt.data
    const email = getUserEmail(metadata as unknown as User)
    const user = await prisma.user.upsert({
      where: {
        email
      },
      create: {
        id: metadata.id,
        firstName: metadata.first_name,
        lastName: metadata.last_name,
        email,
        metadata: {
          toJSON: () => metadata
        }
      },
      update: {
        firstName: metadata.first_name,
        lastName: metadata.last_name,
        email,
        metadata: {
          toJSON: () => metadata
        }
      }
    })

    if (!user) {
      return NextResponse.json('', { status: 400 })
    }

    return NextResponse.json(user, { status: 201 })
  }

  // User is deleted
  if (evt.type === 'user.deleted') {
    const metadata = evt.data
    const user = await prisma.user.delete({
      where: {
        id: metadata.id
      }
    })

    if (!user) {
      return NextResponse.json('', { status: 400 })
    }

    return NextResponse.json(user, { status: 200 })
  }

  return NextResponse.json(
    { message: 'Invalid webhook event type.' },
    { status: 400 }
  )
}
