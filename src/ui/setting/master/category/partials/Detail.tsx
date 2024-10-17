'use client'

import { Divider, Stack } from "@mantine/core"
import Description, { ItemType } from "~/components/description"
import { CategoryEntity } from "~/data/entity/category"

type IProps = {
  data: CategoryEntity
}

export default function CategoryDetail(props: IProps) {
  const { data } = props

  const details = [{ key: 'name', title: 'Name', type: ItemType.string }]

  return (
    <Stack gap={10}>
      <Divider variant="solid" />
      {details.map((content) => Description<CategoryEntity>({ item: data, content }))}
    </Stack>
  )
}
