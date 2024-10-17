'use client'

import { Button, Grid, Paper, Stack, Text, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle, IconCheck, IconLetterT } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { useParams, useRouter } from 'next/navigation'
import VerifyPage from '~/components/loader/VerifyPage'
import MyTitlePage from '~/components/title/MyTitlePage'
import { useStore } from '~/config/zustand'
import { RoleEntity } from '~/data/entity/role'
import useRoleById from '~/data/query/role/useRoleById'
import RoleRepository from '~/data/repository/role'
import roleSchema from '~/data/schema/role'

type IProps = {
  initialValues: any
  validate: any
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm(props: IProps) {
  const { initialValues, validate, mutation, isEdit } = props
  const router = useRouter()

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
      <MyTitlePage title={`${isEdit ? 'Edit' : 'Add'} — Role`} onBack={() => router.back()} />

      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Grid columns={12} gutter={32}>
          <Grid.Col span={9}>
            <Paper radius="lg" shadow="xs" p={16}>
              <Grid columns={12}>
                <Grid.Col span={12}>
                  <TextInput
                    label="Name"
                    placeholder="Name"
                    required
                    radius="md"
                    leftSection={<IconLetterT size={18} stroke={1.5} />}
                    {...form.getInputProps('name')}
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

  const postRole = useMutation({
    mutationFn: (data: RoleEntity) => RoleRepository.create(data, axiosConfig),
    onSuccess: (data) => {
      showNotification({
        title: 'Success',
        message: data.message,
        color: 'green',
        icon: <IconCheck size={18} stroke={1.5} />,
      })

      router.push('/account?tabs=role')
    },
  })

  return (
    <AbstractForm
      initialValues={{
        name: '',
      }}
      mutation={postRole}
      validate={zodResolver(roleSchema.create)}
    />
  )
}

export function FormEdit() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id

  const query = useRoleById(id)
  const fetchingData = query.isLoading || query.isFetching

  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')

  const axiosConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const updateRole = useMutation({
    mutationFn: (data: RoleEntity) => RoleRepository.update(id, data, axiosConfig),
    onSuccess: (data) => {
      showNotification({
        title: 'Success',
        message: data.message,
        color: 'green',
        icon: <IconCheck size={18} stroke={1.5} />,
      })

      router.push('/account?tabs=role')
    },
  })

  if (fetchingData) {
    return <VerifyPage loading={fetchingData} />
  }

  return (
    <AbstractForm
      initialValues={{
        ...query.data,
      }}
      isEdit
      mutation={updateRole}
      validate={zodResolver(roleSchema.create)}
    />
  )
}
