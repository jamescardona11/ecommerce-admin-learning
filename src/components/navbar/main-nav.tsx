/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import { cn } from '@/utils/cn'
import Link from 'next/link'

import { useParams, usePathname } from 'next/navigation'

export function MainNav({
  className,
  ...props
}: {
  className: string
  props?: React.HTMLAttributes<HTMLElement>
}) {
  const pathName = usePathname()
  const params = useParams()
  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathName === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathName === `/${params.storeId}/billboards`
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathName === `/${params.storeId}/categories`
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.storeId}/settings`
    }
  ]

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
