'use client'

import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle, IconCheck } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import VerifyPage from '~/components/loader/VerifyPage'
import { useStore } from '~/config/zustand'
import { LoginEntity } from '~/data/entity/auth'
import useProfile from '~/data/query/useProfile'
import AuthRepository from '~/data/repository/auth'
import authSchema from '~/data/schema/auth'

export default function Login() {
  const router = useRouter()

  const { data, isLoading, isFetching } = useProfile()
  const setAuthSession = useStore((state) => state.setAuthSession)

  const form = useForm({
    initialValues: { email: '', password: '', latitude: '', longitude: '' },
    validate: zodResolver(authSchema.login),
  })

  const postLogin = useMutation({
    mutationFn: (data: LoginEntity) => AuthRepository.signIn(data),
    onSuccess: (data) => {
      showNotification({
        title: 'Success',
        message: data.message,
        color: 'green',
        icon: <IconCheck size={18} stroke={1.5} />,
      })

      const state = { email: form.values.email, access_token: data.data.access_token }
      setAuthSession(state)

      router.push('/dashboard')
    },
  })

  async function onFormSubmit() {
    try {
      await postLogin.mutateAsync(form.values)
    } catch (error: any) {
      console.log(error)

      let message = 'Please check your email and password.'
      if (error.response?.data?.message) {
        message = error.response.data.message
      }

      showNotification({
        title: 'Catch Error',
        message: message,
        color: 'red',
        icon: <IconAlertCircle size={18} stroke={1.5} />,
      })
    }
  }

  const fetchingData = isLoading || isFetching

  if (fetchingData) {
    return <VerifyPage loading={fetchingData} />
  }

  // @ts-expect-error
  if (!_.isEmpty(data) || !_.isNil(data?.email)) {
    router.push('/dashboard')
    return
  }

  return (
    <Container size={420} my={40} mt={100}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        To become a great wizard, login with your account first.
      </Text>

      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Paper shadow="lg" p={30} mt={30} radius="lg">
          <Stack gap={10}>
            <TextInput
              radius="md"
              label="Email"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps('email')}
            />

            <PasswordInput
              radius="md"
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps('password')}
            />
          </Stack>

          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component={Link} href={'/forgot-password'} size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button fullWidth mt="xl" radius="md" type="submit">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
