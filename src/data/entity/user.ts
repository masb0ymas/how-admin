import { RoleEntity } from "./role"

export type UserEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  fullname: string
  email: string | null
  wallet_address: string | null
  password: string | null
  phone: string | null
  token_verify: string | null
  address: string | null
  is_active: boolean | null
  is_blocked: boolean | null
  upload_id: string | null
  role_id: string
  role: RoleEntity
}
