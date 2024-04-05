import appConfig from "@/configs/app.config";
import en from "./lang/en.json";
import he from "./lang/he.json";
import it from "./lang/it.json";
import sp from "./lang/sp.json";
import de from "./lang/de.json";
import ar from "./lang/ar.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

type TranslationResource = {
  translation: typeof en;
  direction: "ltr" | "rtl";
};

type Resources = {
  [language: string]: TranslationResource;
};

const resources: Resources = {
  en: {
    translation: en,
    direction: "ltr",
  },
  he: {
    translation: he,
    direction: "rtl",
  },
  it: {
    translation: it,
    direction: "ltr",
  },
  sp: {
    translation: sp,
    direction: "ltr",
  },
  de: {
    translation: de,
    direction: "ltr",
  },
  ar: {
    translation: ar,
    direction: "rtl",
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: appConfig.locale,
  lng: localStorage.getItem("i18nextLng") || appConfig.locale,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
