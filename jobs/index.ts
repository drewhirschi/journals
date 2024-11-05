import config from "dotenv";
const output = config.config({ path: ".env.local" });
// console.log(output);

import { transcribeImage } from "../lib/llm";
import { createClient, serviceClient } from "../utils/supabase/server";
import PgBoss from "pg-boss";

async function main() {
  const boss = new PgBoss(
    `postgresql://postgres.dvnpzpdoekbdmpltqefb:${process.env.POSTGRES_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`
  );

  const queue = "image-uploads";
  boss.on("error", console.error);

  await boss.start();

  await boss.work(queue, async ([job]) => {
    try {
      const { uid, imagepaths, context } = job.data as any;

      const supabase = serviceClient();

      const list = await supabase.storage.from("user").list(uid, {});

      const imageUrl = await supabase.storage
        .from("user")
        .createSignedUrl(imagepaths[0], 60);

      if (imageUrl.error) {
        console.log(imageUrl.error);
        throw new Error("failed to create signed url", imageUrl.error);
      }

      const res = await transcribeImage(context, imageUrl.data?.signedUrl);

      const entries =
        res?.entries?.map((entry) => ({
          date: entry.date,
          text: entry.text,
          user_id: uid,
        })) ?? [];

      const insertEntries = await supabase.from("entries").insert(entries);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
}

main().catch(console.error);
