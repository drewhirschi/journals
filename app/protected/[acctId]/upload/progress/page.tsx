import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { Trash2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import { RemoveJobButton } from './remove-job-button';
import Image from 'next/image';

export default async function Page() {


    const supabase = await createClient()
    const userRes = await supabase.auth.getUser()
    if (!userRes.data.user) {
        return redirect("/sign-in")
    }

    // @ts-ignore
    const jobsGet = await supabase.schema("pgboss").from('job').select()
        .eq('data->>uid', userRes.data.user.id)
        .in('state', ['active', 'created'])
        .order('start_after', { ascending: false })
        .returns<{ id: string, state: string, data: { uid: string, imagepaths: string[], context: string } }[]>()

    if (jobsGet.error) {
        throw jobsGet.error
    }

    const signedUrlsProms = jobsGet.data
        .flatMap((job) => job.data.imagepaths.map((path) => ({ jobId: job.id, path })))
        .map(({ jobId, path }) =>
            supabase.storage
                .from("account")
                .createSignedUrl(path, 60, { transform: { height: 400, width: 300 } })
                .then((res) => ({ jobId, path, url: res.data?.signedUrl }))
        );

    const signedUrls = await Promise.allSettled(signedUrlsProms);

    // Group the signed URLs by jobId
    const urlsByJob = signedUrls.reduce((acc, result) => {
        if (result.status === "fulfilled" && result.value.url) {
            const { jobId, path, url } = result.value;
            acc[jobId] = acc[jobId] || [];
            acc[jobId].push({ path, url });
        }
        return acc;
    }, {} as Record<string, { path: string; url: string }[]>);

    return (
        <div className='flex flex-col gap-4'>
            {jobsGet.data?.map((job) => (
                <div key={job.id} className='border'>
                    <div className='flex flex-col p-2'>
                        <span className='font-bold'>State: {job.state}</span>
                        <span className='italic'>Context: {job.data.context}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {urlsByJob[job.id]?.map(({ url, path }) => (
                            <Image height={200} width={200} key={path} src={url} alt="Job Image" />
                        ))}
                    </div>
                    <RemoveJobButton jobId={job.id} />
                </div>
            ))}
        </div>
    );
}