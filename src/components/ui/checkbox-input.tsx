'use client'

import clsx from 'clsx'
import { Checkbox } from './checkbox'

interface CheckboxInputProps {
  htmlFor: string
  label: string
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

export default function CheckboxInput({
  htmlFor,
  label,
  value,
  onChange,
  disabled = false,
}: CheckboxInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={htmlFor} checked={value} onCheckedChange={onChange} disabled={disabled} />
      <label
        htmlFor={htmlFor}
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
