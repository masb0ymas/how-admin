'use client'

import clsx from 'clsx'
import { Checkbox } from './checkbox'

interface CheckboxInputProps {
  label: string
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

export default function CheckboxInput({
  label,
  value,
  onChange,
  disabled = false,
}: CheckboxInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="is_active" checked={value} onCheckedChange={onChange} disabled={disabled} />
      <label
        htmlFor="is_active"
        className={clsx(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          disabled && 'cursor-not-allowed opacity-70 text-muted-foreground'
        )}
      >
        {label}
      </label>
    </div>
  )
}
