import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import "react-native-reanimated";

import { HapticTab } from "@/components/haptic-tab";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "@/i18n";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const pathname = usePathname();

  const hideTabBar =
    pathname.startsWith("/payment/step2") ||
    pathname.startsWith("/payment/step3") ||
    pathname.startsWith("/payment/step4");

  const hideHeader = pathname.startsWith("/payment");

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: !hideHeader,
          header: () => (hideHeader ? null : <MainHeader />),
          tabBarButton: HapticTab,
          tabBarStyle: hideTabBar ? { display: "none" } : undefined,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("home.welcome"),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="payment"
          options={{
            title: t("payment.title"),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function MainHeader() {
  return (
    <ThemedView style={styles.headerContainer}>
      <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
        Ryt Bank
      </ThemedText>
    </ThemedView>
  );
}

const styles = {
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
  },
};
