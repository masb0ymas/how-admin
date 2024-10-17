'use client'

import { Divider, Stack } from '@mantine/core'
import Description, { ItemType } from '~/components/description'
import { env } from '~/config/env'
import { WebinarEntity } from '~/data/entity/webinar'

type IProps = {
  data: WebinarEntity
}

export default function WebinarDetail(props: IProps) {
  const { data } = props

  const newData = { ...data, ipfs_cid: `${env.IPFS_API_URL}/${data.ipfs_cid}` }

  const details = [
    { key: 'title', title: 'Webinar', type: ItemType.string },
    { key: 'speakers', title: 'Speakers', type: ItemType.string },
    { key: 'category.name', title: 'Category', type: ItemType.string },
    { key: 'start_date', title: 'Start Date', type: ItemType.date },
    { key: 'end_date', title: 'End Date', type: ItemType.date },
    { key: 'is_active', title: 'Active', type: ItemType.boolean },
    { key: 'link', title: 'Link', type: ItemType.link_button },
    { key: 'ipfs_cid', title: 'IPFS CID', type: ItemType.link_button },
    { key: 'description', title: 'Description', type: ItemType.string },
  ]

  return (
    <Stack gap={10}>
      <Divider variant="solid" />
      {details.map((content) => Description<WebinarEntity>({ item: newData, content }))}
    </Stack>
  )
}
