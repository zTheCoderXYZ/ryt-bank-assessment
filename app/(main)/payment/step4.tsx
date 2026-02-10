import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { Button } from "react-native";
import { usePaymentFlow } from "./_layout";

export default function PaymentStep4() {
  const { receiver, amount, note } = usePaymentFlow();
  const transactionId =
    "TXN" +
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
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
      <ThemedText>Transaction ID: {transactionId}</ThemedText>
      <ThemedText>
        Receiver: {receiver?.name} ({receiver?.accountNumber})
      </ThemedText>
      <ThemedText>Amount: {amount}</ThemedText>
      <ThemedText>Note: {note}</ThemedText>

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
