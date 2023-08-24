import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'
import Navbar from '@/components/Navbar'

async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth()

  if (userId == null) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if (store == null) {
    redirect('/')
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      {children}
    </>
  )
}

export default DashboardLayout
