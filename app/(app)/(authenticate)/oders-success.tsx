import { Box, BoxShadow, HeaderBack, Typo } from "@/components/ui";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { router } from "expo-router";
import { Check, ShoppingBag } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ORDER = {
  code: "#ORD-882931",
  estimatedDate: "25 Tháng 5, 2024",
  method: "order_success.method_standard",
  methodSub: "order_success.method_bank_or_cod",
};

export default function OrderSuccessScreen() {
  const theme = useThemeStore((s) => s.colors);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const infoRows = [
    {
      label: t("order_success.estimated_date"),
      value: ORDER.estimatedDate,
    },
    {
      label: t("order_success.payment_method"),
      value: t(ORDER.method),
    },
    {
      label: t("order_success.payment_name"),
      value: t(ORDER.methodSub),
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primary[1],
          paddingTop: insets.top,
          paddingBottom: insets.bottom || responsiveSpacingVertical(20),
        },
      ]}
    >
      {/* Header */}
      <HeaderBack
        title={t("order_success.title")}
        onBack={() => router.replace("/(app)/(tabs)/home")}
        showBack
      />

      {/* Content — flex:1 căn giữa toàn bộ */}
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        paddingHorizontal={responsiveSpacing(16)}
      >
        {/* ── Icon thành công ── */}
        <Box
          width={responsiveSize(90)}
          height={responsiveSize(90)}
          radius={responsiveSize(45)}
          backgroundColor={theme.primary[3]}
          alignItems="center"
          justifyContent="center"
          marginBottom={responsiveSpacingVertical(24)}
        >
          <Box
            width={responsiveSize(72)}
            height={responsiveSize(72)}
            radius={responsiveSize(36)}
            backgroundColor={theme.primary[2]}
            alignItems="center"
            justifyContent="center"
          >
            <Check
              size={responsiveIcon(36)}
              color={theme.base[1]}
              strokeWidth={3}
            />
          </Box>
        </Box>

        {/* ── Tiêu đề + mô tả ── */}
        <Box
          alignItems="center"
          paddingHorizontal={responsiveSpacing(16)}
          marginBottom={responsiveSpacingVertical(28)}
        >
          <Typo
            fontSize={responsiveFont(22)}
            weight="700"
            color={theme.base[2]}
            textAlign="center"
            marginBottom={responsiveSpacingVertical(10)}
          >
            {t("order_success.heading")}
          </Typo>
          <Typo
            fontSize={responsiveFont(14)}
            weight="400"
            color={theme.base[5]}
            textAlign="center"
            lineHeight={responsiveSpacingVertical(22)}
          >
            {t("order_success.description")}
          </Typo>
        </Box>

        {/* ── Card thông tin đơn hàng ── */}
        <BoxShadow
          radius={responsiveRadius(16)}
          padding={responsiveSpacing(4)}
          style={styles.card}
        >
          {infoRows.map((row, index) => (
            <Box key={index}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-start"
                paddingHorizontal={responsiveSpacing(12)}
                paddingVertical={responsiveSpacingVertical(12)}
              >
                <Typo
                  fontSize={responsiveFont(13)}
                  weight="400"
                  color={theme.base[5]}
                >
                  {row.label}
                </Typo>

                <Box alignItems="flex-end">
                  <Typo
                    fontSize={responsiveFont(13)}
                    weight="600"
                    color={theme.base[2]}
                  >
                    {row.value}
                  </Typo>
                </Box>
              </Box>
            </Box>
          ))}
        </BoxShadow>

        {/* ── Illustration túi hàng ── */}
        <Box
          width={responsiveSize(100)}
          height={responsiveSize(100)}
          radius={responsiveSize(50)}
          backgroundColor={theme.base[4]}
          alignItems="center"
          justifyContent="center"
          marginTop={responsiveSpacingVertical(28)}
        >
          <ShoppingBag
            size={responsiveIcon(48)}
            color={theme.primary[2]}
            strokeWidth={1.2}
          />
        </Box>
      </Box>

      {/* ── Footer: 2 nút ── */}
      <Box paddingHorizontal={responsiveSpacing(16)}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.replace("/")}
          style={[styles.primaryBtn, { backgroundColor: theme.primary[2] }]}
        >
          <Typo
            fontSize={responsiveFont(15)}
            weight="700"
            color={theme.base[1]}
            textAlign="center"
          >
            {t("order_success.continue_shopping")}
          </Typo>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.secondaryBtn, { borderColor: theme.primary[2] }]}
        >
          <Typo
            fontSize={responsiveFont(15)}
            weight="600"
            color={theme.primary[2]}
            textAlign="center"
          >
            {t("order_success.view_order")}
          </Typo>
        </TouchableOpacity>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    width: "100%",
  },
  primaryBtn: {
    borderRadius: responsiveRadius(12),
    paddingVertical: responsiveSpacingVertical(15),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: responsiveSpacingVertical(10),
  },
  secondaryBtn: {
    borderRadius: responsiveRadius(12),
    paddingVertical: responsiveSpacingVertical(14),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
});
