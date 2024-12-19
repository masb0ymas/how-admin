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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Separator } from '~/components/ui/separator'
import { Textarea } from '~/components/ui/textarea'
import { CategoryEntity } from '~/data/entity/category'
import { WebinarEntity } from '~/data/entity/webinar'
import webinarSchema from '~/data/schema/webinar'
import { validate } from '~/lib/validate'
import { createWebinar, findWebinarById, updateWebinar } from '../action'
import { Checkbox } from '~/components/ui/checkbox'
import CheckboxInput from '~/components/ui/checkbox-input'
import SelectInput from '~/components/ui/select-input'

type FormProps = {
  initialValues: z.infer<typeof webinarSchema.create>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm({ initialValues, mutation, isEdit = false }: FormProps) {
  const router = useRouter()

  const page = 1
  const pageSize = 100

  const [isFetching, setIsFetching] = useState(true)
  const [categories, setCategories] = useState<CategoryEntity[]>([])

  const getCategories = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findCategories({ page, pageSize })
    setCategories(data)

    setIsFetching(false)
  }, [])

  useEffect(() => {
    getCategories(page, pageSize)
  }, [getCategories, page, pageSize])

  const selectCategory =
    categories.length > 0
      ? categories.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      : []

  const selectChain = [
    {
      value: '8453',
      label: 'Base',
    },
    {
      value: '11155111',
      label: 'Sepolia',
    },
  ]

  const form = useForm<z.infer<typeof webinarSchema.create>>({
    resolver: zodResolver(webinarSchema.create),
    defaultValues: initialValues,
  })
  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: z.infer<typeof webinarSchema.create>) {
    let values = { ...data }

    if (data.recording_url === '-') {
      values = {
        ...data,
        recording_url: '',
      }
    }

    await mutation.mutateAsync(values)
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{`${isEdit ? 'Edit' : 'Add'} - Mini Courses`}</h1>
        <h4 className="text-muted-foreground">You can manage mini courses here</h4>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="lg:col-span-3 space-y-4">
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="speakers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speakers</FormLabel>
                      <FormControl>
                        <Input placeholder="Input your speakers" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  name="ipfs_cid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IPFS CID</FormLabel>
                      <FormControl>
                        <Input placeholder="Input your ipfs cid" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
            </div>

            <div className="lg:col-span-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Actions</h3>
                <Separator />

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
                            label={`Set Webinar - Mini Courses is ${
                              field.value ? 'ACTIVE' : 'INACTIVE'
                            }`}
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
                    name="is_premium"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormControl>
                          <CheckboxInput
                            htmlFor="is_premium"
                            label={`Set Recording is ${field.value ? 'PREMIUM' : 'FREE'}`}
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
    mutationFn: async (data: z.infer<typeof webinarSchema.create>) => await createWebinar(data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/mini-courses')
    },
  })

  return (
    <AbstractForm
      initialValues={{
        title: '',
        description: '',
        speakers: '',
        category_id: '',
        start_date: new Date(),
        end_date: new Date(),
        webinar_url: '',
        recording_url: '-',
        ipfs_cid: '-',
        is_active: true,
        is_premium: false,
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
  const [webinar, setWebinar] = useState<WebinarEntity>({
    id: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    title: '',
    slug: '',
    description: '',
    speakers: '',
    category_id: '',
    category: null,
    start_date: '',
    end_date: '',
    webinar_url: '',
    recording_url: '-',
    ipfs_cid: '',
    is_active: true,
    is_premium: false,
    chain_id: '',
  })

  const getWebinar = useCallback(async () => {
    const { data } = await findWebinarById(id)
    setWebinar(data)
    setIsFetching(false)
  }, [id])

  useEffect(() => {
    getWebinar()
  }, [id, getWebinar])

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof webinarSchema.create>) => await updateWebinar(id, data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/mini-courses')
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
        ...webinar,
        recording_url: webinar.recording_url || '-',
        start_date: new Date(webinar.start_date),
        end_date: new Date(webinar.end_date),
        is_active: validate.boolean(webinar.is_active),
        is_premium: validate.boolean(webinar.is_premium),
      }}
      mutation={mutation}
      isEdit={!!id}
    />
  )
}
