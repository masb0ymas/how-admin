'use client'

import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle, IconCheck } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { useParams, useRouter } from 'next/navigation'
import MyTitlePage from '~/components/title/MyTitlePage'
import { useStore } from '~/config/zustand'
import { WebinarEntity } from '~/data/entity/webinar'
import useCategory from '~/data/query/category/useCategory'
import WebinarRepository from '~/data/repository/webinar'
import webinarSchema from '~/data/schema/webinar'

type IProps = {
  initialValues: any
  validate: any
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
}

function AbstractForm(props: IProps) {
  const { initialValues, validate, mutation } = props
  const router = useRouter()

  const queryCategory = useCategory()
  const selectCategory = queryCategory.data.map((item) => {
    return {
      label: item.name,
      value: item.id,
    }
  })

  const form = useForm({
    initialValues,
    validate,
  })

  async function onFormSubmit() {
    try {
      console.log(form.values)
      await mutation.mutateAsync(form.values)
    } catch (error: any) {
      console.log(error)

      let title = 'Catch Error'
      let message = 'Something went wrong.'

      if (error.response?.data?.message) {
        title = error.response.data.error
        message = error.response.data.message
      }

      showNotification({
        title: title,
        message: message,
        color: 'red',
        icon: <IconAlertCircle size={18} stroke={1.5} />,
      })
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
                    minDate={!_.isNil(form.values.start_date) ? form.values.start_date : new Date()}
                    {...form.getInputProps('end_date')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    label="Category"
                    placeholder="Choose category"
                    data={selectCategory}
                    clearable
                    {...form.getInputProps('category_id')}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    label="IPFS CID"
                    placeholder="IPFS CID"
                    radius="md"
                    {...form.getInputProps('ipfs_cid')}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInput
                    label="Link"
                    placeholder="Link"
                    radius="md"
                    {...form.getInputProps('link')}
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
  const router = useRouter()

  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')

  const axiosConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const postWebinar = useMutation({
    mutationFn: (data: WebinarEntity) => WebinarRepository.create(data, axiosConfig),
    onSuccess: (data) => {
      showNotification({
        title: 'Success',
        message: data.message,
        color: 'green',
        icon: <IconCheck size={18} stroke={1.5} />,
      })

      router.push('/webinar?tabs=upcoming')
    },
  })

  return (
    <AbstractForm
      initialValues={{
        title: '',
        description: '',
        speakers: '',
        start_date: '',
        end_date: '',
        link: '',
        ipfs_cid: '',
        is_active: false,
      }}
      mutation={postWebinar}
      validate={zodResolver(webinarSchema.create)}
    />
  )
}

export function FormEdit() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id

  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')

  const axiosConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const updateWebinar = useMutation({
    mutationFn: (data: WebinarEntity) => WebinarRepository.update(id, data, axiosConfig),
    onSuccess: (data) => {
      showNotification({
        title: 'Success',
        message: data.message,
        color: 'green',
        icon: <IconCheck size={18} stroke={1.5} />,
      })

      router.push('/webinar?tabs=upcoming')
    },
  })

  return (
    <AbstractForm
      initialValues={{
        title: '',
        description: '',
        speakers: '',
        start_date: '',
        end_date: '',
        link: '',
        ipfs_cid: '',
        is_active: false,
      }}
      mutation={updateWebinar}
      validate={zodResolver(webinarSchema.create)}
    />
  )
}
