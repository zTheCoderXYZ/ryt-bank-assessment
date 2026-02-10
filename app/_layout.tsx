import { Slot } from "expo-router";
import LoadingOverlay from "@/components/loading-overlay";

export default function RootLayout() {
  return (
    <>
      <Slot />
      <LoadingOverlay />
    </>
  );
}
