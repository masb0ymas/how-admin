'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft, IconLoader } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
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
import SelectInput from '~/components/ui/select-input'
import { Separator } from '~/components/ui/separator'
import { InstructorEntity } from '~/data/entity/instructor'
import { WebinarBatchEntity } from '~/data/entity/webinar-batch'
import webinarBatchSchema from '~/data/schema/webinar-batch'
import { capitalizeFirstLetter } from '~/lib/string'
import { findInstructors } from '../../instructor/action'
import { createWebinarBatch, findWebinarBatchById, updateWebinarBatch } from '../action'

type FormProps = {
  initialValues: z.infer<typeof webinarBatchSchema.create>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm({ initialValues, mutation, isEdit = false }: FormProps) {
  const router = useRouter()

  const page = 1
  const pageSize = 100

  const [isFetchingInstructors, setIsFetchingInstructors] = useState(true)
  const [instructors, setInstructors] = useState<InstructorEntity[]>([])

  const getInstructors = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findInstructors({ page, pageSize })
    setInstructors(data)

    setIsFetchingInstructors(false)
  }, [])

  useEffect(() => {
    getInstructors(page, pageSize)
  }, [getInstructors, page, pageSize])

  const selectInstructor =
    instructors.length > 0
      ? instructors.map((item) => {
          return {
            value: item.id,
            label: `${item.user?.fullname} (${item.user?.email})`,
          }
        })
      : []

  const selectType = ['private', 'exclusive', 'express'].map((item) => {
    return {
      value: _.toUpper(item),
      label: capitalizeFirstLetter(item),
    }
  })

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

  if (isFetchingInstructors) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    name="instructor_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructor</FormLabel>
                        <SelectInput
                          options={selectInstructor}
                          onSelect={field.onChange}
                          defaultValue={field.value}
                          placeholder="Select a instructor"
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <SelectInput
                          options={selectType}
                          onSelect={field.onChange}
                          defaultValue={field.value}
                          placeholder="Select a type"
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Actions</h3>
                <Separator />

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
                    className="w-full rounded-lg font-semibold"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <IconLoader className="mr-1 h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>

                <Separator />

                <div className="flex flex-col gap-4">
                  <span className="text-sm font-medium">Status</span>

                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormControl>
                          <CheckboxInput
                            htmlFor="is_active"
                            label={`Set Webinar batch is ${field.value ? 'ACTIVE' : 'INACTIVE'}`}
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
        instructor_id: '',
        batch: '',
        type: '',
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
    instructor_id: '',
    batch: '',
    type: '',
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
