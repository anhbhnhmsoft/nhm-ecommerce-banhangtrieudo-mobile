import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export type CategorySevicesItem = {
  id: string;
  label: string;
  image: string;
};

interface CategorySevicesProps {
  item: CategorySevicesItem;
  onPress?: (item: CategorySevicesItem) => void;
}

export const CategorySevices: React.FC<CategorySevicesProps> = ({
  item,
  onPress,
}) => {
  const theme = useThemeStore((s) => s.colors);
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Typo
        fontSize={responsiveFont(12)}
        color={theme.base[2]}
        textAlign="center"
        weight="600"
        marginTop={responsiveSpacingVertical(6)}
        numberOfLines={2}
      >
        {item.label}
      </Typo>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    width: responsiveSize(100),
    marginRight: responsiveSpacing(12),
  },
  image: {
    width: responsiveSize(90),
    height: responsiveSize(90),
    borderRadius: responsiveRadius(16),
  },
});
