import { UserEntity } from "./user"

export type SessionEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  user_id: string
  token: string
  expires_at: string
  ip_address: string | null
  device: string | null
  platform: string | null
  latitude: string | null
  longitude: string | null
  user: UserEntity
}
