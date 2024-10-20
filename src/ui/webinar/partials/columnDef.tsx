'use client'

import { Button } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import { format } from 'date-fns'
import { DataTableColumn } from 'mantine-datatable'
import Link from 'next/link'
import { env } from '~/config/env'
import { WebinarEntity } from '~/data/entity/webinar'
import { selectChains } from '~/lib/constant/chain'

export const columnWebinar: DataTableColumn<WebinarEntity>[] = [
  {
    accessor: 'title',
    title: 'Title',
    width: 300,
  },
  {
    accessor: 'speakers',
    title: 'Speakers',
  },
  {
    accessor: 'category.name',
    title: 'Category',
    width: 120,
  },
  {
    accessor: 'chain_id',
    title: 'Chain',
    width: 100,
    render: ({ chain_id }) => {
      if (chain_id) {
        return selectChains.find((item) => item.value === chain_id)?.label || '-'
      }
      return '-'
    },
  },
  {
    accessor: 'start_date',
    title: 'Start Date',
    width: 150,
    render: ({ start_date }) => {
      if (start_date) {
        return format(new Date(start_date), 'dd MMM yyyy HH:mm')
      }
      return '-'
    },
  },
  {
    accessor: 'end_date',
    title: 'End Date',
    width: 150,
    render: ({ end_date }) => {
      if (end_date) {
        return format(new Date(end_date), 'dd MMM yyyy HH:mm')
      }
      return '-'
    },
  },
  {
    accessor: 'link',
    title: 'Link',
    render: ({ link }) => {
      if (link) {
        return (
          <Button
            variant="subtle"
            component={Link}
            href={link}
            target="_blank"
            rel="noreferrer"
            leftSection={<IconExternalLink size={18} stroke={1.5} />}
            size="compact-md"
            radius="md"
          >
            view
          </Button>
        )
      }
      return '-'
    },
  },
  {
    accessor: 'ipfs_cid',
    title: 'IPFS CID',
    render: ({ ipfs_cid }) => {
      if (ipfs_cid) {
        const link = `${env.IPFS_API_URL}/${ipfs_cid}`
        return (
          <Button
            variant="subtle"
            component={Link}
            href={link}
            target="_blank"
            rel="noreferrer"
            leftSection={<IconExternalLink size={18} stroke={1.5} />}
            size="compact-md"
            radius="md"
          >
            view
          </Button>
        )
      }
      return '-'
    },
  },
]
