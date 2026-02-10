import { Slot } from "expo-router";
import LoadingOverlay from "@/components/loading-overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <LoadingOverlay />
    </QueryClientProvider>
  );
}
