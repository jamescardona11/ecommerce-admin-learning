'use client'

import { UserButton } from '@clerk/nextjs'
import { Modal } from '@/components/ui/modal'

function SetupPage () {
  return (
    <div className='p-4'>
      <Modal
        title='Modal Title'
        description='Modal Description'
        isOpen={true}
        onClose={() => {}} > Children </Modal>
    </div>
  )
}

export default SetupPage
