import { redirect } from 'next/navigation'
import redirectOrGetStore from '@/components/server-components/base-redirect'

async function SetupLayout({ children }: { children: React.ReactNode }) {
  const store = await redirectOrGetStore()

  if (store != null) {
    redirect(`/${store.id}`)
  }

  return <>{children}</>
}

export default SetupLayout
