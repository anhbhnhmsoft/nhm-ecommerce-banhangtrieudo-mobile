import Box from "@/components/ui/box";
import {
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { BannerHome } from "@/modules/banner/components";
import { CategoryProduct, ProductCard } from "@/modules/products/components";
import { FEATURED_DATA, productCategories } from "@/modules/products/utils";
import { CategorySevices } from "@/modules/services/components";
import { serviceCategories } from "@/modules/services/utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";
import { FormInput, TextLabel } from "../ui";

export const HomeHeader = () => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);

  return (
    <Box>
      {/* Search Bar */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(12)}
      >
        <FormInput
          style={[styles.searchBar]}
          placeholder={t("home.search_placeholder")}
          leftIcon={
            <FontAwesome
              name="search"
              size={responsiveIcon(18)}
              color={theme.primary[2]}
            />
          }
        />
      </Box>

      {/* Banner */}
      <Box paddingHorizontal={responsiveSpacing(16)}>
        <BannerHome />
      </Box>

      {/* Dịch vụ chuyên nghiệp */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(20)}
      >
        <TextLabel title={t("home.section_explore")} />
        <FlatList
          data={productCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{
            paddingRight: responsiveSpacing(4),
          }}
          renderItem={({ item }) => <CategoryProduct item={item} />}
        />
      </Box>

      {/* Khám phá sản phẩm */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(20)}
      >
        <TextLabel title={t("home.section_professional")} />

        <FlatList
          data={serviceCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{
            paddingRight: responsiveSpacing(4),
          }}
          renderItem={({ item }) => <CategorySevices item={item} />}
        />
      </Box>

      {/* Sản phẩm nổi bật */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(12)}
      >
        <TextLabel
          title={t("home.section_featured")}
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
          paddingHorizontal: responsiveSpacing(16),
          paddingBottom: responsiveSpacingVertical(4),
        }}
        renderItem={({ item }) => <ProductCard item={item} />}
      />

      {/* Dịch vụ tiêu biểu */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(20)}
      >
        <TextLabel title={t("home.section_service")} />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: responsiveSpacing(30),
    paddingHorizontal: responsiveSpacing(16),
    height: responsiveSpacingVertical(46),
  },
});
