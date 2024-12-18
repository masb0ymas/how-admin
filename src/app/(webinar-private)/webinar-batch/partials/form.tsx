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
import { CalendarInput } from '~/components/ui/calendar-input'
import CheckboxInput from '~/components/ui/checkbox-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { NumberInput } from '~/components/ui/number-input'
import { Separator } from '~/components/ui/separator'
import { WebinarBatchEntity } from '~/data/entity/webinar-batch'
import webinarBatchSchema from '~/data/schema/webinar-batch'
import { createWebinarBatch, findWebinarBatchById, updateWebinarBatch } from '../action'

type FormProps = {
  initialValues: z.infer<typeof webinarBatchSchema.create>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm({ initialValues, mutation, isEdit = false }: FormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof webinarBatchSchema.create>>({
    resolver: zodResolver(webinarBatchSchema.create),
    defaultValues: initialValues,
  })
  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: z.infer<typeof webinarBatchSchema.create>) {
    await mutation.mutateAsync(data)
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{`${isEdit ? 'Edit' : 'Add'} - Webinar Batch`}</h1>
        <h4 className="text-muted-foreground">You can manage webinar batch here</h4>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Input your webinar batch name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor</FormLabel>
                      <FormControl>
                        <Input placeholder="Input your webinar batch instructor" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormLabel>Start Date</FormLabel>
                        <CalendarInput value={field.value} onChange={field.onChange} />

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormLabel>End Date</FormLabel>
                        <CalendarInput value={field.value} onChange={field.onChange} />

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="batch"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormLabel>Batch</FormLabel>
                        <FormControl>
                          <NumberInput
                            id="batch"
                            value={field.value}
                            onValueChange={(e) => field.onChange(e.value)}
                            thousandSeparator=","
                            placeholder="Enter batch"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <CheckboxInput
                          label="Set active this webinar batch"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
    mutationFn: async (data: z.infer<typeof webinarBatchSchema.create>) =>
      await createWebinarBatch(data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/webinar-batch')
    },
  })

  return (
    <AbstractForm
      initialValues={{
        name: '',
        instructor: '',
        batch: '',
        start_date: new Date(),
        end_date: new Date(),
        is_active: true,
      }}
      mutation={mutation}
    />
  )
}

type FormEditProps = {
  id: string
}

export function FormEdit({ id }: FormEditProps) {
  const router = useRouter()

  const [isFetching, setIsFetching] = useState(true)
  const [webinarBatch, setWebinarBatch] = useState<WebinarBatchEntity>({
    id: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    name: '',
    instructor: '',
    batch: '',
    start_date: new Date(),
    end_date: new Date(),
    duration: '',
    is_active: true,
  })

  const getWebinarBatch = useCallback(async () => {
    const { data } = await findWebinarBatchById(id)
    setWebinarBatch(data)
    setIsFetching(false)
  }, [id])

  useEffect(() => {
    getWebinarBatch()
  }, [id, getWebinarBatch])

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof webinarBatchSchema.create>) =>
      await updateWebinarBatch(id, data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/webinar-batch')
    },
  })

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <AbstractForm
      initialValues={{
        ...webinarBatch,
        start_date: new Date(webinarBatch.start_date),
        end_date: new Date(webinarBatch.end_date),
        batch: String(webinarBatch.batch),
      }}
      mutation={mutation}
      isEdit={!!id}
    />
  )
}