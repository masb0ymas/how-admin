import { z } from 'zod'

const create = z.object({
  instructor_id: z
    .string({
      required_error: 'instructor_id is required',
      invalid_type_error: 'instructor_id must be a string',
    })
    .min(2, `instructor_id can't be empty`),

  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .min(2, `name can't be empty`),

  type: z
    .string({
      required_error: 'type is required',
      invalid_type_error: 'type must be a string',
    })
    .min(2, `type can't be empty`),

  batch: z
    .string({
      required_error: 'batch is required',
      invalid_type_error: 'batch must be a string',
    })
    .min(1, `batch can't be empty`),

  start_date: z.date({
    required_error: 'start_date is required',
    invalid_type_error: 'start_date must be a date',
  }),

  end_date: z.date({
    required_error: 'end_date is required',
    invalid_type_error: 'end_date must be a date',
  }),

  is_active: z
    .boolean({
      required_error: 'is_active is required',
      invalid_type_error: 'is_active must be a boolean',
    })
    .default(false),
})

const webinarBatchSchema = { create, update: create }
export default webinarBatchSchema
