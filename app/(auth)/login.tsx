import { Image } from "expo-image";
import * as LocalAuthentication from "expo-local-authentication";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { useLoginMutation } from "@/api/login.api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AUTH_FALLBACK_PIN } from "@/constants/auth";
import { router } from "expo-router";

export default function LoginPage() {
  const { t } = useTranslation();
  const [bioError, setBioError] = useState<string | null>(null);
  const [bioLoading, setBioLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const { mutateAsync: executeLogin } = useLoginMutation();

  const handleBiometricLogin = async () => {
    setBioError(null);
    setBioLoading(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        setShowPinModal(true);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Log in with biometrics",
        fallbackLabel: "Use passcode",
      });

      if (result.success) {
        await executeLogin(undefined, {
          onSuccess: () => {
            router.replace("/(main)");
          },
          onError: () => {
            setBioError("Login failed.");
          },
        });
      } else {
        setShowPinModal(true);
      }
    } catch (error) {
      setBioError("Biometric authentication failed.");
      setShowPinModal(true);
    } finally {
      setBioLoading(false);
    }
  };

  const handlePinSubmit = async () => {
    if (pin === AUTH_FALLBACK_PIN) {
      setPinError(null);
      setShowPinModal(false);
      setPin("");
      await executeLogin(undefined, {
        onSuccess: () => {
          router.replace("/(main)");
        },
        onError: () => {
          setPinError("Login failed.");
        },
      });
      return;
    }

    setPinError("Incorrect password. Please try again.");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {t("login.welcome")}
        </ThemedText>

        <ThemedView style={styles.bioButton}>
          <Button
            title={bioLoading ? "Checking..." : t("login.button")}
            onPress={handleBiometricLogin}
            disabled={bioLoading}
          />
        </ThemedView>
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  bioButton: {
    marginTop: 12,
  },
  bioError: {
    marginTop: 8,
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
