import { useBalanceQuery } from "@/api/balance.api";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { usePaymentStore } from "@/store/payment";
import { sharedStyles } from "@/styles/index.stylesheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, TextInput } from "react-native";
import { z } from "zod";

type FormValues = {
  amount: string;
  note?: string;
};

export default function PaymentStep2() {
  const { amount, setAmount, setNote } = usePaymentStore();
  const { data: balance = 0 } = useBalanceQuery();
  const schema = useMemo(
    () =>
      z.object({
        amount: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
          .refine((val) => {
            const num = Number.parseFloat(val || "0");
            return num > 0 && num <= balance - 10;
          }, "Insufficient balance (min RM10 remaining)"),
        note: z.string().max(100, "Note is too long").optional(),
      }),
    [balance],
  );
  const {
    control,
    watch,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: { amount: "", note: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({ amount: "", note: "" });
    setAmount("");
    setNote("");
  }, []);

  const watchedAmount = watch("amount");
  const watchedNote = watch("note");

  useEffect(() => {
    setAmount(watchedAmount || "");
    setNote(watchedNote || "");
  }, [watchedAmount, watchedNote, setAmount, setNote]);

  return (
    <ThemedView style={sharedStyles.container}>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
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
            value={value ? `RM ${value}` : ""}
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
                parts.length <= 1
                  ? integerPart
                  : `${integerPart}.${decimalPart}`;
              onChange(normalized);
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="note"
        render={({ field: { onChange, value } }) => (
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
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Pressable
        style={{
          backgroundColor: "#1D4ED8",
          borderRadius: 8,
          overflow: "hidden",
          marginTop: 48,
          opacity: isValid ? 1 : 0.6,
        }}
        onPress={() => {
          router.push("/payment/step3");
        }}
        disabled={!isValid}
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
