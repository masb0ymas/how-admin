'use client'

import { Divider, Stack } from '@mantine/core'
import Description, { ItemType } from '~/components/description'
import { env } from '~/config/env'
import { WebinarEntity } from '~/data/entity/webinar'
import { selectChains } from '~/lib/constant/chain'

type IProps = {
  data: WebinarEntity
}

export default function WebinarDetail(props: IProps) {
  const { data } = props

  const chain = selectChains.find((item) => item.value === data.chain_id)
  const newData = {
    ...data,
    ipfs_cid: `${env.IPFS_API_URL}/${data.ipfs_cid}`,
    chain: chain?.label,
  }

  const details = [
    { key: 'title', title: 'Webinar', type: ItemType.string },
    { key: 'speakers', title: 'Speakers', type: ItemType.string },
    { key: 'category.name', title: 'Category', type: ItemType.string },
    { key: 'chain', title: 'Chain', type: ItemType.string },
    { key: 'start_date', title: 'Start Date', type: ItemType.date },
    { key: 'end_date', title: 'End Date', type: ItemType.date },
    { key: 'is_active', title: 'Active', type: ItemType.boolean },
    { key: 'is_premium', title: 'Premium', type: ItemType.boolean },
    { key: 'webinar_url', title: 'Webinar URL', type: ItemType.link_button },
    { key: 'recording_url', title: 'Recording URL', type: ItemType.link_button },
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
