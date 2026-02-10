import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet } from "react-native";

import { logout } from "@/api/logout.api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { user } from "@/constants/user";
import { router } from "expo-router";

export default function HomeScreen() {
  const { t } = useTranslation();

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
          {t("home.welcome")} {user.name}
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 20,
            marginBottom: 24,
          }}
        >
          {t("home.balance")}: RM{user.balance.toFixed(2)}
        </ThemedText>
        <Button
          title={t("logout.button")}
          onPress={async () => {
            const success = await logout();

            if (success) {
              router.replace("/(auth)/login");
            }
          }}
        />
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
});
