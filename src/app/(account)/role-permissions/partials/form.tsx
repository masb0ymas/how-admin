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
import { RoleEntity } from '~/data/entity/role'
import roleSchema from '~/data/schema/role'
import { createRole, findRoleById, updateRole } from '../action'

type FormProps = {
  initialValues: z.infer<typeof roleSchema.create>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm({ initialValues, mutation, isEdit = false }: FormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof roleSchema.create>>({
    resolver: zodResolver(roleSchema.create),
    defaultValues: initialValues,
  })
  const {
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: z.infer<typeof roleSchema.create>) {
    await mutation.mutateAsync(data)
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{`${isEdit ? 'Edit' : 'Add'} - Role`}</h1>
        <h4 className="text-muted-foreground">You can manage role here</h4>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="lg:col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your role name" {...field} />
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
    mutationFn: async (data: z.infer<typeof roleSchema.create>) => await createRole(data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/role-permissions')
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
  const [role, setRole] = useState<RoleEntity>({
    id: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    name: '',
  })

  const getRole = useCallback(async () => {
    const { data } = await findRoleById(id)
    setRole(data)
    setIsFetching(false)
  }, [id])

  useEffect(() => {
    getRole()
  }, [id, getRole])

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof roleSchema.create>) => await updateRole(id, data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/role-permissions')
    },
  })

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return <AbstractForm initialValues={{ ...role }} mutation={mutation} isEdit={!!id} />
}
