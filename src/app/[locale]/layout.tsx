import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {getMessages} from 'next-intl/server';
import {isRTL, type Locale} from '@/i18n';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Barbershop Booking',
  description: 'Online barbershop booking system'
};

export default async function LocaleLayout({
  children, params
}: {children: React.ReactNode; params: {locale: Locale}}) {
  const {locale} = params;
  let messages;
  try { messages = await getMessages(); } catch { notFound(); }
  return (
    <html lang={locale} dir={isRTL(locale) ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
