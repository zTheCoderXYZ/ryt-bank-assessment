import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { Button, TextInput } from "react-native";
import { usePaymentFlow } from "./_layout";

export default function PaymentStep2() {
  const { setAmount, setNote } = usePaymentFlow();
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", gap: 16 }}>
      <ThemedText>Amount</ThemedText>
      <TextInput
        style={{ color: "white" }}
        keyboardType="numeric"
        placeholder="Enter amount"
        onChange={(e) => {
          setAmount(e.nativeEvent.text);
        }}
      />
      <ThemedText>Notes</ThemedText>
      <TextInput
        style={{ color: "white" }}
        placeholder="Enter notes"
        onChange={(e) => {
          setNote(e.nativeEvent.text);
        }}
      />
      <Button
        title="Proceed to Confirmation"
        onPress={() => {
          router.push("/payment/step3");
        }}
      />
    </ThemedView>
  );
}
