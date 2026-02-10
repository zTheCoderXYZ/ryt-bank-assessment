import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { Button } from "react-native";
import { usePaymentFlow } from "./_layout";

export default function PaymentStep3() {
  const { amount, note, receiver } = usePaymentFlow();

  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", gap: 16 }}>
      <ThemedText>Confirm Payment Details</ThemedText>
      <ThemedText>
        Receiver: {receiver?.name} ({receiver?.accountNumber})
      </ThemedText>
      <ThemedText>Amount: {amount}</ThemedText>
      <ThemedText>Note: {note}</ThemedText>
      <Button
        title="Confirm Payment"
        onPress={() => {
          router.push("/payment/step4");
        }}
      />
    </ThemedView>
  );
}
