'use client'

import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import { useRouter } from 'next/navigation'
import MyTitlePage from '~/components/title/MyTitlePage'
import webinarSchema from '~/data/schema/webinar'

type IProps = {
  initialValues: any
  validate: any
}

function AbstractForm(props: IProps) {
  const { initialValues, validate } = props
  const router = useRouter()

  const form = useForm({
    initialValues,
    validate,
  })

  function onFormSubmit() {
    try {
      console.log(form.values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack gap={10}>
      <MyTitlePage title="Add — Webinar" onBack={() => router.back()} />

      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Grid columns={12} gutter={32}>
          <Grid.Col span={9}>
            <Paper radius="lg" shadow="xs" p={16}>
              <Grid columns={12}>
                <Grid.Col span={6}>
                  <TextInput
                    label="Title"
                    placeholder="Title"
                    required
                    radius="md"
                    {...form.getInputProps('title')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    label="Speakers"
                    placeholder="Speakers"
                    required
                    radius="md"
                    {...form.getInputProps('speakers')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <DateTimePicker
                    label="Start Date"
                    placeholder="Start Date"
                    minDate={new Date()}
                    required
                    radius="md"
                    {...form.getInputProps('start_date')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <DateTimePicker
                    label="End Date"
                    placeholder="End Date"
                    required
                    radius="md"
                    {...form.getInputProps('end_date')}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInput
                    label="IPFS CID"
                    placeholder="IPFS CID"
                    radius="md"
                    {...form.getInputProps('ipfs_cid')}
                  />
                </Grid.Col>

                <Grid.Col span="auto">
                  <Textarea
                    label="Description"
                    placeholder="Description"
                    radius="md"
                    rows={5}
                    {...form.getInputProps('description')}
                  />
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>

          <Grid.Col span="auto">
            <Stack gap={10}>
              <Text component="h3" size="lg" fw={600}>
                Actions
              </Text>

              <Grid columns={12}>
                <Grid.Col span={6}>
                  <Button fullWidth radius="md" type="submit">
                    Save
                  </Button>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Button fullWidth radius="md" variant="light" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </Grid.Col>
              </Grid>

              <Divider variant="dashed" my={16} />

              <Checkbox
                defaultChecked
                label="Want to publish this webinar?"
                {...form.getInputProps('is_active')}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </form>
    </Stack>
  )
}

export function FormAdd() {
  return (
    <AbstractForm
      initialValues={{
        title: '',
        description: '',
        speakers: '',
        start_date: '',
        end_date: '',
        ipfs_cid: '',
        is_active: false,
      }}
      validate={zodResolver(webinarSchema.create)}
    />
  )
}

export function FormEdit() {
  return (
    <AbstractForm
      initialValues={{
        title: '',
        description: '',
        speakers: '',
        start_date: '',
        end_date: '',
        ipfs_cid: '',
        is_active: false,
      }}
      validate={zodResolver(webinarSchema.create)}
    />
  )
}
