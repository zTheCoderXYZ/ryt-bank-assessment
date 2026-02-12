import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { usePaymentStore } from "@/store/payment";
import { useTransactionsStore } from "@/store/transactions";
import { sharedStyles } from "@/styles/index.stylesheet";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";

export default function TransactionDetail() {
  const { t, i18n } = useTranslation();
  const { transactions, selectedTransactionId } = useTransactionsStore();
  const { setReceiver, setAmount, setNote } = usePaymentStore();

  const transaction = transactions.find((t) => t.id === selectedTransactionId);

  if (!transaction) {
    return (
      <ThemedView style={sharedStyles.container}>
        <ThemedText>{t("transaction.noSelected")}</ThemedText>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <ThemedText style={styles.buttonText}>{t("common.goBack")}</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={sharedStyles.container}>
      <ThemedText style={styles.title}>{t("transaction.title")}</ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText>
          {t("payment.transactionIdLabel")}: {transaction.id}
        </ThemedText>
        <ThemedText>
          {t("payment.receiverLabel")}: {transaction.receiver.name} (
          {transaction.receiver.accountNumber})
        </ThemedText>
        <ThemedText>
          {t("payment.amountLabel")}: RM {parseFloat(transaction.amount).toFixed(2)}
        </ThemedText>
        <ThemedText>{t("payment.noteLabel")}: {transaction.note || "-"}</ThemedText>
        <ThemedText>
          {t("transaction.dateLabel")}: {formatDateTime(transaction.date, i18n.language)}
        </ThemedText>
      </ThemedView>

      <Pressable
        style={styles.button}
        onPress={() => {
          setReceiver(transaction.receiver);
          setAmount(transaction.amount);
          setNote(transaction.note);
          router.push("/payment/step3");
        }}
      >
        <ThemedText style={styles.buttonText}>
          {t("transaction.repeatTransfer")}
        </ThemedText>
      </Pressable>
    </ThemedView>
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

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    width: "80%",
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
