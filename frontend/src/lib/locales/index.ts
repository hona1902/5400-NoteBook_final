import { enUS } from './en-US';
import { viVN } from './vi-VN';

export const resources = {
  'en-US': { translation: enUS },
  'vi-VN': { translation: viVN },
} as const;

export type TranslationKeys = typeof enUS;

export type LanguageCode = 'en-US' | 'vi-VN';

export type Language = {
  code: LanguageCode;
  label: string;
};

export const languages: Language[] = [
  { code: 'vi-VN', label: 'Tiếng Việt' },
  { code: 'en-US', label: 'English' },
];

export { enUS, viVN };
