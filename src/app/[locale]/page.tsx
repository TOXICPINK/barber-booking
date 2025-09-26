'use client';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const other = locale === 'fa' ? 'en' : 'fa';
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold">{t('home.headline')}</h1>
        <div className="flex justify-center gap-3">
          <Link href={`/${other}`} className="button">{other === 'fa' ? t('nav.lang.fa') : t('nav.lang.en')}</Link>
          <Link href={`/${locale}/book`} className="button">{t('cta.book')}</Link>
        </div>
      </div>
    </main>
  );
}
