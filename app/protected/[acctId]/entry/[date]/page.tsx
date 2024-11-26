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


    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData.session) {
        return redirect("/sign-in")
    }
    const { session } = sessionData

    const entryGet = await supabase
        .from('entries')
        .select('*')
        .eq('account_id', acctId)
        .eq('date', date)
        .maybeSingle()

    if (entryGet.error) {
        throw entryGet.error
    }


    const imagePaths = await supabase.storage
        .from('account')
        .list(`${acctId}/${date}`)


    const signedUrls = await supabase
        .storage
        .from('account')
        .createSignedUrls(imagePaths.data?.map((file) => `${acctId}/${date}/${file.name}`) ?? [], 60);




    return (
        <div className='flex flex-row w-full'>


            <div className='flex flex-col flex-auto'>
                <Navigation date={date} />
                <EntryEditor userId={acctId} content={entryGet.data?.content} date={date} />
                <div>
                    {signedUrls.data?.map((entrySrc) => (
                        <InteractiveImage
                            key={entrySrc.path}
                            src={entrySrc.signedUrl}
                            alt=''
                            path={entrySrc.path ?? ''}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col flex-auto p-2 justify-start'>
                <EntryImageUploader session={session} />
            </div>
        </div>
    );
}