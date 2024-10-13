'use client'

import { Group, Text } from '@mantine/core'
import MyImage from '../image'

export default function Brand() {
  return (
    <Group>
      <MyImage src="/static/logo-how.png" alt="logo house of wizard" width="45px" height="45px" />
      <Text size="lg" fw={700} c={'#705C53'}>
        House of Wizard
      </Text>
    </Group>
  )
}
