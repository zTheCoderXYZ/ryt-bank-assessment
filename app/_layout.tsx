import LoadingOverlay from "@/components/loading-overlay";
import "@/i18n";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSettingsStore } from "@/store/settings";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { changeLanguage } from "i18next";
import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const language = useSettingsStore((state) => state.language);
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <View
        style={[sharedStyles.rootLayoutRoot, { backgroundColor: palette.screen }]}
      >
        <Slot />
        <LoadingOverlay />
        <StatusBar backgroundColor={palette.screen} />
      </View>
    </QueryClientProvider>
  );
}
