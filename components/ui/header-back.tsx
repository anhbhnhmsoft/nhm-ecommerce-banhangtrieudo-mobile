import {
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Box from "./box";
import DefaultColor from "./default-color";
import Typo from "./typo";

interface HeaderBackProps {
  title?: string;
  onPress?: () => void;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
  onBack?: () => void;
  backgroudColor?: string;
}

export default function HeaderBack({
  title,
  onPress,
  showBack = true,
  rightComponent,
  onBack,
  backgroudColor = DefaultColor.white,
}: HeaderBackProps) {
  const theme = useThemeStore((state) => state.colors);
  const insets = useSafeAreaInsets();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingHorizontal={responsiveSpacing(16)}
      backgroundColor={backgroudColor}
      paddingTop={
        backgroudColor === "transparent"
          ? 0
          : insets.top + responsiveSpacingVertical(12)
      }
      paddingBottom={responsiveSpacingVertical(12)}
    >
      {/* Back Button */}
      <Box flex={1} alignItems="center" justifyContent="center">
        {showBack && (
          <TouchableOpacity
            onPress={() => (onBack ? onBack() : router.back())}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft size={responsiveIcon(24)} color={theme.base[2]} />
          </TouchableOpacity>
        )}
      </Box>

      {/* Title */}
      <Box flex={8} alignItems="center" justifyContent="center">
        {title && (
          <Typo
            weight="700"
            fontSize={responsiveFont(16)}
            color={theme.base[2]}
          >
            {title}
          </Typo>
        )}
      </Box>

      {/* Right Component */}
      <Box flex={1} alignItems="center" justifyContent="center">
        {rightComponent && rightComponent}
      </Box>
    </Box>
  );
}
