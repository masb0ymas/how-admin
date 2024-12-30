import { UserEntity } from "./user"

export type InstructorEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  user_id: string
  user?: UserEntity
  status: string
  bio: string
  image: string | null
  is_active: boolean
  is_verified: boolean
  balance: number // available balance to withdraw
  total_withdraw: number // total withdraw
  total_withdraw_fee: number
}
