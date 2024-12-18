import { WebinarBatchEntity } from './webinar-batch'

export type PrivatePlanEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  webinar_batch_id: string
  webinar_batch?: WebinarBatchEntity | null
  title: string
  description: string
  discount: number
  price: number
  features: { text: string; }[]
  is_active: boolean
}
