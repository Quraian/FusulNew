import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from './locales/translation.json';
import translationAr from './locales/translation-ar.json';

const resources = {
  en: {
    translation,
  },
  ar: {
    translation: translationAr,
  },
};

export async function setupI18n(language = 'ar') {
  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: language, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
      // if you're using a language detector, do not define the lng option
      fallbackLng: language,
      debug: false,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
  i18n.services.formatter?.add('indian', (value, _lng, _options) => {
    if (typeof value === 'number' || typeof value === 'bigint') {
      return new Intl.NumberFormat('ar-SA').format(value);
    }

    return String(value);
  });
}
