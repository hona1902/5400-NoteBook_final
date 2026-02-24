import { vi, enUS, Locale } from 'date-fns/locale'

/**
 * Mapping of language codes to date-fns locales.
 * Add new languages here as needed.
 */
const LOCALE_MAP: Record<string, Locale> = {
  'vi-VN': vi,
  'en-US': enUS,
}

/**
 * Get the date-fns locale for a given language code.
 * Falls back to Vietnamese (vi-VN) if the language is not found.
 * 
 * @param language - The language code (e.g., 'vi-VN', 'en-US')
 * @returns The corresponding date-fns Locale object
 */
export function getDateLocale(language: string): Locale {
  return LOCALE_MAP[language] || vi
}
