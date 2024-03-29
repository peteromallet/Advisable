import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // For now just hard set the language to EN as there seems to be a bug in
    // i18n next that freezes the page if a resource is not found.
    lng: "en",
    fallbackLng: "en",
    ns: ["translation"],
    defaultNS: "translation",
    load: "languageOnly",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: function (value, format) {
        if (format === "lowercase") return value?.toLowerCase();
        if (format === "uppercase") return value?.toUpperCase();
        if (format === "capitalize") {
          return value.charAt(0)?.toUpperCase() + value.slice(1)?.toLowerCase();
        }
        return value;
      },
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      queryStringParams: { v: process.env.BUILD_TIME },
    },
  });

export default i18n;
