import Header from '@/components/header'
import { DataTable } from './components/data-table'
import { Diagnostic, columns } from './components/columns'

async function getData(): Promise<Diagnostic[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            patient: "Alvaro Martinez Martinez",
            prediction: "no dr",
            date: "5/6/2023, 4:41:24 p. m.",
            phone: "1234567890",
            email: "martinez@example.com",
        },
        {
            id: "728ed52f",
            patient: "Eduardo Perez",
            prediction: "leve",
            date: "16/8/2020, 4:41:24 p. m.",
            phone: "9876543210",
            email: "eduperez@example.com",
        },
        {
            id: "728ed52f",
            patient: "Miriam Rodriguez",
            prediction: "moderado",
            date: "12/3/2021, 4:41:24 p. m.",
            phone: "7284612340",
            email: "mirod@example.com",
        },
        {
            id: "728ed52f",
            patient: "Juan Perez",
            prediction: "severo",
            date: "01/3/2021, 4:41:24 p. m.",
            phone: "1120949444",
            email: "jperez@example.com",
        },
        {
            id: "728ed52f",
            patient: "Alvaro Martinez Martinez",
            prediction: "no dr",
            date: "5/6/2023, 4:41:24 p. m.",
            phone: "1234567890",
            email: "martinez@example.com",
        },
        {
            id: "728ed52f",
            patient: "Eduardo Perez",
            prediction: "leve",
            date: "16/8/2020, 4:41:24 p. m.",
            phone: "9876543210",
            email: "eduperez@example.com",
        },
        {
            id: "728ed52f",
            patient: "Miriam Rodriguez",
            prediction: "moderado",
            date: "12/3/2021, 4:41:24 p. m.",
            phone: "7284612340",
            email: "mirod@example.com",
        },
        {
            id: "728ed52f",
            patient: "Juan Perez",
            prediction: "severo",
            date: "01/3/2021, 4:41:24 p. m.",
            phone: "1120949444",
            email: "jperez@example.com",
        },
        {
            id: "728ed52f",
            patient: "Alvaro Martinez Martinez",
            prediction: "no dr",
            date: "5/6/2023, 4:41:24 p. m.",
            phone: "1234567890",
            email: "martinez@example.com",
        },
        {
            id: "728ed52f",
            patient: "Eduardo Perez",
            prediction: "leve",
            date: "16/8/2020, 4:41:24 p. m.",
            phone: "9876543210",
            email: "eduperez@example.com",
        },
        {
            id: "728ed52f",
            patient: "Miriam Rodriguez",
            prediction: "moderado",
            date: "12/3/2021, 4:41:24 p. m.",
            phone: "7284612340",
            email: "mirod@example.com",
        },
        {
            id: "728ed52f",
            patient: "Juan Perez",
            prediction: "proliferativo",
            date: "01/3/2021, 4:41:24 p. m.",
            phone: "1120949444",
            email: "jperez@example.com",
        },
        // ...
    ]
}

export default async function All() {
    const data = await getData()
    return (
        <main>
            <Header
                className='max-w-2xl mx-auto'
                title='Diagnosticos realizados'
                subtitle={<>
                    La tabla contiene información detallada sobre cada diagnóstico realizado.
                    Lo que permite un <strong>seguimiento preciso</strong> de la evolución de la retinopatía diabética en cada paciente.
                </>}
            />
            <div className='border border-_gray-border' />
            <DataTable columns={columns} data={data} />
        </main>
    )
}
