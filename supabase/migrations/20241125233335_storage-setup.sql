-- Use Postgres to create a bucket.
insert into
    storage.buckets (id, name, public)
values
    ('account', 'account', false);

-- might need to make select, isert, and delete policies seperately
create policy "Allow account member access" on storage.objects for all to authenticated
using (
    bucket_id = 'account'
    and (storage.foldername (name)) [1]::uuid in (
      select
        basejump.get_accounts_with_role ()
    )
  )
with
  check (
    bucket_id = 'account'
    and (storage.foldername (name)) [1]::uuid in (
      select
        basejump.get_accounts_with_role ()
    )
  );

