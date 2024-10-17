'use client'

import { Group, Paper, Text, ThemeIcon } from '@mantine/core'
import { IconHome2 } from '@tabler/icons-react'

type IProps = {
  title: string
  value: string
  icon: typeof IconHome2
}

export default function CardStats(props: IProps) {
  return (
    <Paper withBorder shadow="md" p="md" radius="md">
      <Group justify="space-between">
        <div>
          <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
            {props.title}
          </Text>
          <Text fw={700} fz="xl">
            {props.value}
          </Text>
        </div>

        <ThemeIcon variant="light" size="xl" radius="lg" color="#705C53">
          <props.icon stroke={1.5} size={32} />
        </ThemeIcon>
      </Group>
    </Paper>
  )
}
