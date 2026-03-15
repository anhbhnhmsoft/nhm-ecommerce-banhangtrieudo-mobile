import { Box, BoxShadow, Typo } from "@/components/ui";
import {
  moderateScale,
  responsiveFont,
  responsiveIcon,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { CalendarDays, ChevronRight } from "lucide-react-native";
import { Image, TouchableOpacity } from "react-native";

export const NewsItem = ({
  item,
  onPress,
  isLast,
}: {
  item: any;
  onPress?: () => void;
  isLast: boolean;
}) => {
  const theme = useThemeStore((s) => s.colors);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{
        paddingHorizontal: responsiveSpacing(16),
        paddingVertical: responsiveSpacingVertical(6),
      }}
    >
      <BoxShadow
        radius={moderateScale(16)}
        padding={responsiveSpacing(12)}
        styleContent={{ flexDirection: "row", gap: responsiveSpacing(12) }}
      >
        {/* Thumbnail with tag badge overlay */}
        <Box
          position="relative"
          radius={moderateScale(12)}
          overflow="hidden"
          style={{ flexShrink: 0 }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: responsiveSize(95),
              height: responsiveSize(95),
              borderRadius: moderateScale(12),
            }}
          />
        </Box>

        {/* Right content */}
        <Box flex={1} justifyContent="space-between">
          {/* Title */}
          <Typo
            fontSize={responsiveFont(13)}
            color={theme.base[2]}
            weight="700"
            lineHeight={responsiveFont(20)}
            numberOfLines={2}
            marginBottom={responsiveSpacingVertical(4)}
          >
            {item.title}
          </Typo>

          {/* Excerpt */}
          <Typo
            fontSize={responsiveFont(11)}
            color={theme.base[5]}
            numberOfLines={2}
            lineHeight={responsiveFont(16)}
            marginBottom={responsiveSpacingVertical(8)}
          >
            {item.excerpt}
          </Typo>

          {/* Footer: date + arrow */}
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              flexDirection="row"
              alignItems="center"
              style={{ gap: responsiveSpacing(4) }}
            >
              <CalendarDays size={responsiveIcon(11)} color={theme.base[5]} />
              <Typo fontSize={responsiveFont(11)} color={theme.base[5]}>
                {item.date}
              </Typo>
            </Box>

            {/* Read indicator */}
            <Box
              flexDirection="row"
              alignItems="center"
              backgroundColor={theme.base[4]}
              paddingHorizontal={responsiveSpacing(8)}
              paddingVertical={responsiveSpacingVertical(3)}
              radius={999}
              style={{ gap: responsiveSpacing(2) }}
            >
              <Typo
                fontSize={responsiveFont(10)}
                color={theme.base[5]}
                weight="600"
              >
                Đọc
              </Typo>
              <ChevronRight size={responsiveIcon(10)} color={theme.base[5]} />
            </Box>
          </Box>
        </Box>
      </BoxShadow>

      {/* Divider */}
      {!isLast && (
        <Box
          height={1}
          backgroundColor={theme.base[4]}
          marginTop={responsiveSpacingVertical(4)}
          marginHorizontal={responsiveSpacing(4)}
          opacity={0.5}
        />
      )}
    </TouchableOpacity>
  );
};
