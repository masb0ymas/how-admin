'use client'

import { z } from 'zod'

const create = z.object({
  provider: z
    .string({
      required_error: 'provider is required',
      invalid_type_error: 'provider must be a string',
    })
    .min(2, `provider can't be empty`),

  voucher_code: z
    .string({
      required_error: 'voucher_code is required',
      invalid_type_error: 'voucher_code must be a string',
    })
    .nullable(),

  voucher_nominal: z.number({
    required_error: 'voucher_nominal is required',
    invalid_type_error: 'voucher_nominal must be a number',
  }),

  uniq_code: z
    .string({
      required_error: 'uniq_code is required',
      invalid_type_error: 'uniq_code must be a string',
    })
    .min(2, `uniq_code can't be empty`),

  total: z.number({
    required_error: 'total is required',
    invalid_type_error: 'total must be a number',
  }),

  payment_id: z
    .string({
      required_error: 'payment_id is required',
      invalid_type_error: 'payment_id must be a string',
    })
    .nullable(),

  payment_method: z
    .string({
      required_error: 'payment_method is required',
      invalid_type_error: 'payment_method must be a string',
    })
    .nullable(),

  payment_type: z
    .string({
      required_error: 'payment_type is required',
      invalid_type_error: 'payment_type must be a string',
    })
    .nullable(),

  payment_status: z
    .string({
      required_error: 'payment_status is required',
      invalid_type_error: 'payment_status must be a string',
    })
    .nullable(),

  payment_date: z
    .date({
      required_error: 'payment_date is required',
      invalid_type_error: 'payment_date must be a date',
    })
    .nullable(),

  payment_url: z
    .string({
      required_error: 'payment_url is required',
      invalid_type_error: 'payment_url must be a string',
    })
    .nullable(),

  payment_token: z
    .string({
      required_error: 'payment_token is required',
      invalid_type_error: 'payment_token must be a string',
    })
    .nullable(),

  payment_callback: z
    .string({
      required_error: 'payment_callback is required',
      invalid_type_error: 'payment_callback must be a string',
    })
    .nullable(),
})

const transactionSchema = { create }
export default transactionSchema
