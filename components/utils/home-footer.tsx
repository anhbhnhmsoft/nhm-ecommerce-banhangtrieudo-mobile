import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { ProductCard } from "@/modules/products/components";
import { FEATURED_DATA } from "@/modules/products/utils";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { TextLabel } from "../ui";

export const HomeFooter = () => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);

  return (
    <Box
      paddingHorizontal={responsiveSpacing(16)}
      marginTop={responsiveSpacingVertical(20)}
      marginBottom={responsiveSpacingVertical(24)}
    >
      <Box marginTop={responsiveSpacingVertical(12)}>
        <TextLabel
          title={t("home.consumer_products")}
          onMore={() => {}}
          moreLabel={t("home.section_featured_more")}
        />
      </Box>
      <FlatList
        data={FEATURED_DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{
          paddingBottom: responsiveSpacingVertical(4),
        }}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
      <Box
        radius={responsiveSpacing(16)}
        padding={responsiveSpacing(20)}
        alignItems="center"
        backgroundColor={theme.primary[3]}
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
          onPress={() => router.push("/(app)/(customer)/seller-registration")}
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
