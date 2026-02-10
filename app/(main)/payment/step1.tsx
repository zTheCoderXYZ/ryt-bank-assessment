import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { receivers } from "@/constants/user";
import * as Contacts from "expo-contacts";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { usePaymentFlow } from "./_layout";

type ContactRow = { id: string; name: string; phone: string };
type ReceiverRow = { name: string; accountNumber: string };

export default function PaymentStep1() {
  const { setReceiver } = usePaymentFlow();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"all" | "contacts">("all");
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        setPermissionError("Permission denied");
        return;
      }

      const result = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      const rows: ContactRow[] = result.data
        .map((c) => {
          const phone = c.phoneNumbers?.[0]?.number;
          if (!phone) return null;
          return {
            id: c.id,
            name: c.name ?? "Unknown",
            phone,
          };
        })
        .filter(Boolean) as ContactRow[];

      setContacts(rows);
    })();
  }, []);

  const allReceivers = useMemo(() => Object.values(receivers), []);
  const isContacts = activeTab === "contacts";
  const listData: Array<ContactRow | ReceiverRow> = isContacts
    ? contacts
    : allReceivers;

  return (
    <FlatList
      data={listData}
      keyExtractor={(item) =>
        isContacts
          ? (item as ContactRow).id
          : (item as ReceiverRow).accountNumber
      }
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

          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "all" && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab("all")}
            >
              <ThemedText type="defaultSemiBold">All</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "contacts" && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab("contacts")}
            >
              <ThemedText type="defaultSemiBold">Contacts</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            const receiver = isContacts
              ? {
                  name: (item as ContactRow).name,
                  accountNumber: (item as ContactRow).phone,
                }
              : (item as ReceiverRow);

            setReceiver(receiver);
            router.push("/payment/step2");
          }}
        >
          <ThemedView style={styles.receiverRow}>
            <ThemedText type="defaultSemiBold">
              {(item as ContactRow | ReceiverRow).name}
            </ThemedText>
            <ThemedText type="default">
              {isContacts
                ? (item as ContactRow).phone
                : (item as ReceiverRow).accountNumber}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tabRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
  tabButtonActive: {
    backgroundColor: "#E6E6E6",
  },
  receiverRow: {
    paddingVertical: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#C0C0C0",
  },
});
