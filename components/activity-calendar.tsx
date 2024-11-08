'use client'

import React from 'react'
import { addDays, format, startOfWeek, subMonths } from 'date-fns'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ActivityData = {
  date: string // Format: YYYY-MM-DD
  intensity: number // 0-9
}

type ActivityCalendarProps = {
  data: ActivityData[]
}

export function ActivityCalendar({ data = [] }: ActivityCalendarProps) {
  const today = new Date()
  const startDate = startOfWeek(subMonths(today, 12))

  const getIntensityColor = (intensity: number) => {
    const colors = [
      'bg-gray-100',
      'bg-green-100',
      'bg-green-200',
      'bg-green-300',
      'bg-green-400',
      'bg-green-500',
      'bg-green-600',
      'bg-green-700',
      'bg-green-800',
      'bg-green-900',
    ]
    return colors[Math.min(Math.max(intensity, 0), 9)]
  }

  const getActivityForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    return data.find(item => item.date === dateString)
  }

  const weeks = []
  let currentDate = startDate

  while (currentDate <= today) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const activity = getActivityForDate(currentDate)
      week.push({
        date: currentDate,
        intensity: activity ? activity.intensity : 0
      })
      currentDate = addDays(currentDate, 1)
    }
    weeks.push(week)
  }

  return (
    <div className="max-w-full overflow-x-auto">
      <div className="inline-block">
        <div className="flex">
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, index) => (
            <div key={index} className="w-4 text-xs text-gray-400 text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="grid grid-cols-53 gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map(({ date, intensity }, dayIndex) => (
                  <TooltipProvider key={dayIndex}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-4 h-4 rounded-sm ${getIntensityColor(intensity)}`}
                          aria-label={`Activity on ${format(date, 'MMM d, yyyy')}: Level ${intensity}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{format(date, 'MMM d, yyyy')}</p>
                        <p>Activity Level: {intensity}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}