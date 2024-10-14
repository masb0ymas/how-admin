export type UploadEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  key_file: string
  filename: string
  mimetype: string
  size: number
  signed_url: string
  expired_at: string
}