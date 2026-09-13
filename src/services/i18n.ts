import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import about from '../../public/locales/en/about.json';
import common from '../../public/locales/en/common.json';
import details from '../../public/locales/en/details.json';
import footer from '../../public/locales/en/footer.json';
import pages from '../../public/locales/en/pages.json';
import welcome from '../../public/locales/en/welcome.json';

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {
        en: { about, common, details, footer, pages, welcome },
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18next;
