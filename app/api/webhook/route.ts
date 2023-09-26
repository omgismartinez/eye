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
    const {
      private_metadata,
      public_metadata,
      unsafe_metadata,
      created_at,
      updated_at,
      email_addresses,
      phone_numbers,
      web3_wallets,
      external_accounts,
      ...metadata
    } = evt.data
    await prisma.user.upsert({
      where: {
        id: metadata.id
      },
      // TODO: Test in production whit the webhook by clerk
      create: {
        ...metadata,
        private_metadata: {
          toJSON: () => private_metadata
        },
        public_metadata: {
          toJSON: () => public_metadata
        },
        unsafe_metadata: {
          toJSON: () => unsafe_metadata
        },
        created_at: new Date(created_at),
        updated_at: new Date(updated_at),
        email_addresses: {
          createMany: {
            data: email_addresses.map((email: any) => (
              {
                id: email.id,
                email_address: email.email_address,
                object: email.object,
                verification: email.verification
              }
            ))
          }
        },
        phone_numbers: {
          createMany: {
            data: phone_numbers.map((phone: any) => (
              {
                ...phone
              }
            ))
          }
        },
        web3_wallets: {
          createMany: {
            data: web3_wallets.map((wallet: any) => (
              {
                ...wallet
              }
            ))
          }
        },
        external_accounts: {
          createMany: {
            data: external_accounts.map((account: any) => (
              {
                ...account
              }
            ))
          }
        }
      },
      update: {
        ...metadata
      }
    })
  }
  return new Response('', {
    status: 201
  })
}
