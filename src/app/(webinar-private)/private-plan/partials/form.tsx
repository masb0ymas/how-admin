'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft, IconLoader, IconPlus, IconTrash } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
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
import { Input } from '~/components/ui/input'
import { NumberInput } from '~/components/ui/number-input'
import SelectInput from '~/components/ui/select-input'
import { Separator } from '~/components/ui/separator'
import { Textarea } from '~/components/ui/textarea'
import { WebinarBatchEntity } from '~/data/entity/webinar-batch'
import { PrivatePlanEntity } from '~/data/entity/webinar-private-plan'
import privatePlanSchema from '~/data/schema/webinar-private-plan'
import { validate } from '~/lib/validate'
import { findWebinarBatches } from '../../webinar-batch/action'
import { createPrivatePlan, findPrivatePlanById, updatePrivatePlan } from '../action'

type FormProps = {
  initialValues: z.infer<typeof privatePlanSchema.create>
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
  isEdit?: boolean
}

function AbstractForm({ initialValues, mutation, isEdit = false }: FormProps) {
  const router = useRouter()

  const page = 1
  const pageSize = 100

  const [isFetching, setIsFetching] = useState(true)
  const [webinarBatches, setWebinarBatches] = useState<WebinarBatchEntity[]>([])

  const getWebinarBatches = useCallback(async (page: number, pageSize: number) => {
    const { data } = await findWebinarBatches({ page, pageSize })
    setWebinarBatches(data)

    setIsFetching(false)
  }, [])

  useEffect(() => {
    getWebinarBatches(page, pageSize)
  }, [getWebinarBatches, page, pageSize])

  const selectWebinarBatch =
    webinarBatches.length > 0
      ? webinarBatches.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      : []

  const form = useForm<z.infer<typeof privatePlanSchema.create>>({
    resolver: zodResolver(privatePlanSchema.create),
    defaultValues: initialValues,
  })
  const {
    formState: { isSubmitting },
  } = form

  const { fields, append, remove } = useFieldArray({
    name: 'features',
    control: form.control,
  })

  async function onSubmit(data: z.infer<typeof privatePlanSchema.create>) {
    console.log(data)

    await mutation.mutateAsync(data)
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{`${isEdit ? 'Edit' : 'Add'} - Private Plan`}</h1>
        <h4 className="text-muted-foreground">You can manage private plan here</h4>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="lg:col-span-3">
              <div className="space-y-4">
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Input your private plan title" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                    name="discount"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                          <NumberInput
                            id="discount"
                            value={field.value}
                            onValueChange={(e) => field.onChange(Number(e.value))}
                            thousandSeparator=","
                            placeholder="Enter discount"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <NumberInput
                            id="price"
                            value={field.value}
                            onValueChange={(e) => field.onChange(Number(e.value))}
                            thousandSeparator=","
                            placeholder="Enter price"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`features.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? 'sr-only' : ''}>Feature</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Input placeholder={`Input your feature ${index + 1}`} {...field} />
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => remove(index)}
                              >
                                <IconTrash className="h-4 w-4" />
                                <span className="sr-only">Remove feature {index + 1}</span>
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ text: '' })}
                >
                  <IconPlus className="mr-2 h-4 w-4" />
                  Add Feature
                </Button>
              </div>
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
                            label={`Set Private plan is ${field.value ? 'ACTIVE' : 'INACTIVE'}`}
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
    mutationFn: async (data: z.infer<typeof privatePlanSchema.create>) =>
      await createPrivatePlan(data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/private-plan')
    },
  })

  return (
    <AbstractForm
      initialValues={{
        webinar_batch_id: '',
        title: '',
        description: '',
        discount: 0,
        price: 0,
        features: [{ text: '' }],
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
  const [privatePlan, setPrivatePlan] = useState<PrivatePlanEntity>({
    id: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    webinar_batch_id: '',
    webinar_batch: null,
    title: '',
    description: '',
    discount: 0,
    price: 0,
    features: [],
    is_active: false,
  })

  const getPrivatePlan = useCallback(async () => {
    const { data } = await findPrivatePlanById(id)
    setPrivatePlan(data)
    setIsFetching(false)
  }, [id])

  useEffect(() => {
    getPrivatePlan()
  }, [id, getPrivatePlan])

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof privatePlanSchema.create>) =>
      await updatePrivatePlan(id, data),
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.message)
        return
      } else {
        toast.success(data.message)
      }

      router.push('/private-plan')
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
        ...privatePlan,
        discount: validate.number(privatePlan.discount),
        price: validate.number(privatePlan.price),
        is_active: validate.boolean(privatePlan.is_active),
      }}
      mutation={mutation}
      isEdit={!!id}
    />
  )
}
