import { getDiagnosticAction } from '@/app/actions/diagnostic'
import { LabelInfoForm } from '@/components/forms/components/label-info-form'
import { Marker } from '@/components/marker'
import { Separator } from '@/components/ui/separator'
import { type ImageClassificationOutput } from '@huggingface/inference'
import Image from 'next/image'

export default async function Diagnostic ({ params }: { params: { id: string } }) {
  const diagnostic = await getDiagnosticAction({ id: params.id })
  const classification = diagnostic?.classification as ImageClassificationOutput | undefined
  return (
    <div>
      <div className='grid grid-cols-2 gap-8'>
        <section className='col-start-1'>
          <h1 className='font-bold leading-loose text-lg'>Datos del diagnóstico</h1>
          <div className='space-y-2 mt-3'>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Ojo</h2>
              <p className='col-span-2'>
                {diagnostic?.eye}
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Fecha</h2>
              <p className='col-span-2'>
                {diagnostic?.createdAt.toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Predicción</h2>
              <p className='col-span-2'>
                {diagnostic?.prediction}
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Enfermedad</h2>
              <p className='col-span-2'>
                {diagnostic?.disease.name} <LabelInfoForm>{diagnostic?.disease.description}</LabelInfoForm>
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Doctor</h2>
              <p className='col-span-2'>
                {diagnostic?.doctor.firstName} {diagnostic?.doctor.lastName}{' '}
                {diagnostic?.doctor.specialty !== 'N/A' && <LabelInfoForm>{diagnostic?.doctor.specialty}</LabelInfoForm>}
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Extra</h2>
              <p className='col-span-2'>
                {diagnostic?.extra}
              </p>
            </div>
            <div className='pt-2'>
              <Separator />
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Paciente</h2>
              <p className='col-span-2'>
                {diagnostic?.patient.firstName} {diagnostic?.patient.lastName}
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Género</h2>
              <p className='col-span-2'>
                {diagnostic?.patient.gender}
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Edad</h2>
              <p className='col-span-2'>
                {diagnostic?.patient.age}
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Fecha de nacimiento</h2>
              <p className='col-span-2'>
                {diagnostic?.patient.dob.toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Teléfono</h2>
              <p className='col-span-2'>
                {diagnostic?.patient.phone}
              </p>
            </div>
            <div className='grid grid-cols-3 text-sm'>
              <h2 className='text-_gray-C2C2C2'>Correo electrónico</h2>
              <p className='col-span-2'>
                {diagnostic?.patient.email}
              </p>
            </div>
            {diagnostic?.patient.occupation && (
              <div className='grid grid-cols-3 text-sm'>
                <h2 className='text-_gray-C2C2C2'>Ocupación</h2>
                <p className='col-span-2'>
                  {diagnostic?.patient.occupation}
                </p>
              </div>
            )}
            {diagnostic?.patient.address && (
              <div className='grid grid-cols-3 text-sm'>
                <h2 className='text-_gray-C2C2C2'>Dirección</h2>
                <p className='col-span-2'>
                  {diagnostic?.patient.address}
                </p>
              </div>
            )}
          </div>
        </section>
        <section className='col-start-2 space-y-4'>
          <div className='p-2 rounded-xl border-2 border-dashed'>
            <div className='relative flex justify-center'>
              <Image
                src={diagnostic?.image.url ?? ''}
                alt={diagnostic?.image.label ?? ''}
                width={200}
                height={200}
                className='rounded-xl w-96 h-full object-cover'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='text-base font-bold text-center'>Predicciones</h1>
            <div className='grid gap-3'>
              {classification?.map((prediction) => {
                const value = Math.ceil((prediction.score / Math.max(...classification.map((p) => p.score))) * 80)
                return (
                  <div key={prediction.label} className='grid text-xs'>
                    <div className='grid gap-1'>
                      <Marker label={prediction.label} type={'badge'} value={value} />
                      <div className='flex justify-between'>
                        <p className='capitalize text-xs'>{prediction.label}</p>
                        <p className='text-_gray-808080'>{(prediction.score).toFixed(3)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div >
      <pre>
        {/* {JSON.stringify(diagnostic, null, 2)} */}
      </pre>
    </div >
  )
}
