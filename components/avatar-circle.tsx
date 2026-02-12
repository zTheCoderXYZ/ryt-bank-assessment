import { sharedStyles } from "@/styles/index.stylesheet";
import { Text, View } from "react-native";

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
        sharedStyles.avatarCircleContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text
        style={[sharedStyles.avatarCircleText, { fontSize: Math.round(size * 0.45) }]}
      >
        {initial}
      </Text>
    </View>
  );
}
