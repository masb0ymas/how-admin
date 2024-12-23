'use client'

import { ColumnDef } from '@tanstack/react-table'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { TransactionEntity } from '~/data/entity/transaction'
import { formatLocalDate } from '~/lib/date'
import { formatCurrency, formatCurrencyIDR } from '~/lib/number'
import { BadgeStatus } from '~/lib/status'

export const columns: ColumnDef<TransactionEntity>[] = [
  {
    accessorKey: 'user.fullname',
    header: ({ column }) => <ColumnSorted column={column} title="Fullname" />,
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => <ColumnSorted column={column} title="Provider" />,
  },
  {
    accessorKey: 'voucher_code',
    header: ({ column }) => <ColumnSorted column={column} title="Voucher Code" />,
  },
  {
    accessorKey: 'voucher_nominal',
    header: ({ column }) => <ColumnSorted column={column} title="Voucher Nominal" />,
    cell: ({ row }) => formatCurrencyIDR(row.original.voucher_nominal),
  },
  {
    accessorKey: 'uniq_code',
    header: ({ column }) => <ColumnSorted column={column} title="Uniq Code" />,
    cell: ({ row }) => formatCurrency(row.original.uniq_code),
  },
  {
    accessorKey: 'total',
    header: ({ column }) => <ColumnSorted column={column} title="Total" />,
    cell: ({ row }) => {
      return <div className="w-[120px]">{formatCurrencyIDR(row.original.total)}</div>
    },
  },
  {
    accessorKey: 'payment_method',
    header: ({ column }) => <ColumnSorted column={column} title="Payment Method" />,
  },
  {
    accessorKey: 'payment_type',
    header: ({ column }) => <ColumnSorted column={column} title="Payment Type" />,
  },
  {
    accessorKey: 'payment_status',
    header: ({ column }) => <ColumnSorted column={column} title="Payment Status" />,
    cell: ({ row }) => {
      if (row.original.payment_status) {
        return <BadgeStatus status={row.original.payment_status} />
      }

      return '-'
    },
  },
  {
    accessorKey: 'payment_date',
    header: ({ column }) => <ColumnSorted column={column} title="Payment Date" />,
    cell: ({ row }) => {
      if (row.original.payment_date) {
        return <div className="w-[120px]">{formatLocalDate(row.original.payment_date)}</div>
      }
      return '-'
    },
  },
]
