import { type Metadata } from 'next'
import { Header } from '@/components/header'
import { DiagnosticForm } from '@/components/forms/diagnostic-form'
import { currentUser } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Nuevo Diagnóstico',
  description: 'Completa los campos para realizar un nuevo diagnóstico.'
}

export default async function New () {
  const user = await currentUser()
  return (
    <main className='max-w-3xl mx-auto'>
      <Header
        title='Completa los campos'
        subtitle={<>Sube tu imagen. Arrastre y suelte <strong>1 imagen</strong> para empezar la detección.</>}
      />
      <DiagnosticForm user={user} />
    </main>
  )
}
