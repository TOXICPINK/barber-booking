import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { isRTL, type Locale } from "@/i18n";
import "../globals.css";

export const metadata: Metadata = {
  title: "نوبت‌دهی آرایشگاه",
  description: "سیستم رزرو آنلاین برای آرایشگاه",
};

// فقط فارسی را به صورت استاتیک می‌سازیم
export function generateStaticParams() {
  return [{ locale: "fa" }];
}
export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;

  // ✅ پیام‌ها را مستقیم از فایل JSON بارگذاری می‌کنیم
  let messages: Record<string, string>;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
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
