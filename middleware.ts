import { authMiddleware, clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    // TODO: Add landing page home route here
    '/login(.*)',
    '/signup(.*)',
    '/sso-callback(.*)',
    '/api(.*)'
  ],
  ignoredRoutes: [
    '/api(.*)'
  ],
  async afterAuth (auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next()
    }

    const url = new URL(req.nextUrl.origin)

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Get the user from Clerk
    const user = await clerkClient.users.getUser(auth.userId)

    if (!user) {
      throw new Error('User not found.')
    }

    // If the user has not started the onboarding flow
    if (!user.privateMetadata.started && req.nextUrl.pathname !== '/started') {
      url.pathname = '/started'
      return NextResponse.redirect(url)
    }
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
