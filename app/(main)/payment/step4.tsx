import { Button } from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTransactionsStore } from "@/store/transactions";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function PaymentStep4() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  const defaultTextColor = { color: palette.text };
  const { transactions } = useTransactionsStore();
  const queryClient = useQueryClient();

  const latest = transactions[0];
  return (
    <View
      style={[sharedStyles.container, { backgroundColor: palette.screen }]}
    >
      <IconSymbol size={64} name="checkmark.circle.fill" color="#22C55E" />
      <Text
        style={{
          ...defaultTextColor,
          fontSize: 24,
          fontWeight: "bold",
          color: "#22C55E",
          marginTop: 16,
        }}
      >
        {t("payment.successTitle")}
      </Text>
      <Text
        style={{
          ...defaultTextColor,
          backgroundColor: palette.surfaceElevated,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
          marginTop: 24,
        }}
      >
        {t("payment.transactionIdLabel")}: {latest?.id}
      </Text>

      <Text
        style={{
          ...defaultTextColor,
          backgroundColor: palette.surfaceElevated,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.receiverLabel")}: {latest?.receiver?.name} (
        {latest?.receiver?.accountNumber})
      </Text>
      <Text
        style={{
          ...defaultTextColor,
          backgroundColor: palette.surfaceElevated,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.amountLabel")}: {latest?.amount}
      </Text>
      <Text
        style={{
          ...defaultTextColor,
          backgroundColor: palette.surfaceElevated,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.noteLabel")}: {latest?.note}
      </Text>

      <Button
        label={t("common.done")}
        style={[
          {
            backgroundColor: palette.primary,
            borderRadius: 8,
            overflow: "hidden",
            marginTop: 48,
            width: "80%",
          },
          sharedStyles.gradientFill,
        ]}
        onPress={() => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          queryClient.invalidateQueries({ queryKey: ["balance"] });
          router.dismissAll();
          router.replace("/(main)");
        }}
        textStyle={sharedStyles.gradientButtonText}
      />
    </View>
  );
}
