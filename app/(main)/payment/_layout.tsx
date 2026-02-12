import { Stack, usePathname, useRouter } from "expo-router";
import { Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function PaymentModule() {
  return (
    <Stack
      screenOptions={{
        header: () => <PaymentHeader />,
      }}
    >
      <Stack.Screen name="step1" options={{ headerShown: false }} />
      <Stack.Screen name="step2" />
      <Stack.Screen name="step3" />
      <Stack.Screen name="step4" options={{ headerShown: false }} />
    </Stack>
  );
}

function PaymentHeader() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  const router = useRouter();
  const pathname = usePathname();
  const step = pathname.split("/").pop() ?? "";
  const titleMap: Record<string, string> = {
    step1: t("payment.steps.step1"),
    step2: t("payment.steps.step2"),
    step3: t("payment.steps.step3"),
    step4: t("payment.steps.step4"),
  };
  const title = titleMap[step] ?? t("payment.title");

  return (
    <View
      style={[
        sharedStyles.paymentHeaderContainer,
        { backgroundColor: palette.screen, borderBottomColor: palette.border },
      ]}
    >
      <Button
        onPress={() => router.back()}
        style={sharedStyles.paymentHeaderBackButton}
        icon={
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={palette.iconOnHeader}
          />
        }
      />
      <Text style={[sharedStyles.paymentHeaderTitle, { color: palette.text }]}>
        {title}
      </Text>
      <View style={sharedStyles.paymentHeaderRightSpacer} />
    </View>
  );
}
