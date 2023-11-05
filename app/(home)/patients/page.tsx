import { type Metadata } from 'next'

import { Header } from '@/components/header'
import { DataTable } from '@/components/tables/data-table'
import { columns, columnsVisibility } from './columns'
import { Separator } from '@/components/ui/separator'
import { getPatientsAction } from '@/app/actions/diagnostic'
import { currentUser } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Pacientes Registrados',
  description: 'La tabla de pacientes permite tener un registro completo y organizado de todos los individuos atendidos.'
}

export default async function Patients () {
  const user = await currentUser()
  const data = await getPatientsAction({ user })
  return (
    <main className='max-w-4xl mx-auto'>
      <Header
        className='max-w-xl mx-auto'
        title='Pacientes registrados'
        subtitle='La tabla de pacientes permite tener un registro completo y organizado de todos los individuos atendidos.'
      />
      <Separator />
      <DataTable
        filterableColumns={[
          {
            id: 'gender',
            title: 'Género',
            options: [
              { value: 'M', label: 'Masculino' },
              { value: 'F', label: 'Femenino' }
            ]
          }
        ]}
        columnsVisibility={columnsVisibility}
        columns={columns}
        data={data}
      />
    </main>
  )
}
