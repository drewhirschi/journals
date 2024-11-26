import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, format, subDays } from 'date-fns';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navigation({ date }: { date: string }) {
    const currentDate = new Date(date + 'T00:00:00');
    const previousDate = subDays(currentDate, 1);
    const nextDate = addDays(currentDate, 1);


    return (
        <div className='flex flex-row justify-between'>
            <Button variant="outline" size="icon" asChild>
                <Link href={`${format(previousDate, 'yyyy-MM-dd')}`}>
                    <ChevronLeft />
                </Link>
            </Button>
            <h1 className='text-3xl mb-8'>{new Date(date + 'T00:00:00').toLocaleDateString()}</h1>
            <Button variant="outline" size="icon">
                <Link href={`${format(nextDate, 'yyyy-MM-dd')}`}>
                    <ChevronRight />
                </Link>
            </Button>

        </div>
    )

}