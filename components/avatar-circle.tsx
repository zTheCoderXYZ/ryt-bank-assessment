import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";

type Props = {
  name: string;
  size?: number;
  backgroundColor?: string;
};

export default function AvatarCircle({
  name,
  size = 40,
  backgroundColor = "#1E3A8A",
}: Props) {
  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <ThemedText style={[styles.text, { fontSize: Math.round(size * 0.45) }]}>
        {initial}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
});
