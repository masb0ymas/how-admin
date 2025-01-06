'use client'

import { IconExternalLink } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { WebinarPrivateMemberEntity } from '~/data/entity/webinar-private-member'
import { formatLocalDate } from '~/lib/date'
import { validate } from '~/lib/validate'

export const columns: ColumnDef<WebinarPrivateMemberEntity>[] = [
  {
    accessorKey: 'user.fullname',
    header: ({ column }) => <ColumnSorted column={column} title="Fullname" />,
  },
  {
    accessorKey: 'user.email',
    header: ({ column }) => <ColumnSorted column={column} title="Email" />,
  },
  {
    accessorKey: 'webinar_batch.batch',
    header: ({ column }) => <ColumnSorted column={column} title="Batch" />,
  },
  {
    accessorKey: 'webinar_batch.name',
    header: ({ column }) => <ColumnSorted column={column} title="Name" />,
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
    accessorKey: 'certificate_url',
    header: ({ column }) => <ColumnSorted column={column} title="Certificate URL" />,
    cell: ({ row }) => {
      if (row.original.certificate_url) {
        return (
          <Link href={row.original.certificate_url} target="_blank" rel="noreferrer">
            <Button variant={'outline'} className="px-2 py-1">
              <span>View</span>
              <IconExternalLink stroke={1.5} />
            </Button>
          </Link>
        )
      }

      return '-'
    },
  },
  {
    accessorKey: 'is_alumni',
    header: ({ column }) => <ColumnSorted column={column} title="Status" />,
    cell: ({ row }) => {
      const isAlumni = validate.boolean(row.original.is_alumni)
      return (
        <div className="flex items-center gap-2">
          <Checkbox checked={isAlumni} />
          <span>{isAlumni ? 'Alumni' : 'Member'}</span>
        </div>
      )
    },
  },
]
