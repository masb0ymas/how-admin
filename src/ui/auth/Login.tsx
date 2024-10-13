'use client'

import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  function handleLogin() {
    console.log('/dashboard')
    router.push('/dashboard')
  }

  return (
    <Container size={420} my={40} mt={100}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        To become a great wizard, login with your account first.
      </Text>

      <Paper shadow="lg" p={30} mt={30} radius="lg">
        <TextInput radius="md" label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput radius="md" label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" radius="md" onClick={() => handleLogin()}>
          Sign in
        </Button>
      </Paper>
    </Container>
  )
}
