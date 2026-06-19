import { createClient } from "@supabase/supabase-js";

// Server-side admin client (service role) — never import this into client components.
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Supabase env vars missing");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
