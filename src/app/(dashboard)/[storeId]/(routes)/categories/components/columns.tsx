'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export interface CategoryColumn {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

export const columns: Array<ColumnDef<CategoryColumn>> = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({ row }) => <span>{row.original.billboardLabel}</span>
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
