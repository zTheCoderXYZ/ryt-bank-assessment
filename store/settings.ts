import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SettingsState {
  language: string;
  theme: string;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "english",
      theme: "dark",
      setLanguage: (language: string) => set(() => ({ language })),
      setTheme: (theme: string) => set(() => ({ theme })),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
