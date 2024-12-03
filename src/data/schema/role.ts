'use client'

import { z } from 'zod'

const create = z.object({
  name: z
    .string({
      required_error: 'role name is required',
      invalid_type_error: 'role name must be a string',
    })
    .min(2, 'role name must be at least 2 characters'),
})

const roleSchema = { create }
export default roleSchema
