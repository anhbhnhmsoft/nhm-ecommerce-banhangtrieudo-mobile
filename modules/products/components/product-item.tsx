import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export type Product = {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
};

interface ProductItemProps {
  item: Product;
  onPress?: (item: Product) => void;
}

export const ProductCard: React.FC<ProductItemProps> = ({ item, onPress }) => {
  const theme = useThemeStore((s) => s.colors);
  return (
    <Box
      width={responsiveSpacing(170)}
      radius={responsiveSpacing(30)}
      overflow="hidden"
      backgroundColor={theme.base[1]}
      marginRight={responsiveSpacing(12)}
      style={styles.shadow}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Box padding={responsiveSpacing(10)}>
        <Typo
          fontSize={responsiveFont(13)}
          color={theme.base[2]}
          weight="700"
          numberOfLines={2}
          lineHeight={responsiveFont(20)}
          marginBottom={responsiveSpacingVertical(6)}
          style={{ minHeight: responsiveFont(20) * 2 }}
        >
          {item.title}
        </Typo>
        <Typo
          fontSize={responsiveFont(14)}
          color={theme.primary[2]}
          weight="700"
          marginBottom={responsiveSpacingVertical(4)}
          numberOfLines={1}
        >
          {item.price}
        </Typo>
        <Box
          flexDirection="row"
          alignItems="center"
          marginBottom={responsiveSpacingVertical(8)}
        >
          <FontAwesome
            name="map-marker"
            size={responsiveIcon(12)}
            color={theme.base[5]}
          />
          <Typo
            fontSize={responsiveFont(11)}
            color={theme.base[5]}
            marginLeft={responsiveSpacing(4)}
            numberOfLines={1}
          >
            {item.location}
          </Typo>
        </Box>
        <TouchableOpacity
          style={[styles.detailBtn, { backgroundColor: theme.primary[3] }]}
          activeOpacity={0.7}
          onPress={() => onPress?.(item)}
        >
          <Typo
            fontSize={responsiveFont(14)}
            color={theme.primary[2]}
            weight="600"
          >
            Chi tiết
          </Typo>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: responsiveSpacingVertical(120),
  },
  detailBtn: {
    borderRadius: 999,
    paddingVertical: responsiveSpacingVertical(6),
    alignItems: "center",
  },
});
