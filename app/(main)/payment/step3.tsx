import { transfer } from "@/api/transfer.api";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { usePaymentFlow } from "./_layout";

const FALLBACK_PIN = "1234";

export default function PaymentStep3() {
  const { amount, note, receiver } = usePaymentFlow();
  const [isConfirming, setIsConfirming] = useState(false);

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
        try {
          const result = await transfer();

          if (!result) {
            // handle transfer failure
            return;
          }
          router.dismissAll();
          router.push("/payment/step4");
        } catch (error) {
          // handle transfer error
        }
      } else {
        setShowPinModal(true); // fallback to password on failure/cancel
      }
    } finally {
      setIsConfirming(false);
    }
  };

  const handlePinSubmit = async () => {
    if (pin === FALLBACK_PIN) {
      setPinError(null);
      setShowPinModal(false);
      setPin("");
      try {
        const result = await transfer();

        if (!result) {
          // handle transfer failure
          return;
        }
        router.dismissAll();
        router.push("/payment/step4");
      } catch (error) {
        // handle transfer error
      }
      return;
    }
    setPinError("Incorrect password. Please try again.");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Confirm Payment Details</ThemedText>
      <ThemedText>
        Receiver: {receiver?.name} ({receiver?.accountNumber})
      </ThemedText>
      <ThemedText>Amount: {amount}</ThemedText>
      <ThemedText>Note: {note}</ThemedText>
      <Button
        title={isConfirming ? "Confirming..." : "Confirm Payment"}
        onPress={handleConfirm}
        disabled={isConfirming}
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
    justifyContent: "center",
    gap: 16,
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
