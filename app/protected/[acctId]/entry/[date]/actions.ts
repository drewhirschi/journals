"use server";

import { createClient } from "@/utils/supabase/server";
import { ocr } from "llama-ocr";
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

    const markdown = await ocr({
      model: "Llama-3.2-90B-Vision",
      filePath: signedUrl.data.signedUrl,
      apiKey: process.env.TOGETHER_API_KEY,
    });

    const [acctId, date] = path.split("/");

    // const upsert = await supabase
    //   .from("entries")
    //   .upsert({ content: markdown, date, account_id: acctId });

    // revalidatePath(`/protected/${acctId}/entry/${date}`);

    return markdown;
  } catch (error) {
    console.log(error);
  }
};
