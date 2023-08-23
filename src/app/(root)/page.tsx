'use client'

import { useEffect } from 'react'
import { useStoreModal } from '@/hooks/use-store-modal'

function SetupPage() {
  const onOpen = useStoreModal(state => state.onOpen)
  const isOpen = useStoreModal(state => state.isOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <div className='p-4'>
      {/* <Modal
        title='Modal Title'
        description='Modal Description'
        isOpen={true}
        onClose={() => {}} > Children </Modal> */}
    </div>
  )
}

export default SetupPage
