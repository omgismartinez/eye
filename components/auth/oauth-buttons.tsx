'use client'

import * as React from 'react'
import { isClerkAPIResponseError, useSignIn } from '@clerk/nextjs'
import { type OAuthStrategy } from '@clerk/types'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

const oauthProviders = [
  { name: 'Google', strategy: 'oauth_google', icon: 'google' },
  { name: 'GitHub', strategy: 'oauth_github', icon: 'github' }
] satisfies Array<{
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
}>

export function OAuthButtons () {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const { signIn, isLoaded: signInLoaded } = useSignIn()

  async function oauthSignIn (provider: OAuthStrategy) {
    if (!signInLoaded) return null
    try {
      setIsLoading(provider)
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/'
      })
    } catch (error) {
      setIsLoading(null)

      const unknownError = 'Algo salió mal, por favor intenta de nuevo.'

      isClerkAPIResponseError(error)
        ? toast.error(error.errors[0]?.longMessage ?? unknownError)
        : toast.error(unknownError)
    }
  }

  return (
    <div className='grid grid-cols-1 gap-2'>
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.strategy}
            variant='outline'
            className='w-full bg-background'
            onClick={() => void oauthSignIn(provider.strategy)} // eslint-disable-line
            disabled={isLoading !== null}
          >
            {isLoading === provider.strategy
              ? <Icons.spinner className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
              : <Icon className='mr-2 h-4 w-4' aria-hidden='true' />}{' '}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}
