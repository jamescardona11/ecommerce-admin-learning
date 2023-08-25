import { create } from 'zustand'
import { type Store } from '@prisma/client'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prismadb from '@/lib/prismadb'

interface useBaseRedirectProps {
  store: Store | null
  userId: string | null
  storeId: string | null
  customRedirect: string | null
  onStart: (storeId?: string, customRedirect?: string) => void
  findStore: () => void
  onRootRedirect: () => void
  onCustomRedirect: (redirect: string) => void
}

export const useBaseRedirect = create<useBaseRedirectProps>((set, get) => ({
  store: null,
  userId: null,
  storeId: null,
  customRedirect: null,

  onStart: (storeId, customRedirect) => {
    const { userId } = auth()
    if (userId == null) {
      redirect('/sign-in')
    }
    set({ userId, storeId, customRedirect })

    get().findStore()
  },

  findStore: async () => {
    const { userId, storeId, customRedirect } = get()

    let store: Store | null = null
    if (storeId == null) {
      store = await getStoreByUserId(userId!)
    } else {
      store = await getStoreByStoreId(storeId, userId!)
    }

    if (store == null && customRedirect != null) {
      redirect(customRedirect)
    } else if (store == null) {
      get().onRootRedirect()
    }

    set({ store })
  },

  onRootRedirect: () => {
    redirect('/')
  },
  onCustomRedirect: (route: string) => {
    redirect(route)
  }
}))

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
