'use client';
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="max-w-xl w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold">{t("home.headline")}</h1>
        <div className="flex items-center justify-center gap-3">
          <Link href="/fa/book" className="button"> {t("cta.book")} </Link>
        </div>
      </div>
    </main>
  );
}
