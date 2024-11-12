import React from 'react';
import EntryEditor from './entry-editor';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ date: string }> }) {
    const { date } = await params

    const supabase = await createClient()
    const userRes = await supabase.auth.getUser()
    if (!userRes.data.user) {
        return redirect("/sign-in")
    }

    const entryGet = await supabase
        .from('entries')
        .select('*, entry_srcs:entry_src(*)')
        .eq('account_id', userRes.data.user?.id)
        .eq('date', date)
        .maybeSingle()

    if (entryGet.error) {
        throw entryGet.error
    }

    const signedUrls = await supabase
        .storage
        .from('account')
        .createSignedUrls(entryGet.data?.entry_srcs?.map((entrySrc) => entrySrc.path!) || [], 60);

    return (
        <div>
            <h1 className='text-3xl mb-8'>{new Date(date + 'T00:00:00').toLocaleDateString()}</h1>
            <EntryEditor userId={userRes.data.user?.id} content={entryGet.data?.content} date={date} />
            <div>
                {signedUrls.data?.map((entrySrc) => (
                    <img key={entrySrc.path} src={entrySrc.signedUrl} />
                ))}
            </div>
        </div>
    );
}