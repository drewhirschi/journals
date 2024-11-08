'use client'

import { useState } from 'react'
import { format, subDays } from 'date-fns'
import { Edit3, Paperclip, Router } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from 'next/navigation'
import { JournalEntry } from '@/types/data-models'



interface Props {

  entries: {
    date: string
    text?: string | null
    attachments?: { path: string | null }[]
  }[]
}

export function JournalDashboardComponent({ entries }: Props) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)



  const handleTileClick = (date: string) => {
    setSelectedDate(date)
    // Here you would typically navigate to the journal entry page
    console.log(`Navigating to entry for ${date}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">

        {entries.map(({ date, text, attachments }) => (
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
                    <div className="text-sm font-semibold">{format(new Date(date + 'T00:00:00'), 'MMM d')}</div>
                    <div className='flex flex-row gap-2'>

                      {text && (
                        <Edit3 className="mt-2 text-primary" size={16} />
                      )}
                      {(attachments?.length || 0) > 0 && (
                        <Paperclip className="mt-2 text-primary" size={16} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                {text
                  ? `Entry: ${text?.slice(0, 20)}...`
                  : 'No entry for this day'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

    </div>
  )
}