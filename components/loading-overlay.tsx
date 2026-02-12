import { ActivityIndicator, Modal, View } from "react-native";
import { useLoadingStore } from "@/store/loading";
import { sharedStyles } from "@/styles/index.stylesheet";

export default function LoadingOverlay() {
  const isLoading = useLoadingStore((state) => state.count > 0);

  if (!isLoading) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" visible>
      <View style={sharedStyles.loadingOverlayBackdrop}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}
