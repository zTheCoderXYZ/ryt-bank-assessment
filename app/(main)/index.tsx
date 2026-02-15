import { useTranslation } from "react-i18next";

import { useBalanceQuery } from "@/api/balance.api";
import { useLogoutMutation } from "@/api/logout.api";
import { useTransactionsQuery } from "@/api/transaction.api";
import AvatarCircle from "@/components/avatar-circle";
import ErrorModal from "@/components/error-modal";
import { user } from "@/constants/user";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTransactionsStore } from "@/store/transactions";
import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];
  const defaultTextColor = { color: palette.text };
  const { selectTransaction } = useTransactionsStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutateAsync: executeLogout } = useLogoutMutation();
  const {
    data: transactions = [],
    isError: isTransactionsError,
    error: transactionsError,
  } = useTransactionsQuery({ retry: false });
  const {
    data: balance,
    isError: isBalanceError,
    error: balanceError,
  } = useBalanceQuery({ retry: false });

  useEffect(() => {
    if (isTransactionsError) {
      setErrorMessage(transactionsError?.message ?? t("common.errorTitle"));
      return;
    }

    if (isBalanceError) {
      setErrorMessage(balanceError?.message ?? t("common.errorTitle"));
    }
  }, [balanceError, isBalanceError, isTransactionsError, t, transactionsError]);
  return (
    <SafeAreaView
      style={[sharedStyles.container, { backgroundColor: palette.screen }]}
      edges={["top", "left", "right"]}
    >
      <Text
        style={{
          ...defaultTextColor,
          fontSize: 36,
          lineHeight: 42,
          fontWeight: "bold",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {t("home.welcome")} {user.name}
      </Text>
      <Text
        style={{
          ...defaultTextColor,
          fontSize: 20,
          marginBottom: 24,
        }}
      >
        {new Date().toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </Text>

      <View
        style={{
          backgroundColor: palette.primary,
          padding: 16,
          borderRadius: 8,
          marginBottom: 24,
          width: "80%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 8,
            color: palette.textOnPrimary,
          }}
        >
          {t("home.availableBalance")}
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            lineHeight: 34,
            color: palette.textOnPrimary,
          }}
        >
          RM {balance?.toFixed(2)}
        </Text>
      </View>

      <View
        style={[
          sharedStyles.stepContainer,
          { backgroundColor: palette.surfaceMuted },
        ]}
      >
        <Text
          style={[
            defaultTextColor,
            { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
          ]}
        >
          {t("home.recentTransactions")}
        </Text>
        {transactions.length === 0 ? (
          <Text style={[defaultTextColor, { marginVertical: "auto" }]}>
            {t("home.noTransactions")}
          </Text>
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
                    <AvatarCircle name={tx.receiver?.name ?? "?"} size={40} />

                    <View
                      style={{
                        flexDirection: "column",
                        backgroundColor: palette.surface,
                      }}
                    >
                      <Text
                        style={[
                          defaultTextColor,
                          { fontSize: 16, lineHeight: 24, fontWeight: "600" },
                        ]}
                      >
                        {tx.receiver?.accountNumber}
                      </Text>
                      <Text style={defaultTextColor}>{tx.receiver?.name}</Text>
                    </View>
                    <Text
                      style={{
                        color: "red",
                        marginLeft: "auto",
                        fontWeight: "bold",
                        marginVertical: "auto",
                      }}
                    >
                      - RM{parseFloat(tx.amount).toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
      </View>
      <ErrorModal
        message={errorMessage}
        onClose={() => {
          setErrorMessage(null);
          executeLogout(undefined, {
            onSuccess: () => {
              router.replace("/(auth)/login");
            },
            onError: (error) => {
              setErrorMessage(error.message);
            },
          }).catch((error) => {
            console.error("Logout mutation failed:", error);
          });
        }}
      />
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
