import Header from '@/components/header'

export default function Home() {
  return (
    <main className='px-4 py-2'>
      <div className='max-w-xl mx-auto'>
        <section className='my-6'>
          <Header
            title='Retinopatía Diabética'
            subtitle={`La retinopatía diabética es una complicación de la diabetes que afecta a los ojos.
              Es causada por daño a los vasos sanguíneos de la retina.`}
          />
        </section>
      </div>
    </main>
  )
}
