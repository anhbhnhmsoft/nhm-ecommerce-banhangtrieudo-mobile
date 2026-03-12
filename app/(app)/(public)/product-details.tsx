import { BoxShadow, DefaultColor, HeaderApp, TextLabel } from "@/components/ui";
import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
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
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

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
    "Cafe Arabica nguyên chất 100% từ vùng cao Đà Lạt. Hương thơm đặc trưng, vị chua nhẹ tự nhiên, không pha tạp chất. Rang xay theo đơn đặt hàng, đảm bảo độ tươi ngon tối đa. Phù hợp pha pour-over, cold brew hoặc máy espresso.",
  images: [
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
  ],
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);
  const [isLoading] = useState(false);
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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: DefaultColor.primary[3],
      }}
      contentContainerStyle={{ paddingBottom: responsiveSpacingVertical(50) }}
      showsVerticalScrollIndicator={false}
    >
      <HeaderApp showProfile={false} />
      {/* Carousel */}
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
          {/* Badges inline */}
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
                <Sparkles size={responsiveIcon(10)} color="#fff" fill="#fff" />
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
              ({p.reviewCount} đánh giá)
            </Typo>
          </Box>

          {/* Price */}
          <Box
            flexDirection="row"
            alignItems="center"
            marginBottom={responsiveSpacingVertical(16)}
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

          {/* Divider */}
          <Box
            height={1}
            backgroundColor={theme.base[4]}
            marginBottom={responsiveSpacingVertical(16)}
          />

          {/* Buttons */}
          <Box flexDirection="row" style={{ gap: responsiveSpacing(10) }}>
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
              <ShoppingCart
                size={responsiveIcon(15)}
                color={theme.primary[2]}
              />
              <Typo
                fontSize={responsiveFont(13)}
                color={theme.primary[2]}
                weight="700"
                marginLeft={responsiveSpacing(6)}
              >
                {t("product.add_to_cart")}
              </Typo>
            </TouchableOpacity>

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
        </BoxShadow>

        {/* ── Mô tả ── */}
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
          >
            {p.description}
          </Typo>
        </BoxShadow>

        {/* ── Chính sách ── */}
        <BoxShadow
          radius={responsiveRadius(20)}
          padding={responsiveSpacing(16)}
          style={{ marginBottom: responsiveSpacingVertical(32) }}
        >
          {/* Header */}
          <TextLabel
            iconLeft={
              <ShieldCheck size={responsiveIcon(18)} color={theme.primary[2]} />
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
                {/* Icon circle */}
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

                {/* Text */}
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
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  actionBtn: {
    height: verticalScale(46),
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
