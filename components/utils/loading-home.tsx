import {
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import React from "react";
import { ScrollView } from "react-native";
import Box from "../ui/box";
import SkeletonFade from "../ui/skeleton-fade";

export default function LoadingHome() {
  return (
    <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
      {/* Search bar */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(12)}
      >
        <SkeletonFade
          width="100%"
          height={responsiveSpacingVertical(46)}
          borderRadius={30}
        />
      </Box>

      {/* Banner */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(14)}
      >
        <SkeletonFade
          width="100%"
          height={responsiveSpacingVertical(160)}
          borderRadius={16}
        />
      </Box>

      {/* Category row x2 */}
      {[1, 2].map((row) => (
        <Box
          key={row}
          paddingHorizontal={responsiveSpacing(16)}
          marginTop={responsiveSpacingVertical(20)}
        >
          <SkeletonFade width={130} height={18} borderRadius={4} />
          <Box flexDirection="row" marginTop={responsiveSpacingVertical(12)}>
            {[1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                alignItems="center"
                marginRight={responsiveSpacing(16)}
              >
                <SkeletonFade
                  width={responsiveSize(90)}
                  height={responsiveSize(90)}
                  borderRadius={16}
                />
                <SkeletonFade
                  width={60}
                  height={12}
                  borderRadius={4}
                  marginTop={6}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}

      {/* Featured title */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(20)}
      >
        <SkeletonFade width={140} height={18} borderRadius={4} />
      </Box>

      {/* Featured cards horizontal */}
      <Box
        flexDirection="row"
        marginTop={responsiveSpacingVertical(12)}
        paddingLeft={responsiveSpacing(16)}
      >
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            width={responsiveSize(170)}
            radius={responsiveSpacing(14)}
            overflow="hidden"
            marginRight={responsiveSpacing(12)}
          >
            <SkeletonFade
              width={responsiveSize(170)}
              height={responsiveSpacingVertical(120)}
            />
            <Box padding={responsiveSpacing(10)}>
              <SkeletonFade width="90%" height={14} borderRadius={4} />
              <SkeletonFade
                width="60%"
                height={14}
                borderRadius={4}
                marginTop={6}
              />
              <SkeletonFade
                width="50%"
                height={12}
                borderRadius={4}
                marginTop={6}
              />
              <SkeletonFade
                width="100%"
                height={32}
                borderRadius={8}
                marginTop={8}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Service title */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(20)}
        marginBottom={responsiveSpacingVertical(12)}
      >
        <SkeletonFade width={140} height={18} borderRadius={4} />
      </Box>

      {/* Service cards */}
      {[1, 2].map((i) => (
        <Box
          key={i}
          flexDirection="row"
          radius={responsiveSpacing(14)}
          overflow="hidden"
          marginBottom={responsiveSpacingVertical(12)}
          paddingHorizontal={responsiveSpacing(16)}
        >
          <SkeletonFade
            width={responsiveSize(110)}
            height={responsiveSpacingVertical(110)}
          />
          <Box flex={1} padding={responsiveSpacing(12)} justifyContent="center">
            <SkeletonFade width="90%" height={14} borderRadius={4} />
            <SkeletonFade
              width="60%"
              height={14}
              borderRadius={4}
              marginTop={6}
            />
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginTop={responsiveSpacingVertical(8)}
            >
              <SkeletonFade width={80} height={12} borderRadius={4} />
              <SkeletonFade width={60} height={28} borderRadius={8} />
            </Box>
          </Box>
        </Box>
      ))}
    </ScrollView>
  );
}
