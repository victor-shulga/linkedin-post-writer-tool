import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "LinkedIn Post Writer — безкоштовний інструмент | Victor Shulga",
  description:
    "Ідея → готовий LinkedIn-пост у вашому голосі за 20 секунд. Перевірений 9-кроковий метод. Без реєстрації.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
