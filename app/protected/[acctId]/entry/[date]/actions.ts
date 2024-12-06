"use server";

import { createClient } from "@/utils/supabase/server";
import { gptOCR } from "@/lib/llm";
import { revalidatePath } from "next/cache";

export const transcribeImage = async (path: string) => {
  try {
    const supabase = await createClient();
    //get signed url
    const signedUrl = await supabase.storage
      .from("account")
      .createSignedUrl(path, 60);

    if (signedUrl.error) {
      throw signedUrl.error;
    }

    const content = await gptOCR({
      filePath: signedUrl.data.signedUrl,
    });

    return content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function refreshEntryPage(acctId: string, date: string) {
  console.log("revalidating", `/protected/${acctId}/entry/${date}`);
  revalidatePath(`/protected/${acctId}/entry/${date}`);
}
