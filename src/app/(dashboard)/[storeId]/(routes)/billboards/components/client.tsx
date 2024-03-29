'use client'

import { useParams, useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { columns, type BillboardColumn } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'

interface BillboardClientProps {
  data: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${data.length})`}
          description='Manage billboards for your store'
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`)
          }}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data} />
      <Heading title='API' description='API call for Billboards' />
      <Separator />
      <ApiList entityName='billboards' entityIdName='billboardId' />
    </>
  )
}

export { BillboardClient }
