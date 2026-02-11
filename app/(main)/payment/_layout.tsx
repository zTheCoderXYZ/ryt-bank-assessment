import { Stack, usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function PaymentModule() {
  return (
    <Stack
      screenOptions={{
        header: () => <PaymentHeader />,
      }}
    >
      <Stack.Screen name="step1" options={{ headerShown: false }} />
      <Stack.Screen name="step2" />
      <Stack.Screen name="step3" />
      <Stack.Screen name="step4" options={{ headerShown: false }} />
    </Stack>
  );
}

function PaymentHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const step = pathname.split("/").pop() ?? "";
  const titleMap: Record<string, string> = {
    step1: "Select Receiver",
    step2: "Enter Amount",
    step3: "Confirm",
    step4: "Success",
  };
  const title = titleMap[step] ?? "Payment";

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <MaterialIcons name="arrow-back-ios" size={24} color="#E2E8F0" />
      </Pressable>
      <ThemedText style={styles.headerTitle}>{title}</ThemedText>
      <View style={styles.rightSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#0F172A",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  rightSpacer: {
    width: 32,
  },
});
