'use client'

import { ColumnDef } from '@tanstack/react-table'
import ColumnSorted from '~/components/custom/data-table/column-sorted'

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnSorted column={column} title="Status" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <ColumnSorted column={column} title="Email" />,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <ColumnSorted column={column} title="Amount" />,
  },
]
