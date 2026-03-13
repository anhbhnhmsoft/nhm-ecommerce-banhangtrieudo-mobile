import { HeaderBack, TextLabel } from "@/components/ui";
import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import { ListLocationModal } from "@/components/utils/location";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { usePayment } from "@/modules/payment/hooks/use-payment";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { CreditCard, Landmark, MapPin, Van } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Màn hình thanh toán  : đang fake dữ liệu, chưa kết nối backend

export default function PaymentScreen() {
  const theme = useThemeStore((s) => s.colors);
  const { getLocation, location } = usePayment();

  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [selectedPayment, setSelectedPayment] = useState("bank");

  const PAYMENT_METHODS = [
    {
      id: "bank",
      icon: <Landmark size={responsiveIcon(18)} color={theme.base[5]} />,
      title: t("payment.payment_method.bank_transfer.title"),
      subtitle: t("payment.payment_method.bank_transfer.subtitle"),
    },
    {
      id: "cod",
      icon: <Van size={responsiveIcon(20)} color={theme.base[5]} />,
      title: t("payment.payment_method.cod.title"),
      subtitle: t("payment.payment_method.cod.subtitle"),
    },
    {
      id: "payment",
      icon: <CreditCard size={responsiveIcon(20)} color={theme.base[5]} />,
      title: "Thanh toán bằng ví",
      subtitle:
        "Thanh toán qua các ví điện tử phổ biến như Momo, ZaloPay, AirPay...",
    },
  ];

  const orderItems = [
    {
      label: t("payment.order_summary.subtotal", { count: 3 }),
      value: "4.250.000đ",
      color: undefined,
    },
    {
      label: t("payment.order_summary.shipping_fee"),
      value: "35.000đ",
      color: undefined,
    },
    {
      label: t("payment.order_summary.voucher_discount"),
      value: "-150.000đ",
      color: theme.secondary[1],
    },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.primary[1], paddingTop: insets.top },
      ]}
    >
      <HeaderBack title={t("payment.title")} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ĐỊA CHỈ NHẬN HÀNG */}
        <Box
          paddingHorizontal={responsiveSpacing(16)}
          marginBottom={responsiveSpacingVertical(8)}
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={responsiveSpacingVertical(10)}
          >
            <TextLabel
              title={t("payment.shipping_address.label")}
              onMore={() => setShowLocationModal(true)}
              moreLabel={t("payment.shipping_address.change")}
            />
          </Box>

          <Box
            radius={responsiveRadius(12)}
            padding={responsiveSpacing(14)}
            backgroundColor={theme.base[1]}
          >
            <Box flexDirection="row" alignItems="center">
              <TouchableOpacity onPress={getLocation}>
                <Box
                  width={responsiveSize(36)}
                  height={responsiveSize(36)}
                  radius={responsiveSize(18)}
                  backgroundColor={theme.primary[3]}
                  alignItems="center"
                  justifyContent="center"
                  marginRight={responsiveSpacing(12)}
                >
                  <MapPin size={responsiveIcon(18)} color={theme.base[5]} />
                </Box>
              </TouchableOpacity>
              <Box flex={1} paddingRight={responsiveSpacing(12)}>
                <Typo
                  fontSize={responsiveFont(14)}
                  weight="600"
                  color={theme.base[2]}
                >
                  Nguyễn Văn An
                </Typo>
                <Typo
                  fontSize={responsiveFont(12)}
                  weight="400"
                  color={theme.base[5]}
                  numberOfLines={2}
                  marginTop={responsiveSpacingVertical(2)}
                  lineHeight={responsiveFont(20)}
                >
                  {location ? location.address : "Đang tải địa chỉ..."}
                </Typo>
              </Box>
              <Entypo
                name="chevron-right"
                size={responsiveIcon(20)}
                color={theme.base[3]}
              />
            </Box>
          </Box>
        </Box>

        {/* PHƯƠNG THỨC THANH TOÁN */}
        <Box
          paddingHorizontal={responsiveSpacing(16)}
          marginBottom={responsiveSpacingVertical(8)}
        >
          <TextLabel title={t("payment.payment_method.label")} />

          <Box radius={responsiveRadius(12)}>
            {PAYMENT_METHODS.map((method, index) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedPayment(method.id)}
                activeOpacity={0.7}
              >
                <Box
                  flexDirection="row"
                  alignItems="center"
                  padding={responsiveSpacing(14)}
                  marginBottom={responsiveSpacingVertical(8)}
                  borderWidth={1}
                  borderColor={theme.base[1]}
                  backgroundColor={theme.base[1]}
                  radius={responsiveRadius(12)}
                >
                  <Box
                    width={responsiveSize(36)}
                    height={responsiveSize(36)}
                    radius={responsiveRadius(8)}
                    backgroundColor={theme.primary[3]}
                    alignItems="center"
                    justifyContent="center"
                    marginRight={responsiveSpacing(12)}
                  >
                    {method.icon}
                  </Box>
                  <Box flex={1}>
                    <Typo
                      fontSize={responsiveFont(14)}
                      weight="600"
                      color={theme.base[2]}
                    >
                      {method.title}
                    </Typo>
                    <Typo
                      fontSize={responsiveFont(12)}
                      weight="400"
                      color={theme.base[5]}
                      marginTop={responsiveSpacingVertical(2)}
                    >
                      {method.subtitle}
                    </Typo>
                  </Box>

                  {/* Radio button */}
                  <Box
                    width={responsiveSize(22)}
                    height={responsiveSize(22)}
                    radius={responsiveSize(11)}
                    borderWidth={2}
                    borderColor={
                      selectedPayment === method.id
                        ? theme.primary[2]
                        : theme.base[3]
                    }
                    alignItems="center"
                    justifyContent="center"
                  >
                    {selectedPayment === method.id && (
                      <Box
                        width={responsiveSize(12)}
                        height={responsiveSize(12)}
                        radius={responsiveSize(6)}
                        backgroundColor={theme.primary[2]}
                      />
                    )}
                  </Box>
                </Box>
              </TouchableOpacity>
            ))}
          </Box>
        </Box>

        {/* TÓM TẮT ĐƠN HÀNG */}
        <Box
          paddingHorizontal={responsiveSpacing(16)}
          marginBottom={responsiveSpacingVertical(16)}
        >
          <TextLabel title={t("payment.order_summary.label")} />

          <Box
            radius={responsiveRadius(12)}
            backgroundColor={theme.base[1]}
            padding={responsiveSpacing(14)}
          >
            {orderItems.map((item, index) => (
              <Box
                key={index}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={
                  index < orderItems.length - 1
                    ? responsiveSpacingVertical(10)
                    : 0
                }
              >
                <Typo
                  fontSize={responsiveFont(13)}
                  weight="400"
                  color={theme.base[5]}
                >
                  {item.label}
                </Typo>
                <Typo
                  fontSize={responsiveFont(13)}
                  weight="500"
                  color={item.color ?? theme.base[2]}
                >
                  {item.value}
                </Typo>
              </Box>
            ))}

            {/* Divider */}
            <Box
              height={1}
              backgroundColor={theme.base[4]}
              marginVertical={responsiveSpacingVertical(12)}
            />

            {/* Tổng cộng */}
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typo
                fontSize={responsiveFont(15)}
                weight="700"
                color={theme.base[2]}
              >
                {t("payment.order_summary.total")}
              </Typo>
              <Typo
                fontSize={responsiveFont(16)}
                weight="700"
                color={theme.primary[2]}
              >
                4.135.000đ
              </Typo>
            </Box>
          </Box>
        </Box>
      </ScrollView>

      {/* FOOTER */}
      <Box
        backgroundColor={theme.base[1]}
        paddingHorizontal={responsiveSpacing(16)}
        paddingTop={responsiveSpacingVertical(12)}
        paddingBottom={
          insets.bottom ? insets.bottom : responsiveSpacingVertical(16)
        }
        style={styles.footer}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.confirmBtn, { backgroundColor: theme.primary[2] }]}
          onPress={() => router.push("/oders-success")}
        >
          <Typo
            fontSize={responsiveFont(15)}
            weight="700"
            color={theme.base[1]}
            textAlign="center"
          >
            {t("payment.confirm_button").toUpperCase()}
          </Typo>
        </TouchableOpacity>
        <Typo
          fontSize={responsiveFont(11)}
          weight="400"
          color={theme.base[5]}
          textAlign="center"
          marginTop={responsiveSpacingVertical(8)}
        >
          {t("payment.disclaimer")}
        </Typo>
      </Box>
      <ListLocationModal
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelect={(location) => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingTop: responsiveSpacingVertical(12),
    paddingBottom: responsiveSpacingVertical(16),
  },
  footer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmBtn: {
    borderRadius: responsiveRadius(12),
    paddingVertical: responsiveSpacingVertical(15),
    alignItems: "center",
    justifyContent: "center",
  },
});
