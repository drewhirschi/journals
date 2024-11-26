import { BasejumpAccount } from '@/types/supabase';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {

    const supabase = await createClient()

    const accountGet = await supabase.rpc('get_personal_account').returns<BasejumpAccount>()


    redirect('protected/' + accountGet.data?.account_id)
}