import { Button } from '@/components/ui/button';
import EntryEditor from '../../entry/[date]/entry-editor';
import React from 'react';
import { browswerClient } from '@/utils/supabase/client';

export default async function Page() {

    const sb = browswerClient()
    // const role = await sb.rpc('')
    // const accounts = await sb.rpc('get_accounts');
    // console.log(accounts)
    const proposals = await sb.from('entry_proposal').select('*, entry:entries(content, entry_src(*))')

    return (
        <div>
            <h1 className='text-3xl mb-8'>Need review</h1>
            {proposals.data?.map(async (proposal) => {
                const imgPath = proposal.entry?.entry_src[0].path
                const imgsrc = await sb.storage.from('account').createSignedUrl(imgPath!, 60);
                return (
                    <div key={proposal.date}>
                        <h2 className='text-2xl'>{proposal.date}</h2>
                        <div className='flex flow-row'>
                            <div className='flex-1' >
                                <img src={imgsrc.data?.signedUrl} />
                            </div>
                            <div className='flex-1' >

                                <EntryEditor proposal content={proposal.content} date={proposal.date} userId={proposal.account_id} />
                            </div>
                        </div>
                        <div className='flex flex-row justify-end gap-2'>
                            <Button>Commit</Button>
                            <Button variant={"destructive"}>Delete</Button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}