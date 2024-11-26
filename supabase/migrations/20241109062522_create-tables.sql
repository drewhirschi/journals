create table
  public.entries (
    account_id uuid not null,
    created_at timestamp
    with
      time zone not null default now (),
      date date not null,
      content text null,
      constraint entries_pkey primary key (account_id, date),
      constraint entries_account_id_fkey foreign key (account_id) references basejump.accounts (id) on delete cascade
  ) tablespace pg_default;

create policy "member full control" on "public"."entries" as PERMISSIVE for ALL to public using (
  (
    account_id IN (
      SELECT
        basejump.get_accounts_with_role ()
    )
  )
)
with
  check (
    (
      account_id IN (
        SELECT
          basejump.get_accounts_with_role ()
      )
    )
  );

create table
  public.entry_src (
    date date not null,
    created_at timestamp
    with
      time zone not null default now (),
      account_id uuid not null,
      file_id uuid not null,
      path text null,
      constraint entry_src_pkey primary key (file_id),
      constraint entry_src_account_id_date_fkey foreign key (account_id, date) references entries (account_id, date) on delete cascade,
      constraint entry_src_account_id_fkey foreign key (account_id) references basejump.accounts (id) on delete cascade,
      constraint entry_src_file_id_fkey foreign key (file_id) references storage.objects (id) on delete cascade
  ) tablespace pg_default;

create policy "member full control" on "public"."entry_src" as PERMISSIVE for ALL to public using (
  (
    account_id IN (
      SELECT
        basejump.get_accounts_with_role ()
    )
  )
)
with
  check (
    (
      account_id IN (
        SELECT
          basejump.get_accounts_with_role ()
      )
    )
  );