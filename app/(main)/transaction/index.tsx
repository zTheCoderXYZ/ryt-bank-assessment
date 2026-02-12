import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { usePaymentStore } from "@/store/payment";
import { useTransactionsStore } from "@/store/transactions";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function TransactionDetail() {
  const { t, i18n } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  const defaultTextColor = { color: palette.text };
  const { transactions, selectedTransactionId } = useTransactionsStore();
  const { setReceiver, setAmount, setNote } = usePaymentStore();

  const transaction = transactions.find((t) => t.id === selectedTransactionId);

  if (!transaction) {
    return (
      <View
        style={[sharedStyles.container, { backgroundColor: palette.screen }]}
      >
        <Text style={defaultTextColor}>{t("transaction.noSelected")}</Text>
        <Button
          label={t("common.goBack")}
          onPress={() => router.back()}
          style={sharedStyles.transactionButton}
          textStyle={sharedStyles.transactionButtonText}
        />
      </View>
    );
  }

  return (
    <View
      style={[sharedStyles.container, { backgroundColor: palette.screen }]}
    >
      <Text style={[defaultTextColor, sharedStyles.transactionTitle]}>
        {t("transaction.title")}
      </Text>

      <View style={[sharedStyles.transactionCard, { backgroundColor: palette.surface }]}>
        <Text style={defaultTextColor}>
          {t("payment.transactionIdLabel")}: {transaction.id}
        </Text>
        <Text style={defaultTextColor}>
          {t("payment.receiverLabel")}: {transaction.receiver.name} (
          {transaction.receiver.accountNumber})
        </Text>
        <Text style={defaultTextColor}>
          {t("payment.amountLabel")}: RM {parseFloat(transaction.amount).toFixed(2)}
        </Text>
        <Text style={defaultTextColor}>{t("payment.noteLabel")}: {transaction.note || "-"}</Text>
        <Text style={defaultTextColor}>
          {t("transaction.dateLabel")}: {formatDateTime(transaction.date, i18n.language)}
        </Text>
      </View>

      <Button
        label={t("transaction.repeatTransfer")}
        style={sharedStyles.transactionButton}
        onPress={() => {
          setReceiver(transaction.receiver);
          setAmount(transaction.amount);
          setNote(transaction.note);
          router.push("/payment/step3");
        }}
        textStyle={sharedStyles.transactionButtonText}
      />
    </View>
  );
}

function formatDateTime(value?: string, locale = "en") {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString(locale === "bm" ? "ms-MY" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
