import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs'

export async function POST (req: Request) {
  const {
    userId,
    theme
  } = await req.json()

  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      theme
    }
  })

  return NextResponse.json({
    status: 200,
    body: {
      message: 'Theme updated'
    }
  })
}
