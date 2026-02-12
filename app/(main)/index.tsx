import { useTranslation } from "react-i18next";

import { useBalanceQuery } from "@/api/balance.api";
import { useTransactionsQuery } from "@/api/transaction.api";
import AvatarCircle from "@/components/avatar-circle";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { user } from "@/constants/user";
import { useTransactionsStore } from "@/store/transactions";
import { sharedStyles } from "@/styles/index.stylesheet";
import { router } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { selectTransaction } = useTransactionsStore();
  const { data: transactions = [] } = useTransactionsQuery();
  const { data: balance } = useBalanceQuery();

  return (
    <SafeAreaView
      style={sharedStyles.container}
      edges={["top", "left", "right"]}
    >
      <ThemedText
        style={{
          fontSize: 36,
          lineHeight: 42,
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
        {new Date().toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </ThemedText>

      <ThemedView
        style={{
          backgroundColor: "#1D4ED8",
          padding: 16,
          borderRadius: 8,
          marginBottom: 24,
          width: "80%",
        }}
      >
        <ThemedText
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Available Balance
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 28,
            fontWeight: "bold",
            lineHeight: 34,
          }}
        >
          RM {balance?.toFixed(2)}
        </ThemedText>
      </ThemedView>

      <ThemedView style={sharedStyles.stepContainer}>
        <ThemedText
          style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}
        >
          {t("home.recentTransactions")}
        </ThemedText>
        {transactions.length === 0 ? (
          <ThemedText style={{ marginVertical: "auto" }}>
            {t("home.noTransactions")}
          </ThemedText>
        ) : (
          <ScrollView
            style={{ maxHeight: 260 }}
            contentContainerStyle={{ gap: 8 }}
            showsVerticalScrollIndicator={false}
          >
            {transactions
              .slice(-10)
              .reverse()
              .map((tx) => (
                <TouchableOpacity
                  key={tx.id}
                  onPress={() => {
                    selectTransaction(tx.id);
                    router.push("/transaction");
                  }}
                >
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
                    <AvatarCircle name={tx.receiver?.name ?? "?"} size={40} />

                    <ThemedView
                      style={{
                        flexDirection: "column",
                        backgroundColor: "#111827",
                      }}
                    >
                      <ThemedText type="defaultSemiBold">
                        {tx.receiver?.accountNumber}
                      </ThemedText>
                      <ThemedText>{tx.receiver?.name}</ThemedText>
                    </ThemedView>
                    <ThemedText
                      style={{
                        color: "red",
                        marginLeft: "auto",
                        fontWeight: "bold",
                        marginVertical: "auto",
                      }}
                    >
                      - RM{parseFloat(tx.amount).toFixed(2)}
                    </ThemedText>
                  </ThemedView>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
      </ThemedView>
      {/* <Button
        title={t("logout.button")}
        onPress={async () => {
          await executeLogout(undefined, {
            onSuccess: () => {
              router.replace("/(auth)/login");
            },
          });
        }}
      /> */}
    </SafeAreaView>
  );
}
