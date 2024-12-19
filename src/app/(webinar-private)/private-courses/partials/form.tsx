'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft, IconLoader } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { findCategories } from '~/app/(setting)/category/action'
import Loader from '~/components/custom/loader'
import { Button } from '~/components/ui/button'
import CheckboxInput from '~/components/ui/checkbox-input'
import { DateTimePicker } from '~/components/ui/date-time-picker'
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
import { Textarea } from '~/components/ui/textarea'
import { CategoryEntity } from '~/data/entity/category'
import { InstructorEntity } from '~/data/entity/instructor'
import { WebinarBatchEntity } from '~/data/entity/webinar-batch'
import { WebinarPrivateEntity } from '~/data/entity/webinar-private'
import webinarPrivateSchema from '~/data/schema/webinar-private'
import { selectChain } from '~/lib/chain'
import { validate } from '~/lib/validate'
import { findInstructors } from '../../instructor/action'
import { findWebinarBatches } from '../../webinar-batch/action'
import { createPrivateCourse, findPrivateCourseById, updatePrivateCourse } from '../action'

type FormProps = {
  initialValues: z.infer<typeof webinarPrivateSchema.create>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm({ initialValues, mutation, isEdit = false }: FormProps) {
  const router = useRouter()

  const page = 1
  const pageSize = 100

  const [isFetchingCategories, setIsFetchingCategories] = useState(true)
  const [isFetchingWebinarBatches, setIsFetchingWebinarBatches] = useState(true)
  const [isFetchingInstructors, setIsFetchingInstructors] = useState(true)

  const [categories, setCategories] = useState<CategoryEntity[]>([])
  const [webinarBatches, setWebinarBatches] = useState<WebinarBatchEntity[]>([])
  const [instructors, setInstructors] = useState<InstructorEntity[]>([])

  const getCategories = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findCategories({ page, pageSize })
    setCategories(data)

    setIsFetchingCategories(false)
  }, [])

  const getWebinarBatches = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findWebinarBatches({ page, pageSize })
    setWebinarBatches(data)

    setIsFetchingWebinarBatches(false)
  }, [])

  const getInstructors = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findInstructors({ page, pageSize })
    setInstructors(data)

    setIsFetchingInstructors(false)
  }, [])

  useEffect(() => {
    getCategories(page, pageSize)
    getWebinarBatches(page, pageSize)
    getInstructors(page, pageSize)
  }, [getCategories, getWebinarBatches, getInstructors, page, pageSize])

  const selectCategory =
    categories.length > 0
      ? categories.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      : []

  const selectWebinarBatch =
    webinarBatches.length > 0
      ? webinarBatches.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      : []

  const selectInstructor =
    instructors.length > 0
      ? instructors.map((item) => {
          return {
            value: item.id,
            label: `${item.user?.fullname} (${item.user?.email})`,
          }
        })
      : []

  const form = useForm<z.infer<typeof webinarPrivateSchema.create>>({
    resolver: zodResolver(webinarPrivateSchema.create),
    defaultValues: initialValues,
  })
  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: z.infer<typeof webinarPrivateSchema.create>) {
    let values = { ...data }

    if (data.recording_url === '-') {
      values = {
        ...data,
        recording_url: '',
      }
    }
    console.log(values)

    await mutation.mutateAsync(values)
  }

  if (isFetchingCategories || isFetchingWebinarBatches || isFetchingInstructors) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{`${isEdit ? 'Edit' : 'Add'} - Private Courses`}</h1>
        <h4 className="text-muted-foreground">You can manage private courses here</h4>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="lg:col-span-3 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="webinar_batch_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Webinar Batch</FormLabel>
                      <SelectInput
                        options={selectWebinarBatch}
                        onSelect={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select a webinar batch"
                      />

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
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Input your description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <SelectInput
                        options={selectCategory}
                        onSelect={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chain_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chain ID</FormLabel>
                      <SelectInput
                        options={selectChain}
                        onSelect={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select a chain id"
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <DateTimePicker date={field.value} setDate={field.onChange} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <DateTimePicker date={field.value} setDate={field.onChange} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="webinar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webinar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your webinar url" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recording_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recording URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your recording url" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="recording_price"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3">
                      <FormLabel>Recording Price</FormLabel>
                      <FormControl>
                        <NumberInput
                          id="recording_price"
                          value={field.value}
                          onValueChange={(e) => field.onChange(e.value)}
                          thousandSeparator=","
                          placeholder="Enter recording price"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recording_period"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3">
                      <FormLabel>Recording Period</FormLabel>
                      <FormControl>
                        <NumberInput
                          id="recording_period"
                          value={field.value}
                          onValueChange={(e) => field.onChange(e.value)}
                          thousandSeparator=","
                          placeholder="Enter recording period"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    className='w-full rounded-lg font-semibold'
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
                            label={`Set Private Course is ${field.value ? 'ACTIVE' : 'INACTIVE'}`}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_practice"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormControl>
                          <CheckboxInput
                            htmlFor="is_practice"
                            label={`Set Private Course is ${field.value ? 'PRACTICE' : 'LIVE'}`}
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
    mutationFn: async (data: z.infer<typeof webinarPrivateSchema.create>) =>
      await createPrivateCourse(data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/private-courses')
    },
  })

  return (
    <AbstractForm
      initialValues={{
        webinar_batch_id: '',
        instructor_id: '',
        title: '',
        description: '',
        category_id: '',
        start_date: new Date(),
        end_date: new Date(),
        webinar_url: '',
        recording_url: '-',
        recording_price: 0,
        recording_period: null,
        is_active: true,
        is_practice: false,
        chain_id: '8453',
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
  const [privateCourse, setPrivateCourse] = useState<WebinarPrivateEntity>({
    id: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    webinar_batch_id: '',
    instructor_id: '',
    title: '',
    description: '',
    category_id: '',
    start_date: new Date(),
    end_date: new Date(),
    webinar_url: '',
    recording_url: '-',
    recording_price: 0,
    recording_period: null,
    is_active: true,
    is_practice: false,
    chain_id: '8453',
  })

  const getPrivateCourse = useCallback(async () => {
    const { data } = await findPrivateCourseById(id)
    setPrivateCourse(data)
    setIsFetching(false)
  }, [id])

  useEffect(() => {
    getPrivateCourse()
  }, [id, getPrivateCourse])

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof webinarPrivateSchema.create>) =>
      await updatePrivateCourse(id, data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/private-courses')
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
        ...privateCourse,
        description: privateCourse.description || '',
        recording_url: privateCourse.recording_url || '-',
        recording_price: validate.number(privateCourse.recording_price),
        recording_period: validate.empty(privateCourse.recording_period),
        start_date: new Date(privateCourse.start_date),
        end_date: new Date(privateCourse.end_date),
        is_active: validate.boolean(privateCourse.is_active),
        is_practice: validate.boolean(privateCourse.is_practice),
      }}
      mutation={mutation}
      isEdit={!!id}
    />
  )
}
