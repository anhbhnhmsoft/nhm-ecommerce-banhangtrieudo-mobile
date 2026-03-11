import { moderateScale, responsiveSpacingVertical } from "@/lib/utils";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export const BannerHome = () => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.wrapper}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
        }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: moderateScale(30),
    overflow: "hidden",
    height: responsiveSpacingVertical(160),
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
