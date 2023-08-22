import { UserButton } from '@clerk/nextjs'

function HomePage () {
  return (
    <div>
      <UserButton afterSignOutUrl='/' />
      <div>Hey</div>
    </div>
  )
}

export default HomePage
