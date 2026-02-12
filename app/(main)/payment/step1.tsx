import AvatarCircle from "@/components/avatar-circle";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { receivers } from "@/constants/user";
import * as Contacts from "expo-contacts";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { usePaymentStore } from "@/store/payment";

type ContactRow = { id: string; name: string; phone: string };
type ReceiverRow = { name: string; accountNumber: string };

export default function PaymentStep1() {
  const { setReceiver } = usePaymentStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"all" | "contacts">("all");
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        setPermissionError(t("payment.errors.permissionDenied"));
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
            name: c.name ?? t("common.unknown"),
            phone,
          };
        })
        .filter(Boolean) as ContactRow[];

      setContacts(rows);
    })();
  }, [t]);

  const allReceivers = useMemo(() => Object.values(receivers), []);
  const isContacts = activeTab === "contacts";
  const listData: (ContactRow | ReceiverRow)[] = isContacts
    ? contacts
    : allReceivers;
  const totalPages = Math.ceil(listData.length / pageSize) || 1;
  const pagedData = listData.slice(0, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [activeTab, contacts.length, allReceivers.length]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText
        type="title"
        style={{
          fontFamily: Fonts.rounded,
          fontSize: 20,
        }}
      >
        {t("payment.selectPerson")}
      </ThemedText>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "all" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("all")}
        >
          <ThemedText type="defaultSemiBold">{t("payment.tabs.all")}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "contacts" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("contacts")}
        >
          <ThemedText type="defaultSemiBold">{t("payment.tabs.contacts")}</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ marginTop: 12, width: "80%" }}
        data={pagedData}
        keyExtractor={(item) =>
          isContacts
            ? (item as ContactRow).id
            : (item as ReceiverRow).accountNumber
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (page < totalPages) {
            setPage((prev) => prev + 1);
          }
        }}
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
            {/* <ThemedView style={styles.receiverRow}>
              <ThemedText type="defaultSemiBold">
                {(item as ContactRow | ReceiverRow).name}
              </ThemedText>
              <ThemedText type="default">
                {isContacts
                  ? (item as ContactRow).phone
                  : (item as ReceiverRow).accountNumber}
              </ThemedText>
            </ThemedView> */}
            <ThemedView
              style={{
                backgroundColor: "#111827",
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 8,
                borderRadius: 4,
                gap: 20,
                width: "100%",
              }}
            >
              <AvatarCircle
                name={(item as ContactRow | ReceiverRow).name}
                size={40}
              />

              <ThemedView
                style={{
                  flexDirection: "column",
                  backgroundColor: "#111827",
                }}
              >
                <ThemedText type="defaultSemiBold">
                  {isContacts
                    ? (item as ContactRow).phone
                    : (item as ReceiverRow).accountNumber}
                </ThemedText>
                <ThemedText>
                  {(item as ContactRow | ReceiverRow).name}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>
        )}
      />
      {permissionError ? (
        <ThemedText style={{ marginTop: 12 }}>{permissionError}</ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 12,
    backgroundColor: "#0F172A",
    alignItems: "center",
  },
  titleContainer: {},
  tabRow: {
    width: "80%",
    backgroundColor: "#020617",
    flexDirection: "row",
    marginTop: 12,
    borderRadius: 4,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    width: "50%",
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: "#1D4ED8",
  },
  receiverRow: {
    paddingVertical: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#C0C0C0",
  },
});
