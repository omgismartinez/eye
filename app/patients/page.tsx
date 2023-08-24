import { type Metadata } from 'next'
import { type Patient } from '@/types'

import Header from '@/components/header'
import { feikData } from '@/components/tables/data'
import { DataTable } from '@/components/tables/data-table'
import { columns, columnsVisibility } from './columns'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Pacientes Registrados',
  description: 'La tabla de pacientes permite tener un registro completo y organizado de todos los individuos atendidos.'
}

async function getData (): Promise<Patient[]> {
  // Fetch data from your API here.
  const data = feikData.map((item) => {
    return item.patient
  })

  return [
    ...data
  ]
}

export default async function Patients () {
  const data = await getData()
  return (
        <main className='max-w-4xl mx-auto'>
            <Header
                className='max-w-xl mx-auto'
                title='Pacientes registrados'
                subtitle='La tabla de pacientes permite tener un registro completo y organizado de todos los individuos atendidos.'
            />
            <Separator />
            <DataTable columnsVisibility={columnsVisibility} columns={columns} data={data} />
        </main>
  )
}
