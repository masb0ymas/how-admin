'use client'

import { Button, Checkbox } from '@mantine/core'
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
    accessor: 'is_active',
    title: 'Active',
    width: 80,
    render: ({ is_active }) => {
      return <Checkbox checked={is_active} label={is_active ? "Yes": "No"} />
    },
  },
  {
    accessor: 'is_premium',
    title: 'Premium',
    width: 80,
    render: ({ is_premium }) => {
      return <Checkbox checked={is_premium} label={is_premium ? "Yes": "No"} />
    },
  },
  {
    accessor: 'webinar_url',
    title: 'Webinar URL',
    render: ({ webinar_url }) => {
      if (webinar_url) {
        return (
          <Button
            variant="subtle"
            component={Link}
            href={webinar_url}
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
    accessor: 'recording_url',
    title: 'Recording URL',
    render: ({ recording_url }) => {
      if (recording_url) {
        return (
          <Button
            variant="subtle"
            component={Link}
            href={recording_url}
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
