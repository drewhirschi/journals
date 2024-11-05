import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewEntryLink } from "./new-link";
import { ActivityCalendar } from 'react-activity-calendar';
import { JournalDashboardComponent } from "@/components/journal-dashboard";

type ActivityCalendarData = {
  date: string;
  count: number;
  level: number;
}

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const getEntries = await supabase
    .from("entries")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  console.log(getEntries.data)


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
            data={getEntries.data?.map((entry) => ({ date: entry.date, count: 1, level: Math.min(4, (entry.text?.length ?? 0) / 10) }))}
          />
        }
        <JournalDashboardComponent />
      </div>

    </div>
  );
}
