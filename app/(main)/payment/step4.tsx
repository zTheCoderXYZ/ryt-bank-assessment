import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTransactionsStore } from "@/store/transactions";
import { sharedStyles } from "@/styles/index.stylesheet";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function PaymentStep4() {
  const { t } = useTranslation();
  const { transactions } = useTransactionsStore();
  const queryClient = useQueryClient();

  const latest = transactions[0];
  return (
    <ThemedView style={sharedStyles.container}>
      <IconSymbol size={64} name="checkmark.circle.fill" color="#22C55E" />
      <ThemedText
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#22C55E",
          marginTop: 16,
        }}
      >
        {t("payment.successTitle")}
      </ThemedText>
      <ThemedText
        style={{
          backgroundColor: "#1F2933",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
          marginTop: 24,
        }}
      >
        {t("payment.transactionIdLabel")}: {latest?.id}
      </ThemedText>

      <ThemedText
        style={{
          backgroundColor: "#1F2933",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.receiverLabel")}: {latest?.receiver?.name} (
        {latest?.receiver?.accountNumber})
      </ThemedText>
      <ThemedText
        style={{
          backgroundColor: "#1F2933",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.amountLabel")}: {latest?.amount}
      </ThemedText>
      <ThemedText
        style={{
          backgroundColor: "#1F2933",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.noteLabel")}: {latest?.note}
      </ThemedText>

      <Button
        label={t("common.done")}
        style={{
          backgroundColor: "#1D4ED8",
          borderRadius: 8,
          overflow: "hidden",
          marginTop: 48,
          width: "80%",
        }}
        onPress={() => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          queryClient.invalidateQueries({ queryKey: ["balance"] });
          router.dismissAll();
          router.replace("/(main)");
        }}
        gradient
        contentStyle={sharedStyles.gradientFill}
        textStyle={sharedStyles.gradientButtonText}
      />
    </ThemedView>
  );
}
