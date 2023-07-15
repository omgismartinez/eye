import Header from '@/components/header'
import NewForm from './new-form'

export default function New() {
    return (
        <main className='max-w-3xl mx-auto'>
            <Header
                title='Completa los campos'
                subtitle={<>Sube tu imagen. Arrastre y suelte <strong>1 imagen</strong> para empezar la detección.</>}
            />
            <NewForm />
        </main>
    )
}
