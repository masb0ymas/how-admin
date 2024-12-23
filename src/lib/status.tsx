import { Badge } from '~/components/ui/badge'

export function BadgeStatus({ status }: { status: string }) {
  const success = ['SUCCESS', 'SETTLEMENT']
  const failed = ['FAILED', 'REJECTED', 'CANCELLED']

  let variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info' = 'outline'

  if (success.includes(status)) {
    variant = 'success'
  } else if (failed.includes(status)) {
    variant = 'destructive'
  }

  return <Badge variant={variant} className='py-1'>{status}</Badge>
}
