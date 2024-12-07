'use client'

import { ColumnDef } from '@tanstack/react-table'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { SessionEntity } from '~/data/entity/session'
import { formatLocalDate } from '~/lib/date'

export const columns: ColumnDef<SessionEntity>[] = [
  {
    accessorKey: 'user.fullname',
    header: ({ column }) => <ColumnSorted column={column} title="Fullname" />,
  },
  {
    accessorKey: 'ip_address',
    header: ({ column }) => <ColumnSorted column={column} title="IP Address" />,
  },
  {
    accessorKey: 'device',
    header: ({ column }) => <ColumnSorted column={column} title="Device" />,
  },
  {
    accessorKey: 'platform',
    header: ({ column }) => <ColumnSorted column={column} title="Platform" />,
  },
  {
    accessorKey: 'expires_at',
    header: ({ column }) => <ColumnSorted column={column} title="Expires At" />,
    cell: ({ row }) => row.original.expires_at && formatLocalDate(row.original.expires_at),
  },
]
