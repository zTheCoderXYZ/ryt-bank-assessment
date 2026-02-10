import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { useEffect } from "react";
import { Button, TextInput } from "react-native";
import { usePaymentFlow } from "./_layout";

export default function PaymentStep2() {
  const { amount, setAmount, setNote } = usePaymentFlow();

  useEffect(() => {
    setAmount("");
    setNote("");
  }, []);

  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", gap: 16 }}>
      <ThemedText>Amount</ThemedText>
      <TextInput
        style={{ color: "white" }}
        keyboardType="decimal-pad"
        placeholder="Enter amount"
        value={amount}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9.]/g, "");
          const parts = cleaned.split(".");
          let integerPart = parts[0] ?? "";
          let decimalPart = parts[1] ?? "";

          integerPart = integerPart.replace(/^0+(?=\d)/, "");
          if (
            integerPart === "" &&
            (parts.length > 1 || cleaned.startsWith("."))
          ) {
            integerPart = "0";
          }

          if (decimalPart.length > 2) {
            decimalPart = decimalPart.slice(0, 2);
          }

          const normalized =
            parts.length <= 1 ? integerPart : `${integerPart}.${decimalPart}`;
          setAmount(normalized);
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
