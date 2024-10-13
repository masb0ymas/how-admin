import { z } from 'zod'

const create = z.object({
  category_id: z
    .string({
      required_error: 'category_id is required',
      invalid_type_error: 'category_id must be a string',
    })
    .min(2, `category_id can't be empty`),

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
    .nullable(),

  speakers: z
    .string({
      required_error: 'speakers is required',
      invalid_type_error: 'speakers must be a string',
    })
    .min(2, `speakers can't be empty`),

  start_date: z.date({
    required_error: 'start_date is required',
    invalid_type_error: 'start_date must be a date',
  }),

  end_date: z.date({
    required_error: 'end_date is required',
    invalid_type_error: 'end_date must be a date',
  }),

  ipfs_cid: z
    .string({
      required_error: 'ipfs_cid is required',
      invalid_type_error: 'ipfs_cid must be a string',
    })
    .min(2, `ipfs_cid can't be empty`),

  is_active: z.boolean({
    required_error: 'is_active is required',
    invalid_type_error: 'is_active must be a boolean',
  }),
})

const webinarSchema = { create }

export default webinarSchema
