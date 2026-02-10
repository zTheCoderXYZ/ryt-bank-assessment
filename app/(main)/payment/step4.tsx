import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTransactionsStore } from "@/store/transactions";
import { router } from "expo-router";
import { Button } from "react-native";

export default function PaymentStep4() {
  const { transactions } = useTransactionsStore();

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        padding: 16,
      }}
    >
      <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
        Payment Successful!
      </ThemedText>
      <ThemedText>
        Transaction ID: {transactions[transactions.length - 1]?.id}
      </ThemedText>
      <ThemedText>
        Receiver: {transactions[transactions.length - 1]?.receiver?.name} (
        {transactions[transactions.length - 1]?.receiver?.accountNumber})
      </ThemedText>
      <ThemedText>
        Amount: {transactions[transactions.length - 1]?.amount}
      </ThemedText>
      <ThemedText>
        Note: {transactions[transactions.length - 1]?.note}
      </ThemedText>

      <Button
        title="Done"
        onPress={() => {
          router.dismissAll();
          router.replace("/(main)");
        }}
      />
    </ThemedView>
  );
}
