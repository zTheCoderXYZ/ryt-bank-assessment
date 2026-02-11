import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";
import "react-native-reanimated";

import { HapticTab } from "@/components/haptic-tab";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "@/i18n";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const pathname = usePathname();

  const hideTabBar =
    pathname.startsWith("/payment/step2") ||
    pathname.startsWith("/payment/step3") ||
    pathname.startsWith("/payment/step4");

  const hideHeader =
    pathname.startsWith("/payment") || pathname.startsWith("/settings");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: !hideHeader,
            header: () => (hideHeader ? null : <MainHeader />),
            tabBarButton: HapticTab,
            tabBarItemStyle: { marginTop: 8 },
            tabBarStyle: hideTabBar
              ? { display: "none" }
              : {
                  backgroundColor: "#0F172A",
                },
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
          <Tabs.Screen name="settings/index" options={{ href: null }} />
          <Tabs.Screen name="transaction/index" options={{ href: null }} />
        </Tabs>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaView>
  );
}

function MainHeader() {
  return (
    <ThemedView style={styles.headerContainer}>
      <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
        MyBank
      </ThemedText>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => router.push("/settings")}
      >
        <IconSymbol size={22} name="gearshape.fill" color="#6B7280" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0F172A",
    borderBottomWidth: 0.5,
    borderColor: "#1E293B",
  },
  headerTitle: {
    fontSize: 18,
  },
  headerButton: {
    padding: 6,
  },
});
