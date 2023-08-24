import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'

async function SetupLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth()

  if (userId == null) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  })

  if (store != null) {
    redirect(`/${store.id}`)
  }

  return <>{children}</>
}

export default SetupLayout
