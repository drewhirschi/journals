"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function removeImage(path: string) {
  const supabase = await createClient();
  const remove = await supabase.storage.from("user").remove([path]);
  revalidatePath("/protected/uploads");
}
