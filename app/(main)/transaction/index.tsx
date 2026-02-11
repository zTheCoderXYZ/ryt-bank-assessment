import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { usePaymentStore } from "@/store/payment";
import { useTransactionsStore } from "@/store/transactions";
import { sharedStyles } from "@/styles/index.stylesheet";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function TransactionDetail() {
  const { transactions, selectedTransactionId } = useTransactionsStore();
  const { setReceiver, setAmount, setNote } = usePaymentStore();

  const transaction = transactions.find((t) => t.id === selectedTransactionId);

  if (!transaction) {
    return (
      <ThemedView style={sharedStyles.container}>
        <ThemedText>No transaction selected.</ThemedText>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <ThemedText style={styles.buttonText}>Go Back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={sharedStyles.container}>
      <ThemedText style={styles.title}>Transaction Details</ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText>Transaction ID: {transaction.id}</ThemedText>
        <ThemedText>
          Receiver: {transaction.receiver.name} (
          {transaction.receiver.accountNumber})
        </ThemedText>
        <ThemedText>
          Amount: RM {parseFloat(transaction.amount).toFixed(2)}
        </ThemedText>
        <ThemedText>Note: {transaction.note || "-"}</ThemedText>
        <ThemedText>Date: {transaction.date || "-"}</ThemedText>
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
        <ThemedText style={styles.buttonText}>Repeat Transfer</ThemedText>
      </Pressable>
    </ThemedView>
  );
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
