import { ThemedText, type ThemedTextProps } from "@/components/themed-text";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

type GradientPoint = {
  x: number;
  y: number;
};

type GradientColors = readonly [string, string, ...string[]];

export type ButtonProps = Omit<PressableProps, "style" | "children"> & {
  label?: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textType?: ThemedTextProps["type"];
  pressedStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  gradient?: boolean;
  gradientColors?: GradientColors;
  gradientStart?: GradientPoint;
  gradientEnd?: GradientPoint;
};

const DEFAULT_GRADIENT_COLORS: GradientColors = ["#1E40AF", "#2563EB"];
const DEFAULT_GRADIENT_START: GradientPoint = { x: 0, y: 0 };
const DEFAULT_GRADIENT_END: GradientPoint = { x: 1, y: 1 };

export function Button({
  label,
  icon,
  style,
  contentStyle,
  textStyle,
  textType = "default",
  pressedStyle,
  disabledStyle,
  gradient = false,
  gradientColors = DEFAULT_GRADIENT_COLORS,
  gradientStart = DEFAULT_GRADIENT_START,
  gradientEnd = DEFAULT_GRADIENT_END,
  disabled,
  ...rest
}: ButtonProps) {
  const content = (
    <>
      {icon}
      {label ? (
        <ThemedText
          type={textType}
          style={[
            gradient && styles.gradientText,
            Boolean(icon) ? styles.textWithIcon : undefined,
            textStyle,
          ]}
        >
          {label}
        </ThemedText>
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
      {gradient ? (
        <LinearGradient
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          style={[styles.content, contentStyle]}
        >
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.content, contentStyle]}>{content}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  textWithIcon: {
    marginLeft: 8,
  },
});
