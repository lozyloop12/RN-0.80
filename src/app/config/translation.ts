import { Translator } from '@src/core';
import en from '../../assets/i18n/en.json';
import fr from '../../assets/i18n/fr.json';

export const i18n = Translator.setup({
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
  compatibilityJSON: 'v4',
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});
