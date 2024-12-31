'use client'

import { FormControl } from './form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

type Option = {
  value: string
  label: string
}

type IProps = {
  options: Option[]
  onSelect: (value: string) => void
  defaultValue: string
  placeholder?: string
  disabled?: boolean
}

export default function SelectInput({
  options,
  onSelect,
  defaultValue,
  placeholder,
  disabled = false,
}: IProps) {
  return (
    <Select onValueChange={onSelect} defaultValue={defaultValue} disabled={disabled}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
