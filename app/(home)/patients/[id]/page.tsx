import { getPatientAction } from '@/app/actions/patient'
import { PatientForm } from '@/components/forms/patient-form'

export default async function Patient ({ params }: { params: { id: string } }) {
  const patient = await getPatientAction({ id: params.id })
  return (
    <main className='max-w-3xl mx-auto'>
      <pre>
        {JSON.stringify(patient, null, 2)}
      </pre>
      <PatientForm patient={patient} />
    </main>
  )
}
