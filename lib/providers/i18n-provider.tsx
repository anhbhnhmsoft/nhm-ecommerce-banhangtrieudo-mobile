import en from "@/i18n/en.json";
import vi from "@/i18n/vi.json";
import { useApplicationStore } from "@/modules/app";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { ReactNode, useEffect } from "react";
import { initReactI18next } from "react-i18next";
import { _LanguageCode } from "../consts";
import { checkLanguage } from "../utils/check-language";
import { Storage } from "../storage";
import { _StorageKey } from "../storage/key";
const resources = {
  vi: { translation: vi },
  en: { translation: en },
};

// Initialize i18n outside of React component
let i18nInitialized = false;

export const setupI18n = async () => {
  if (i18nInitialized) {
    return;
  }

  const setLanguage = useApplicationStore.getState().setLanguage;

  // Get saved language from storage
  let savedLanguage = await Storage.getItem<_LanguageCode>(
    _StorageKey.LANGUAGE,
  );

  // Get device language if not saved
  const deviceLang = getLocales()[0].languageCode as _LanguageCode | null;

  // If language not saved or invalid, set default
  if (!savedLanguage || !checkLanguage(savedLanguage)) {
    switch (deviceLang) {
      case _LanguageCode.EN:
      case _LanguageCode.VI:
        savedLanguage = deviceLang;
        break;
      default:
        savedLanguage = _LanguageCode.VI;
        break;
    }
  }

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      compatibilityJSON: "v4",
      resources,
      lng: savedLanguage,
      fallbackLng: _LanguageCode.VI,
      interpolation: { escapeValue: false },
    });
  }

  // Set to store
  await setLanguage(savedLanguage);
  i18nInitialized = true;
};
