import _ from 'lodash'
import { Badge } from '~/components/ui/badge'
import { capitalizeFirstLetter } from './string'

/**
 *
 * @param params
 * @returns
 */
export function BadgeStatus({ status }: { status: string }) {
  const success = ['SUCCESS', 'SETTLEMENT']
  const failed = ['FAILED', 'REJECTED', 'CANCELLED']

  let variant:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'success'
    | 'warning'
    | 'info' = 'outline'

  if (success.includes(status)) {
    variant = 'success'
  } else if (failed.includes(status)) {
    variant = 'destructive'
  }

  return (
    <Badge variant={variant} className="py-1">
      {status}
    </Badge>
  )
}

/**
 *
 * @param params
 * @returns
 */
export function BadgeInstructorStatus({ status }: { status: string }) {
  let variant: 'default' | 'outline'

  if (status === 'LECTURER') {
    variant = 'default'
  } else {
    variant = 'outline'
  }

  return (
    <Badge variant={variant} className="py-1">
      {status}
    </Badge>
  )
}

/**
 * Select Instructor Status
 */
export const selectInstructorStatus = ['LECTURER', 'ASSISTANT'].map((item) => {
  return {
    value: item,
    label: capitalizeFirstLetter(item),
  }
})

/**
 * Select Webinar Type
 */
export const selectWebinarType = ['private', 'exclusive', 'express'].map((item) => {
  return {
    value: _.toUpper(item),
    label: capitalizeFirstLetter(item),
  }
})
