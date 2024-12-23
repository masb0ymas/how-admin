'use client'

import { z } from 'zod'

const create = z.object({
  user_id: z
    .string({
      required_error: 'user_id is required',
      invalid_type_error: 'user_id must be a string',
    })
    .uuid({ message: 'user_id invalid uuid format' })
    .min(2, `user_id can't be empty`),

  webinar_batch_id: z
    .string({
      required_error: 'webinar_batch_id is required',
      invalid_type_error: 'webinar_batch_id must be a string',
    })
    .uuid({ message: 'webinar_batch_id invalid uuid format' })
    .min(2, `webinar_batch_id can't be empty`),

  webinar_private_id: z
    .string({
      required_error: 'webinar_private_id is required',
      invalid_type_error: 'webinar_private_id must be a string',
    })
    .optional()
    .nullable(),

  certificate_url: z
    .string({
      required_error: 'certificate_url is required',
      invalid_type_error: 'certificate_url must be a string',
    })
    .nullable(),

  start_date: z.date({
    required_error: 'start_date is required',
    invalid_type_error: 'start_date must be a date',
  }),

  end_date: z
    .date({
      required_error: 'end_date is required',
      invalid_type_error: 'end_date must be a date',
    })
    .optional(),

  is_alumni: z.boolean({
    required_error: 'is_alumni is required',
    invalid_type_error: 'is_alumni must be a boolean',
  }),
})

const webinarPrivateMemberSchema = { create }
export default webinarPrivateMemberSchema
