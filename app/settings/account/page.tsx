import { Separator } from '@/components/ui/separator'
import { AccountForm } from './account-form'

export default function Account() {
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
            <AccountForm />
        </main>
    )
}