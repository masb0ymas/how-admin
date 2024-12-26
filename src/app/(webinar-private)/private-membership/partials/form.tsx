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
import SelectInput from '~/components/ui/select-input'
import { Separator } from '~/components/ui/separator'
import { InstructorEntity } from '~/data/entity/instructor'
import { WebinarBatchEntity } from '~/data/entity/webinar-batch'
import webinarBatchSchema from '~/data/schema/webinar-batch'
import { findInstructors } from '../../instructor/action'
import webinarPrivateMemberSchema from '~/data/schema/webinar-private-member'
import {
  createWebinarPrivateMember,
  findWebinarPrivateMemberById,
  updateWebinarPrivateMember,
} from '../action'
import { WebinarPrivateMemberEntity } from '~/data/entity/webinar-private-member'
import { validate } from '~/lib/validate'
import { UserEntity } from '~/data/entity/user'
import { WebinarPrivateEntity } from '~/data/entity/webinar-private'
import { findUsers } from '~/app/(account)/user-management/action'
import { findWebinarBatches } from '../../webinar-batch/action'
import { findPrivateCourses } from '../../private-courses/action'
import ConstRole from '~/lib/constant/role'
import _ from 'lodash'

type FormProps = {
  initialValues: z.infer<typeof webinarPrivateMemberSchema.create>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm({ initialValues, mutation, isEdit = false }: FormProps) {
  const router = useRouter()

  const page = 1
  const pageSize = 100

  const [isFetchingUsers, setIsFetchingUsers] = useState(true)
  const [isFetchingWebinarBatches, setIsFetchingWebinarBatches] = useState(true)
  const [isFetchingWebinarPrivate, setIsFetchingWebinarPrivate] = useState(true)

  const [users, setUsers] = useState<UserEntity[]>([])
  const [webinarBatches, setWebinarBatches] = useState<WebinarBatchEntity[]>([])
  const [webinarPrivate, setWebinarPrivate] = useState<WebinarPrivateEntity[]>([])

  const getUsers = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findUsers({
      page,
      pageSize,
      filtered: [{ id: 'role_id', value: ConstRole.ID_USER }],
    })
    setUsers(data)
    setIsFetchingUsers(false)
  }, [])

  const getWebinarBatches = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findWebinarBatches({ page, pageSize })
    setWebinarBatches(data)
    setIsFetchingWebinarBatches(false)
  }, [])

  const getWebinarPrivate = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findPrivateCourses({ page, pageSize })
    setWebinarPrivate(data)
    setIsFetchingWebinarPrivate(false)
  }, [])

  useEffect(() => {
    getUsers(page, pageSize)
    getWebinarBatches(page, pageSize)
    getWebinarPrivate(page, pageSize)
  }, [getUsers, getWebinarBatches, getWebinarPrivate, page, pageSize])

  const selectUsers =
    users.length > 0
      ? users
          .filter((item) => item.fullname !== '-')
          .map((item) => {
            return {
              value: item.id,
              label: `${item.fullname} (${item.email})`,
            }
          })
      : []

  const selectWebinarBatches =
    webinarBatches.length > 0
      ? webinarBatches.map((item) => {
          return {
            value: item.id,
            label: `${item.name}`,
          }
        })
      : []

  const selectWebinarPrivate =
    webinarPrivate.length > 0
      ? webinarPrivate.map((item) => {
          return {
            value: item.id,
            label: `${item.title} - Instructor: ${item.instructor?.user?.fullname}`,
          }
        })
      : []

  const form = useForm<z.infer<typeof webinarPrivateMemberSchema.create>>({
    resolver: zodResolver(webinarPrivateMemberSchema.create),
    defaultValues: initialValues,
  })
  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: z.infer<typeof webinarPrivateMemberSchema.create>) {
    const checkWebinarPrivateId =
      _.isEmpty(data.webinar_private_id) || _.isNil(data.webinar_private_id)

    const newFomData = {
      ...data,
      webinar_private_id: !checkWebinarPrivateId ? data.webinar_private_id : null,
    }

    await mutation.mutateAsync(newFomData)
  }

  if (isFetchingUsers || isFetchingWebinarBatches || isFetchingWebinarPrivate) {
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
                    name="user_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User</FormLabel>
                        <SelectInput
                          options={selectUsers}
                          onSelect={field.onChange}
                          defaultValue={field.value}
                          placeholder="Select a user"
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="webinar_batch_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Webinar Batch</FormLabel>
                        <SelectInput
                          options={selectWebinarBatches}
                          onSelect={field.onChange}
                          defaultValue={field.value}
                          placeholder="Select a webinar batch"
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="webinar_private_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Webinar Private</FormLabel>
                      <SelectInput
                        options={selectWebinarPrivate}
                        onSelect={field.onChange}
                        defaultValue={String(field.value)}
                        placeholder="Select a webinar private"
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    name="is_alumni"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormControl>
                          <CheckboxInput
                            htmlFor="is_alumni"
                            label={`Set Membership is ${field.value ? 'ALUMNI' : 'MEMBER'}`}
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
    mutationFn: async (data: z.infer<typeof webinarPrivateMemberSchema.create>) =>
      await createWebinarPrivateMember(data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/private-membership')
    },
  })

  return (
    <AbstractForm
      initialValues={{
        user_id: '',
        webinar_batch_id: '',
        webinar_private_id: '',
        certificate_url: '',
        start_date: new Date(),
        end_date: new Date(),
        is_alumni: false,
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
  const [membership, setMembership] = useState<WebinarPrivateMemberEntity>({
    id: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    user_id: '',
    webinar_batch_id: '',
    webinar_private_id: '',
    certificate_url: '',
    start_date: new Date(),
    end_date: new Date(),
    is_alumni: false,
  })

  const getMembership = useCallback(async () => {
    const { data } = await findWebinarPrivateMemberById(id)
    setMembership(data)
    setIsFetching(false)
  }, [id])

  useEffect(() => {
    getMembership()
  }, [id, getMembership])

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof webinarPrivateMemberSchema.create>) =>
      await updateWebinarPrivateMember(id, data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/private-membership')
    },
  })

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  const end_date = validate.isDate(new Date(String(membership.end_date)))
    ? new Date(String(membership.end_date))
    : undefined

  const checkWebinarPrivateId =
    _.isEmpty(membership.webinar_private_id) || _.isNil(membership.webinar_private_id)

  return (
    <AbstractForm
      initialValues={{
        ...membership,
        webinar_private_id: !checkWebinarPrivateId ? String(membership.webinar_private_id) : '',
        start_date: new Date(membership.start_date),
        end_date: end_date,
        is_alumni: validate.boolean(membership.is_alumni),
      }}
      mutation={mutation}
      isEdit={!!id}
    />
  )
}
