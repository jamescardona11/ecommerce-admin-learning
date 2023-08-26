'use client'

import { useParams, useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { columns, type ProductColumn } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'

interface ProductClientProps {
  data: ProductColumn[]
}

const ProductsClient: React.FC<ProductClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your store'
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/products/new`)
          }}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API call for Products' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  )
}

export { ProductsClient }
