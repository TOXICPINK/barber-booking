export const locales = ['fa', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fa';

export function isRTL(locale: Locale) {
  return locale === 'fa';
}
