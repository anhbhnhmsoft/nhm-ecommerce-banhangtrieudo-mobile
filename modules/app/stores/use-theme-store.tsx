import { create } from "zustand";

type ThemeColors = {
  primary: {
    1: string;
    2: string;
    3: string;
  };
  secondary: {
    1: string;
    2: string;
    3: string;
    4: string;
  };
  base: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
};

interface ThemeStore {
  colors: ThemeColors;
  setTheme: (theme: ThemeColors) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  colors: {
    primary: {
      1: "#F8F7F6", // light background
      2: "#D4AF37", // brand color
      3: "#F4EFE2", // soft background
    },
    secondary: {
      1: "#E7000B",
      2: "#2B7FFF",
      3: "#FF6900",
      4: "#00A63E",
    },
    base: {
      1: "#FFFFFF",
      2: "#000000",
      3: "#C8C8C8",
      4: "#F5F5F5",
      5: "#A1A1A1",
    },
  },

  setTheme: (theme) =>
    set({
      colors: theme,
    }),
}));
