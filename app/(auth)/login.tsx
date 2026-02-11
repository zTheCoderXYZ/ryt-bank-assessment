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
        setBioError("Biometrics not available on this device.");
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
        setBioError("Biometric authentication failed. Please login normally.");
      }
    } catch (error) {
      setBioError("Biometric authentication failed. Please login normally.");
    } finally {
      setBioLoading(false);
    }
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <ThemedText style={{ fontSize: 48, fontWeight: "bold", lineHeight: 58 }}>
        MyBank
      </ThemedText>

      <ThemedText
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 48,
          lineHeight: 32,
        }}
      >
        Secure banking made simple
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
        placeholder="Username"
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
        placeholder="Password"
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
                setBioError("Login failed.");
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
              {"Login with Biometrics"}
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
              Biometric Error
            </ThemedText>
            <ThemedText style={sharedStyles.errorText}>{bioError}</ThemedText>
            <View style={sharedStyles.modalActions}>
              <Pressable onPress={() => setBioError(null)}>
                <ThemedText type="defaultSemiBold">Cancel</ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
