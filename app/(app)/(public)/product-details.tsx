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
import {
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
  ScrollText,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Zap,
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

const MOCK_PRODUCT = {
  id: "1",
  title: "Cafe Arabica Nguyên Chất Cao Cấp 500g",
  rating: 4.8,
  reviewCount: 234,
  price: "250.000 VND",
  originalPrice: "320.000 VND",
  isNew: true,
  isFeatured: true,
  description:
    "Cafe Arabica nguyên chất 100% từ vùng cao Đà Lạt. Hương thơm đặc trưng, vị chua nhẹ tự nhiên, không pha tạp chất. Rang xay theo đơn đặt hàng, đảm bảo độ tươi ngon tối đa. Phù hợp pha pour-over, cold brew hoặc máy espresso. Được thu hoạch thủ công, lựa chọn kỹ từng hạt chín đỏ, qua quá trình chế biến ướt truyền thống giúp giữ trọn hương vị tự nhiên.",
  images: [
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
  ],
  seller: {
    name: "Cafe Đà Lạt Official",
    phone: "0901 234 567",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    verified: true,
  },
};

export default function ProductDetail() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);
  const insets = useSafeAreaInsets();
  const [isLoading] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const p = MOCK_PRODUCT;

  const policies = [
    {
      icon: BadgeCheck,
      color: "#00A63E",
      title: t("product.policy.genuine"),
      desc: "100% nguồn gốc rõ ràng, cam kết chất lượng từ nhà sản xuất",
    },
    {
      icon: Truck,
      color: "#2B7FFF",
      title: t("product.policy.shipping"),
      desc: "Đóng gói cẩn thận, giao nhanh 2–4 ngày làm việc",
    },
    {
      icon: RefreshCcw,
      color: "#FF6900",
      title: t("product.policy.returns"),
      desc: "Hoàn tiền 100% nếu sản phẩm lỗi hoặc không đúng mô tả",
    },
    {
      icon: ShieldCheck,
      color: "#D4AF37",
      title: t("product.policy.secure_payment"),
      desc: "Hỗ trợ COD, chuyển khoản, ví điện tử — bảo mật tuyệt đối",
    },
    {
      icon: ScrollText,
      color: "#E7000B",
      title: t("product.policy.support"),
      desc: "Đội ngũ CSKH luôn sẵn sàng tư vấn và giải đáp mọi thắc mắc",
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
          images={p.images}
          isLoading={isLoading}
          isNew={p.isNew}
          isFeatured={p.isFeatured}
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
              {p.isNew && (
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
              {p.isFeatured && (
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
              {p.title}
            </Typo>

            {/* Rating */}
            <Box
              flexDirection="row"
              alignItems="center"
              marginBottom={responsiveSpacingVertical(12)}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={responsiveIcon(13)}
                  color="#D4AF37"
                  fill={i <= Math.floor(p.rating) ? "#D4AF37" : "transparent"}
                />
              ))}
              <Typo
                fontSize={responsiveFont(13)}
                color={theme.base[2]}
                weight="700"
                marginLeft={responsiveSpacing(6)}
              >
                {p.rating}
              </Typo>
              <Typo
                fontSize={responsiveFont(12)}
                color={theme.base[5]}
                marginLeft={responsiveSpacing(4)}
              >
                ({p.reviewCount} {t("common.reviews")})
              </Typo>
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
                {p.price}
              </Typo>
              <Typo
                fontSize={responsiveFont(13)}
                color={theme.base[5]}
                style={{ textDecorationLine: "line-through" }}
              >
                {p.originalPrice}
              </Typo>
            </Box>
          </BoxShadow>

          {/* ── Thông tin người bán ── */}
          <SellerInfo
            seller={p.seller}
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
            <TextLabel title={t("product.description_title")} />
            <Typo
              fontSize={responsiveFont(13)}
              color={theme.base[5]}
              lineHeight={responsiveFont(22)}
              numberOfLines={descExpanded ? undefined : 3}
            >
              {p.description}
            </Typo>

            <TouchableOpacity
              onPress={() => setDescExpanded(!descExpanded)}
              style={styles.expandBtn}
              activeOpacity={0.7}
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
              title={t("product.policy_title")}
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

      {/* ── Sticky Bottom Actions ── */}
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
          flexDirection="row"
          paddingHorizontal={responsiveSpacing(16)}
          paddingTop={responsiveSpacingVertical(12)}
          style={{ gap: responsiveSpacing(10) }}
        >
          {/* Thêm giỏ hàng */}
          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                flex: 1,
                backgroundColor: theme.primary[3],
                borderWidth: 1.5,
                borderColor: theme.primary[2],
              },
            ]}
            activeOpacity={0.8}
          >
            <ShoppingCart size={responsiveIcon(15)} color={theme.primary[2]} />
            <Typo
              fontSize={responsiveFont(13)}
              color={theme.primary[2]}
              weight="700"
              marginLeft={responsiveSpacing(6)}
            >
              {t("product.add_to_cart")}
            </Typo>
          </TouchableOpacity>

          {/* Mua ngay */}
          <TouchableOpacity
            style={[
              styles.actionBtn,
              { flex: 1, backgroundColor: theme.secondary[1] },
            ]}
            activeOpacity={0.8}
          >
            <Zap size={responsiveIcon(15)} color="#fff" fill="#fff" />
            <Typo
              fontSize={responsiveFont(13)}
              color="#fff"
              weight="700"
              marginLeft={responsiveSpacing(6)}
            >
              {t("product.buy_now")}
            </Typo>
          </TouchableOpacity>
        </Box>
      </View>
    </View>
  );
}

// ─── Styles — chỉ những gì Box/View không support ────────────────────────────

const styles = StyleSheet.create({
  actionBtn: {
    height: verticalScale(46),
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
  // TouchableOpacity không có alignSelf, gap prop
  expandBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: responsiveSpacingVertical(8),
    gap: responsiveSpacing(4),
  },
});
