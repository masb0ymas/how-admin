'use client'

import { z } from 'zod'

const create = z.object({
  webinar_batch_id: z
    .string({
      required_error: 'webinar_batch_id is required',
      invalid_type_error: 'webinar_batch_id must be a string',
    })
    .uuid({ message: 'webinar_batch_id invalid uuid format' })
    .min(2, `webinar_batch_id can't be empty`),

  title: z
    .string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    })
    .min(2, `title can't be empty`),

  description: z
    .string({
      required_error: 'description is required',
      invalid_type_error: 'description must be a string',
    })
    .min(2, `description can't be empty`),

  discount: z
    .number({
      required_error: 'discount is required',
      invalid_type_error: 'discount must be a number',
    })
    .nullable(),

  price: z.number({
    required_error: 'price is required',
    invalid_type_error: 'price must be a number',
  }),

  features: z.array(
    z.object({
      text: z.string({
        required_error: 'text is required',
        invalid_type_error: 'text must be a string',
      }),
    })
  ),

  is_active: z.boolean({
    required_error: 'is_active is required',
    invalid_type_error: 'is_active must be a boolean',
  }),
})

const privatePlanSchema = { create }
export default privatePlanSchema
