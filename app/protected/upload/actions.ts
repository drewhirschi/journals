"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import PgBoss from "pg-boss";

export async function addImagesToProcessQueue(
  imagepaths: string[],
  context: string
) {
  const supabase = await createClient();
  const userRes = await supabase.auth.getUser();
  if (!userRes.data.user) {
    throw userRes.error;
  }

  const uid = userRes.data.user.id;

  const boss = new PgBoss(
    `postgresql://postgres.dvnpzpdoekbdmpltqefb:${process.env.POSTGRES_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`
  );

  const queue = "image-uploads";

  try {
    await boss.start();

    await boss.createQueue(queue);

    const id = await boss.send(queue, { uid, imagepaths, context });

    console.log(`created job ${id} in queue ${queue}`);
    await boss.stop();
  } catch (error) {
    console.error("failed to add job to queue", error);
  }
}

export async function removeImage(path: string) {
  const supabase = await createClient();
  const remove = await supabase.storage.from("user").remove([path]);
  revalidatePath("/protected/uploads");
}
