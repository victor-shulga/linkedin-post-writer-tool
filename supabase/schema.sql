-- Run in the Supabase SQL editor.

-- Lead capture (email gate). Synced to CRM later via n8n.
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  ip text,
  source text default 'linkedin-post-writer',
  created_at timestamptz default now()
);

-- One row per generation — powers per-IP/day and global/day rate limits.
create table if not exists generations (
  id uuid primary key default gen_random_uuid(),
  ip text not null,
  day date not null,
  created_at timestamptz default now()
);
create index if not exists generations_day_ip_idx on generations (day, ip);

-- Tables are written only by the server (service-role key), so RLS stays on
-- with no public policies — the anon key cannot read or write these.
alter table leads enable row level security;
alter table generations enable row level security;
