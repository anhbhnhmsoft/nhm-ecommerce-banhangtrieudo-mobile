import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// ─── Baseline ────────────────────────────────────────────────────────────────
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// ─── Device Detection ────────────────────────────────────────────────────────
export const isPad = Platform.OS === "ios" && Math.min(width, height) >= 768;
export const isAndroidTablet =
  Platform.OS === "android" && Math.min(width, height) >= 600;
export const isTablet = isPad || isAndroidTablet;

// ─── Screen ──────────────────────────────────────────────────────────────────
export const SCREEN = { width, height };

// ─── Scale Functions ─────────────────────────────────────────────────────────

/** Scale ngang — dùng cho padding, margin, width */
export const scale = (size: number): number => {
  const ratio = width / guidelineBaseWidth;
  // Tablet: giới hạn scale tối đa 1.4 để tránh layout quá to
  const clampedRatio = isTablet ? Math.min(ratio, 1.4) : ratio;
  return size * clampedRatio;
};

/** Scale dọc — dùng cho height, paddingVertical */
export const verticalScale = (size: number): number => {
  const ratio = height / guidelineBaseHeight;
  const clampedRatio = isTablet ? Math.min(ratio, 1.4) : ratio;
  return size * clampedRatio;
};

/**
 * Moderate scale — dùng cho font, icon, border radius
 * factor: 0 = không scale, 1 = scale full
 * Tablet dùng factor thấp hơn để tránh quá to
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  const tabletFactor = isTablet ? factor * 0.4 : factor;
  return size + (scale(size) - size) * tabletFactor;
};

/** Vertical moderate — dùng cho height của button, input */
export const moderateVerticalScale = (size: number, factor = 0.5): number => {
  const tabletFactor = isTablet ? factor * 0.4 : factor;
  return size + (verticalScale(size) - size) * tabletFactor;
};

// ─── Responsive Helpers ───────────────────────────────────────────────────────

/** Spacing ngang: padding, margin, width */
export const responsiveSpacing = (value: number): number => scale(value);

/** Spacing dọc: paddingVertical, height */
export const responsiveSpacingVertical = (value: number): number =>
  moderateVerticalScale(value, 0.5);

/** Font size */
export const responsiveFont = (value: number): number =>
  moderateScale(value, 0.4);

/** Icon size */
export const responsiveIcon = (size: number): number =>
  moderateScale(size, 0.45);

/**
 * Size cố định (ảnh, avatar, card width)
 * Scale ít hơn để tránh quá to trên tablet
 */
export const responsiveSize = (size: number): number =>
  moderateScale(size, 0.3);

/**
 * Border radius
 */
export const responsiveRadius = (size: number): number =>
  moderateScale(size, 0.3);

/**
 * Normalize theo pixel density
 * Dùng cho border width, shadow
 */
export const normalize = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel(moderateScale(size, 0.25)));
