import { UserEntity } from './user'
import { WebinarBatchEntity } from './webinar-batch'
import { WebinarPrivateEntity } from './webinar-private'

export type WebinarPrivateMemberEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  user_id: string
  user?: UserEntity
  webinar_batch_id: string
  webinar_batch?: WebinarBatchEntity
  webinar_private_id?: string | null
  webinar_private?: WebinarPrivateEntity | null
  certificate_url: string | null
  start_date: Date
  end_date?: Date | undefined
  is_alumni: boolean
}
