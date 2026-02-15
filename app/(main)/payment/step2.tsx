import { useBalanceQuery } from "@/api/balance.api";
import ErrorModal from "@/components/error-modal";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { usePaymentStore } from "@/store/payment";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, TextInput, View } from "react-native";
import { z } from "zod";

type FormValues = {
  amount: string;
  note?: string;
};

export default function PaymentStep2() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  const { setAmount, setNote } = usePaymentStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: balance = 0, isError, error } = useBalanceQuery();
  const maxTransferAmount = (balance - 10).toFixed(2);
  const schema = useMemo(
    () =>
      z.object({
        amount: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, t("payment.errors.invalidAmount"))
          .refine((val) => {
            const num = Number.parseFloat(val || "0");
            return num > 0 && num <= balance - 10;
          }, t("payment.errors.insufficientBalance", { max: maxTransferAmount })),
        note: z.string().max(100, t("payment.errors.noteTooLong")).optional(),
      }),
    [balance, maxTransferAmount, t],
  );
  const {
    control,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: { amount: "", note: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({ amount: "", note: "" });
    setAmount("");
    setNote("");
  }, [reset, setAmount, setNote]);

  const watchedAmount = watch("amount");
  const watchedNote = watch("note");

  useEffect(() => {
    setAmount(watchedAmount || "");
    setNote(watchedNote || "");
  }, [watchedAmount, watchedNote, setAmount, setNote]);

  useEffect(() => {
    if (isError) {
      setErrorMessage(error?.message ?? t("common.errorTitle"));
    }
  }, [error, isError, t]);

  return (
    <View style={[sharedStyles.container, { backgroundColor: palette.screen }]}>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={{
                color: colorScheme === "dark" ? "white" : "#0F172A",
                backgroundColor: palette.surfaceElevated,
                width: "80%",
                fontSize: 40,
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
                fontWeight: "600",
              }}
              keyboardType="decimal-pad"
              placeholder={t("payment.enterAmount")}
              placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
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
            {errors.amount?.message ? (
              <Text
                style={[
                  sharedStyles.errorText,
                  { width: "80%", marginBottom: 12, fontSize: 14 },
                ]}
              >
                {errors.amount.message}
              </Text>
            ) : (
              <View style={{ marginBottom: 12 }} />
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="note"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={{
                color: colorScheme === "dark" ? "white" : "#0F172A",
                backgroundColor: palette.surfaceElevated,
                width: "80%",
                fontSize: 24,
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
              }}
              placeholder={t("payment.noteOptional")}
              placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
              value={value}
              onChangeText={onChange}
            />
            {errors.note?.message ? (
              <Text
                style={[
                  sharedStyles.errorText,
                  { width: "80%", marginBottom: 8, fontSize: 14 },
                ]}
              >
                {errors.note.message}
              </Text>
            ) : null}
          </>
        )}
      />

      <Button
        label={t("payment.proceedToConfirmation")}
        onPress={() => {
          router.push("/payment/step3");
        }}
        disabled={!isValid}
        disabledStyle={{ opacity: 0.6 }}
        style={[
          {
            backgroundColor: palette.primary,
            borderRadius: 8,
            overflow: "hidden",
            marginTop: 48,
          },
          sharedStyles.gradientFill,
        ]}
        textStyle={sharedStyles.gradientButtonText}
      />
      <ErrorModal
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </View>
  );
}
