import React, { ReactNode } from "react";
import { Platform, StyleSheet, View, ViewProps } from "react-native";
import DefaultColor from "./default-color";

interface BaseCardProps extends ViewProps {
  children: ReactNode;
}

export const BoxShadow = ({ children, style, ...props }: BaseCardProps) => {
  return (
    <View style={[styles.card, style]} {...props}>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f1f5f9",

    ...Platform.select({
      ios: {
        shadowColor: DefaultColor.slate["200"],
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
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
