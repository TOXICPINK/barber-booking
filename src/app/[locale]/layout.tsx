import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { isRTL, type Locale } from "@/i18n";
import "../globals.css";

export const metadata: Metadata = {
  title: "نوبت‌دهی آرایشگاه",
  description: "سیستم رزرو آنلاین برای آرایشگاه",
};

/** ✅ به Next.js بگو کدام localeها را از قبل بسازد */
export function generateStaticParams() {
  return [{ locale: "fa" }, { locale: "en" }];
}
export const dynamicParams = false; // ← اضافه شود

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  // ✅ در Next.js 15 پارامتر params یک Promise است
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params; // ← await ضروری است

  let messages;
  try {
    messages = await getMessages();
  } catch {
    notFound();
  }

  return (
    <html lang={locale} dir={isRTL(locale) ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
