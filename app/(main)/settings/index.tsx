import { useLogoutMutation } from "@/api/logout.api";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSettingsStore } from "@/store/settings";
import { sharedStyles } from "@/styles/index.stylesheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function SettingsPage() {
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
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
      </ThemedView>

      <ThemedText style={{ marginTop: 20, fontSize: 16 }}>Language</ThemedText>
      <Pressable
        style={[
          styles.optionButton,
          language === "english" && styles.optionButtonActive,
        ]}
        onPress={() => setLanguage("english")}
      >
        <ThemedText>English</ThemedText>
      </Pressable>
      <Pressable
        style={[
          styles.optionButton,
          language === "malay" && styles.optionButtonActive,
        ]}
        onPress={() => setLanguage("malay")}
      >
        <ThemedText>Malay</ThemedText>
      </Pressable>
      <ThemedText style={{ marginTop: 20, fontSize: 16 }}>Theme</ThemedText>
      <Pressable
        style={[
          styles.optionButton,
          theme === "light" && styles.optionButtonActive,
        ]}
        onPress={() => setTheme("light")}
      >
        <ThemedText>Light</ThemedText>
      </Pressable>
      <Pressable
        style={[
          styles.optionButton,
          theme === "dark" && styles.optionButtonActive,
        ]}
        onPress={() => setTheme("dark")}
      >
        <ThemedText>Dark</ThemedText>
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
        <ThemedText style={sharedStyles.gradientButtonText}>Logout</ThemedText>
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
