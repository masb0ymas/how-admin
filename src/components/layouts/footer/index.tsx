import { Center, Text } from '@mantine/core'
import React from 'react'

export default function Footer() {
  const dateNow = new Date()
  const year = dateNow.getFullYear()

  return (
    <footer style={{ padding: '1rem' }}>
      <Center>
        <Text component="span" size="sm">
          &copy; {year} -{' '}
          <Text component="span" size="sm" fw={600}>
            House of Wizard.
          </Text>{' '}
          All rights reserved.
        </Text>
      </Center>
    </footer>
  )
}
