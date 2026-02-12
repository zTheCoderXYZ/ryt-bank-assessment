import { Stack, usePathname, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

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
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const step = pathname.split("/").pop() ?? "";
  const titleMap: Record<string, string> = {
    step1: t("payment.steps.step1"),
    step2: t("payment.steps.step2"),
    step3: t("payment.steps.step3"),
    step4: t("payment.steps.step4"),
  };
  const title = titleMap[step] ?? t("payment.title");

  return (
    <View style={styles.headerContainer}>
      <Button
        onPress={() => router.back()}
        style={styles.backButton}
        icon={<MaterialIcons name="arrow-back-ios" size={24} color="#E2E8F0" />}
      />
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
