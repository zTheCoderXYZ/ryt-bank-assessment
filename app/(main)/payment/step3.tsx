import { useTransferMutation } from "@/api/transfer.api";
import { Button } from "@/components/ui/button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AUTH_FALLBACK_PIN } from "@/constants/auth";
import { usePaymentStore } from "@/store/payment";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, TextInput, View } from "react-native";

export default function PaymentStep3() {
  const { t } = useTranslation();
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
    <ThemedView style={styles.container}>
      <ThemedText
        style={{
          backgroundColor: "#1F2933",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          width: "80%",
        }}
      >
        {t("payment.receiverLabel")}: {receiver.name} ({receiver.accountNumber})
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
        {t("payment.amountLabel")}: {amount}
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
        {t("payment.noteLabel")}: {note}
      </ThemedText>
      <Button
        label={
          isConfirming ? t("payment.confirming") : t("payment.confirmPayment")
        }
        style={{
          backgroundColor: "green",
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
        <View style={styles.modalBackdrop}>
          <ThemedView style={styles.modalCard}>
            <ThemedText type="defaultSemiBold" style={styles.modalTitle}>
              {t("payment.enterPassword")}
            </ThemedText>
            <TextInput
              value={pin}
              onChangeText={setPin}
              placeholder={t("payment.passwordPlaceholder")}
              keyboardType="number-pad"
              secureTextEntry
              style={styles.input}
            />
            {pinError ? (
              <ThemedText style={styles.errorText}>{pinError}</ThemedText>
            ) : null}
            <View style={styles.modalActions}>
              <Button
                label={t("common.cancel")}
                textType="defaultSemiBold"
                onPress={() => setShowPinModal(false)}
              />
              <Button
                label={t("common.submit")}
                textType="defaultSemiBold"
                onPress={handlePinSubmit}
              />
            </View>
          </ThemedView>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 12,
    backgroundColor: "#0F172A",
    alignItems: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    padding: 20,
    borderRadius: 12,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "white",
  },
  errorText: {
    color: "#C62828",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
