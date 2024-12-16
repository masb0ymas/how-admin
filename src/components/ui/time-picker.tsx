'use client'

import React from 'react'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

interface TimePickerProps {
  setDate: (date: Date) => void
  date?: Date
}

export function TimePicker({ setDate, date }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    if (!date) return

    const newDate = new Date(date.getTime())
    if (name === 'hours') {
      newDate.setHours(parseInt(value))
    } else if (name === 'minutes') {
      newDate.setMinutes(parseInt(value))
    } else if (name === 'seconds') {
      newDate.setSeconds(parseInt(value))
    }

    setDate(newDate)
  }

  function handleWheel(e: React.WheelEvent<HTMLInputElement>, max: number) {
    e.preventDefault()
    const input = e.target as HTMLInputElement
    let value = parseInt(input.value)

    if (e.deltaY < 0) {
      value = value + 1 > max ? 0 : value + 1
    } else {
      value = value - 1 < 0 ? max : value - 1
    }

    input.value = value.toString().padStart(2, '0')
    const event = new Event('change', { bubbles: true })
    input.dispatchEvent(event)
  }

  return (
    <div className="flex items-end gap-2">
      <div className="w-full">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <Input
          type="number"
          id="hours"
          name="hours"
          min={0}
          max={23}
          value={date ? date.getHours().toString().padStart(2, '0') : '00'}
          onChange={handleTimeChange}
          onWheel={(e) => handleWheel(e, 23)}
          className="w-full"
        />
      </div>
      <div className="w-full">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <Input
          ref={minuteRef}
          type="number"
          id="minutes"
          name="minutes"
          min={0}
          max={59}
          value={date ? date.getMinutes().toString().padStart(2, '0') : '00'}
          onChange={handleTimeChange}
          onWheel={(e) => handleWheel(e, 59)}
          className="w-full"
        />
      </div>
      <div className="w-full">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <Input
          ref={secondRef}
          type="number"
          id="seconds"
          name="seconds"
          min={0}
          max={59}
          value={date ? date.getSeconds().toString().padStart(2, '0') : '00'}
          onChange={handleTimeChange}
          onWheel={(e) => handleWheel(e, 59)}
          className="w-full"
        />
      </div>
    </div>
  )
}
