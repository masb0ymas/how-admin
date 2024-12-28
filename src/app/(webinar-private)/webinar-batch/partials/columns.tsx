'use client'

import { ColumnDef } from '@tanstack/react-table'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { Checkbox } from '~/components/ui/checkbox'
import { WebinarBatchEntity } from '~/data/entity/webinar-batch'
import { formatLocalDate } from '~/lib/date'
import { capitalizeFirstLetter } from '~/lib/string'
import { validate } from '~/lib/validate'

export const columns: ColumnDef<WebinarBatchEntity>[] = [
  {
    accessorKey: 'instructor.user.fullname',
    header: ({ column }) => <ColumnSorted column={column} title="Instructor" />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnSorted column={column} title="Name" />,
  },
  {
    accessorKey: 'batch',
    header: ({ column }) => <ColumnSorted column={column} title="Batch" />,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <ColumnSorted column={column} title="Type" />,
    cell: ({ row }) => {
      if (row.original.type) {
        return capitalizeFirstLetter(row.original.type)
      }

      return '-'
    },
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => <ColumnSorted column={column} title="Start Date" />,
    cell: ({ row }) => row.original.start_date && formatLocalDate(row.original.start_date),
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => <ColumnSorted column={column} title="End Date" />,
    cell: ({ row }) => row.original.end_date && formatLocalDate(row.original.end_date),
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => <ColumnSorted column={column} title="Duration" />,
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
