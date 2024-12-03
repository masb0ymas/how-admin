'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft, IconLoader } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import roleSchema from '~/data/schema/role'

type FormProps = {
  id?: string
}

function AbstractForm({ id }: FormProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof roleSchema.create>>({
    resolver: zodResolver(roleSchema.create),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(data: z.infer<typeof roleSchema.create>) {
    setIsLoading(true)
    console.log(data)
    setIsLoading(false)
  }

  console.log(id)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          <div className="lg:col-span-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Input your role name" {...field} />
                  </FormControl>

                  {fieldState.error && (
                    <FormDescription className="text-destructive">
                      {fieldState.error.message}
                    </FormDescription>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Actions</h3>
              <Separator className="my-4" />

              <div className="flex flex-row justify-center gap-4">
                <Button
                  className="w-full rounded-lg"
                  variant={'outline'}
                  type="button"
                  onClick={() => router.back()}
                >
                  <IconArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
                <Button
                  className="w-full rounded-lg bg-blue-500 hover:bg-blue-500/80"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && <IconLoader className="mr-1 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export function FormAdd() {
  return <AbstractForm />
}

type FormEditProps = {
  id: string
}

export function FormEdit({ id }: FormEditProps) {
  return <AbstractForm id={id} />
}
