import { useEffect } from 'react';
import i18n from 'i18next';

import { useTranslation } from 'react-i18next';

export function useLanguageHandler(language: 'en' | 'ar') {
  const { t } = useTranslation();
  const isArabic = language === 'ar';

  document.title = t('app-title');

  useEffect(() => {
    document.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, [isArabic, language]);
}
