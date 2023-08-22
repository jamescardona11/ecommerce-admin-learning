import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/test', '/api/:path*']
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
