import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {


    const supabase = await createClient()
    const userRes = await supabase.auth.getUser()
    if (!userRes.data.user) {
        return redirect("/sign-in")
    }

    // @ts-ignore
    const jobs = await supabase.schema("pgboss").from('job').select().eq('data->>uid', userRes.data.user.id)

    return (
        <div>
            {jobs.data?.map((job: any) => (
                <div key={job.id}>
                    <pre>{JSON.stringify(job.data, null, 2)}</pre>
                </div>
            ))}
        </div>
    );
}