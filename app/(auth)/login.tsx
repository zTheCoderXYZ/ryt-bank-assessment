import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, TextInput, View } from "react-native";

import { useLoginMutation } from "@/api/login.api";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { sharedStyles } from "@/styles/index.stylesheet";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const { t } = useTranslation();
  const [bioError, setBioError] = useState<string | null>(null);
  const [bioLoading, setBioLoading] = useState(false);
  const { mutateAsync: executeLogin } = useLoginMutation();

  const handleBiometricLogin = async () => {
    setBioError(null);
    setBioLoading(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        setBioError(t("login.errors.biometricsUnavailable"));
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t("login.biometrics.prompt"),
        fallbackLabel: t("login.biometrics.fallback"),
      });

      if (result.success) {
        await executeLogin(undefined, {
          onSuccess: () => {
            router.replace("/(main)");
          },
          onError: () => {
            setBioError(t("login.errors.failed"));
          },
        });
      } else {
        setBioError(t("login.errors.biometricFailed"));
      }
    } catch {
      setBioError(t("login.errors.biometricFailed"));
    } finally {
      setBioLoading(false);
    }
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <ThemedText style={{ fontSize: 48, fontWeight: "bold", lineHeight: 58 }}>
        {t("app.name")}
      </ThemedText>

      <ThemedText
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 48,
          lineHeight: 32,
        }}
      >
        {t("login.tagline")}
      </ThemedText>

      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "80%",
          marginTop: 48,
          paddingHorizontal: 8,
          borderRadius: 4,
          backgroundColor: "#1F2933",
          color: "white",
        }}
        placeholderTextColor={"white"}
        placeholder={t("login.usernamePlaceholder")}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "80%",
          marginTop: 12,
          paddingHorizontal: 8,
          borderRadius: 4,
          backgroundColor: "#1F2933",
          color: "white",
        }}
        placeholder={t("login.passwordPlaceholder")}
        placeholderTextColor={"white"}
        secureTextEntry
      />

      <ThemedView style={sharedStyles.bioButton}>
        <Pressable
          onPress={async () => {
            await executeLogin(undefined, {
              onSuccess: () => {
                router.replace("/(main)");
              },
              onError: () => {
                setBioError(t("login.errors.failed"));
              },
            });
          }}
          disabled={bioLoading}
          style={({ pressed }) => [
            sharedStyles.gradientButton,
            pressed && sharedStyles.gradientButtonPressed,
            bioLoading && sharedStyles.gradientButtonDisabled,
          ]}
        >
          <LinearGradient
            colors={["#1E40AF", "#2563EB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={sharedStyles.gradientFill}
          >
            <ThemedText style={sharedStyles.gradientButtonText}>
              {t("login.button")}
            </ThemedText>
          </LinearGradient>
        </Pressable>
      </ThemedView>

      <ThemedView style={sharedStyles.bioButton}>
        <Pressable
          onPress={handleBiometricLogin}
          disabled={bioLoading}
          style={({ pressed }) => [
            sharedStyles.gradientButton,
            pressed && sharedStyles.gradientButtonPressed,
            bioLoading && sharedStyles.gradientButtonDisabled,
          ]}
        >
          <LinearGradient
            colors={["#1E40AF", "#2563EB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={sharedStyles.gradientFill}
          >
            <ThemedText style={sharedStyles.gradientButtonText}>
              {t("login.biometrics.button")}
            </ThemedText>
          </LinearGradient>
        </Pressable>
      </ThemedView>
      <Modal
        animationType="fade"
        transparent
        visible={Boolean(bioError)}
        onRequestClose={() => setBioError(null)}
      >
        <View style={sharedStyles.modalBackdrop}>
          <ThemedView style={sharedStyles.modalCard}>
            <ThemedText type="defaultSemiBold" style={sharedStyles.modalTitle}>
              {t("login.biometrics.errorTitle")}
            </ThemedText>
            <ThemedText style={sharedStyles.errorText}>{bioError}</ThemedText>
            <View style={sharedStyles.modalActions}>
              <Pressable onPress={() => setBioError(null)}>
                <ThemedText type="defaultSemiBold">{t("common.cancel")}</ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
