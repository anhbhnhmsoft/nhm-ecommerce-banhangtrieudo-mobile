import { Box, DefaultColor, Typo } from "@/components/ui";
import {
  normalize,
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils/responsive"; // adjust path
import { useThemeStore } from "@/modules/app/stores";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";

interface CartItemProps {
  id: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onDelete: (id: string) => void;
}

const formatPrice = (value: number) => value.toLocaleString("vi-VN") + "đ";

const CartItemCard = ({
  id,
  name,
  variant,
  price,
  quantity,
  imageUrl,
  onIncrease,
  onDecrease,
  onDelete,
}: CartItemProps) => {
  const theme = useThemeStore((s) => s.colors);
  return (
    <Box
      flexDirection="row"
      backgroundColor="#fff"
      radius={responsiveRadius(10)}
      padding={responsiveSpacing(12)}
      marginBottom={responsiveSpacingVertical(10)}
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        gap: responsiveSpacing(12),
      }}
    >
      {/* Thumbnail */}
      <Box
        width={responsiveSize(72)}
        height={responsiveSize(72)}
        radius={responsiveRadius(8)}
        backgroundColor="#e8e8e8"
        overflow="hidden"
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        ) : null}
      </Box>

      {/* Info */}
      <Box
        flex={1}
        justifyContent="space-between"
        style={{ gap: responsiveSpacingVertical(4) }}
      >
        {/* Name row */}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          style={{ gap: responsiveSpacing(8) }}
        >
          <Box flex={1}>
            <Typo
              numberOfLines={2}
              weight="600"
              fontSize={responsiveFont(14)}
              color="#1a1a1a"
              lineHeight={responsiveFont(20)}
            >
              {name}
            </Typo>
          </Box>
          <TouchableOpacity onPress={() => onDelete(id)} hitSlop={8}>
            <Ionicons
              name="trash-outline"
              size={responsiveIcon(18)}
              color={DefaultColor.secondary[1]}
            />
          </TouchableOpacity>
        </Box>

        {/* Variant */}
        {variant ? (
          <Typo fontSize={responsiveFont(12)} color={DefaultColor.base[5]}>
            {variant}
          </Typo>
        ) : null}

        {/* Price + Stepper */}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={responsiveSpacingVertical(6)}
        >
          <Typo
            weight="700"
            fontSize={responsiveFont(15)}
            color={theme.primary[2]}
          >
            {formatPrice(price)}
          </Typo>

          {/* Stepper */}
          <Box
            flexDirection="row"
            alignItems="center"
            radius={responsiveRadius(6)}
            borderWidth={normalize(1)}
            borderColor="#ddd"
            overflow="hidden"
          >
            <TouchableOpacity onPress={() => onDecrease(id)}>
              <Box
                width={responsiveSize(28)}
                height={responsiveSize(28)}
                alignItems="center"
                justifyContent="center"
                backgroundColor="#f5f5f5"
              >
                <Typo
                  fontSize={responsiveFont(16)}
                  color={DefaultColor.black}
                  lineHeight={responsiveFont(22)}
                >
                  −
                </Typo>
              </Box>
            </TouchableOpacity>

            <Box
              width={responsiveSize(32)}
              alignItems="center"
              justifyContent="center"
            >
              <Typo weight="600" fontSize={responsiveFont(14)} color="#1a1a1a">
                {quantity}
              </Typo>
            </Box>

            <TouchableOpacity onPress={() => onIncrease(id)}>
              <Box
                width={responsiveSize(28)}
                height={responsiveSize(28)}
                alignItems="center"
                justifyContent="center"
                backgroundColor="#f5f5f5"
              >
                <Typo
                  fontSize={responsiveFont(16)}
                  color={DefaultColor.black}
                  lineHeight={responsiveFont(22)}
                >
                  +
                </Typo>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const CartItem = memo(CartItemCard);
