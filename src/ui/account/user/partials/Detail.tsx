'use client'

import { Divider, Stack } from '@mantine/core'
import Description, { ItemType } from '~/components/description'
import { UserEntity } from '~/data/entity/user'

type IProps = {
  data: UserEntity
}

export default function UserDetail(props: IProps) {
  const { data } = props

  const details = [
    { key: 'fullname', title: 'Full Name', type: ItemType.string },
    { key: 'email', title: 'Email', type: ItemType.string },
    { key: 'is_active', title: 'Active', type: ItemType.boolean },
    { key: 'is_blocked', title: 'Blocked', type: ItemType.boolean },
    { key: 'role.name', title: 'Role', type: ItemType.string },
  ]

  return (
    <Stack gap={10}>
      <Divider variant="solid" />
      {details.map((content) => Description<UserEntity>({ item: data, content }))}
    </Stack>
  )
}
