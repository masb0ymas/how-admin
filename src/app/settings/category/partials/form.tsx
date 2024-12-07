'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft, IconLoader } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Loader from '~/components/custom/loader'
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
import { CategoryEntity } from '~/data/entity/category'
import categorySchema from '~/data/schema/category'
import { createCategory, findCategoryById, updateCategory } from '../action'

type FormProps = {
  initialValues: z.infer<typeof categorySchema.create>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
}

function AbstractForm({ initialValues, mutation }: FormProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof categorySchema.create>>({
    resolver: zodResolver(categorySchema.create),
    defaultValues: initialValues,
  })

  async function onSubmit(data: z.infer<typeof categorySchema.create>) {
    setIsLoading(true)
    await mutation.mutateAsync(data)
    setIsLoading(false)
  }

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
                    <Input placeholder="Input your category name" {...field} />
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
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof categorySchema.create>) => await createCategory(data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/settings/category')
    },
  })

  return <AbstractForm initialValues={{ name: '' }} mutation={mutation} />
}

type FormEditProps = {
  id: string
}

export function FormEdit({ id }: FormEditProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState<CategoryEntity>({
    id: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    name: '',
  })

  const getRole = useCallback(async () => {
    const { data } = await findCategoryById(id)
    setCategory(data)
    setIsLoading(false)
  }, [id])

  useEffect(() => {
    getRole()
  }, [id, getRole])

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof categorySchema.create>) =>
      await updateCategory(id, data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/settings/category')
    },
  })

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return <AbstractForm initialValues={{ ...category }} mutation={mutation} />
}
