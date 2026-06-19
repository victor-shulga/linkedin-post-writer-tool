import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, buildUserPrompt, GenerateInput } from "@/lib/prompt";
import { checkAndCountRateLimit, saveLead } from "@/lib/ratelimit";

export const runtime = "nodejs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  let body: GenerateInput & { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.idea || !body.postType || !body.format) {
    return NextResponse.json({ error: "Missing required fields (idea, postType, format)." }, { status: 400 });
  }

  // rate limit by IP (and global daily cap) — see lib/ratelimit.ts
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const gate = await checkAndCountRateLimit(ip);
  if (!gate.ok) {
    return NextResponse.json({ error: gate.reason }, { status: 429 });
  }

  // optional lead capture (email gate)
  if (body.email) {
    await saveLead(body.email, ip).catch(() => {});
  }

  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: buildUserPrompt(body) }],
    });

    const post = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    return NextResponse.json({ post, usage: msg.usage });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Сервіс перевантажений, спробуйте за хвилину." }, { status: 503 });
    }
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
