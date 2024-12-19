'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Checkbox } from '~/components/ui/checkbox'
import { InstructorEntity } from '~/data/entity/instructor'
import { formatCurrencyIDR } from '~/lib/number'
import { validate } from '~/lib/validate'

export const columns: ColumnDef<InstructorEntity>[] = [
  {
    accessorKey: 'user.fullname',
    header: ({ column }) => <ColumnSorted column={column} title="Fullname" />,
  },
  {
    accessorKey: 'bio',
    header: ({ column }) => <ColumnSorted column={column} title="Bio" />,
  },
  {
    accessorKey: 'image',
    header: ({ column }) => <ColumnSorted column={column} title="Image" />,
    cell: ({ row }) =>
      row.original.image ? (
        <Image src={row.original.image} alt="Instructor Image" width={100} height={100} />
      ) : (
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            className="rounded-lg"
            src={'https://api.dicebear.com/9.x/thumbs/svg'}
            alt={row.original?.user?.fullname}
          />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      ),
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <ColumnSorted column={column} title="Balance" />,
    cell: ({ row }) => formatCurrencyIDR(row.original.balance),
  },
  {
    accessorKey: 'total_withdraw',
    header: ({ column }) => <ColumnSorted column={column} title="Total Withdraw" />,
    cell: ({ row }) => formatCurrencyIDR(row.original.total_withdraw),
  },
  {
    accessorKey: 'total_withdraw_fee',
    header: ({ column }) => <ColumnSorted column={column} title="Total Withdraw Fee" />,
    cell: ({ row }) => formatCurrencyIDR(row.original.total_withdraw_fee),
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <ColumnSorted column={column} title="Status" />,
    cell: ({ row }) => {
      const isActive = validate.boolean(row.original.is_active)
      return (
        <div className="flex items-center gap-2">
          <Checkbox checked={isActive} />
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'is_verified',
    header: ({ column }) => <ColumnSorted column={column} title="Verified" />,
    cell: ({ row }) => {
      const isVerified = validate.boolean(row.original.is_verified)
      return (
        <div className="flex items-center gap-2">
          <Checkbox checked={isVerified} />
          <span>{isVerified ? 'Verified' : 'Unverified'}</span>
        </div>
      )
    },
  },
]
