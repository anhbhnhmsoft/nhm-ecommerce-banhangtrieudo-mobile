import { TextLabel, Typo } from "@/components/ui";
import Box from "@/components/ui/box";
import {
  responsiveFont,
  responsiveIcon,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { TFunction } from "i18next";
import { ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { DotIndicator, FeaturedCard } from "./feature-new";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PADDING_H = responsiveSpacing(16);
const CARD_GAP = responsiveSpacing(12);

export interface FeaturedNewsItem {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

interface FeaturedNewsListProps {
  data: FeaturedNewsItem[];
  onItemPress?: (item: FeaturedNewsItem) => void;
  t: TFunction;
}

export const FeaturedNewsList = ({
  data,
  onItemPress,
  t,
}: FeaturedNewsListProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box marginBottom={responsiveSpacingVertical(4)}>
      {/* Section Title */}
      <Box>
        <Box
          paddingHorizontal={PADDING_H}
          marginBottom={responsiveSpacingVertical(12)}
        >
          <TextLabel title={t("news.featured_title")} />
        </Box>
        <Carousel
          width={SCREEN_WIDTH}
          height={responsiveSize(240)}
          data={data}
          loop={false}
          pagingEnabled
          snapEnabled
          onProgressChange={(_, absoluteProgress) => {
            setActiveIndex(Math.round(absoluteProgress));
          }}
          renderItem={({ item }) => (
            <Box flex={1} paddingLeft={PADDING_H} paddingRight={CARD_GAP}>
              <FeaturedCard item={item} onPress={() => onItemPress?.(item)} />
            </Box>
          )}
        />

        {/* Dot Indicator */}
        <DotIndicator total={data.length} active={activeIndex} />
      </Box>

      <Box
        paddingHorizontal={PADDING_H}
        marginTop={responsiveSpacingVertical(12)}
        flexDirection="row"
      >
        <Box flex={1}>
          <TextLabel title={t("news.other_title")} />
        </Box>
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
          <Box
            flexDirection="row"
            alignItems="center"
            style={{ gap: responsiveSpacing(3) }}
          >
            <Typo fontSize={responsiveFont(13)} color={"#017230"} weight="600">
              {t("common.see_all")}
            </Typo>
            <ChevronRight size={responsiveIcon(13)} color={"#017230"} />
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
