import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/ratelimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  await saveLead(body.email, ip).catch(() => {});
  return NextResponse.json({ ok: true });
}
