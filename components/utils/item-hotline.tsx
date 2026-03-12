import { Icons } from "@/assets/icons";
import { Box, Typo } from "@/components/ui";
import {
  moderateScale,
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import * as WebBrowser from "expo-web-browser";
import { Phone } from "lucide-react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { Alert, Image, Linking, TouchableOpacity } from "react-native";

interface Props {
  item?: any;
  onPress?: () => void;
  color?: string;
}

export const HotlineItem: React.FC<Props> = ({ item, onPress, color }) => {
  const theme = useThemeStore((s) => s.colors);
  const accentColor = color ?? theme.secondary[2];

  const phone = useMemo(() => item?.phone, [item?.phone]);
  const isOpeningRef = useRef(false);

  const callPhone = useCallback(async () => {
    if (!phone) {
      Alert.alert("Thông báo", "Không có số điện thoại");
      return;
    }
    try {
      await Linking.openURL(`tel:${phone}`);
    } catch {
      Alert.alert("Lỗi", "Không thể thực hiện cuộc gọi");
    }
  }, [phone]);

  const openZalo = useCallback(async () => {
    if (isOpeningRef.current) return;
    if (!phone) {
      Alert.alert("Thông báo", "Không có số điện thoại");
      return;
    }
    isOpeningRef.current = true;
    try {
      await WebBrowser.openBrowserAsync(`https://zalo.me/${phone}`, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
        controlsColor: "#007AFF",
        dismissButtonStyle: "close",
      });
    } finally {
      setTimeout(() => {
        isOpeningRef.current = false;
      }, 1200);
    }
  }, [phone]);

  return (
    <Box
      backgroundColor={theme.base[1]} // #FFFFFF
      paddingHorizontal={responsiveSpacing(16)}
      paddingVertical={responsiveSpacingVertical(10)}
      radius={moderateScale(14)}
      marginBottom={responsiveSpacing(8)}
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <Box flexDirection="row" alignItems="center">
        {/* Phone call button */}
        <TouchableOpacity onPress={callPhone} activeOpacity={0.8}>
          <Box
            width={responsiveIcon(44)}
            height={responsiveIcon(44)}
            radius={moderateScale(12)}
            backgroundColor={accentColor}
            alignItems="center"
            justifyContent="center"
            marginRight={responsiveSpacing(12)}
          >
            <Phone size={responsiveIcon(20)} color="#fff" />
          </Box>
        </TouchableOpacity>

        {/* Info */}
        <Box flex={1}>
          <Typo
            fontSize={responsiveFont(14)}
            color={theme.base[2]} // #000
            weight="600"
            numberOfLines={1}
          >
            {item?.name || "Không có tên"}
          </Typo>
          <Typo
            fontSize={responsiveFont(12)}
            color={theme.base[5]} // #A1A1A1
            numberOfLines={1}
            marginBottom={responsiveSpacingVertical(2)}
          >
            {item?.name_user || "Không có tên"}
          </Typo>
          <Typo
            fontSize={responsiveFont(13)}
            weight="700"
            color={phone ? accentColor : theme.base[3]}
          >
            {phone || "Không có số liên hệ"}
          </Typo>
        </Box>

        {/* Zalo button */}
        <TouchableOpacity onPress={openZalo} activeOpacity={0.8}>
          <Box
            width={responsiveIcon(44)}
            height={responsiveIcon(44)}
            radius={moderateScale(12)}
            backgroundColor={accentColor}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              source={Icons.IconZalo}
              style={{
                width: responsiveIcon(24),
                height: responsiveIcon(24),
              }}
            />
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
