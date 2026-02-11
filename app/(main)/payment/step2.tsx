import { useBalanceQuery } from "@/api/balance.api";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { usePaymentStore } from "@/store/payment";
import { sharedStyles } from "@/styles/index.stylesheet";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { Pressable, TextInput } from "react-native";

export default function PaymentStep2() {
  const { amount, setAmount, setNote } = usePaymentStore();
  const { data: balance = 0 } = useBalanceQuery();

  useEffect(() => {
    setAmount("");
    setNote("");
  }, []);

  const numericAmount = useMemo(() => Number.parseFloat(amount || "0"), [amount]);
  const canProceed = useMemo(
    () => numericAmount > 0 && numericAmount <= balance - 10,
    [numericAmount, balance],
  );

  return (
    <ThemedView style={sharedStyles.container}>
      <TextInput
        style={{
          color: "white",
          backgroundColor: "#1F2933",
          width: "80%",
          fontSize: 40,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          fontWeight: "600",
        }}
        keyboardType="decimal-pad"
        placeholder="Enter amount"
        value={"RM " + amount}
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

      <TextInput
        style={{
          color: "white",
          backgroundColor: "#1F2933",
          width: "80%",
          fontSize: 24,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
        placeholder="Add a Note (optional)"
        onChange={(e) => {
          setNote(e.nativeEvent.text);
        }}
      />

      <Pressable
        style={{
          backgroundColor: "#1D4ED8",
          borderRadius: 8,
          overflow: "hidden",
          marginTop: 48,
          opacity: canProceed ? 1 : 0.6,
        }}
        onPress={() => {
          router.push("/payment/step3");
        }}
        disabled={!canProceed}
      >
        <LinearGradient
          colors={["#1E40AF", "#2563EB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={sharedStyles.gradientFill}
        >
          <ThemedText style={sharedStyles.gradientButtonText}>
            Proceed to Confirmation
          </ThemedText>
        </LinearGradient>
      </Pressable>
    </ThemedView>
  );
}
