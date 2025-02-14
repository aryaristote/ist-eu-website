import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../locales/en/translation.json";
import translationRW from "../locales/rw/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  rw: {
    translation: translationRW,
  },
};

export const supportedLanguages = Object.keys(resources);

export const languageName = new Intl.DisplayNames(supportedLanguages, {
  type: "language",
});

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'en';
  }
  return 'rw';
};

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;