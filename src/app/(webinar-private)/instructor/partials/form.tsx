'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft, IconLoader } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { findUsers } from '~/app/(account)/user-management/action'
import Loader from '~/components/custom/loader'
import { Button } from '~/components/ui/button'
import CheckboxInput from '~/components/ui/checkbox-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import SelectInput from '~/components/ui/select-input'
import { Separator } from '~/components/ui/separator'
import { Textarea } from '~/components/ui/textarea'
import { InstructorEntity } from '~/data/entity/instructor'
import { UserEntity } from '~/data/entity/user'
import instructorSchema from '~/data/schema/instructor'
import { validate } from '~/lib/validate'
import { createInstructor, findInstructorById, updateInstructor } from '../action'
import ConstRole from '~/lib/constant/role'

type FormProps = {
  initialValues: z.infer<typeof instructorSchema.create>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm({ initialValues, mutation, isEdit = false }: FormProps) {
  const router = useRouter()

  const page = 1
  const pageSize = 100

  const [isFetching, setIsFetching] = useState(true)
  const [users, setUsers] = useState<UserEntity[]>([])

  const getUsers = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findUsers({
      page,
      pageSize,
      roleAs: ConstRole.INSTRUCTOR,
    })
    setUsers(data)

    setIsFetching(false)
  }, [])

  useEffect(() => {
    getUsers(page, pageSize)
  }, [getUsers, page, pageSize])

  const selectUsers =
    users.length > 0
      ? users
          .filter((item) => item.fullname !== '-')
          .map((item) => {
            return {
              value: item.id,
              label: `${item.fullname} (${item.email}) - ${item?.role?.name}`,
            }
          })
      : []

  const form = useForm<z.infer<typeof instructorSchema.create>>({
    resolver: zodResolver(instructorSchema.create),
    defaultValues: initialValues,
  })
  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: z.infer<typeof instructorSchema.create>) {
    await mutation.mutateAsync(data)
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{`${isEdit ? 'Edit' : 'Add'} - Instructor`}</h1>
        <h4 className="text-muted-foreground">You can manage instructor here</h4>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="lg:col-span-3">
              <div className="space-y-4">
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Input your bio" {...field} />
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
                            label={`Set Instructor is ${field.value ? 'ACTIVE' : 'INACTIVE'}`}
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
                    name="is_verified"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormControl>
                          <CheckboxInput
                            htmlFor="is_verified"
                            label={`Set Instructor is ${field.value ? 'VERIFIED' : 'UNVERIFIED'}`}
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
    mutationFn: async (data: z.infer<typeof instructorSchema.create>) =>
      await createInstructor(data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/instructor')
    },
  })

  return (
    <AbstractForm
      initialValues={{
        user_id: '',
        bio: '',
        image: '',
        is_active: true,
        is_verified: false,
        balance: 0,
        total_withdraw: 0,
        total_withdraw_fee: 0,
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
  const [instructor, setInstructor] = useState<InstructorEntity>({
    id: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    user_id: '',
    bio: '',
    image: '',
    is_active: false,
    is_verified: false,
    balance: 0,
    total_withdraw: 0,
    total_withdraw_fee: 0,
  })

  const getInstructor = useCallback(async () => {
    const { data } = await findInstructorById(id)
    setInstructor(data)
    setIsFetching(false)
  }, [id])

  useEffect(() => {
    getInstructor()
  }, [id, getInstructor])

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof instructorSchema.create>) =>
      await updateInstructor(id, data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/instructor')
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
        ...instructor,
        image: instructor.image ?? '',
        is_active: validate.boolean(instructor.is_active),
        is_verified: validate.boolean(instructor.is_verified),
        balance: validate.number(instructor.balance),
        total_withdraw: validate.number(instructor.total_withdraw),
        total_withdraw_fee: validate.number(instructor.total_withdraw_fee),
      }}
      mutation={mutation}
      isEdit={!!id}
    />
  )
}
