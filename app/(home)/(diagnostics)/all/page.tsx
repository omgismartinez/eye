import { type Metadata } from 'next'
import { Header } from '@/components/header'
import { DataTable } from '@/components/tables/data-table'
import { columns, columnsVisibility } from './columns'
import { Separator } from '@/components/ui/separator'
import { getDiagnosticsAction } from '@/app/actions/diagnostic'
import { currentUser } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Diagnósticos Realizados',
  description: 'Tabla con todos los diagnósticos realizados.'
}

export default async function All () {
  const user = await currentUser()
  const data = await getDiagnosticsAction({ doctor: user?.id ?? '' })
  return (
    <main className='max-w-4xl mx-auto'>
      <Header
        className='max-w-2xl mx-auto'
        title='Diagnósticos realizados'
        subtitle={
          <>
            La tabla contiene información detallada sobre cada diagnóstico realizado.
            Lo que permite un <strong>seguimiento preciso</strong> de la evolución de la retinopatía diabética en cada paciente.
          </>
        }
      />
      <Separator />
      <DataTable columnsVisibility={columnsVisibility} columns={columns} data={data} />
    </main>
  )
}
