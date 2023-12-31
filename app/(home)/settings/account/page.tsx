import { type Metadata } from 'next'
import { Separator } from '@/components/ui/separator'
import { AccountForm } from './account-form'
import { currentUser } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Cuenta',
  description: 'Actualiza la configuración de tu cuenta.'
}

export default async function Account () {
  const user = await currentUser()
  return (
    <main>
      <div>
        <h1 className='text-xl font-bold'>Cuenta</h1>
        <p className='text-_gray-808080 text-sm'>
          Actualiza la configuración de tu cuenta.
          Actualice su correo electrónico y contraseña.
          Establezca su idioma y fecha de nacimiento.
        </p>
      </div>
      <Separator className='my-6' />
      <AccountForm user={JSON.parse(JSON.stringify(user))} />
    </main>
  )
}
