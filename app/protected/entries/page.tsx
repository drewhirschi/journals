import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewEntryLink } from "./new-link";
import { ActivityCalendar } from 'react-activity-calendar';
import { JournalDashboardComponent } from "@/components/journal-dashboard";
import { MonthYearSelectorComponent } from "@/components/month-year-selector";
import { JournalEntry } from "@/types/data-models";
import { text } from "stream/consumers";

type ActivityCalendarData = {
  date: string;
  count: number;
  level: number;
}

export default async function ProtectedPage({ searchParams }: { searchParams: Promise<{ month?: string, year?: string }> }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let { month: monthStr, year: yearStr } = await searchParams;

  const today = new Date();
  const month = monthStr ? Number(monthStr) : today.getMonth() + 1;
  const year = yearStr ? Number(yearStr) : today.getFullYear();

  let startDate: string;
  let endDate: string;

  if (!monthStr && !yearStr) {
    endDate = today.toLocaleDateString();
    const previousMonth = new Date(today);
    previousMonth.setFullYear(today.getFullYear() - 1);
    startDate = previousMonth.toLocaleDateString();
  } else {
    startDate = new Date(year, month - 1, 1).toLocaleDateString();
    endDate = new Date(year, month, 0).toLocaleDateString();
  }


  const getEntries = await supabase
    .from("entries")
    .select("*, attachments:entry_src(path)")
    .eq("account_id", user.id)
    .gte('date', startDate)
    .lt('date', endDate)
    .order("date", { ascending: false });

  const entriesMap = getEntries.data?.reduce((acc, entry) => {
    acc[entry.date] = entry;
    return acc;
  }, {} as Record<string, JournalEntry & { attachments: { path: string | null }[] }>);

  const past365Activity = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('en-CA');
    const entry = entriesMap?.[dateStr];
    return {
      date: dateStr,
      text: entry?.content,
      attachments: entry?.attachments,
      count: entry?.content ? 1 : 0,
      level: Math.min(4, (entry?.content?.length ?? 0) / 10)
    }
  });


  return (
    <div className="flex-1 md:min-w-[800px] flex flex-col gap-12">

      <div className="flex flex-col gap-2 items-start">
        <div className="flex flex-row justify-between gap-2 w-full">
          <h2 className="font-bold text-2xl mb-4">Your journal entries</h2>
          <div className="flex gap-2">
            <Button variant={"outline"} asChild><Link href={"upload"}>
              Upload
            </Link>
            </Button>

            <NewEntryLink />
          </div>
        </div>
        {getEntries.data &&
          <ActivityCalendar

            theme={{
              light: ['hsl(0, 0%, 92%)', 'firebrick'],
              dark: ['#333', 'rgb(214, 16, 174)'],
            }}
            hideMonthLabels={false}
            hideTotalCount
            blockRadius={20}
            data={past365Activity}
          />
        }
        {/* <MonthYearSelectorComponent /> */}
        <JournalDashboardComponent entries={past365Activity} />
      </div>

    </div>
  );
}
