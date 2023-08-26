'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'

import {
  type Category,
  type Color,
  type Image,
  type Product,
  type Size
} from '@prisma/client'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertModal } from '@/components/modals/alert-modal'
import { ImageUpload } from '@/components/ui/image-upload'

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[]
      })
    | null
  categories: Category[]
  colors: Color[]
  sizes: Size[]
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData != null ? 'Edit product' : 'New product'
  const description =
    initialData != null ? 'Edit a product' : 'Add a new product'
  const toastMessage =
    initialData != null ? 'Billboard updated' : 'Billboard created'
  const action = initialData != null ? 'Save changes' : 'Create product'

  const defaultValues =
    initialData != null
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price))
        }
      : {
          name: '',
          images: [],
          price: 0,
          categoryId: '',
          colorId: '',
          sizeId: '',
          isFeatured: false,
          isArchived: false
        }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true)

      if (initialData != null) {
        await fetch(`/api/${params.storeId}/billboards/${params.billboardId}`, {
          method: 'PATH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
      } else {
        await fetch(`/api/${params.storeId}/billboards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
      }

      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const onDeleteConfirmed = async () => {
    try {
      setLoading(true)

      await fetch(`/api/${params.storeId}/billboards/${params.billboardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      router.refresh()
      router.push(`/${params.storeId}/billboards`)
    } catch (error) {
      toast.error(
        'Make sure you removed all categories using this product first'
      )
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false)
        }}
        onConfirm={onDeleteConfirmed}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData != null && (
          <Button
            disabled={loading}
            variant='destructive'
            size='sm'
            onClick={() => {
              setOpen(true)
            }}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className='space-y-8 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field?.value?.length > 0 ? [field.value] : []}
                    disabled={loading}
                    onChange={url => {
                      field.onChange(url)
                    }}
                    onRemove={() => {
                      field.onChange('')
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Billboard label'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  )
}