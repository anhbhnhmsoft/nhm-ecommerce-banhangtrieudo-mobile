import { HeaderApp } from "@/components/ui";
import { responsiveSpacingVertical } from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import {
  FeaturedNewsList,
  NewsItem,
  NewsletterBlock,
} from "@/modules/news/components";
import { FEATURED_NEWS, OTHER_NEWS } from "@/modules/news/utils/list-news-demo";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";

export default function NewsScreen() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);
  return (
    <View style={{ flex: 1, backgroundColor: theme.primary[1] }}>
      <HeaderApp />
      <FlatList
        contentContainerStyle={{ paddingBottom: responsiveSpacingVertical(80) }}
        data={OTHER_NEWS}
        renderItem={({ item, index }) => (
          <NewsItem
            item={item}
            isLast={index === OTHER_NEWS.length - 1}
            onPress={() => {}}
          />
        )}
        ListHeaderComponent={<FeaturedNewsList data={FEATURED_NEWS} t={t} />}
        ListFooterComponent={<NewsletterBlock />}
      />
    </View>
  );
}
