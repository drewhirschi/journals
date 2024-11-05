'use client'

import { useState } from 'react'
import { format, subDays } from 'date-fns'
import { Edit3, Router } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from 'next/navigation'

// Mock data for journal entries
const mockEntries = {
  [format(new Date(), 'yyyy-MM-dd')]: "Today's entry",
  [format(subDays(new Date(), 2), 'yyyy-MM-dd')]: "Entry from 2 days ago",
  [format(subDays(new Date(), 5), 'yyyy-MM-dd')]: "Entry from 5 days ago",
  // Add more mock entries as needed
}

export function JournalDashboardComponent() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const last30Days = Array.from({ length: 29 }, (_, i) => {
    const date = subDays(new Date(), i)
    return format(date, 'yyyy-MM-dd')
  })

  const handleTileClick = (date: string) => {
    setSelectedDate(date)
    // Here you would typically navigate to the journal entry page
    console.log(`Navigating to entry for ${date}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">

        {last30Days.map((date) => (
          <TooltipProvider key={date}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  onClick={() => handleTileClick(date)}
                  onDoubleClick={() => router.push(`entry/${date}`)}
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedDate === date ? 'ring-2 ring-primary' : ''
                    }`}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center h-24">
                    <div className="text-sm font-semibold">{format(new Date(date), 'MMM d')}</div>
                    {mockEntries[date] && (
                      <Edit3 className="mt-2 text-primary" size={16} />
                    )}
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                {mockEntries[date]
                  ? `Entry: ${mockEntries[date]}`
                  : 'No entry for this day'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

    </div>
  )
}