# LinkedIn Post Writer — free tool

A free tool. User gives an idea → picks
post type / format / angle → gets a publish-ready LinkedIn post in **their own
voice**, formatted aggressively (ялинки, ragged rhythm). Powered by Claude
Sonnet 4.6.

This is the first tool in the free-tool play (see
`project_b2b_free_tools` memory). It ports Viktor's `linkedin-post-writing`
skill (9-step process) into a public web app.

## Architecture

| Layer | Tech | Role |
|---|---|---|
| Frontend + generation | **Next.js (App Router) on Vercel** | UI form + `/api/generate` server route — holds the Anthropic key server-side |
| LLM | **Claude Sonnet 4.6** (`claude-sonnet-4-6`) | one call per generation; prompt-cached system block |
| Data | **Supabase (Postgres)** | `leads` (emails) + `generations` (rate-limit counters) |
| Email gate / auth | **Supabase Auth** (magic link) — optional | gate the result behind an email = lead capture |
| Lead nurture / CRM | **n8n** — later, separate layer | Supabase → n8n → CRM / email / Telegram. NOT needed for the generation itself. |

**Why not n8n for generation?** It's one Claude call — n8n only adds latency.
n8n earns its place on the lead-nurture pipeline, post-capture.

## Cost (≈100 users/mo)

~$10–18/month on Sonnet 4.6 (~400 generations, prompt caching on). Guardrails:
per-IP/day rate limit, email gate, global daily cap. See `lib/ratelimit.ts`.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in keys
# create Supabase tables:
#   run supabase/schema.sql in the Supabase SQL editor
npm run dev                  # http://localhost:3000
```

Env vars (`.env.local`):
- `ANTHROPIC_API_KEY` — server-side only, never exposed to the client
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — server-side, for writing leads / counters
- `DAILY_GLOBAL_CAP` (default 500), `PER_IP_DAILY_LIMIT` (default 5)

## Deploy

Vercel: import repo → add env vars → deploy. Point a subdomain
(e.g. `write.example...`) at it.

## Status

MVP scaffold. Done: prompt engine, generate API route, minimal UI, schema.
TODO: email-gate UI, Supabase Auth, n8n nurture hook, the next tool
(Infographic Generator — needs an SVG→PNG renderer, separate build).
