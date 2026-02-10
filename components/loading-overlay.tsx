import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { useLoadingStore } from "@/store/loading";

export default function LoadingOverlay() {
  const isLoading = useLoadingStore((state) => state.count > 0);

  if (!isLoading) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" visible>
      <View style={styles.backdrop}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
});
