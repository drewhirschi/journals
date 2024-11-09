import { Database as DatabaseGenerated, Json } from "./supabase-generated";

import { MergeDeep } from "type-fest";

export type BasejumpAccount = {
  account_id: string;
  account_role: "owner" | "member";
  is_primary_owner: boolean;
  name: string;
  slug: string;
  personal_account: boolean;
  created_at: string;
  updated_at: string;
};

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {};
    };

    basejump: {
      Functions: {
        get_accounts: {
          Args: {};
          Returns: BasejumpAccount[];
        };
      };
    };
  }
>;
