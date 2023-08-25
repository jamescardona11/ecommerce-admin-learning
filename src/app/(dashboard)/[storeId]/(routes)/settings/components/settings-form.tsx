'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { type Store } from '@prisma/client'

import Heading from '@/components/ui/heading'
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
import AlertModal from '@/components/modals/alert-modal'

interface SettingsFormProps {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(4)
})

type SettingsFormValue = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name
    }
  })

  const onSubmit = async (values: SettingsFormValue) => {
    try {
      setLoading(true)

      await fetch(`/api/stores/${params.storeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      router.refresh()
      toast.success('Store updated')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const onDeleteConfirmed = async () => {
    try {
      setLoading(true)

      await fetch(`/api/stores/${params.storeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      router.push('/')
      setOpen(false)
    } catch (error) {
      toast.error('Something went wrong')
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
        <Heading title='Settings' description='Manage your store preferences' />
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
      </div>
      <Separator />
      <Form {...form}>
        <form
          className='space-y-8 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Save changes
          </Button>
        </form>
      </Form>
    </>
  )
}
