import { useLogoutMutation } from "@/api/logout.api";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSettingsStore } from "@/store/settings";
import { sharedStyles } from "@/styles/index.stylesheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

export default function SettingsPage() {
  const { t } = useTranslation();
  const { language, setLanguage, theme, setTheme } = useSettingsStore();
  const { mutateAsync: executeLogout } = useLogoutMutation();
  return (
    <ThemedView style={sharedStyles.container}>
      <ThemedView
        style={{
          flexDirection: "row",
          backgroundColor: "#0F172A",
          alignItems: "center",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#1E293B",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <View style={styles.headerContainer}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#E2E8F0" />
          </Pressable>

          <View style={styles.rightSpacer} />
        </View>
        <ThemedText style={styles.headerTitle}>{t("settings.title")}</ThemedText>
      </ThemedView>

      <ThemedText style={{ marginTop: 20, fontSize: 16 }}>
        {t("settings.language")}
      </ThemedText>
      <Pressable
        style={[
          styles.optionButton,
          language === "en" && styles.optionButtonActive,
        ]}
        onPress={() => {
          setLanguage("en");
          void changeLanguage("en");
        }}
      >
        <ThemedText>{t("settings.english")}</ThemedText>
      </Pressable>
      <Pressable
        style={[
          styles.optionButton,
          language === "bm" && styles.optionButtonActive,
        ]}
        onPress={() => {
          setLanguage("bm");
          void changeLanguage("bm");
        }}
      >
        <ThemedText>{t("settings.malay")}</ThemedText>
      </Pressable>
      <ThemedText style={{ marginTop: 20, fontSize: 16 }}>
        {t("settings.theme")}
      </ThemedText>
      <Pressable
        style={[
          styles.optionButton,
          theme === "light" && styles.optionButtonActive,
        ]}
        onPress={() => setTheme("light")}
      >
        <ThemedText>{t("settings.light")}</ThemedText>
      </Pressable>
      <Pressable
        style={[
          styles.optionButton,
          theme === "dark" && styles.optionButtonActive,
        ]}
        onPress={() => setTheme("dark")}
      >
        <ThemedText>{t("settings.dark")}</ThemedText>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "red",
          padding: 12,
          alignItems: "center",
          borderRadius: 8,
          overflow: "hidden",
          marginTop: 60,
          width: "80%",
        }}
        onPress={async () => {
          await executeLogout(undefined, {
            onSuccess: () => {
              router.replace("/(auth)/login");
            },
          });
        }}
      >
        <ThemedText style={sharedStyles.gradientButtonText}>
          {t("logout.button")}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#0F172A",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  rightSpacer: {
    width: 32,
  },
  optionButton: {
    width: "80%",
    marginTop: 12,
    padding: 12,
    backgroundColor: "#1F2933",
    borderRadius: 8,
  },
  optionButtonActive: {
    backgroundColor: "#2563EB",
  },
});
