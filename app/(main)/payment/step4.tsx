import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTransactionsStore } from "@/store/transactions";
import { sharedStyles } from "@/styles/index.stylesheet";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function PaymentStep4() {
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
        Payment Successful!
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
        Transaction ID: {latest?.id}
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
        Receiver: {latest?.receiver?.name} ({latest?.receiver?.accountNumber})
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
        Amount: {latest?.amount}
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
        Note: {latest?.note}
      </ThemedText>

      <Pressable
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
      >
        <LinearGradient
          colors={["#1E40AF", "#2563EB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={sharedStyles.gradientFill}
        >
          <ThemedText style={sharedStyles.gradientButtonText}>Done</ThemedText>
        </LinearGradient>
      </Pressable>
    </ThemedView>
  );
}
