import { useThemeStore } from "@/modules/app/stores";
import React, { ReactNode } from "react";
import { Platform, StyleSheet, View, ViewProps } from "react-native";

interface BoxShadowProps extends ViewProps {
  children: ReactNode;
  padding?: number;
  radius?: number;
  styleContent?: ViewProps["style"];
}

export const BoxShadow = ({
  children,
  style,
  padding,
  radius,
  styleContent,
  ...props
}: BoxShadowProps) => {
  const theme = useThemeStore((s) => s.colors);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.base[1],
          borderColor: theme.base[4],
          borderRadius: radius,
          padding,
        },
        style,
      ]}
      {...props}
    >
      <View style={[styles.content, styleContent]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  content: {
    width: "100%",
  },
});
