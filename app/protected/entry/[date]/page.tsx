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
        .select('*')
        .eq('user_id', userRes.data.user?.id)
        .eq('date', date)
        .maybeSingle()

    if (entryGet.error) {
        throw entryGet.error
    }

    return (
        <div>
            <h1 className='text-3xl mb-8'>{new Date().toLocaleDateString()}</h1>
            <EntryEditor userId={userRes.data.user?.id} content={entryGet.data?.text} date={date} />
        </div>
    );
}