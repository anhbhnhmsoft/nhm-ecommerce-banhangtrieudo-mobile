import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export type ServiceItem = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
};

interface ServiceCardProps {
  item: ServiceItem;
  onPress?: (item: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ item, onPress }) => {
  const theme = useThemeStore((s) => s.colors);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`/service-details`)}
      style={{ flex: 1 }}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        radius={responsiveRadius(28)}
        backgroundColor={item.isFeatured ? theme.primary[3] : theme.base[1]}
        marginBottom={responsiveSpacingVertical(10)}
        padding={responsiveSpacing(10)}
        style={styles.shadow}
      >
        {/* Image + badges */}
        <Box>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* NEW — góc trên trái */}
          {item.isNew && (
            <View style={styles.badgeNew}>
              <Sparkles size={responsiveIcon(9)} color="#fff" fill="#fff" />
              <Typo
                fontSize={responsiveFont(8)}
                color="#fff"
                weight="700"
                marginLeft={responsiveSpacing(2)}
              >
                NEW
              </Typo>
            </View>
          )}
        </Box>
        {/* FEATURED — góc trên phải */}

        {/* Content */}
        <Box flex={1} marginLeft={responsiveSpacing(12)}>
          <Typo
            fontSize={responsiveFont(14)}
            color={theme.base[2]}
            weight="600"
            numberOfLines={2}
            lineHeight={responsiveFont(20)}
            style={{ minHeight: responsiveFont(40) }}
            marginBottom={responsiveSpacingVertical(2)}
          >
            {item.title}
          </Typo>
          <Typo
            fontSize={responsiveFont(13)}
            color={theme.primary[2]}
            weight="700"
            marginBottom={responsiveSpacingVertical(6)}
          >
            {item.subtitle}
          </Typo>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typo fontSize={responsiveFont(11)} color={theme.base[5]}>
              {item.tag}
            </Typo>
            <TouchableOpacity
              style={[styles.bookBtn, { backgroundColor: theme.primary[2] }]}
              activeOpacity={0.7}
              onPress={() => onPress?.(item)}
            >
              <Typo
                fontSize={responsiveFont(12)}
                color={theme.base[1]}
                weight="600"
              >
                Đặt ngay
              </Typo>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: responsiveSize(90),
    height: responsiveSize(90),
    borderRadius: responsiveRadius(28),
  },
  badgeNew: {
    position: "absolute",
    top: -responsiveSpacingVertical(6),
    left: -responsiveSpacing(4),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B7FFF",
    paddingHorizontal: responsiveSpacing(6),
    paddingVertical: responsiveSpacingVertical(3),
    borderRadius: 999,
  },
  badgeFeatured: {
    position: "absolute",
    top: -responsiveSpacingVertical(6),
    right: -responsiveSpacing(4),
    width: responsiveSize(22),
    height: responsiveSize(22),
    borderRadius: 999,
    backgroundColor: "#D4AF37",
    alignItems: "center",
    justifyContent: "center",
  },
  bookBtn: {
    paddingHorizontal: responsiveSpacing(14),
    paddingVertical: responsiveSpacingVertical(7),
    borderRadius: responsiveRadius(20),
  },
});
