import { DefaultColor, SkeletonFade } from "@/components/ui";
import Box from "@/components/ui/box";
import {
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
  scale,
  SCREEN,
  verticalScale,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// ─── Dot ─────────────────────────────────────────────────────────────────────

const Dot = ({ isActive }: { isActive: boolean }) => {
  const theme = useThemeStore((s) => s.colors);
  const width = useSharedValue(isActive ? scale(20) : scale(8));
  const opacity = useSharedValue(isActive ? 1 : 0.3);

  useEffect(() => {
    width.value = withTiming(isActive ? scale(20) : scale(8), {
      duration: 250,
    });
    opacity.value = withTiming(isActive ? 1 : 0.3, { duration: 250 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[styles.dot, animatedStyle, { backgroundColor: theme.primary[2] }]}
    />
  );
};

// ─── Carousel ─────────────────────────────────────────────────────────────────

interface CarouselProps {
  images: string[];
  isLoading: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const Carousel = ({
  images,
  isLoading,
  isNew,
  isFeatured,
}: CarouselProps) => {
  const theme = useThemeStore((s) => s.colors);
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback((e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN.width);
    setActiveIndex(index);
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setActiveIndex(index);
      }
    },
    [images.length],
  );

  if (isLoading) {
    return <SkeletonFade width={SCREEN.width} height={verticalScale(360)} />;
  }

  return (
    <View style={{ backgroundColor: DefaultColor.primary[3] }}>
      {/* Main image area */}
      <View>
        <FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ImageBackground
              source={{ uri: item }}
              style={styles.mainImage}
              resizeMode="contain"
            />
          )}
        />

        {/* Arrows */}
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={() => scrollToIndex(activeIndex - 1)}
            style={[styles.arrowBtn, { backgroundColor: theme.base[1] }]}
          >
            <ChevronLeft size={responsiveIcon(20)} color={theme.base[2]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => scrollToIndex(activeIndex + 1)}
            style={[styles.arrowBtn, { backgroundColor: theme.base[1] }]}
          >
            <ChevronRight size={responsiveIcon(20)} color={theme.base[2]} />
          </TouchableOpacity>
        </View>

        {/* Dots */}
        <View style={styles.dotArea}>
          {images.map((_, i) => (
            <Dot key={i} isActive={activeIndex === i} />
          ))}
        </View>
      </View>

      {/* Thumbnails */}
      <Box backgroundColor={theme.base[1]}>
        <FlatList
          data={images}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: responsiveSpacing(10),
            gap: responsiveSpacing(10),
          }}
          renderItem={({ item: img, index }) => (
            <TouchableOpacity
              onPress={() => scrollToIndex(index)}
              style={[
                styles.thumbnailBox,
                {
                  borderColor:
                    activeIndex === index ? theme.primary[2] : "transparent",
                },
              ]}
            >
              <Image source={{ uri: img }} style={styles.thumbnail} />
            </TouchableOpacity>
          )}
        />
      </Box>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  mainImage: {
    width: SCREEN.width,
    height: verticalScale(360),
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveSpacing(16),
  },
  arrowBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeNew: {
    position: "absolute",
    top: responsiveSpacingVertical(12),
    left: responsiveSpacing(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B7FFF",
    paddingHorizontal: responsiveSpacing(8),
    paddingVertical: responsiveSpacingVertical(4),
    borderRadius: 999,
  },
  badgeFeatured: {
    position: "absolute",
    top: responsiveSpacingVertical(12),
    right: responsiveSpacing(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D4AF37",
    paddingHorizontal: responsiveSpacing(8),
    paddingVertical: responsiveSpacingVertical(4),
    borderRadius: 999,
  },
  dotArea: {
    position: "absolute",
    bottom: responsiveSpacing(12),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    height: scale(8),
    borderRadius: 10,
  },
  thumbnailContainer: {
    flexDirection: "row",
    gap: 10,
  },
  thumbnailBox: {
    borderWidth: 2,
    borderRadius: scale(10),
    overflow: "hidden",
  },
  thumbnail: {
    width: scale(64),
    height: scale(64),
  },
});
