import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { translations } from './translations';

const fallbackLng = 'en';
const rawDeviceLanguage = Localization.getLocales()[0]?.languageCode ?? fallbackLng;
const supportedLanguage = rawDeviceLanguage === "ms" ? "bm" : rawDeviceLanguage;
const deviceLanguage = ["en", "bm"].includes(supportedLanguage)
  ? supportedLanguage
  : fallbackLng;

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: translations,
  lng: deviceLanguage,
  fallbackLng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
