export type TransactionEntity = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  user_id: string
  provider: string // like a midtrans | xendit | stripe | lemonsqueezy
  voucher_code: string | null
  voucher_nominal: number
  uniq_code: string
  total: number
  payment_id: string | null
  payment_method: string | null // such as qr-code | bca | gopay
  payment_type: string | null // like a credit-card | bank-transfer | e-wallet
  payment_status: string | null // pending | success | settlement | failed
  payment_date: Date | null
  payment_url: string | null
  payment_token: string | null
  payment_callback: string | null
}
