import LoadingOverlay from "@/components/loading-overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
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
