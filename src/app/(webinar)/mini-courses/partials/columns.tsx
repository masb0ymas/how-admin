'use client'

import { IconExternalLink } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { WebinarEntity } from '~/data/entity/webinar'
import { getChain } from '~/lib/chain'
import { formatLocalDate } from '~/lib/date'
import { validate } from '~/lib/validate'

export const columns: ColumnDef<WebinarEntity>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <ColumnSorted column={column} title="Title" />,
    cell: ({ row }) => {
      return <div className="w-[400px]">{row.original.title}</div>
    },
  },
  {
    accessorKey: 'speakers',
    header: ({ column }) => <ColumnSorted column={column} title="Speakers" />,
  },
  {
    accessorKey: 'category.name',
    header: ({ column }) => <ColumnSorted column={column} title="Category" />,
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => <ColumnSorted column={column} title="Start Date" />,
    cell: ({ row }) => {
      if (row.original.start_date) {
        return <div className="w-[120px]">{formatLocalDate(row.original.start_date)}</div>
      }
      return '-'
    },
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => <ColumnSorted column={column} title="End Date" />,
    cell: ({ row }) => {
      if (row.original.end_date) {
        return <div className="w-[120px]">{formatLocalDate(row.original.end_date)}</div>
      }
      return '-'
    },
  },
  {
    accessorKey: 'webinar_url',
    header: ({ column }) => <ColumnSorted column={column} title="Webinar URL" />,
    cell: ({ row }) => {
      return (
        <Link href={row.original.webinar_url} target="_blank" rel="noreferrer">
          <Button variant={'outline'} className="px-2 py-1">
            <span>View</span>
            <IconExternalLink stroke={1.5} />
          </Button>
        </Link>
      )
    },
  },
  {
    accessorKey: 'recording_url',
    header: ({ column }) => <ColumnSorted column={column} title="Recording URL" />,
    cell: ({ row }) => {
      if (!row.original.recording_url) {
        return '-'
      }

      return (
        <Link href={row.original.recording_url} target="_blank" rel="noreferrer">
          <Button variant={'outline'} className="px-2 py-1">
            <span>View</span>
            <IconExternalLink stroke={1.5} />
          </Button>
        </Link>
      )
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => <ColumnSorted column={column} title="Active" />,
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
    accessorKey: 'is_premium',
    header: ({ column }) => <ColumnSorted column={column} title="Premium" />,
    cell: ({ row }) => {
      const isPremium = validate.boolean(row.original.is_premium)
      return (
        <div className="flex items-center gap-2">
          <Checkbox checked={isPremium} />
          <span>{isPremium ? 'Premium' : 'Free'}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'chain_id',
    header: ({ column }) => <ColumnSorted column={column} title="Chain ID" />,
    cell: ({ row }) => getChain(row.original.chain_id),
  },
]
