-- Emails the team (via a Formspree form → info@lumiereeast.com) whenever a customer
-- account becomes active: when they confirm their email, or right away if
-- "Confirm email" is turned off in Supabase Auth.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- Before running, replace FORMSPREE_FORM_URL below with the "New Accounts" form's endpoint.

-- pg_net lets the database send web requests; they're sent in the background,
-- so a slow or failed notification never blocks or breaks a sign-up.
create extension if not exists pg_net;

create or replace function public.notify_new_account()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.email_confirmed_at is not null
     and (tg_op = 'INSERT' or old.email_confirmed_at is null) then
    perform net.http_post(
      url := 'https://formspree.io/f/xgaanazp',
      body := jsonb_build_object(
        '_subject', 'New Lumière East customer account',
        'email', new.email,
        'message', 'A new customer account was created: ' || new.email
      ),
      headers := '{"Content-Type": "application/json", "Accept": "application/json"}'::jsonb
    );
  end if;
  return new;
end;
$$;

-- Only the trigger should run this, not visitors through the public API.
revoke execute on function public.notify_new_account() from public, anon, authenticated;

create trigger on_account_confirmed
  after insert or update of email_confirmed_at on auth.users
  for each row execute function public.notify_new_account();
