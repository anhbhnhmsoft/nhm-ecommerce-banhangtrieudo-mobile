import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StatusBadge } from "./status-badge";

interface OrderItemProps {
  order: {
    id: string;
    name: string;
    status: string;
    date: string;
    price: string;
  };
  onPress?: () => void;
}

export const OrderItem = ({ order, onPress }: OrderItemProps) => {
  const theme = useThemeStore((s) => s.colors);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderWidth={1}
        borderColor={theme.base[4]}
        radius={12}
        padding={responsiveSpacing(12)}
      >
        <Box flex={1}>
          <Typo
            fontSize={responsiveFont(13)}
            color={theme.base[2]}
            weight="600"
          >
            {order.name}
          </Typo>
          <Box
            flexDirection="row"
            alignItems="center"
            marginTop={responsiveSpacingVertical(4)}
            style={{ gap: responsiveSpacing(8) }}
          >
            <Typo fontSize={responsiveFont(11)} color={theme.base[5]}>
              #{order.id} · {order.date}
            </Typo>
          </Box>
          <Box
            flexDirection="row"
            alignItems="center"
            marginTop={responsiveSpacingVertical(6)}
            style={{ gap: responsiveSpacing(8) }}
          >
            <StatusBadge status={order.status} />
            <Typo
              fontSize={responsiveFont(12)}
              color={theme.primary[2]}
              weight="700"
            >
              {order.price}
            </Typo>
          </Box>
        </Box>
        <ChevronRight size={responsiveIcon(16)} color={theme.base[5]} />
      </Box>
    </TouchableOpacity>
  );
};
