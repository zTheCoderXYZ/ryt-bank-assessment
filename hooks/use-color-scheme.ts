import { useSettingsStore } from "@/store/settings";

export function useColorScheme() {
  const selectedTheme = useSettingsStore((state) => state.theme);

  if (selectedTheme === "light" || selectedTheme === "dark") {
    return selectedTheme;
  }
}
