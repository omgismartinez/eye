import type { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'

const webhookSecret: string = process.env.WEBHOOK_SECRET ?? ''

export async function POST (req: Request) {
  const payload = await req.json()
  const payloadString = JSON.stringify(payload)
  const headerPayload = headers()
  const svixId = headerPayload.get('svix-id')
  const svixIdTimeStamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    return new Response('Error occured', {
      status: 400
    })
  }
  // Create an object of the headers
  const svixHeaders = {
    'svix-id': svixId,
    'svix-timestamp': svixIdTimeStamp,
    'svix-signature': svixSignature
  }
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent
  } catch (_) {
    console.log('error')
    return new Response('Error occured', {
      status: 400
    })
  }
  // Handle the webhook
  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    const { id, ...metadata } = evt.data
    await prisma.user.upsert({
      where: {
        external_id: id
      },
      create: {
        external_id: id,
        metadata: JSON.stringify(metadata)
      },
      update: {
        metadata: JSON.stringify(metadata)
      }
    })
  }
  return new Response('', {
    status: 201
  })
}
