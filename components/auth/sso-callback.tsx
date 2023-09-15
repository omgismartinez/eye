'use client'

import { Icons } from '@/components/icons'
import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'
import { type SSOCallbackPageProps } from '../../app/(auth)/sso-callback/page'

export default function SSOCallback ({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    void handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
        <div
            role='status'
            aria-label='loading'
            aria-description='loading-description'
            className='flex items-center justify-center'
        >
            <Icons.spinner className='h-16 w-16 animate-spin' aria-hidden='true' />
        </div>
  )
}
