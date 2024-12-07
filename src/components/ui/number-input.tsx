'use client'

import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { cn } from '~/lib/utils'
import { Input } from './input'

export interface NumberInputProps extends Omit<NumericFormatProps, 'onChange'> {
  onChange?: (value: number | undefined) => void
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <NumericFormat
        customInput={Input}
        getInputRef={ref}
        className={cn('', className)}
        onValueChange={(values) => {
          onChange?.(values.floatValue)
        }}
        {...props}
      />
    )
  }
)
NumberInput.displayName = 'NumberInput'

export { NumberInput }
