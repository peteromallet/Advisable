import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  ns: ["translation"],
  defaultNS: "translation",
  // debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {},
  },
});

export default i18n;
