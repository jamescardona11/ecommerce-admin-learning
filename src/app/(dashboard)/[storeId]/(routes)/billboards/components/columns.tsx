'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export interface BillboardColumn {
  id: string
  label: string
  createdAt: string
}

export const columns: Array<ColumnDef<BillboardColumn>> = [
  {
    accessorKey: 'label',
    header: 'Label'
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
