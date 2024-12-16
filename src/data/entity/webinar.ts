import { CategoryEntity } from './category'

export type WebinarEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  title: string
  slug: string
  description: string
  speakers: string
  category_id: string
  category: CategoryEntity | null
  start_date: string
  end_date: string
  webinar_url: string // for live webinar
  recording_url: string // for recorded webinar
  ipfs_cid: string // IPFS CID for Metadata Blockchain
  is_active: boolean
  is_premium: boolean
  chain_id: string
}
