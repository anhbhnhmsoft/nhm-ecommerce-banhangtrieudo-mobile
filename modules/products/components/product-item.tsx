import { COLUMNS } from "@/app/(app)/(tabs)/products";
import { BoxShadow } from "@/components/ui";
import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSpacing,
  responsiveSpacingVertical,
  SCREEN,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Product } from "../utils";

interface ProductCardProps {
  item: Product;
  onPress?: (item: Product) => void;
}

const H_PADDING = responsiveSpacing(16);
const GAP = responsiveSpacing(12);
const CARD_WIDTH =
  (SCREEN.width - H_PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS;

export const ProductCard: React.FC<ProductCardProps> = ({ item, onPress }) => {
  const theme = useThemeStore((s) => s.colors);
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/(app)/(public)/product-details`)}
      style={{
        width: CARD_WIDTH,
        marginRight: GAP,
        marginBottom: responsiveSpacingVertical(12),
      }}
    >
      <BoxShadow
        radius={responsiveRadius(30)}
        style={{
          overflow: "hidden",
          backgroundColor: item.isFeatured ? theme.primary[3] : theme.base[1],
        }}
      >
        {/* Image + badges */}
        <Box>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />

          {item.isNew && (
            <View style={[styles.badgeNew, { backgroundColor: "#00A63E" }]}>
              <Sparkles size={responsiveIcon(10)} color="#fff" fill="#fff" />
              <Typo
                fontSize={responsiveFont(9)}
                color="#fff"
                weight="700"
                marginLeft={responsiveSpacing(3)}
              >
                NEW
              </Typo>
            </View>
          )}
        </Box>

        {/* Content */}
        <Box padding={responsiveSpacing(10)}>
          <Typo
            fontSize={responsiveFont(13)}
            color={theme.base[2]}
            weight="700"
            numberOfLines={2}
            lineHeight={responsiveFont(20)}
            marginBottom={responsiveSpacingVertical(4)}
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

          <Box
            radius={999}
            paddingVertical={responsiveSpacingVertical(7)}
            alignItems="center"
            backgroundColor={
              item.isFeatured ? theme.primary[2] : theme.primary[3]
            }
          >
            <Typo
              fontSize={responsiveFont(13)}
              color={item.isFeatured ? theme.base[1] : theme.primary[2]}
              weight="600"
            >
              {t("common.details")}
            </Typo>
          </Box>
        </Box>
      </BoxShadow>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: responsiveSpacingVertical(120),
  },
  badgeNew: {
    position: "absolute",
    top: responsiveSpacingVertical(10),
    left: responsiveSpacing(10),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveSpacing(8),
    paddingVertical: responsiveSpacingVertical(4),
    borderRadius: 999,
  },
  // FEATURED — circle nhỏ góc trên phải, chỉ icon
  badgeFeatured: {
    position: "absolute",
    top: responsiveSpacingVertical(10),
    right: responsiveSpacing(10),
    width: responsiveSpacing(26),
    height: responsiveSpacing(26),
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  detailBtn: {
    borderRadius: 999,
    paddingVertical: responsiveSpacingVertical(7),
    alignItems: "center",
  },
});
