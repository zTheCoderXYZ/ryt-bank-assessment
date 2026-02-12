import { AppColors, sharedStyles } from "@/styles/index.stylesheet";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import {
  Pressable,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

export type ButtonProps = Omit<PressableProps, "style" | "children"> & {
  label?: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  icon,
  style,
  textStyle,
  pressedStyle,
  disabledStyle,
  disabled,
  ...rest
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? "light";
  const palette = AppColors[colorScheme];

  const content = (
    <>
      {icon}
      {label ? (
        <Text
          style={[
            sharedStyles.buttonDefaultText,
            { color: palette.text },
            Boolean(icon) ? sharedStyles.buttonTextWithIcon : undefined,
            textStyle,
          ]}
        >
          {label}
        </Text>
      ) : null}
    </>
  );

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      style={(state) => [
        style,
        state.pressed && pressedStyle,
        disabled && disabledStyle,
      ]}
    >
      <View style={sharedStyles.buttonContent}>{content}</View>
    </Pressable>
  );
}
