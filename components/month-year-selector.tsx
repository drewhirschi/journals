"use client"

import * as React from "react"
import { CalendarIcon, Check, Router } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

export function MonthYearSelectorComponent({
  onSelect,
  className
}: {
  onSelect?: (month: string, year: number) => void
  className?: string
} = {}) {
  const [open, setOpen] = React.useState(false)
  const searchParams = useSearchParams()
  const [selectedMonth, setSelectedMonth] = React.useState<string>(searchParams.get('month') ? months[parseInt(searchParams.get('month')!, 10) - 1] : new Date().toLocaleString('default', { month: 'long' }))
  const [selectedYear, setSelectedYear] = React.useState<number>(searchParams.get('year') ? parseInt(searchParams.get('year')!, 10) : currentYear)
  const router = useRouter()

  const handleConfirm = () => {
    if (onSelect && selectedMonth && selectedYear) {
      onSelect(selectedMonth, selectedYear)
    }
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set('year', selectedYear.toString());
    searchParams.set('month', (months.indexOf(selectedMonth) + 1).toString());
    router.replace(window.location.pathname.split('?')[0] + `?${searchParams.toString()}`)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedMonth && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedMonth && selectedYear
            ? `${selectedMonth} ${selectedYear}`
            : "Select month and year"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <div className="space-y-4 p-4">
          <Select
            onValueChange={(value) => setSelectedMonth(value)}
            value={selectedMonth}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent position="popper">
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setSelectedYear(parseInt(value, 10))

            }}
            value={selectedYear.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent position="popper">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="w-full" onClick={handleConfirm}>
            <Check className="mr-2 h-4 w-4" /> Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}