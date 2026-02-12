import { useLogoutMutation } from "@/api/logout.api";
import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSettingsStore } from "@/store/settings";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function SettingsPage() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  const defaultTextColor = { color: palette.text };
  const { language, setLanguage, theme, setTheme } = useSettingsStore();
  const { mutateAsync: executeLogout } = useLogoutMutation();
  return (
    <View style={[sharedStyles.container, { backgroundColor: palette.screen }]}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: palette.screen,
          alignItems: "center",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: palette.border,
          width: "100%",
        }}
      >
        <View style={sharedStyles.settingsHeaderContainer}>
          <Button
            onPress={() => router.back()}
            style={sharedStyles.settingsBackButton}
            icon={
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={palette.iconOnHeader}
              />
            }
          />

          <View style={sharedStyles.settingsRightSpacer} />
        </View>
        <Text style={[defaultTextColor, sharedStyles.settingsHeaderTitle]}>
          {t("settings.title")}
        </Text>
      </View>

      <Text
        style={[
          defaultTextColor,
          { marginTop: 20, fontSize: 16, fontWeight: "700" },
        ]}
      >
        {t("settings.language")}
      </Text>
      <Button
        label={t("settings.english")}
        style={[
          sharedStyles.settingsOptionButton,
          { backgroundColor: palette.surfaceElevated },
          language === "en" && sharedStyles.settingsOptionButtonActive,
        ]}
        textStyle={{ fontWeight: "500" }}
        onPress={() => {
          setLanguage("en");
          changeLanguage("en");
        }}
      />
      <Button
        label={t("settings.malay")}
        style={[
          sharedStyles.settingsOptionButton,
          { backgroundColor: palette.surfaceElevated },
          language === "bm" && sharedStyles.settingsOptionButtonActive,
        ]}
        textStyle={{ fontWeight: "500" }}
        onPress={() => {
          setLanguage("bm");
          changeLanguage("bm");
        }}
      />
      <Text
        style={[
          defaultTextColor,
          { marginTop: 20, fontSize: 16, fontWeight: "700" },
        ]}
      >
        {t("settings.theme")}
      </Text>
      <Button
        label={t("settings.light")}
        style={[
          sharedStyles.settingsOptionButton,
          { backgroundColor: palette.surfaceElevated },
          theme === "light" && sharedStyles.settingsOptionButtonActive,
        ]}
        textStyle={{ fontWeight: "500" }}
        onPress={() => setTheme("light")}
      />
      <Button
        label={t("settings.dark")}
        style={[
          sharedStyles.settingsOptionButton,
          { backgroundColor: palette.surfaceElevated },
          theme === "dark" && sharedStyles.settingsOptionButtonActive,
        ]}
        textStyle={{ fontWeight: "500" }}
        onPress={() => setTheme("dark")}
      />

      <Button
        label={t("logout.button")}
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
        textStyle={sharedStyles.gradientButtonText}
      />
    </View>
  );
}
