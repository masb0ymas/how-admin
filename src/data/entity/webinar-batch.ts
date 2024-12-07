export type WebinarBatchEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  instructor: string
  name: string
  batch: string
  start_date: Date
  end_date: Date
  duration: string // 16 weeks
  is_active: boolean
}