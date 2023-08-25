import redirectOrGetStore from '@/components/server-components/base-redirect'

import Navbar from '@/components/navbar/navbar'

async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  await redirectOrGetStore(params.storeId)

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
