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
import { ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { Switch, TouchableOpacity } from "react-native";

interface SettingItemProps {
  icon: React.ElementType;
  label: string;
  color: string;
  value?: string;
  isSwitch?: boolean;
  onPress?: () => void;
  onSwitchChange?: (val: boolean) => void;
}

export const SettingItem = ({
  icon: Icon,
  label,
  color,
  value,
  isSwitch = false,
  onPress,
  onSwitchChange,
}: SettingItemProps) => {
  const theme = useThemeStore((s) => s.colors);
  const [enabled, setEnabled] = useState(false);

  const handleSwitch = (val: boolean) => {
    setEnabled(val);
    onSwitchChange?.(val);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={!isSwitch ? onPress : undefined}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        paddingVertical={responsiveSpacingVertical(10)}
        style={{ gap: responsiveSpacing(12) }}
      >
        {/* Icon */}
        <Box
          width={responsiveSize(36)}
          height={responsiveSize(36)}
          radius={responsiveRadius(10)}
          alignItems="center"
          justifyContent="center"
          backgroundColor="#F5F5F5"
        >
          <Icon size={responsiveIcon(16)} color={color} />
        </Box>

        {/* Label */}
        <Typo
          fontSize={responsiveFont(13)}
          color={theme.base[2]}
          style={{ flex: 1 }}
        >
          {label}
        </Typo>

        {/* Right side */}
        {isSwitch ? (
          <Switch
            value={enabled}
            onValueChange={handleSwitch}
            trackColor={{ false: "#E0E0E0", true: theme.primary[2] }}
            thumbColor="#fff"
          />
        ) : (
          <>
            {value && (
              <Typo fontSize={responsiveFont(12)} color={theme.base[5]}>
                {value}
              </Typo>
            )}
            <ChevronRight size={responsiveIcon(15)} color={theme.base[5]} />
          </>
        )}
      </Box>
    </TouchableOpacity>
  );
};
