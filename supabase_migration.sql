-- Run this in your Supabase SQL Editor to create the three missing tables.

-- 1. Bills table
create table if not exists public.bills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  amount numeric not null,
  due_date date not null,
  category text not null,
  recurring text not null default 'monthly',
  paid boolean not null default false,
  autopay boolean not null default false,
  payment_method text,
  created_at timestamptz not null default now()
);
alter table public.bills enable row level security;
create policy "Users manage own bills" on public.bills
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2. Learn progress table (one row per completed lesson per user)
create table if not exists public.learn_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id integer not null,
  lesson_index integer not null,
  created_at timestamptz not null default now(),
  unique (user_id, course_id, lesson_index)
);
alter table public.learn_progress enable row level security;
create policy "Users manage own progress" on public.learn_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3. Newsletter subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.newsletter_subscribers enable row level security;
create policy "Users manage own subscription" on public.newsletter_subscribers
  for all using (auth.uid() = user_id or user_id is null) with check (true);
