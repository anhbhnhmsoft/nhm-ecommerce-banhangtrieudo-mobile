import {
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Box from "./box";
import Typo from "./typo";

interface HeaderBackProps {
  title?: string;
  onPress?: () => void;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
}

export default function HeaderBack({
  title,
  onPress,
  showBack = true,
  rightComponent,
}: HeaderBackProps) {
  const theme = useThemeStore((state) => state.colors);

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      paddingHorizontal={responsiveSpacing(16)}
      paddingVertical={responsiveSpacingVertical(12)}
    >
      {/* Back Button */}
      {showBack && (
        <Box position="absolute" left={responsiveSpacing(16)}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft size={responsiveIcon(24)} color={theme.base[2]} />
          </TouchableOpacity>
        </Box>
      )}

      {/* Title */}
      {title && (
        <Typo weight="600" fontSize={responsiveFont(16)} color={theme.base[2]}>
          {title}
        </Typo>
      )}

      {/* Right Component */}
      {rightComponent && (
        <Box position="absolute" right={responsiveSpacing(16)}>
          {rightComponent}
        </Box>
      )}
    </Box>
  );
}
