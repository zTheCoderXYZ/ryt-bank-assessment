import { useColorScheme } from "@/hooks/use-color-scheme";
import { sharedStyles } from "@/styles/index.stylesheet";
import { useTranslation } from "react-i18next";
import { Modal, Text, View } from "react-native";

import { Button } from "./ui/button";

type ErrorModalProps = {
  message: string | null;
  onClose: () => void;
};

export default function ErrorModal({ message, onClose }: ErrorModalProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const modalTextColor = { color: colorScheme === "dark" ? "#0F172A" : "#FFFFFF" };
  const modalBackgroundColor =
    colorScheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <Modal
      animationType="fade"
      transparent
      visible={Boolean(message)}
      onRequestClose={onClose}
    >
      <View style={sharedStyles.modalBackdrop}>
        <View style={[sharedStyles.modalCard, { backgroundColor: modalBackgroundColor }]}>
          <Text style={[modalTextColor, sharedStyles.modalTitle, { fontWeight: "600" }]}>
            {t("common.errorTitle")}
          </Text>
          <Text style={sharedStyles.errorText}>{message}</Text>
          <View style={sharedStyles.modalActions}>
            <Button
              label={t("common.cancel")}
              style={{
                backgroundColor: modalBackgroundColor,
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
              textStyle={[modalTextColor, { fontWeight: "600" }]}
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
