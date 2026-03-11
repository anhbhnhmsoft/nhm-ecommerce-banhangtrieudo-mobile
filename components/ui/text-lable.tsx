import { responsiveFont, responsiveSpacingVertical } from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typo from "./typo";

interface Props {
  title?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onMore?: () => void;
  moreLabel?: string;
}

export const TextLabel = ({
  title,
  iconLeft,
  iconRight,
  onMore,
  moreLabel = "Xem tất cả",
}: Props) => {
  const theme = useThemeStore((s) => s.colors);

  return (
    <View style={styles.container}>
      {/* Left */}
      <View style={styles.left}>
        {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
        <Typo
          weight="Roboto-SemiBold"
          fontSize={responsiveFont(16)}
          color={theme.base[2]}
        >
          {title}
        </Typo>
      </View>

      {/* Right */}
      <View style={styles.right}>
        {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        {onMore && (
          <TouchableOpacity
            onPress={onMore}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Typo
              fontSize={responsiveFont(13)}
              color={theme.primary[2]}
              weight="500"
            >
              {moreLabel}
            </Typo>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: responsiveSpacingVertical(12),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconLeft: {
    marginRight: 8,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconRight: {
    marginRight: 6,
  },
});
