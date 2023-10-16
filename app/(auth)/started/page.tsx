import { StartedForm } from '@/components/forms/started-form'

export default async function Started () {
  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[480px]'>
      <div className='flex flex-col space-y-2 text-start'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          ¿Qué rol se ajusta más a ti?
        </h1>
        <p className='text-sm text-muted-foreground'>
          Selecciona el rol que más te identifique.
        </p>
      </div>
      <StartedForm />
    </div>
  )
}
