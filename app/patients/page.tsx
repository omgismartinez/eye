import Header from '@/components/header'
import { feikData } from '@/components/tables/data'
import { DataTable } from '@/components/tables/data-table'
import { Patient } from '@/types'
import { columns, columnsVisibility } from './columns'

async function getData(): Promise<Patient[]> {
    // Fetch data from your API here.
    const data = feikData.map((item) => {
        return item['patient']
    })

    return [
        ...data,
    ]
}

export default async function Patients() {
    const data = await getData()
    return (
        <main className='max-w-4xl mx-auto'>
            <Header
                className='max-w-xl mx-auto'
                title='Pacientes registrados'
                subtitle='La tabla de pacientes permite tener un registro completo y organizado de todos los individuos atendidos.'
            />
            <div className='border border-_gray-border' />
            <DataTable columnsVisibility={columnsVisibility} columns={columns} data={data} />
        </main>
    )
}
