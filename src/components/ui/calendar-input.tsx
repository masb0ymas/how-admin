'use client'

import { IconCalendar } from '@tabler/icons-react'
import { endOfYesterday, format } from 'date-fns'
import { id } from 'date-fns/locale'
import { cn } from '~/lib/utils'
import { Button } from './button'
import { Calendar } from './calendar'
import { FormControl } from './form'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface CalendarInputProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
}

export function CalendarInput({ value, onChange, disabled = false }: CalendarInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn('w-full pl-3 text-left font-normal', !value && 'text-muted-foreground')}
            disabled={disabled}
          >
            {value ? format(value, 'PP', { locale: id }) : <span>Pick a date</span>}
            <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) => date < endOfYesterday() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
