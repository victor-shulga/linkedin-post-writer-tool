import Tool from "@/components/Tool";

export default function Home() {
  return (
    <>
      {/* Header */}
      <header style={{ borderBottom: "1px solid var(--border-soft)", background: "var(--surface)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Victor Shulga" style={{ height: 30, width: "auto" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <a href="#how" style={{ fontSize: 13.5, color: "var(--grey)", fontWeight: 600 }}>Як працює</a>
            <a href="#faq" style={{ fontSize: 13.5, color: "var(--grey)", fontWeight: 600 }}>FAQ</a>
            <a href="#tool" className="btn btn-dark" style={{ fontSize: 13, padding: "8px 15px" }}>Спробувати</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container" style={{ textAlign: "center", padding: "56px 20px 40px" }}>
        <span className="eyebrow">БЕЗКОШТОВНИЙ ІНСТРУМЕНТ</span>
        <h1 className="h1" style={{ maxWidth: 640, margin: "14px auto 0" }}>
          Пишіть LinkedIn-пости, що <span className="coral">приносять ліди</span>
        </h1>
        <p className="sub" style={{ maxWidth: 500, margin: "16px auto 0" }}>
          Ідея → готовий пост у вашому голосі за 20 секунд. На основі перевіреного 9-крокового методу.
        </p>
        <div style={{ marginTop: 26, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#tool" className="btn btn-primary">Написати пост →</a>
          <a href="#how" className="btn btn-ghost">Як це працює</a>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>Без реєстрації · ваш голос, не шаблон · перевірений метод</p>
      </section>

      {/* Social proof strip */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 34, padding: "18px 20px", flexWrap: "wrap" }}>
          <Stat n="1 200+" l="постів згенеровано" />
          <Divider />
          <Stat n="9 кроків" l="метод, а не «напиши пост»" />
          <Divider />
          <Stat n="20 сек" l="від ідеї до поста" coral />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container" style={{ padding: "48px 20px 8px" }}>
        <h2 className="h2" style={{ textAlign: "center", marginBottom: 26 }}>Як це працює</h2>
        <div className="three-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <Step n="1" t="Вставте ідею" d="Сира думка, тема чи чернетка — будь-що." />
          <Step n="2" t="Оберіть тип і кут" d="Експертний чи персональний, формат, кут подачі." />
          <Step n="3" t="Отримайте пост" d="Готовий, відформатований, у вашому голосі." dark />
        </div>
      </section>

      {/* Tool */}
      <section id="tool" className="container" style={{ padding: "40px 20px" }}>
        <Tool />
      </section>

      {/* Comparison */}
      <section className="container narrow" style={{ padding: "16px 20px" }}>
        <div className="card" style={{ padding: "30px 28px" }}>
          <h2 className="h2" style={{ textAlign: "center", marginBottom: 4 }}>Навіщо платити за генератор постів?</h2>
          <p style={{ textAlign: "center", color: "var(--grey)", fontSize: 15, margin: "0 0 22px" }}>Те, за що інші беруть $40–150/міс — у нас безкоштовно.</p>
          <div style={{ border: "1px solid var(--border-soft)", borderRadius: 12, overflow: "hidden" }}>
            <CmpHead />
            <CmpRow f="Пише вашим голосом" us="✓" them="✗" />
            <CmpRow f="Перевірений 9-кроковий метод" us="✓" them="✗" alt />
            <CmpRow f="Агресивне форматування (ялинки)" us="✓" them="частково" />
            <CmpRow f="Реєстрація" us="не потрібна" them="обовʼязкова" alt />
            <CmpRow f="Ціна" us="0 ₴" them="$39–149/міс" price />
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="container narrow" style={{ padding: "16px 20px" }}>
        <div className="card" style={{ padding: "30px 28px" }}>
          <h2 className="h2" style={{ textAlign: "center", marginBottom: 20 }}>Для кого це</h2>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Persona t="Фаундери IT-агенцій" d="Будувати особистий бренд і ловити вхідні ліди." />
            <Persona t="Біздев і SDR" d="Гріти аудиторію контентом між дотиками." />
            <Persona t="B2B-маркетологи" d="Стабільний потік постів без вигорання." />
            <Persona t="Солопренери та консультанти" d="Експертний контент без копірайтера." />
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="container narrow" style={{ padding: "16px 20px" }}>
        <div className="card" style={{ padding: "30px 28px" }}>
          <h2 className="h2" style={{ textAlign: "center", marginBottom: 20 }}>Популярні юзкейси</h2>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <Persona t="Запуск бренду" d="Перші 30 постів, коли не знаєш, з чого почати." />
            <Persona t="Реанімація профілю" d="Повернутись до постингу без «що писати?»." />
            <Persona t="Контент під лід-ген" d="Пости, що гріють ICP між дотиками аутрічу." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container narrow" style={{ padding: "16px 20px" }}>
        <div className="card" style={{ padding: "30px 28px" }}>
          <h2 className="h2" style={{ textAlign: "center", marginBottom: 18 }}>Питання</h2>
          <Faq q="Це справді безкоштовно?" a="Так. Без оплати й без реєстрації. Є розумний денний ліміт, щоб тримати сервіс живим." />
          <Faq q="Пост звучатиме як я, а не як ШІ?" a="Так — дайте 1–2 свої пости або профіль LinkedIn, і ми підлаштуємось під ваш стиль. Вшито анти-ШІ і живе форматування." />
          <Faq q="Якою мовою пише?" a="Українською за замовчуванням. Можна й іншими." />
          <Faq q="Що буде з моїм email?" a="Лише щоб надіслати пост і, інколи, корисні матеріали. Без спаму, відписка в один клік." last />
        </div>
      </section>

      {/* Related tools */}
      <section className="container narrow" style={{ padding: "16px 20px" }}>
        <div className="card" style={{ padding: "30px 28px" }}>
          <h2 className="h2" style={{ textAlign: "center", marginBottom: 18, fontSize: 22 }}>Інші інструменти Victor Shulga</h2>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <RelTool t="Post Writer" s="Доступно" active />
            <RelTool t="Post Reviewer" s="Скоро" />
            <RelTool t="Infographic Generator" s="Скоро" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container narrow" style={{ padding: "16px 20px 48px" }}>
        <div style={{ background: "var(--ink)", borderRadius: 14, padding: "34px 28px", textAlign: "center" }}>
          <h2 className="h2" style={{ color: "#fff" }}>Хочете не пости, а систему лідогенерації?</h2>
          <p style={{ margin: "10px auto 20px", maxWidth: 440, color: "#B9B6B0", fontSize: 15 }}>
            Цей тул — частина методу. Розберемо вашу GTM-стратегію на дзвінку.
          </p>
          <a href="#" className="btn btn-primary">Book a call →</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border-soft)", background: "var(--surface)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", fontSize: 13, color: "var(--muted)", flexWrap: "wrap", gap: 10 }}>
          <span>© Victor Shulga</span>
          <span>Безкоштовний інструмент</span>
        </div>
      </footer>
    </>
  );
}

/* ---- small presentational helpers (server components) ---- */
function Stat({ n, l, coral }: { n: string; l: string; coral?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: coral ? "var(--coral)" : "var(--ink)" }}>{n}</div>
      <div style={{ fontSize: 12, color: "var(--muted)" }}>{l}</div>
    </div>
  );
}
function Divider() {
  return <div style={{ width: 1, height: 30, background: "var(--border)" }} />;
}
function Step({ n, t, d, dark }: { n: string; t: string; d: string; dark?: boolean }) {
  return (
    <div style={{ border: "1px solid var(--border-soft)", borderRadius: 12, padding: 20 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: dark ? "var(--ink)" : "var(--coral)", color: "#fff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{n}</div>
      <div style={{ fontWeight: 700, margin: "12px 0 4px", fontSize: 15 }}>{t}</div>
      <div style={{ fontSize: 13, color: "var(--grey)", lineHeight: 1.5 }}>{d}</div>
    </div>
  );
}
function Persona({ t, d }: { t: string; d: string }) {
  return (
    <div style={{ border: "1px solid var(--border-soft)", borderRadius: 11, padding: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{t}</div>
      <div style={{ fontSize: 13, color: "var(--grey)", marginTop: 4, lineHeight: 1.45 }}>{d}</div>
    </div>
  );
}
function RelTool({ t, s, active }: { t: string; s: string; active?: boolean }) {
  return (
    <div style={{ border: active ? "2px solid var(--coral)" : "1px solid var(--border-soft)", borderRadius: 12, padding: 18, background: active ? "var(--coral-wash)" : "#fff" }}>
      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{t}</div>
      <div style={{ fontSize: 12, fontWeight: 700, marginTop: 5, color: active ? "var(--coral)" : "var(--muted)" }}>{s}</div>
    </div>
  );
}
function Faq({ q, a, last }: { q: string; a: string; last?: boolean }) {
  return (
    <div style={{ padding: "15px 4px", borderBottom: last ? "none" : "1px solid var(--border-soft)" }}>
      <div style={{ fontWeight: 700, fontSize: 15 }}>{q}</div>
      <div style={{ fontSize: 13.5, color: "var(--grey)", marginTop: 8, lineHeight: 1.55 }}>{a}</div>
    </div>
  );
}
function CmpHead() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr" }}>
      <div style={{ padding: "13px 16px", background: "var(--surface-soft)" }} />
      <div style={{ padding: "13px 12px", fontSize: 13, fontWeight: 800, color: "#fff", background: "var(--coral)", textAlign: "center" }}>Victor Shulga · Free</div>
      <div style={{ padding: "13px 12px", fontSize: 13, fontWeight: 700, color: "var(--grey)", background: "var(--surface-soft)", textAlign: "center" }}>Платні тули</div>
    </div>
  );
}
function CmpRow({ f, us, them, alt, price }: { f: string; us: string; them: string; alt?: boolean; price?: boolean }) {
  const usColor = us === "✓" ? "var(--forest)" : price ? "var(--coral)" : "var(--ink)";
  const themColor = them === "✗" ? "#C9C2BA" : "var(--grey)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", borderTop: "1px solid var(--border-soft)", background: alt ? "var(--surface-soft)" : "#fff" }}>
      <div style={{ padding: "13px 16px", fontSize: 14, fontWeight: price ? 700 : 400 }}>{f}</div>
      <div style={{ padding: "13px 12px", textAlign: "center", color: usColor, fontWeight: us === "✓" ? 800 : 700, fontSize: us === "✓" || price ? 15 : 13 }}>{us}</div>
      <div style={{ padding: "13px 12px", textAlign: "center", color: themColor, fontWeight: them === "✗" ? 800 : 700, fontSize: 13 }}>{them}</div>
    </div>
  );
}
