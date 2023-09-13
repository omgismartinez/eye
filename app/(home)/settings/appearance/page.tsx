import { type Metadata } from 'next'
import { Separator } from '@/components/ui/separator'
import { AppearanceForm } from './appearance-form'
import { currentUser } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Apariencia',
  description: 'Personaliza la apariencia de la aplicación.'
}

export default async function Appearance () {
  const user = await currentUser()
  return (
        <main>
            <div>
                <h1 className='text-xl font-bold'>Apariencia</h1>
                <p className='text-_gray-808080 text-sm'>
                    Personaliza la apariencia de la aplicación. Cambia el tema entre claro y oscuro.
                </p>
            </div>
            <Separator className='my-6' />
            <AppearanceForm user={user} />
        </main>
  )
}
