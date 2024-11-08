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

      const [signedUrls, files] = await Promise.all([
        supabase.storage.from("user").createSignedUrls(imagepaths, 60),
        supabase.storage.from("user").list(uid, {}),
      ]);

      if (files.error || signedUrls.error) {
        console.log(files.error || signedUrls.error);
        throw new Error("failed to create signed url");
      }

      for (const signedUrl of signedUrls.data) {
        const file = files.data.find((f) => f.name === signedUrl.path);
        if (!file) {
          console.warn(`could not find file ${signedUrl.path}, skipping...`);
          continue;
        }

        const res = await transcribeImage(context, signedUrl.signedUrl);

        const entries =
          res?.entries?.map((entry) => ({
            date: entry.date,
            text: entry.text,
            user_id: uid,
          })) ?? [];

        const insertEntries = await supabase
          .from("entries")
          .insert(entries)
          .select();
        if (insertEntries.error) {
          console.error(insertEntries.error);
          continue;
        }
        const insertSources = await supabase.from("entry_src").insert(
          insertEntries.data.map((entry) => ({
            date: entry.date,
            user_id: uid,
            file_id: file.id,
            path: signedUrl.path,
          }))
        );

        if (insertSources.error) {
          console.error(insertSources.error);
          continue;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
}

main().catch(console.error);
