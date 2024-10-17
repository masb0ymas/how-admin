'use client'

import { Grid, Stack } from '@mantine/core'
import { IconBrandZoom, IconCalendarCheck, IconCalendarDue, IconHistory } from '@tabler/icons-react'
import MyTitle from '~/components/title'
import CardStats from './partials/CardStats'

export default function Dashboard() {
  const webinarStats = [
    { title: 'Archive', value: '2', icon: IconHistory },
    { title: 'Total', value: '2', icon: IconBrandZoom },
    { title: 'Last Attendance', value: '10', icon: IconCalendarDue },
    { title: 'Today Attendance', value: '12', icon: IconCalendarCheck },
  ]

  return (
    <Stack gap={16}>
      <MyTitle>Webinar</MyTitle>
      <Grid columns={12}>
        {webinarStats.map((item) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={item.title}>
            <CardStats title={item.title} value={item.value} icon={item.icon} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  )
}
