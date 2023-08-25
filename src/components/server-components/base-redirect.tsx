import { type Store } from '@prisma/client'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prismadb from '@/lib/prismadb'

const redirectOrGetStore = async (
  storeId?: string,
  customRedirect?: string
) => {
  const { userId } = auth()
  if (userId == null) {
    redirect('/sign-in')
  }

  let store: Store | null = null
  if (storeId == null) {
    store = await getStoreByUserId(userId)
  } else {
    store = await getStoreByStoreId(storeId, userId)
  }

  if (store == null && customRedirect != null) {
    redirect(customRedirect)
  } else if (store == null) {
    redirect('/')
  }

  return store
}

export default redirectOrGetStore

const getStoreByStoreId = async (storeId: string, userId: string) => {
  return await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId
    }
  })
}

const getStoreByUserId = async (userId: string) => {
  return await prismadb.store.findFirst({
    where: {
      userId
    }
  })
}
