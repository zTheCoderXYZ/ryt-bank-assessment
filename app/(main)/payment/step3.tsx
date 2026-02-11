import { useTransferMutation } from "@/api/transfer.api";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AUTH_FALLBACK_PIN } from "@/constants/auth";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";
import { usePaymentStore } from "@/store/payment";

export default function PaymentStep3() {
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
        promptMessage: "Confirm payment",
        fallbackLabel: "Use passcode",
      });

      if (result.success) {
        await executeTransfer(
          { receiver, amount, note },
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
        { receiver, amount, note },
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
    setPinError("Incorrect password. Please try again.");
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
        Receiver: {receiver.name} ({receiver.accountNumber})
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
        Amount: {amount}
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
        Note: {note}
      </ThemedText>
      <Pressable
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
      >
        <ThemedText
          style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
        >
          {isConfirming ? "Confirming..." : "Confirm Payment"}
        </ThemedText>
      </Pressable>
      <Modal
        animationType="fade"
        transparent
        visible={showPinModal}
        onRequestClose={() => setShowPinModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <ThemedView style={styles.modalCard}>
            <ThemedText type="defaultSemiBold" style={styles.modalTitle}>
              Enter Password
            </ThemedText>
            <TextInput
              value={pin}
              onChangeText={setPin}
              placeholder="1234"
              keyboardType="number-pad"
              secureTextEntry
              style={styles.input}
            />
            {pinError ? (
              <ThemedText style={styles.errorText}>{pinError}</ThemedText>
            ) : null}
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowPinModal(false)}>
                <ThemedText type="defaultSemiBold">Cancel</ThemedText>
              </Pressable>
              <Pressable onPress={handlePinSubmit}>
                <ThemedText type="defaultSemiBold">Submit</ThemedText>
              </Pressable>
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
