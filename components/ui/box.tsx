import React, { memo, ReactNode } from "react";
import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";

interface BoxProps {
  children?: ReactNode;
  flex?: number;
  flexDirection?:
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse"
    | undefined;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  backgroundColor?: string;
  opacity?: number;
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  reverse?: boolean;
  row?: boolean;
  center?: boolean;
  position?: "absolute" | "relative" | undefined;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  height?: DimensionValue;
  width?: DimensionValue;
  size?: number;
  maxHeight?: number;
  minHeight?: number;
  maxWidth?: number;
  minWidth?: number;
  radius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  overflow?: "visible" | "hidden" | "scroll";
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
  borderWidth?: number;
  borderColor?: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  style?: StyleProp<ViewStyle>;
  zIndex?: number;
}

const Box = (props: BoxProps) => {
  const {
    children,
    flex,
    alignItems,
    backgroundColor,
    opacity,
    style,
    margin,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    padding,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    radius,
    flexDirection,
    borderWidth,
    borderColor,
    marginVertical,
    marginHorizontal,
    alignSelf,
    justifyContent,
    position = undefined,
    top = undefined,
    right = undefined,
    bottom = undefined,
    left = undefined,
    zIndex,
    overflow,
    width,
    height,
    topLeftRadius,
    topRightRadius,
    bottomLeftRadius,
    bottomRightRadius,
    flexWrap,
  } = props;

  return (
    <View
      style={[
        style,
        {
          flex: flex ?? 0,
          flexDirection: flexDirection ?? "column",
          alignItems: alignItems ?? undefined,
          backgroundColor: backgroundColor ?? undefined,
          opacity: opacity ?? 1,
          margin: margin ?? null,
          marginBottom: marginBottom ?? null,
          marginTop: marginTop ?? null,
          marginLeft: marginLeft ?? null,
          marginRight: marginRight ?? null,
          padding: padding ?? null,
          paddingBottom: paddingBottom ?? null,
          paddingTop: paddingTop ?? null,
          paddingLeft: paddingLeft ?? null,
          paddingRight: paddingRight ?? null,
          paddingHorizontal: paddingHorizontal ?? null,
          paddingVertical: paddingVertical ?? null,
          borderRadius: radius ?? 0,
          borderWidth: borderWidth ?? 0,
          borderColor: borderColor ?? "#FFFFFF",
          marginHorizontal: marginHorizontal ?? 0,
          marginVertical: marginVertical ?? 0,
          alignSelf: alignSelf ?? undefined,
          justifyContent: justifyContent ?? undefined,
          position: position,
          top: top,
          right: right,
          left: left,
          bottom: bottom,
          zIndex: zIndex ?? 0,
          overflow: overflow ?? undefined,
          width: width ?? undefined,
          height: height ?? undefined,
          borderTopLeftRadius: topLeftRadius ?? radius ?? 0,
          borderTopRightRadius: topRightRadius ?? radius ?? 0,
          borderBottomLeftRadius: bottomLeftRadius ?? radius ?? 0,
          borderBottomRightRadius: bottomRightRadius ?? radius ?? 0,
          flexWrap: flexWrap ?? undefined,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default memo(Box);
