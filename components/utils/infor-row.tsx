import { TouchableOpacity } from "react-native";
import Box from "../ui/box";
import {
  moderateScale,
  responsiveFont,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { Typo } from "../ui";

export const InfoRow = ({
  icon,
  label,
  value,
  isLink,
  onPress,
  accentColor,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
  onPress?: () => void;
  accentColor: string;
  theme: any;
}) => (
  <TouchableOpacity activeOpacity={isLink ? 0.7 : 1} onPress={onPress}>
    <Box
      flexDirection="row"
      alignItems="flex-start"
      paddingVertical={responsiveSpacingVertical(10)}
      style={{ gap: responsiveSpacing(14) }}
    >
      {/* Icon bubble */}
      <Box
        width={responsiveSize(38)}
        height={responsiveSize(38)}
        radius={moderateScale(10)}
        backgroundColor={theme.base[4]} // #F5F5F5
        alignItems="center"
        justifyContent="center"
        style={{ flexShrink: 0 }}
      >
        {icon}
      </Box>

      {/* Text */}
      <Box flex={1} justifyContent="center">
        <Typo
          fontSize={responsiveFont(11)}
          color={theme.base[5]}
          marginBottom={2}
        >
          {label}
        </Typo>
        <Typo
          fontSize={responsiveFont(13)}
          color={isLink ? accentColor : theme.base[2]}
          weight={isLink ? "600" : "400"}
          lineHeight={responsiveFont(19)}
        >
          {value}
        </Typo>
      </Box>
    </Box>

    {/* Divider */}
    <Box
      height={1}
      backgroundColor={theme.base[4]}
      marginLeft={responsiveSpacing(52)}
    />
  </TouchableOpacity>
);
