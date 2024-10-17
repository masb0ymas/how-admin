'use client'

import { Divider, Stack } from '@mantine/core'
import Description, { ItemType } from '~/components/description'
import { RoleEntity } from '~/data/entity/role'

type IProps = {
  data: RoleEntity
}

export default function RoleDetail(props: IProps) {
  const { data } = props

  const details = [{ key: 'name', title: 'Name', type: ItemType.string }]

  return (
    <Stack gap={10}>
      <Divider variant="solid" />
      {details.map((content) => Description<RoleEntity>({ item: data, content }))}
    </Stack>
  )
}
