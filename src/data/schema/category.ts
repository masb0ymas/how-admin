'use client'

import { z } from 'zod'

const create = z.object({
  name: z
    .string({
      required_error: 'category name is required',
      invalid_type_error: 'category name must be a string',
    })
    .min(2, 'category name must be at least 2 characters'),
})

const categorySchema = { create }
export default categorySchema
