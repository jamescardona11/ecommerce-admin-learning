import { UserButton, auth } from '@clerk/nextjs'
import { MainNav } from '@/components/navbar/main-nav'
import StoreSwitcher from '@/components/navbar/store-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ThemeToggle } from '../theme-toggle'

const Navbar = async () => {
  const { userId } = auth()

  if (userId == null) {
    redirect('sign-in')
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className='border-b '>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  )
}

export default Navbar
