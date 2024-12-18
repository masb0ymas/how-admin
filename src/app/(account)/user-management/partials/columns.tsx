'use client'

import { ColumnDef } from '@tanstack/react-table'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { Checkbox } from '~/components/ui/checkbox'
import { UserEntity } from '~/data/entity/user'
import { shortWalletAddress } from '~/lib/string'
import { validate } from '~/lib/validate'

export const columns: ColumnDef<UserEntity>[] = [
  {
    accessorKey: 'fullname',
    header: ({ column }) => <ColumnSorted column={column} title="Fullname" />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <ColumnSorted column={column} title="Email" />,
  },
  {
    accessorKey: 'wallet_address',
    header: ({ column }) => <ColumnSorted column={column} title="Wallet Address" />,
    cell: ({ row }) =>
      row.original.wallet_address && shortWalletAddress(row.original.wallet_address),
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <ColumnSorted column={column} title="Active" />,
    cell: ({ row }) => {
      const isActive = validate.boolean(row.original.is_active)
      return (
        <div className="flex items-center gap-2">
          <Checkbox checked={isActive} />
          <span>{isActive ? 'Yes' : 'No'}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'is_blocked',
    header: ({ column }) => <ColumnSorted column={column} title="Blocked" />,
    cell: ({ row }) => {
      const isBlocked = validate.boolean(row.original.is_blocked)
      return (
        <div className="flex items-center gap-2">
          <Checkbox checked={isBlocked} />
          <span>{isBlocked ? 'Yes' : 'No'}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'role.name',
    header: ({ column }) => <ColumnSorted column={column} title="Role" />,
  },
]
