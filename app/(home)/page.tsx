import { Header } from '@/components/header'

export default function Home () {
  return (
    <main>
      <section className='max-w-xl mx-auto'>
        <Header
          title='Retinopatía Diabética'
          subtitle={`La retinopatía diabética es una complicación de la diabetes que afecta a los ojos.
              Es causada por daño a los vasos sanguíneos de la retina.`}
        />
      </section>
    </main>
  )
}
