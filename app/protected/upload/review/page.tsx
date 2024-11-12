import { browswerClient } from '@/utils/supabase/client';
import React from 'react';

export default async function Page() {

    const sb = browswerClient()
    const proposals = await sb.from('entry_proposal').select('*, entries(content, entry_src(path))')
    return (
        <div>
            <h1>Need review</h1>
            {proposals.data?.map((proposal) => {
                return (
                    <div key={proposal.date}>
                        <h2>{proposal.date}</h2>
                        <p>{proposal.content}</p>
                        {/* {proposal.entries?.map((entry) => {
                            return (
                                <div key={entry.id}>
                                    <h3>{entry.content}</h3>
                                    <img src={entry.entry_src?.path} />
                                </div>
                            )
                        })} */}
                    </div>
                )
            })}
        </div>
    );
}