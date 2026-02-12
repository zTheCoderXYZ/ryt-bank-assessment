import { useTransferMutation } from "@/api/transfer.api";
import { Button } from "@/components/ui/button";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { AUTH_FALLBACK_PIN } from "@/constants/auth";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { usePaymentStore } from "@/store/payment";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TextInput, View } from "react-native";

export default function PaymentStep3() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  const defaultTextColor = { color: palette.text };
  const { amount, note, receiver, reset } = usePaymentStore();
  const [isConfirming, setIsConfirming] = useState(false);
  const { mutateAsync: executeTransfer } = useTransferMutation();

  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        // show PIN modal fallback
        setShowPinModal(true);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t("payment.confirmPrompt"),
        fallbackLabel: t("payment.fallbackLabel"),
      });

      if (result.success) {
        const currentDate = new Date().toISOString();
        await executeTransfer(
          { receiver, amount, note, date: currentDate },
          {
            onSuccess: () => {
              reset();
              router.dismissAll();
              router.push("/payment/step4");
            },
          },
        );
      } else {
        setShowPinModal(true); // fallback to password on failure/cancel
      }
    } finally {
      setIsConfirming(false);
    }
  };

  const handlePinSubmit = async () => {
    if (pin === AUTH_FALLBACK_PIN) {
      setPinError(null);
      setShowPinModal(false);
      setPin("");
      await executeTransfer(
        { receiver, amount, note, date: new Date().toISOString() },
        {
          onSuccess: () => {
            reset();
            router.dismissAll();
            router.push("/payment/step4");
          },
        },
      );
      return;
    }
    setPinError(t("payment.errors.incorrectPassword"));
  };

  return (
    <View
      style={[sharedStyles.paymentStep3Container, { backgroundColor: palette.screen }]}
    >
      <Text
        style={{
          ...defaultTextColor,
          backgroundColor: palette.surfaceElevated,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.receiverLabel")}: {receiver.name} ({receiver.accountNumber})
      </Text>
      <Text
        style={{
          ...defaultTextColor,
          backgroundColor: palette.surfaceElevated,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.amountLabel")}: {amount}
      </Text>
      <Text
        style={{
          ...defaultTextColor,
          backgroundColor: palette.surfaceElevated,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.noteLabel")}: {note}
      </Text>
      <Button
        label={
          isConfirming ? t("payment.confirming") : t("payment.confirmPayment")
        }
        style={{
          backgroundColor: palette.primary,
          padding: 12,
          borderRadius: 8,
          width: "80%",
          alignItems: "center",
          marginTop: 36,
        }}
        onPress={handleConfirm}
        disabled={isConfirming}
        textStyle={{ color: "white", fontWeight: "bold", fontSize: 18 }}
      />
      <Modal
        animationType="fade"
        transparent
        visible={showPinModal}
        onRequestClose={() => setShowPinModal(false)}
      >
        <View style={sharedStyles.modalBackdrop}>
          <View style={sharedStyles.modalCard}>
            <Text
              style={[
                defaultTextColor,
                sharedStyles.modalTitle,
                sharedStyles.paymentStep3SemiBoldText,
              ]}
            >
              {t("payment.enterPassword")}
            </Text>
            <TextInput
              value={pin}
              onChangeText={setPin}
              placeholder={t("payment.passwordPlaceholder")}
              keyboardType="number-pad"
              secureTextEntry
              style={[
                sharedStyles.input,
                { color: colorScheme === "dark" ? "white" : "#0F172A" },
              ]}
            />
            {pinError ? (
              <Text style={sharedStyles.errorText}>{pinError}</Text>
            ) : null}
            <View style={sharedStyles.modalActions}>
              <Button
                label={t("common.cancel")}
                textStyle={{ fontWeight: "600" }}
                onPress={() => setShowPinModal(false)}
              />
              <Button
                label={t("common.submit")}
                textStyle={{ fontWeight: "600" }}
                onPress={handlePinSubmit}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
