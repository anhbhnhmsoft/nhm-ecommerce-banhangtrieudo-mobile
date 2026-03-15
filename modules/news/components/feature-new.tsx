import { Box, Typo } from "@/components/ui";
import {
  moderateScale,
  responsiveFont,
  responsiveIcon,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
  SCREEN,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, CalendarDays, Clock } from "lucide-react-native";
import { ImageBackground, TouchableOpacity } from "react-native";

export const FeaturedCard = ({
  item,
  onPress,
}: {
  item: any;
  onPress?: () => void;
}) => {
  const theme = useThemeStore((s) => s.colors);

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={{
        width: SCREEN.width,
        height: responsiveSize(230),
      }}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={{
          width: SCREEN.width - responsiveSpacing(32),
          height: responsiveSize(230),
          borderRadius: moderateScale(20),
          overflow: "hidden",
        }}
        imageStyle={{
          borderRadius: moderateScale(20),
        }}
      >
        {/* Gradient overlay bottom-to-top */}
        <LinearGradient
          colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0.45)", "rgba(0,0,0,0)"]}
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />

        {/* Content overlay */}
        <Box flex={1} padding={responsiveSpacing(16)}>
          {/* Tag — top left absolute */}
          <Box
            position="absolute"
            top={responsiveSpacing(14)}
            left={responsiveSpacing(14)}
            backgroundColor={item.tagColor ?? "#017230"}
            paddingHorizontal={responsiveSpacing(10)}
            paddingVertical={responsiveSpacingVertical(4)}
            radius={moderateScale(8)}
            zIndex={10}
          >
            <Typo fontSize={responsiveFont(11)} color="#fff" weight="700">
              {item.tag ?? "Nổi bật"}
            </Typo>
          </Box>

          {/* Bottom content — pushed to end */}
          <Box flex={1} justifyContent="flex-end">
            {/* Title */}
            <Typo
              fontSize={responsiveFont(16)}
              color="#fff"
              weight="700"
              lineHeight={responsiveFont(24)}
              marginBottom={responsiveSpacingVertical(4)}
              numberOfLines={2}
            >
              {item.title}
            </Typo>

            {/* Excerpt / Description */}
            <Typo
              fontSize={responsiveFont(13)}
              color="rgba(255,255,255,0.75)"
              numberOfLines={2}
              marginBottom={responsiveSpacingVertical(12)}
            >
              {item.excerpt ?? item.description}
            </Typo>

            {/* Meta row + CTA */}
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* Date & ReadTime */}
              <Box
                flexDirection="row"
                alignItems="center"
                style={{ gap: responsiveSpacing(14) }}
              >
                {/* Date */}
                <Box
                  flexDirection="row"
                  alignItems="center"
                  style={{ gap: responsiveSpacing(5) }}
                >
                  <CalendarDays
                    size={responsiveIcon(13)}
                    color="rgba(255,255,255,0.65)"
                  />
                  <Typo
                    fontSize={responsiveFont(12)}
                    color="rgba(255,255,255,0.65)"
                  >
                    {item.date}
                  </Typo>
                </Box>

                {/* ReadTime (optional) */}
                {item.readTime && (
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    style={{ gap: responsiveSpacing(5) }}
                  >
                    <Clock
                      size={responsiveIcon(13)}
                      color="rgba(255,255,255,0.65)"
                    />
                    <Typo
                      fontSize={responsiveFont(12)}
                      color="rgba(255,255,255,0.65)"
                    >
                      {item.readTime}
                    </Typo>
                  </Box>
                )}
              </Box>

              {/* Read More CTA — dùng Box thay TouchableOpacity để tận dụng props */}
              <Box
                flexDirection="row"
                alignItems="center"
                backgroundColor={theme?.primary?.[2] ?? "#017230"}
                paddingHorizontal={responsiveSpacing(12)}
                paddingVertical={responsiveSpacingVertical(7)}
                radius={moderateScale(8)}
                style={{ gap: responsiveSpacing(5) }}
              >
                <Typo fontSize={responsiveFont(13)} color="#fff" weight="600">
                  Đọc thêm
                </Typo>
                <ArrowRight size={responsiveIcon(13)} color="#fff" />
              </Box>
            </Box>
          </Box>
        </Box>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const DotIndicator = ({
  total,
  active,
}: {
  total: number;
  active: number;
}) => {
  const theme = useThemeStore((s) => s.colors);

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      marginTop={responsiveSpacingVertical(10)}
      style={{ gap: responsiveSpacing(6) }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <Box
          key={i}
          height={responsiveSize(6)}
          width={i === active ? responsiveSize(20) : responsiveSize(6)}
          radius={999}
          backgroundColor={
            i === active ? theme?.primary?.[2] : theme?.base?.[3]
          }
        />
      ))}
    </Box>
  );
};
