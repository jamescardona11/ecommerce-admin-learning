import redirectOrGetStore from '@/components/server-components/base-redirect'
import { SettingsForm } from './components/settings-form'

interface SettingsPageProps {
  params: { storeId: string }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const store = await redirectOrGetStore(params.storeId)

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store!} />
      </div>
    </div>
  )
}

export default SettingsPage
