import { BoxShadow, DefaultColor, HeaderApp, TextLabel } from "@/components/ui";
import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import { SellerInfo } from "@/components/utils";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
  verticalScale,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { Carousel } from "@/modules/products/components/list-carose-image-product";
import { router } from "expo-router";
import {
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_SERVICE = {
  id: "1",
  title: "Chăm Sóc Da Mặt Chuyên Sâu Premium",
  category: "Chăm sóc da",
  rating: 4.9,
  reviewCount: 186,
  duration: "90 phút",
  price: "450.000 VND",
  originalPrice: "600.000 VND",
  isNew: true,
  isFeatured: true,
  description:
    "Liệu trình chăm sóc da mặt chuyên sâu với công nghệ hiện đại, giúp làm sạch sâu, dưỡng ẩm và tái tạo da. Sử dụng các sản phẩm cao cấp từ Pháp, phù hợp với mọi loại da. Sau liệu trình, da trở nên mềm mịn, căng bóng và rạng rỡ. Được thực hiện bởi chuyên viên có chứng chỉ quốc tế với hơn 5 năm kinh nghiệm.",
  images: [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800",
  ],
  seller: {
    name: "Bella Spa & Beauty",
    phone: "0901 234 567",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
    verified: true,
  },
  address: "123 Nguyễn Huệ, Q.1, TP.HCM",
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ServiceDetail() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);
  const insets = useSafeAreaInsets();
  const [isLoading] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const s = MOCK_SERVICE;

  const policies = [
    {
      icon: BadgeCheck,
      color: "#00A63E",
      title: "Chuyên viên được đào tạo bài bản",
      desc: "100% chuyên viên có chứng chỉ quốc tế, kinh nghiệm từ 3 năm trở lên",
    },
    {
      icon: ShieldCheck,
      color: "#D4AF37",
      title: "Sản phẩm cao cấp, an toàn",
      desc: "Sử dụng mỹ phẩm nhập khẩu chính hãng, kiểm định da liễu",
    },
    {
      icon: Clock,
      color: "#2B7FFF",
      title: "Đúng giờ, tôn trọng thời gian",
      desc: "Cam kết phục vụ đúng lịch hẹn, không để khách chờ",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: DefaultColor.primary[3] }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: responsiveSpacingVertical(100),
        }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderApp showProfile={false} />

        {/* Carousel — không sửa */}
        <Carousel
          images={s.images}
          isLoading={isLoading}
          isNew={s.isNew}
          isFeatured={s.isFeatured}
        />

        <Box
          paddingHorizontal={responsiveSpacing(16)}
          paddingTop={responsiveSpacingVertical(16)}
        >
          {/* ── Info Card ── */}
          <BoxShadow
            radius={responsiveRadius(20)}
            padding={responsiveSpacing(16)}
            style={{ marginBottom: responsiveSpacingVertical(12) }}
          >
            {/* Badges */}
            <Box
              flexDirection="row"
              marginBottom={responsiveSpacingVertical(10)}
              style={{ gap: responsiveSpacing(8) }}
            >
              <Box
                flexDirection="row"
                alignItems="center"
                backgroundColor="#E8F4FD"
                paddingHorizontal={responsiveSpacing(8)}
                paddingVertical={responsiveSpacingVertical(3)}
                radius={999}
              >
                <Typo
                  fontSize={responsiveFont(10)}
                  color="#2B7FFF"
                  weight="600"
                >
                  {s.category}
                </Typo>
              </Box>

              {s.isNew && (
                <Box
                  flexDirection="row"
                  alignItems="center"
                  backgroundColor="#2B7FFF"
                  paddingHorizontal={responsiveSpacing(8)}
                  paddingVertical={responsiveSpacingVertical(3)}
                  radius={999}
                >
                  <Sparkles
                    size={responsiveIcon(10)}
                    color="#fff"
                    fill="#fff"
                  />
                  <Typo
                    fontSize={responsiveFont(10)}
                    color="#fff"
                    weight="700"
                    marginLeft={responsiveSpacing(3)}
                  >
                    {t("product.new")}
                  </Typo>
                </Box>
              )}

              {s.isFeatured && (
                <Box
                  flexDirection="row"
                  alignItems="center"
                  backgroundColor="#D4AF37"
                  paddingHorizontal={responsiveSpacing(8)}
                  paddingVertical={responsiveSpacingVertical(3)}
                  radius={999}
                >
                  <Star size={responsiveIcon(10)} color="#fff" fill="#fff" />
                  <Typo
                    fontSize={responsiveFont(10)}
                    color="#fff"
                    weight="700"
                    marginLeft={responsiveSpacing(3)}
                  >
                    {t("product.featured")}
                  </Typo>
                </Box>
              )}
            </Box>

            {/* Title */}
            <Typo
              fontSize={responsiveFont(18)}
              color={theme.base[2]}
              weight="700"
              lineHeight={responsiveFont(26)}
              marginBottom={responsiveSpacingVertical(10)}
            >
              {s.title}
            </Typo>

            {/* Rating + Duration */}
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={responsiveSpacingVertical(12)}
            >
              <Box flexDirection="row" alignItems="center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={responsiveIcon(13)}
                    color="#D4AF37"
                    fill={i <= Math.floor(s.rating) ? "#D4AF37" : "transparent"}
                  />
                ))}
                <Typo
                  fontSize={responsiveFont(13)}
                  color={theme.base[2]}
                  weight="700"
                  marginLeft={responsiveSpacing(6)}
                >
                  {s.rating}
                </Typo>
                <Typo
                  fontSize={responsiveFont(12)}
                  color={theme.base[5]}
                  marginLeft={responsiveSpacing(4)}
                >
                  ({s.reviewCount} {t("common.reviews")})
                </Typo>
              </Box>

              <Box
                flexDirection="row"
                alignItems="center"
                backgroundColor="#FFF5E6"
                paddingHorizontal={responsiveSpacing(10)}
                paddingVertical={responsiveSpacingVertical(4)}
                radius={999}
              >
                <Clock size={responsiveIcon(12)} color="#FF6900" />
                <Typo
                  fontSize={responsiveFont(12)}
                  color="#FF6900"
                  weight="600"
                  marginLeft={responsiveSpacing(4)}
                >
                  {s.duration}
                </Typo>
              </Box>
            </Box>

            {/* Price */}
            <Box
              flexDirection="row"
              alignItems="center"
              style={{ gap: responsiveSpacing(10) }}
            >
              <Typo
                fontSize={responsiveFont(22)}
                color={theme.primary[2]}
                weight="700"
              >
                {s.price}
              </Typo>
              <Typo
                fontSize={responsiveFont(13)}
                color={theme.base[5]}
                style={{ textDecorationLine: "line-through" }}
              >
                {s.originalPrice}
              </Typo>
              <Box
                backgroundColor="#FEF2F2"
                paddingHorizontal={responsiveSpacing(8)}
                paddingVertical={responsiveSpacingVertical(2)}
                radius={999}
              >
                <Typo
                  fontSize={responsiveFont(11)}
                  color="#E7000B"
                  weight="700"
                >
                  -25%
                </Typo>
              </Box>
            </Box>
          </BoxShadow>

          {/* ── Thông tin người bán ── */}
          <SellerInfo
            seller={s.seller}
            address={s.address}
            onContact={() => {
              /* TODO: gọi điện */
            }}
          />

          {/* ── Mô tả (rút gọn / xem thêm) ── */}
          <BoxShadow
            radius={responsiveRadius(20)}
            padding={responsiveSpacing(16)}
            style={{ marginBottom: responsiveSpacingVertical(12) }}
          >
            <TextLabel title={t("services.description_title")} />
            <Typo
              fontSize={responsiveFont(13)}
              color={theme.base[5]}
              lineHeight={responsiveFont(22)}
              numberOfLines={descExpanded ? undefined : 3}
            >
              {s.description}
            </Typo>

            <TouchableOpacity
              onPress={() => setDescExpanded(!descExpanded)}
              activeOpacity={0.7}
              style={styles.expandBtn}
            >
              <Typo
                fontSize={responsiveFont(12)}
                color={theme.primary[2]}
                weight="600"
              >
                {descExpanded ? t("common.collapse") : t("common.see_more")}
              </Typo>
              {descExpanded ? (
                <ChevronUp size={responsiveIcon(14)} color={theme.primary[2]} />
              ) : (
                <ChevronDown
                  size={responsiveIcon(14)}
                  color={theme.primary[2]}
                />
              )}
            </TouchableOpacity>
          </BoxShadow>

          {/* ── Chính sách ── */}
          <BoxShadow
            radius={responsiveRadius(20)}
            padding={responsiveSpacing(16)}
            style={{ marginBottom: responsiveSpacingVertical(32) }}
          >
            <TextLabel
              iconLeft={
                <ShieldCheck
                  size={responsiveIcon(18)}
                  color={theme.primary[2]}
                />
              }
              title={t("services.policy_title")}
            />
            {policies.map((policy, i) => {
              const Icon = policy.icon;
              return (
                <Box
                  key={i}
                  flexDirection="row"
                  alignItems="flex-start"
                  marginBottom={
                    i < policies.length - 1 ? responsiveSpacingVertical(14) : 0
                  }
                >
                  <Box
                    width={responsiveSize(36)}
                    height={responsiveSize(36)}
                    radius={999}
                    alignItems="center"
                    justifyContent="center"
                    style={{ backgroundColor: policy.color + "18" }}
                  >
                    <Icon size={responsiveIcon(16)} color={policy.color} />
                  </Box>
                  <Box flex={1} marginLeft={responsiveSpacing(12)}>
                    <Typo
                      fontSize={responsiveFont(13)}
                      color={theme.base[2]}
                      weight="600"
                      lineHeight={responsiveFont(20)}
                    >
                      {policy.title}
                    </Typo>
                    <Typo
                      fontSize={responsiveFont(12)}
                      color={theme.base[5]}
                      lineHeight={responsiveFont(18)}
                      marginTop={responsiveSpacingVertical(2)}
                    >
                      {policy.desc}
                    </Typo>
                  </Box>
                </Box>
              );
            })}
          </BoxShadow>
        </Box>
      </ScrollView>

      {/* ── Sticky Bottom ── */}
      <View
        style={[
          styles.stickyBottom,
          {
            backgroundColor: theme.base[1],
            paddingBottom: insets.bottom + responsiveSpacingVertical(12),
          },
        ]}
      >
        <Box
          paddingHorizontal={responsiveSpacing(16)}
          paddingTop={responsiveSpacingVertical(12)}
        >
          <TouchableOpacity
            style={[styles.bookBtn, { backgroundColor: theme.secondary[1] }]}
            activeOpacity={0.8}
            onPress={() =>
              router.push("/(app)/(authenticate)/booking-services")
            }
          >
            <CalendarDays size={responsiveIcon(16)} color="#fff" />
            <Typo
              fontSize={responsiveFont(14)}
              color="#fff"
              weight="700"
              marginLeft={responsiveSpacing(8)}
            >
              {t("services.book_now")}
            </Typo>
          </TouchableOpacity>
        </Box>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookBtn: {
    height: verticalScale(50),
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stickyBottom: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 10 },
    }),
  },
  expandBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: responsiveSpacingVertical(8),
    gap: responsiveSpacing(4),
  },
});
