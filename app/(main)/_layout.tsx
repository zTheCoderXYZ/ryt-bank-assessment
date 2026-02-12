import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "@/i18n";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { router, Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
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
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: palette.primary,
          headerShown: !hideHeader,
          header: () => (hideHeader ? null : <MainHeader />),
          tabBarItemStyle: { marginTop: 8 },
          tabBarStyle: hideTabBar
            ? { display: "none" }
            : {
                backgroundColor: palette.screen,
                borderTopColor: palette.border,
              },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("home.title"),
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
    </SafeAreaView>
  );
}

function MainHeader() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  return (
    <View
      style={[
        sharedStyles.mainLayoutHeaderContainer,
        {
          backgroundColor: palette.screen,
          borderColor: palette.border,
        },
      ]}
    >
      <Text
        style={[sharedStyles.mainLayoutHeaderTitle, { color: palette.text }]}
      >
        {t("app.name")}
      </Text>
      <TouchableOpacity
        style={sharedStyles.mainLayoutHeaderButton}
        onPress={() => router.push("/settings")}
      >
        <IconSymbol
          size={22}
          name="gearshape.fill"
          color={palette.iconOnHeader}
        />
      </TouchableOpacity>
    </View>
  );
}
