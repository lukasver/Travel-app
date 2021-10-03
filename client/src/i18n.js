import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import global_en from './translations/en/global.json';
import global_es from './translations/es/global.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'hl',
    },
    fallbackLng: 'en',
    nonExplicitSupportedLngs: true,
    debug: process.env.NODE_ENV === 'development' ? true : false,
    resources: {
      es: {
        global: global_es,
      },
      en: {
        global: global_en,
      },
    },
  });

export default i18n;
