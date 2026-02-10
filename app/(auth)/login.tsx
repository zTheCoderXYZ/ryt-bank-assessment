import { Image } from "expo-image";
import * as LocalAuthentication from "expo-local-authentication";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, Pressable, StyleSheet, View } from "react-native";

import { login } from "@/api/login.api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";

export default function LoginPage() {
  const { t } = useTranslation();
  const [bioError, setBioError] = useState<string | null>(null);
  const [bioLoading, setBioLoading] = useState(false);

  const handleBiometricLogin = async () => {
    setBioError(null);
    setBioLoading(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        setBioError("Biometrics not available on this device.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Log in with biometrics",
        fallbackLabel: "Use passcode",
      });

      if (result.success) {
        const success = login();
        if (success) {
          router.replace("/(main)");
        }
      } else {
        setBioError("Authentication cancelled.");
      }
    } catch (error) {
      setBioError("Biometric authentication failed.");
    } finally {
      setBioLoading(false);
    }
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
        <Button
          title={t("login.button")}
          onPress={() => {
            const success = login();
            if (success) {
              router.replace("/(main)");
            }
          }}
        />
        <ThemedView style={styles.bioButton}>
          <Button
            title={bioLoading ? "Checking..." : "Login with Biometrics"}
            onPress={handleBiometricLogin}
            disabled={bioLoading}
          />
        </ThemedView>
        <Modal
          animationType="fade"
          transparent
          visible={Boolean(bioError)}
          onRequestClose={() => setBioError(null)}
        >
          <View style={styles.modalBackdrop}>
            <ThemedView style={styles.modalCard}>
              <ThemedText type="defaultSemiBold" style={styles.modalTitle}>
                Biometric Login
              </ThemedText>
              <ThemedText style={styles.modalMessage}>{bioError}</ThemedText>
              <Pressable onPress={() => setBioError(null)}>
                <ThemedText type="defaultSemiBold">OK</ThemedText>
              </Pressable>
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
  modalMessage: {
    fontSize: 14,
  },
});
