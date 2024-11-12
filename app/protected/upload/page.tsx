
import React, { Suspense, useEffect, useRef } from 'react'

import { createClient } from '@/utils/supabase/server'
import UppySupabaseUploader from './file-upload'
import { redirect } from 'next/navigation'

// Initialize Supabase client



export default async function Page() {

    const supabase = await createClient()

    const { data: sessionData } = await supabase.auth.getSession()



    if (!sessionData.session) {
        return redirect("/sign-in")
    }
    const { session } = sessionData

    const userFileGet = await supabase.storage.from("account").list(session.user.id, {})
    if (userFileGet.error) {
        throw userFileGet.error
    }
    const signedUrls = await supabase
        .storage
        .from('account')
        .createSignedUrls(userFileGet.data.map((file) => `${session.user.id}/${file.name}`), 60);




    return (
        <div className=" flex flex-col p-4 min-w-[800px] w-full">
            <Suspense fallback={<div>Loading...</div>}>

                <UppySupabaseUploader session={session} />
            </Suspense>
            {/* {signedUrls.data?.map((url) => {
                return <img key={url.path} src={url.signedUrl} />
            })} */}
        </div>
    )
}