'use client'

import { Button, Checkbox, Divider, Group, Text } from '@mantine/core'
import { formatDate } from 'date-fns'
import { id } from 'date-fns/locale'
import _ from 'lodash'
import Link from 'next/link'
import classes from './description.module.css'
import { IconExternalLink } from '@tabler/icons-react'

interface ItemProps<T> {
  item: T
  content: ContentDetailType
}

type ContentDetailType = {
  title: string
  key: string
  type: ItemType
}

export enum ItemType {
  string,
  boolean,
  date,
  number,
  currency,
  date_time,
  html,
  image,
  link,
  link_button,
  custom,
}

export default function Description<T>({ item, content }: ItemProps<T>) {
  const { title, key, type } = content

  const data = _.get(item, key, null) as any

  function renderValue() {
    if (_.isNil(data)) {
      return <Text size="md">{'-'}</Text>
    }

    if (type === ItemType.date) {
      const value = formatDate(new Date(data), 'dd MMM yyyy HH:mm', { locale: id })
      return <Text size="md">{value}</Text>
    }

    if (type === ItemType.boolean) {
      return <Checkbox checked={data} label={data ? 'Yes' : 'No'} />
    }

    if (type === ItemType.link) {
      return (
        <Link href={data} target="_blank" rel="noreferrer">
          <Text size="md">{data}</Text>
        </Link>
      )
    }

    if (type === ItemType.link_button) {
      return (
        <Button
          variant="subtle"
          component={Link}
          href={data}
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

    return <Text size="md">{data}</Text>
  }

  return (
    <>
      <Group justify="space-between">
        <Text className={classes.modal_label} size="md">
          {title} :
        </Text>

        {renderValue()}
      </Group>

      <Divider variant="dashed" />
    </>
  )
}
