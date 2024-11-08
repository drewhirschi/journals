"use server";

import { createClient } from "@/utils/supabase/server";
import PgBoss from "pg-boss";

export const removeJob = async (name: string, id: string) => {
  const boss = new PgBoss(
    `postgresql://postgres.dvnpzpdoekbdmpltqefb:${process.env.POSTGRES_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`
  );

  //   const queue = "image-uploads";
  boss.on("error", console.error);

  await boss.start();

  boss.deleteJob(name, id);
  await boss.stop();
};
