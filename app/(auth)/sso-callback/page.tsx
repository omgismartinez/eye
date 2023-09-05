import { type HandleOAuthCallbackParams } from '@clerk/types'

import SSOCallback from './sso-callback'

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

export default function SSOCallbackPage ({
  searchParams
}: SSOCallbackPageProps) {
  return (
    <div>
        <SSOCallback searchParams={searchParams} />
    </div>
  )
}
