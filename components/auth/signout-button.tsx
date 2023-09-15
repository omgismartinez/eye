'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { SignOutButton } from '@clerk/nextjs'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'

export function SignoutButton () {
  const router = useRouter()
  const mounted = useMounted()
  const [isPending, startTransition] = useTransition()
  return (
    <>
        {mounted
          ? (
              <SignOutButton
                signOutCallback={() =>
                  startTransition(() => {
                    router.push(`${window.location.origin}/?redirect=false`)
                  })
                }
              >
                <Button
                  aria-label='sign out'
                  className='justify-between font-normal'
                  disabled={isPending}
                >
                  <div className='flex'>
                    {isPending && (
                      <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    Desconectar
                  </div>
                  <LogOut size={18} />
                </Button>
              </SignOutButton>
            )
          : (
              <Button
                aria-label='sign out loading'
                className='justify-between font-normal'
                disabled={true}
              >
                Desconectar
                <LogOut size={18} />
              </Button>
            )}
    </>
  )
}
