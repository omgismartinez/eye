import Header from '@/components/header'
import { feikData } from '@/components/tables/data'
import { DataTable } from '@/components/tables/data-table'
import { Diagnostic } from '@/types'
import { columns, columnsVisibility } from './columns'

async function getData(): Promise<Diagnostic[]> {
    // Fetch data from your API here.
    return [
        ...feikData,
        // ...
    ]
}

export default async function All() {
    const data = await getData()
    return (
        <main>
            <Header
                className='max-w-2xl mx-auto'
                title='Diagnósticos realizados'
                subtitle={<>
                    La tabla contiene información detallada sobre cada diagnóstico realizado.
                    Lo que permite un <strong>seguimiento preciso</strong> de la evolución de la retinopatía diabética en cada paciente.
                </>}
            />
            <div className='border border-_gray-border' />
            <DataTable columnsVisibility={columnsVisibility} columns={columns} data={data} />
        </main>
    )
}
