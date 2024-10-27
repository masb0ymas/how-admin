export interface WebinarEntity {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  title: string
  description?: string | null
  speakers: string
  category_id: string
  start_date: string
  end_date: string
  webinar_url: string
  recording_url: string
  ipfs_cid: string
  is_active: boolean
  is_premium: boolean
  chain_id: string
}
