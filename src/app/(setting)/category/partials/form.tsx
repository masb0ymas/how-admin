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
  isEdit?: boolean
}

function AbstractForm({ initialValues, mutation, isEdit = false }: FormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof categorySchema.create>>({
    resolver: zodResolver(categorySchema.create),
    defaultValues: initialValues,
  })
  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: z.infer<typeof categorySchema.create>) {
    await mutation.mutateAsync(data)
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{`${isEdit ? 'Edit' : 'Add'} - Category`}</h1>
        <h4 className="text-muted-foreground">You can manage category here</h4>
      </div>

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
                    className="w-full rounded-lg font-semibold"
                    variant={'outline'}
                    type="button"
                    onClick={() => router.back()}
                  >
                    <IconArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </Button>
                  <Button
                    variant={'default'}
                    className='w-full rounded-lg font-semibold'
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <IconLoader className="mr-1 h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
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

      router.push('/category')
    },
  })

  return <AbstractForm initialValues={{ name: '' }} mutation={mutation} />
}

type FormEditProps = {
  id: string
}

export function FormEdit({ id }: FormEditProps) {
  const router = useRouter()

  const [isFetching, setIsFetching] = useState(true)
  const [category, setCategory] = useState<CategoryEntity>({
    id: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    name: '',
  })

  const getCategory = useCallback(async () => {
    const { data } = await findCategoryById(id)
    setCategory(data)
    setIsFetching(false)
  }, [id])

  useEffect(() => {
    getCategory()
  }, [id, getCategory])

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

      router.push('/category')
    },
  })

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return <AbstractForm initialValues={{ ...category }} mutation={mutation} isEdit={!!id} />
}
