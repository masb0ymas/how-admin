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

  instructor_id: z
    .string({
      required_error: 'instructor_id is required',
      invalid_type_error: 'instructor_id must be a string',
    })
    .uuid({ message: 'instructor_id invalid uuid format' })
    .min(2, `instructor_id can't be empty`),

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

  category_id: z
    .string({
      required_error: 'category_id is required',
      invalid_type_error: 'category_id must be a string',
    })
    .uuid({ message: 'category_id invalid uuid format' })
    .min(2, `category_id can't be empty`),

  start_date: z.date({
    required_error: 'start_date is required',
    invalid_type_error: 'start_date must be a date',
  }),

  end_date: z.date({
    required_error: 'end_date is required',
    invalid_type_error: 'end_date must be a date',
  }),

  webinar_url: z
    .string({
      required_error: 'webinar_url is required',
      invalid_type_error: 'webinar_url must be a string',
    })
    .min(2, `webinar_url can't be empty`),

  recording_url: z
    .string({
      required_error: 'recording_url is required',
      invalid_type_error: 'recording_url must be a string',
    })
    .min(1, `recording_url can't be empty`),

  recording_price: z.number({
    required_error: 'recording_price is required',
    invalid_type_error: 'recording_price must be a number',
  }),

  recording_period: z
    .string({
      required_error: 'recording_period is required',
      invalid_type_error: 'recording_period must be a string',
    })
    .nullable(),

  is_active: z.boolean({
    required_error: 'is_active is required',
    invalid_type_error: 'is_active must be a boolean',
  }),

  is_practice: z.boolean({
    required_error: 'is_practice is required',
    invalid_type_error: 'is_practice must be a boolean',
  }),

  chain_id: z
    .string({
      required_error: 'chain_id is required',
      invalid_type_error: 'chain_id must be a string',
    })
    .min(2, `chain_id can't be empty`),
})

const webinarPrivateSchema = { create }
export default webinarPrivateSchema
