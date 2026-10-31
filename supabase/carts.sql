-- Saved carts for signed-in customers (accounts themselves live in Supabase Auth).
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table public.carts (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  -- Same shape as the browser cart: [{"slug": "blush-peony-silk-scarf", "quantity": 2}]
  items      jsonb not null default '[]' check (jsonb_typeof(items) = 'array'),
  updated_at timestamptz not null default now()
);

-- ─── Security: each customer can only see and change their own cart ────────

alter table public.carts enable row level security;

create policy "Customers can read their own cart"
  on public.carts for select to authenticated using ((select auth.uid()) = user_id);

create policy "Customers can create their own cart"
  on public.carts for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "Customers can update their own cart"
  on public.carts for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
