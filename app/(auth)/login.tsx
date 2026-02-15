import * as LocalAuthentication from "expo-local-authentication";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, View } from "react-native";

import { useLoginMutation } from "@/api/login.api";
import ErrorModal from "@/components/error-modal";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  const defaultTextColor = { color: palette.text };
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bioLoading, setBioLoading] = useState(false);
  const { mutateAsync: executeLogin } = useLoginMutation();

  const handleBiometricLogin = async () => {
    setErrorMessage(null);
    setBioLoading(true);
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        setErrorMessage(t("login.errors.biometricsUnavailable"));
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t("login.biometrics.prompt"),
        fallbackLabel: t("login.biometrics.fallback"),
      });

      if (result.success) {
        try {
          await executeLogin(undefined, {
            onSuccess: () => {
              router.replace("/(main)");
            },
            onError: (error) => {
              setErrorMessage(error.message);
            },
          });
        } catch (error) {
          console.error("Login mutation failed:", error);
        }
      } else {
        setErrorMessage(t("login.errors.biometricFailed"));
      }
    } catch (error) {
      console.error("Biometric login failed:", error);
      setErrorMessage(t("login.errors.biometricFailed"));
    } finally {
      setBioLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[sharedStyles.container, { backgroundColor: palette.screen }]}
    >
      <Text
        style={[
          defaultTextColor,
          { fontSize: 48, fontWeight: "bold", lineHeight: 58 },
        ]}
      >
        {t("app.name")}
      </Text>

      <Text
        style={{
          ...defaultTextColor,
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 48,
          lineHeight: 32,
          textAlign: "center",
          padding: 8,
        }}
      >
        {t("login.tagline")}
      </Text>

      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "80%",
          marginTop: 48,
          paddingHorizontal: 8,
          borderRadius: 4,
          backgroundColor: palette.surfaceElevated,
          color: colorScheme === "dark" ? "white" : "#0F172A",
        }}
        placeholderTextColor={colorScheme === "dark" ? "white" : "#475569"}
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
          backgroundColor: palette.surfaceElevated,
          color: colorScheme === "dark" ? "white" : "#0F172A",
        }}
        placeholder={t("login.passwordPlaceholder")}
        placeholderTextColor={colorScheme === "dark" ? "white" : "#475569"}
        secureTextEntry
      />

      <View style={sharedStyles.bioButton}>
        <Button
          label={t("login.button")}
          onPress={async () => {
            try {
              await executeLogin(undefined, {
                onSuccess: () => {
                  router.replace("/(main)");
                },
                onError: (error) => {
                  setErrorMessage(error.message);
                },
              });
            } catch (error) {
              console.error("Login mutation failed:", error);
            }
          }}
          disabled={bioLoading}
          style={[
            sharedStyles.gradientButton,
            sharedStyles.gradientFill,
            { backgroundColor: palette.primary },
          ]}
          pressedStyle={sharedStyles.gradientButtonPressed}
          disabledStyle={sharedStyles.gradientButtonDisabled}
          textStyle={sharedStyles.gradientButtonText}
        />
      </View>

      <View style={sharedStyles.bioButton}>
        <Button
          label={t("login.biometrics.button")}
          onPress={handleBiometricLogin}
          disabled={bioLoading}
          style={[
            sharedStyles.gradientButton,
            sharedStyles.gradientFill,
            { backgroundColor: palette.primary },
          ]}
          pressedStyle={sharedStyles.gradientButtonPressed}
          disabledStyle={sharedStyles.gradientButtonDisabled}
          textStyle={sharedStyles.gradientButtonText}
        />
      </View>
      <ErrorModal
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </SafeAreaView>
  );
}
