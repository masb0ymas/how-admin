import { InstructorEntity } from "./instructor"
import { WebinarBatchEntity } from "./webinar-batch"

export type WebinarPrivateEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  webinar_batch_id: string
  webinar_batch?: WebinarBatchEntity
  instructor_id: string
  instructor?: InstructorEntity
  title: string
  description: string | null
  category_id: string
  start_date: Date
  end_date: Date
  webinar_url: string // for live webinar
  recording_url: string // for recorded webinar
  recording_price: number
  recording_period?: string | null // in days
  is_active: boolean
  is_practice: boolean
  chain_id: string
}
