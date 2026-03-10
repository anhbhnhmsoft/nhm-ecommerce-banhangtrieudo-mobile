import { _LanguageCode } from "@/lib/consts";
import { Storage } from "@/lib/storage";
import { _StorageKey } from "@/lib/storage/key";
import i18n from "i18next";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface IApplicationStore {
  language: _LanguageCode;
  loading: boolean;
  // functions
  setLanguage: (lang: _LanguageCode) => Promise<void>;
  hydrateLanguage: () => Promise<void>;
  setLoading: (state: boolean) => void;
}

export const useApplicationStore = create<IApplicationStore>()(
  devtools(
    (set) => ({
      language: _LanguageCode.VI,
      loading: false,

      location: null,
      location_permission: null,

      // functions
      setLanguage: async (lang) => {
        try {
          await Storage.setItem(_StorageKey.LANGUAGE, lang);
          await i18n.changeLanguage(lang);

          set({ language: lang }, false, "app/setLanguage");
        } catch {
          // do nothing
        }
      },

      hydrateLanguage: async () => {
        try {
          let lang = await Storage.getItem<_LanguageCode>(_StorageKey.LANGUAGE);
          if (lang !== _LanguageCode.EN && lang !== _LanguageCode.VI) {
            lang = _LanguageCode.VI;
          }
          await i18n.changeLanguage(lang);
          set({ language: lang }, false, "app/hydrateLanguage");
        } catch {
          // do nothing
        }
      },

      setLoading: (state: boolean) => {
        set({ loading: state }, false, "app/setLoading");
      },
    }),
    {
      name: "ApplicationStore", // Tên hiển thị trong Redux DevTools
      enabled: __DEV__, // Chỉ bật khi dev
    },
  ),
);
