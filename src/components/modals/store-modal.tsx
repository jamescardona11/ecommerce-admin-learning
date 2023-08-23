'use client'

import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'

export const StoreModal = () => {
  const storeModal = useStoreModal()
  return (
    <Modal
      title='Create store'
      description='A new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future Create Store form
    </Modal>
  )
}
