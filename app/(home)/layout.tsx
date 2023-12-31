import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import { currentUser } from '@clerk/nextjs'

export default async function HomeLayout ({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  return (
    <>
      <Navbar user={JSON.parse(JSON.stringify(user))} />
      <main className='flex max-w-screen-2xl mx-auto'>
        <div className='hidden h-full lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-80'>
          <Sidebar user={JSON.parse(JSON.stringify(user))} />
        </div>
        <div className='lg:ml-72 w-full overflow-hidden'>
          <div className='px-4 lg:px-6 py-8'>
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
