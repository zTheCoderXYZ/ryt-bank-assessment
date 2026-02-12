import LoadingOverlay from "@/components/loading-overlay";
import { useSettingsStore } from "@/store/settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { changeLanguage } from "i18next";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import "@/i18n";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const language = useSettingsStore((state) => state.language);

  useEffect(() => {
    void changeLanguage(language);
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.root}>
        <Slot />
        <LoadingOverlay />
        <StatusBar backgroundColor="#0F172A" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
});
