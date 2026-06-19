import { supabaseAdmin } from "./supabase";

const PER_IP_DAILY_LIMIT = Number(process.env.PER_IP_DAILY_LIMIT || 5);
const DAILY_GLOBAL_CAP = Number(process.env.DAILY_GLOBAL_CAP || 500);

function today(): string {
  // YYYY-MM-DD in UTC — stable bucket key
  return new Date().toISOString().slice(0, 10);
}

/**
 * Records one generation for `ip` on today's bucket and enforces two limits:
 * per-IP/day and a global/day cap (cost guardrail against abuse).
 * Fails OPEN if Supabase is unreachable — never block a real user on infra.
 */
export async function checkAndCountRateLimit(
  ip: string
): Promise<{ ok: true } | { ok: false; reason: string }> {
  try {
    const db = supabaseAdmin();
    const day = today();

    const { count: globalCount } = await db
      .from("generations")
      .select("*", { count: "exact", head: true })
      .eq("day", day);
    if ((globalCount ?? 0) >= DAILY_GLOBAL_CAP) {
      return { ok: false, reason: "Денний ліміт сервісу вичерпано. Спробуйте завтра." };
    }

    const { count: ipCount } = await db
      .from("generations")
      .select("*", { count: "exact", head: true })
      .eq("day", day)
      .eq("ip", ip);
    if ((ipCount ?? 0) >= PER_IP_DAILY_LIMIT) {
      return { ok: false, reason: `Ліміт ${PER_IP_DAILY_LIMIT} генерацій на день. Поверніться завтра.` };
    }

    await db.from("generations").insert({ ip, day });
    return { ok: true };
  } catch {
    return { ok: true }; // fail open
  }
}

export async function saveLead(email: string, ip: string): Promise<void> {
  const clean = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) return;
  const db = supabaseAdmin();
  await db.from("leads").upsert({ email: clean, ip, source: "linkedin-post-writer" }, { onConflict: "email" });
}
