import { BoxShadow, TextLabel } from "@/components/ui";
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
import { MapPin, Phone } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Seller {
  name: string;
  phone: string;
  avatar: string;
  verified?: boolean;
}

interface SellerInfoProps {
  seller: Seller;
  address?: string;
  onContact?: () => void;
  style?: object;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const SellerInfo: React.FC<SellerInfoProps> = ({
  seller,
  address,
  onContact,
  style,
}) => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);

  return (
    <BoxShadow
      radius={responsiveRadius(20)}
      padding={responsiveSpacing(16)}
      style={[{ marginBottom: responsiveSpacingVertical(12) }, style]}
    >
      <TextLabel title={t("product.seller_info")} />

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Avatar + Info */}
        <Box
          flexDirection="row"
          alignItems="center"
          flex={1}
          style={{ gap: responsiveSpacing(12) }}
        >
          {/* Avatar — overflow hidden để clip ảnh */}
          <Box
            size={responsiveSize(48)}
            radius={999}
            position="relative"
            overflow="hidden"
          >
            <Image source={{ uri: seller.avatar }} style={styles.avatar} />
          </Box>

          {/* Name + Phone + Address */}
          <Box flex={1}>
            <Typo
              fontSize={responsiveFont(14)}
              color={theme.base[2]}
              weight="700"
            >
              {seller.name}
            </Typo>

            <Box
              flexDirection="row"
              alignItems="center"
              marginTop={responsiveSpacingVertical(3)}
            >
              <Phone size={responsiveIcon(12)} color={theme.base[5]} />
              <Typo
                fontSize={responsiveFont(12)}
                color={theme.base[5]}
                marginLeft={responsiveSpacing(4)}
              >
                {seller.phone}
              </Typo>
            </Box>

            {address && (
              <Box
                flexDirection="row"
                alignItems="center"
                marginTop={responsiveSpacingVertical(3)}
              >
                <MapPin size={responsiveIcon(12)} color={theme.base[5]} />
                <Typo
                  fontSize={responsiveFont(11)}
                  color={theme.base[5]}
                  marginLeft={responsiveSpacing(4)}
                  numberOfLines={1}
                  style={{ flex: 1 }}
                >
                  {address}
                </Typo>
              </Box>
            )}
          </Box>
        </Box>

        {/* Contact Button */}
        <TouchableOpacity
          style={[
            styles.callBtn,
            {
              borderColor: theme.primary[2],
              backgroundColor: theme.primary[3],
            },
          ]}
          activeOpacity={0.8}
          onPress={onContact}
        >
          <Phone size={responsiveIcon(14)} color={theme.primary[2]} />
          <Typo
            fontSize={responsiveFont(12)}
            color={theme.primary[2]}
            weight="600"
            marginLeft={responsiveSpacing(4)}
          >
            {t("common.contact")}
          </Typo>
        </TouchableOpacity>
      </Box>
    </BoxShadow>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: responsiveSize(48),
    height: responsiveSize(48),
  },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: responsiveSpacing(12),
    paddingVertical: responsiveSpacingVertical(7),
  },
});
