import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { receivers } from "@/constants/user";
import { router } from "expo-router";
import { usePaymentFlow } from "./_layout";

export default function PaymentStep1() {
  const { setReceiver } = usePaymentFlow();
  const { t } = useTranslation();

  return (
    <FlatList
      data={Object.values(receivers)}
      keyExtractor={(item) => item.accountNumber}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <ThemedView style={{ margin: 16, padding: 16 }}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText
              type="title"
              style={{
                fontFamily: Fonts.rounded,
              }}
            >
              {t("payment.selectPerson")}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            setReceiver(item);
            router.push("/payment/step2");
          }}
        >
          <ThemedView style={styles.receiverRow}>
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText type="default">{item.accountNumber}</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  receiverRow: {
    paddingVertical: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#C0C0C0",
  },
});
