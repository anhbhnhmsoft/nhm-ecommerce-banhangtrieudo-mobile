import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";

export const HomeFooter = () => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);

  return (
    <Box
      paddingHorizontal={responsiveSpacing(16)}
      marginTop={responsiveSpacingVertical(20)}
      marginBottom={responsiveSpacingVertical(24)}
    >
      <Box
        radius={responsiveSpacing(16)}
        padding={responsiveSpacing(20)}
        alignItems="center"
        style={{
          backgroundColor: theme.primary[3],
          borderWidth: 1,
          borderColor: "#EDE8D8",
        }}
      >
        <Typo
          weight="700"
          fontSize={responsiveFont(16)}
          color={theme.base[2]}
          textAlign="center"
          marginBottom={responsiveSpacingVertical(8)}
        >
          {t("home.section_register")}
        </Typo>
        <Typo
          fontSize={responsiveFont(13)}
          color={theme.base[5]}
          textAlign="center"
          lineHeight={responsiveFont(20)}
          marginBottom={responsiveSpacingVertical(16)}
        >
          {t("home.register_desc")}
        </Typo>
        <TouchableOpacity
          style={[styles.registerBtn, { backgroundColor: theme.primary[2] }]}
          activeOpacity={0.85}
        >
          <Typo
            weight="700"
            fontSize={responsiveFont(15)}
            color={theme.base[1]}
          >
            {t("home.register_button")}
          </Typo>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  registerBtn: {
    width: "100%",
    height: responsiveSpacingVertical(50),
    borderRadius: responsiveSpacing(30),
    alignItems: "center",
    justifyContent: "center",
  },
});
