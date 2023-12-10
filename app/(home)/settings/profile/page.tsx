import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs'
import { type Metadata } from 'next'
import { ProfileForm } from './profile-form'

export const metadata: Metadata = {
  description: 'Actualiza la configuración de tu perfil.'
}

export default async function Profile () {
  const user = await currentUser()
  return (
    <main>
      <div>
        <h1 className='text-xl font-bold'>Perfil</h1>
        <p className='text-_gray-808080 text-sm'>
          Actualiza la configuración de tu perfil.
        </p>
      </div>
      <Separator className='my-6' />
      <ProfileForm user={JSON.parse(JSON.stringify(user))} />
    </main>
  )
}
