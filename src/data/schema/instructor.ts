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

  bio: z
    .string({
      required_error: 'bio is required',
      invalid_type_error: 'bio must be a string',
    })
    .min(2, `bio can't be empty`),

  image: z
    .string({
      required_error: 'image is required',
      invalid_type_error: 'image must be a string',
    })
    .optional(),

  is_active: z.boolean({
    required_error: 'is_active is required',
    invalid_type_error: 'is_active must be a boolean',
  }),

  is_verified: z.boolean({
    required_error: 'is_verified is required',
    invalid_type_error: 'is_verified must be a boolean',
  }),

  balance: z.number({
    required_error: 'balance is required',
    invalid_type_error: 'balance must be a number',
  }),

  total_withdraw: z.number({
    required_error: 'total_withdraw is required',
    invalid_type_error: 'total_withdraw must be a number',
  }),

  total_withdraw_fee: z.number({
    required_error: 'total_withdraw_fee is required',
    invalid_type_error: 'total_withdraw_fee must be a number',
  }),
})

const instructorSchema = { create }
export default instructorSchema
