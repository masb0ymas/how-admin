'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { RainbowButton } from '~/components/ui/rainbow-button'
import authSchema from '~/data/schema/auth'

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackPath = searchParams.get('callbackPath')

  const form = useForm({
    resolver: zodResolver(authSchema.login),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof authSchema.login>) {
    setIsLoading(true)

    try {
      const result = await signIn('credentials', { ...data, redirect: false })
      console.log({ result })

      if (result?.error) {
        setError('Invalid email or password')
        toast.error('Invalid email or password')
      } else {
        toast.success('Signed in successfully')

        if (callbackPath) {
          router.push(callbackPath)
          return
        }

        window.location.href = '/'
      }

      form.reset()
    } catch (error) {
      const message = (error as Error).message ?? 'Unexpected error occured while signing in'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Input your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Input your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <RainbowButton
          type="submit"
          className="h-10 text-sm font-serif tracking-wider w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Continue with Email'}
        </RainbowButton>
      </form>

      {/* Terms */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        By continuing, you agree to our{' '}
        <Link href="/term-of-service" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          Privacy Policy
        </Link>
      </p>
    </Form>
  )
}
