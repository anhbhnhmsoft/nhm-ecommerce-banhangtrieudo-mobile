import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

interface Props {
  showProfile?: boolean;
}

export const HeaderApp = ({ showProfile = true }: Props) => {
  const theme = useThemeStore((s) => s.colors);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingHorizontal={responsiveSpacing(16)}
      paddingBottom={responsiveSpacingVertical(12)}
      backgroundColor={theme.primary[2]}
      paddingTop={insets.top + responsiveSpacingVertical(12)}
    >
      {/* Avatar */}
      {showProfile ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(app)/(authenticate)/profile")}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=47" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back-circle-outline"
            size={responsiveIcon(30)}
            color={theme.base[1]}
          />
        </TouchableOpacity>
      )}
      {/* Greeting */}
      <Box flex={1} marginLeft={responsiveSpacing(12)}>
        <Typo
          weight="700"
          fontSize={responsiveFont(16)}
          color={theme.base[1]}
          lineHeight={responsiveFont(22)}
        >
          {t("common.greeting", { name: "Linh" })}
        </Typo>
        <Typo
          fontSize={responsiveFont(12)}
          color={theme.base[1]}
          lineHeight={responsiveFont(18)}
          style={{ opacity: 0.85 }}
        >
          {t("common.greeting_subtitle")}
        </Typo>
      </Box>

      {/* Cart */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.iconBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <FontAwesome
          name="shopping-cart"
          size={responsiveIcon(22)}
          color={theme.base[1]}
        />
        <View style={[styles.badge, { backgroundColor: theme.secondary[1] }]}>
          <Typo
            fontSize={responsiveFont(9)}
            color={theme.base[1]}
            weight="700"
            textAlign="center"
          >
            2
          </Typo>
        </View>
      </TouchableOpacity>

      {/* Notification */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.iconBtn, { marginLeft: responsiveSpacing(16) }]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <FontAwesome
          name="bell"
          size={responsiveIcon(22)}
          color={theme.base[1]}
        />
        <View style={[styles.badge, { backgroundColor: theme.secondary[1] }]}>
          <Typo
            fontSize={responsiveFont(9)}
            color={theme.base[1]}
            weight="700"
            textAlign="center"
          >
            3
          </Typo>
        </View>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: responsiveSize(44),
    height: responsiveSize(44),
    borderRadius: responsiveSize(22),
  },
  iconBtn: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -responsiveSpacing(6),
    right: -responsiveSpacing(6),
    minWidth: responsiveSize(16),
    height: responsiveSize(16),
    borderRadius: responsiveSize(8),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: responsiveSpacing(3),
  },
});
