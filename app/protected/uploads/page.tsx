import InteractiveImageComponent from '@/components/interactive-image';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {
    const supabase = await createClient()

    const { data: sessionData } = await supabase.auth.getUser()



    if (!sessionData.user) {
        return redirect("/sign-in")
    }
    const { user } = sessionData

    const userFileGet = await supabase.storage.from("user").list(user.id, {})
    if (userFileGet.error) {
        throw userFileGet.error
    }
    const signedUrls = await supabase
        .storage
        .from('user')
        .createSignedUrls(userFileGet.data.map((file) => `${user.id}/${file.name}`), 60);






    return (

        <div className="grid grid-cols-3 gap-4">
            {signedUrls.data?.filter((url) => !!url.path).map((url) =>
                <InteractiveImageComponent
                    key={url.path}
                    // className="w-full h-full object-cover"
                    src={url.signedUrl}
                    alt={''}
                    path={url.path!}
                />

            )}
        </div>
    )

}