"use client";

import { useState } from "react";

const FORMATS = [
  { v: "text", label: "Текст" },
  { v: "text_image", label: "Текст + фото" },
  { v: "carousel", label: "Карусель" },
  { v: "infographic", label: "Інфографіка" },
  { v: "lead_magnet", label: "Лід-магніт" },
  { v: "poll", label: "Опитування" },
  { v: "screenshot", label: "Скріншот" },
];

export default function Tool() {
  const [idea, setIdea] = useState("");
  const [postType, setPostType] = useState("expert");
  const [format, setFormat] = useState("text");
  const [voiceSample, setVoiceSample] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  async function generate() {
    setLoading(true);
    setError("");
    setPost("");
    setUnlocked(false);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, postType, format, voiceSample, language: "Ukrainian" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Помилка генерації");
      setPost(data.post);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Помилка");
    } finally {
      setLoading(false);
    }
  }

  async function unlock() {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Введіть коректний email");
      return;
    }
    setError("");
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    setUnlocked(true);
  }

  return (
    <div className="card two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
      {/* inputs */}
      <div style={{ padding: 26, borderRight: "1px solid var(--border-soft)" }}>
        <label className="label">Ваша ідея</label>
        <textarea className="textarea" rows={4} value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Про що пост? Сира думка, тема чи чернетка." />

        <label className="label" style={{ marginTop: 18 }}>Тип поста</label>
        <div className="seg">
          <button data-active={postType === "expert"} onClick={() => setPostType("expert")}>Експертний</button>
          <button data-active={postType === "personal"} onClick={() => setPostType("personal")}>Персональний</button>
        </div>

        <label className="label" style={{ marginTop: 18 }}>Формат</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {FORMATS.map((f) => (
            <button key={f.v} className="chip" data-active={format === f.v} onClick={() => setFormat(f.v)}>{f.label}</button>
          ))}
        </div>

        <label className="label" style={{ marginTop: 18 }}>
          Зразок вашого голосу <span style={{ fontWeight: 500, color: "var(--muted)" }}>· опціонально</span>
        </label>
        <textarea className="textarea" rows={3} value={voiceSample} onChange={(e) => setVoiceSample(e.target.value)} placeholder="Вставте 1–2 свої пости, щоб імітувати ваш стиль." />

        <button className="btn btn-primary" style={{ width: "100%", marginTop: 22 }} disabled={loading || !idea.trim()} onClick={generate}>
          {loading ? "Генерую…" : "Написати пост →"}
        </button>
        {error && <p style={{ color: "var(--coral)", marginTop: 12, fontSize: 14 }}>{error}</p>}
      </div>

      {/* output */}
      <div style={{ padding: 26, background: "var(--surface-soft)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Готовий пост</span>
          {post && unlocked && (
            <button className="chip" style={{ background: "var(--coral-tint)", color: "var(--coral-deep)", borderRadius: 7 }} onClick={() => navigator.clipboard.writeText(post)}>
              Скопіювати
            </button>
          )}
        </div>

        {!post && !loading && (
          <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.5, padding: "30px 0", textAlign: "center" }}>
            Ваш пост зʼявиться тут.
          </div>
        )}

        {post && (
          <div style={{ position: "relative" }}>
            <div
              style={{
                border: "1px solid var(--border)", borderRadius: 11, background: "#fff", padding: 16,
                fontSize: 13.5, lineHeight: 1.55, color: "var(--ink)", whiteSpace: "pre-wrap",
                maxHeight: unlocked ? "none" : 150, overflow: "hidden",
                WebkitMaskImage: unlocked ? "none" : "linear-gradient(180deg,#000 55%,transparent)",
              }}
            >
              {post}
            </div>

            {!unlocked && (
              <div style={{ marginTop: 14, border: "1px solid var(--border)", borderRadius: 11, background: "#fff", padding: 18, textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>Пост готовий 🎉</div>
                <p style={{ margin: "6px 0 14px", fontSize: 13, color: "var(--grey)" }}>Залиште email, щоб відкрити повністю і скопіювати.</p>
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
                <button className="btn btn-primary" style={{ width: "100%", marginTop: 10 }} onClick={unlock}>Показати пост →</button>
                <p style={{ margin: "10px 0 0", fontSize: 11.5, color: "var(--muted)" }}>Без спаму. Інколи — корисні матеріали.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
