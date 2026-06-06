-- ============================================================================
-- ESTATE — Supabase schema + Row Level Security
-- Run in Supabase: SQL Editor → New query → paste → Run.
-- Choose project region EU (Frankfurt) for GDPR. Use the service_role key
-- ONLY inside n8n (server-side), never in the website / frontend.
-- ============================================================================

create extension if not exists "pgcrypto";

create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null,
  message     text        not null,
  ai_response text,
  status      text        not null default 'received',  -- received | answered | throttled | duplicate
  ip_hash     text,                                      -- hashed visitor IP, never the raw IP
  created_at  timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_email_idx       on public.inquiries (email);

-- ----------------------------------------------------------------------------
-- Row Level Security: enable it, and add NO policies for anon/authenticated.
-- With RLS ON and no permissive policy, the public/anon API key has ZERO
-- access. The service_role key bypasses RLS, so n8n keeps full read/write.
-- This is defense-in-depth: even if an anon key ever leaks, the table is safe.
-- ----------------------------------------------------------------------------
alter table public.inquiries enable row level security;

revoke all on public.inquiries from anon;
revoke all on public.inquiries from authenticated;

-- ----------------------------------------------------------------------------
-- OPTIONAL retention policy: delete inquiries older than 12 months.
-- Enable the pg_cron extension first (Database → Extensions → pg_cron), then
-- uncomment:
--
-- select cron.schedule(
--   'purge-old-inquiries',
--   '0 3 * * *',
--   $$ delete from public.inquiries where created_at < now() - interval '12 months' $$
-- );
-- ----------------------------------------------------------------------------
