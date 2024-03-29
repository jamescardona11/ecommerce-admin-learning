'use client'

import { type ColumnDef } from '@tanstack/react-table'

export interface OrderColumn {
  id: string
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string
}

export const columns: Array<ColumnDef<OrderColumn>> = [
  {
    accessorKey: 'products',
    header: 'Products'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total price'
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid'
  }
]
