import { DefaultColor, Typo } from "@/components/ui";
import Box from "@/components/ui/box";
import {
  responsiveFont,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils/responsive";
import { useThemeStore } from "@/modules/app/stores/use-theme-store";
import { ShoppingBag } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";

interface EmptyCartProps {
  onContinueShopping?: () => void;
  onViewWishlist?: () => void;
}

export default function EmptyCart({
  onContinueShopping,
  onViewWishlist,
}: EmptyCartProps) {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary[1] }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: responsiveSpacing(32),
        }}
      >
        <Box
          width={responsiveSize(100)}
          height={responsiveSize(100)}
          radius={responsiveSize(50)}
          backgroundColor={DefaultColor.white}
          alignItems="center"
          justifyContent="center"
          marginBottom={responsiveSpacingVertical(28)}
        >
          <ShoppingBag
            size={responsiveSize(44)}
            color={theme.primary[2]}
            strokeWidth={1.5}
          />
        </Box>

        {/* Title */}
        <Typo
          weight="700"
          fontSize={responsiveFont(22)}
          color={theme.base[2]}
          textAlign="center"
          lineHeight={responsiveFont(30)}
          style={{ marginBottom: responsiveSpacingVertical(12) }}
        >
          {t("cart.empty.title")}
        </Typo>

        {/* Description */}
        <Typo
          fontSize={responsiveFont(14)}
          color={theme.base[5]}
          textAlign="center"
          lineHeight={responsiveFont(22)}
          style={{ marginBottom: responsiveSpacingVertical(36) }}
        >
          {t("cart.empty.description")}
        </Typo>

        {/* Nút Tiếp tục mua sắm */}
        <TouchableOpacity
          onPress={onContinueShopping}
          activeOpacity={0.85}
          style={{ width: "100%" }}
        >
          <Box
            backgroundColor={theme.primary[2]}
            radius={responsiveRadius(30)}
            height={responsiveSize(50)}
            alignItems="center"
            justifyContent="center"
            style={{ marginBottom: responsiveSpacingVertical(16) }}
          >
            <Typo
              weight="700"
              fontSize={responsiveFont(15)}
              color={DefaultColor.base[1]}
              style={{ letterSpacing: 0.5 }}
            >
              {t("cart.empty.continueShopping")}
            </Typo>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onViewWishlist}
          activeOpacity={0.7}
          style={{ marginTop: responsiveSpacingVertical(16) }}
        >
          <Typo
            fontSize={responsiveFont(14)}
            color={theme.primary[2]}
            textAlign="center"
          >
            {t("cart.empty.viewWishlist")}
          </Typo>
        </TouchableOpacity>
      </View>
    </View>
  );
}
