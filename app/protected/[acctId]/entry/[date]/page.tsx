import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, format, subDays } from 'date-fns';

import { Button } from '@/components/ui/button';
import EntryEditor from './entry-editor';
import EntryImageUploader from './ImageUploader';
import InteractiveImage from '@/components/interactive-image';
import Link from 'next/link';
import { Navigation } from './Navigation';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ date: string, acctId: string }> }) {
    const { date, acctId } = await params



    const supabase = await createClient()

    const [sessionGet, entryGet, imagePathsGet] = await Promise.all([
        supabase.auth.getSession(),
        supabase
            .from('entries')
            .select('*')
            .eq('account_id', acctId)
            .eq('date', date)
            .maybeSingle(),
        supabase.storage
            .from('account')
            .list(`${acctId}/${date}`)
    ])


    if (!sessionGet.data.session) {
        return redirect("/sign-in")
    }
    if (entryGet.error) {
        throw entryGet.error
    }



    const signedUrls = await supabase
        .storage
        .from('account')
        .createSignedUrls(imagePathsGet.data?.map((file) => `${acctId}/${date}/${file.name}`) ?? [], 60);


    return (

        <EntryEditor
            content={entryGet.data?.content}
            session={sessionGet.data.session}
            signedUrls={signedUrls.data ?? []}
        />

    );
}