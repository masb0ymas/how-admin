'use client'

import { ColumnDef } from '@tanstack/react-table'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { Checkbox } from '~/components/ui/checkbox'
import { PrivatePlanEntity } from '~/data/entity/webinar-private-plan'
import { formatCurrencyIDR } from '~/lib/number'
import { validate } from '~/lib/validate'

export const columns: ColumnDef<PrivatePlanEntity>[] = [
  {
    accessorKey: 'webinar_batch.batch',
    header: ({ column }) => <ColumnSorted column={column} title="Batch" />,
  },
  {
    accessorKey: 'webinar_batch.name',
    header: ({ column }) => <ColumnSorted column={column} title="Webinar Batch" />,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <ColumnSorted column={column} title="Title" />,
  },
  {
    accessorKey: 'discount',
    header: ({ column }) => <ColumnSorted column={column} title="Discount" />,
    cell: ({ row }) => formatCurrencyIDR(row.original.discount),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <ColumnSorted column={column} title="Price" />,
    cell: ({ row }) => formatCurrencyIDR(row.original.price),
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
]
