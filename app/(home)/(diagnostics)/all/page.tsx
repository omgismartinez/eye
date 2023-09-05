import { type Metadata } from 'next'
import { type Diagnostic } from '@/types'
import Header from '@/components/header'
import { feikData } from '@/components/tables/data'
import { DataTable } from '@/components/tables/data-table'
import { columns, columnsVisibility } from './columns'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Diagnósticos Realizados',
  description: 'Tabla con todos los diagnósticos realizados.'
}

async function getData (): Promise<Diagnostic[]> {
  // Fetch data from your API here.
  return [
    ...feikData
    // ...
  ]
}

export default async function All () {
  const data = await getData()
  return (
        <main className='max-w-4xl mx-auto'>
            <Header
                className='max-w-2xl mx-auto'
                title='Diagnósticos realizados'
                subtitle={<>
                    La tabla contiene información detallada sobre cada diagnóstico realizado.
                    Lo que permite un <strong>seguimiento preciso</strong> de la evolución de la retinopatía diabética en cada paciente.
                </>}
            />
            <Separator />
            <DataTable columnsVisibility={columnsVisibility} columns={columns} data={data} />
        </main>
  )
}