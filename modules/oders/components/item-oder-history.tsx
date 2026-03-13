import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { BoxShadow, Typo } from "@/components/ui";
import Box from "@/components/ui/box";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
} from "@/lib/utils/responsive";

export type ProductStatus = "processing" | "delivered";

export interface Product {
  id: string;
  name: string;
  price: string;
  date: string;
  status: ProductStatus;
  image: string;
}

interface OderHistoryItemProps {
  item: Product;
  onBuyAgain: (item: Product) => void;
}

const STATUS_COLOR: Record<ProductStatus, string> = {
  processing: "#E8A020",
  delivered: "#2E9E5B",
};

export const OderHistoryItem = ({ item, onBuyAgain }: OderHistoryItemProps) => {
  const { t } = useTranslation();
  const statusColor = STATUS_COLOR[item.status];

  const dateLabel =
    item.status === "processing"
      ? t("purchasedProducts.orderDate", { date: item.date })
      : t("purchasedProducts.purchaseDate", { date: item.date });

  return (
    <BoxShadow
      style={styles.container}
      radius={responsiveRadius(12)}
      padding={responsiveSpacing(12)}
    >
      {/* Main row: Image (left) + Content box (right) */}
      <Box flexDirection="row" alignItems="center">
        {/* Image tròn bên trái */}
        <Box
          radius={responsiveRadius(50)}
          overflow="hidden"
          marginRight={responsiveSpacing(12)}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </Box>

        {/* Content box bên phải: status+price → name → date → button */}
        <Box flex={1}>
          {/* Row: Status (left) + Price (right) */}
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={responsiveSpacing(4)}
          >
            <Typo
              fontSize={responsiveFont(11)}
              weight="600"
              color={statusColor}
            >
              {t(`purchasedProducts.status.${item.status}`)}
            </Typo>

            <Typo fontSize={responsiveFont(14)} weight="700" color="#C9A84C">
              {item.price}
            </Typo>
          </Box>

          {/* Product name */}
          <Typo
            fontSize={responsiveFont(15)}
            weight="600"
            color="#1A1A1A"
            marginBottom={responsiveSpacing(4)}
          >
            {item.name}
          </Typo>

          {/* Date */}
          <Typo
            fontSize={responsiveFont(12)}
            weight="400"
            color="#888888"
            marginBottom={responsiveSpacing(10)}
          >
            {dateLabel}
          </Typo>

          {/* Buy again button - align right */}
          <Box flexDirection="row" justifyContent="flex-end">
            <TouchableOpacity
              style={styles.buyBtn}
              activeOpacity={0.8}
              onPress={() => onBuyAgain(item)}
            >
              <Ionicons
                name="cart-outline"
                size={responsiveIcon(14)}
                color="#FFFFFF"
              />
              <Typo
                fontSize={responsiveFont(13)}
                weight="600"
                color="#FFFFFF"
                marginLeft={responsiveSpacing(4)}
              >
                {t("purchasedProducts.buyAgain")}
              </Typo>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </BoxShadow>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsiveSpacing(16),
    marginBottom: responsiveSpacing(12),
  },
  image: {
    width: responsiveSize(72),
    height: responsiveSize(72),
    borderRadius: responsiveRadius(50),
    backgroundColor: "#F5F5F5",
  },
  buyBtn: {
    backgroundColor: "#C9A84C",
    paddingHorizontal: responsiveSpacing(14),
    paddingVertical: responsiveSpacing(8),
    borderRadius: responsiveRadius(20),
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSpacing(4),
  },
});

export default memo(OderHistoryItem);
