import AvatarCircle from "@/components/avatar-circle";
import { receivers } from "@/constants/user";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { usePaymentStore } from "@/store/payment";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import * as Contacts from "expo-contacts";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ContactRow = { id: string; name: string; phone: string };
type ReceiverRow = { name: string; accountNumber: string };

export default function PaymentStep1() {
  const { setReceiver } = usePaymentStore();
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  const defaultTextColor = { color: palette.text };
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
    <View style={[sharedStyles.paymentStep1Container, { backgroundColor: palette.screen }]}>
      <Text
        style={{
          ...defaultTextColor,
          fontSize: 20,
          lineHeight: 32,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {t("payment.selectPerson")}
      </Text>

      <View
        style={[sharedStyles.paymentStep1TabRow, { backgroundColor: palette.surfaceMuted }]}
      >
        <TouchableOpacity
          style={[
            sharedStyles.paymentStep1TabButton,
            activeTab === "all" && sharedStyles.paymentStep1TabButtonActive,
            activeTab === "all" && { backgroundColor: palette.primary },
          ]}
          onPress={() => setActiveTab("all")}
        >
          <Text style={[defaultTextColor, sharedStyles.paymentStep1SemiBoldText]}>
            {t("payment.tabs.all")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            sharedStyles.paymentStep1TabButton,
            activeTab === "contacts" && sharedStyles.paymentStep1TabButtonActive,
            activeTab === "contacts" && { backgroundColor: palette.primary },
          ]}
          onPress={() => setActiveTab("contacts")}
        >
          <Text style={[defaultTextColor, sharedStyles.paymentStep1SemiBoldText]}>
            {t("payment.tabs.contacts")}
          </Text>
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
        ItemSeparatorComponent={() => <View style={sharedStyles.paymentStep1Separator} />}
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
            {/* <View>
              <Text style={sharedStyles.paymentStep1SemiBoldText}>
                {(item as ContactRow | ReceiverRow).name}
              </Text>
              <Text>
                {isContacts
                  ? (item as ContactRow).phone
                  : (item as ReceiverRow).accountNumber}
              </Text>
            </View> */}
            <View
              style={{
                backgroundColor: palette.surface,
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

              <View
                style={{
                  flexDirection: "column",
                  backgroundColor: palette.surface,
                }}
              >
                <Text style={[defaultTextColor, sharedStyles.paymentStep1SemiBoldText]}>
                  {isContacts
                    ? (item as ContactRow).phone
                    : (item as ReceiverRow).accountNumber}
                </Text>
                <Text style={defaultTextColor}>
                  {(item as ContactRow | ReceiverRow).name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      {permissionError ? (
        <Text style={[defaultTextColor, { marginTop: 12 }]}>
          {permissionError}
        </Text>
      ) : null}
    </View>
  );
}
