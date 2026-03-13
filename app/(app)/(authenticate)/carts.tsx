import { DefaultColor, HeaderBack, Typo } from "@/components/ui";
import Box from "@/components/ui/box";
import {
  normalize,
  responsiveFont,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils/responsive";
import { useThemeStore } from "@/modules/app/stores/use-theme-store";
import { CartItem } from "@/modules/cart/components";
import EmptyCart from "@/modules/cart/components/cart-emty";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CartItemType {
  id: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const SHIPPING_FEE = 30_000;
const formatPrice = (value: number) => value.toLocaleString("vi-VN") + "đ";

export default function CartScreen() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState<CartItemType[]>([
    {
      id: "1",
      name: "Áo sơ mi lụa cao cấp",
      variant: "Size: M | Màu: Vàng Sầm panh",
      price: 3_000_000,
      quantity: 1,
    },
    {
      id: "2",
      name: "Túi xách da tối giản",
      variant: "Chất liệu: Da bê Y",
      price: 8_500_000,
      quantity: 1,
    },
  ]);

  const [coupon, setCoupon] = useState("");

  const handleIncrease = (id: string) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

  const handleDecrease = (id: string) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );

  const handleDelete = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal + SHIPPING_FEE;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.primary[1],
        }}
      >
        <HeaderBack title={t("cart.title")} />
        <Box flex={1}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              padding: responsiveSpacing(16),
              paddingBottom: responsiveSpacingVertical(40),
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={<EmptyCart />}
            renderItem={({ item }) => (
              <CartItem
                {...item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onDelete={handleDelete}
              />
            )}
          />
        </Box>
        {items.length > 0 && (
          <Box
            backgroundColor={DefaultColor.white}
            padding={responsiveSpacing(16)}
            paddingBottom={insets.bottom + responsiveSpacingVertical(4)}
            topLeftRadius={responsiveRadius(36)}
            topRightRadius={responsiveRadius(36)}
          >
            {/* Coupon */}
            <Box
              flexDirection="row"
              marginTop={responsiveSpacingVertical(6)}
              style={{ gap: responsiveSpacing(10) }}
            >
              <Box flex={1}>
                <TextInput
                  style={{
                    height: responsiveSize(44),
                    backgroundColor: DefaultColor.base[1],
                    borderRadius: responsiveRadius(8),
                    paddingHorizontal: responsiveSpacing(14),
                    fontSize: responsiveFont(13),
                    color: DefaultColor.base[2],
                    borderWidth: normalize(1),
                    borderColor: DefaultColor.base[3],
                  }}
                  placeholder={t("cart.coupon.placeholder")}
                  placeholderTextColor={DefaultColor.base[5]}
                  value={coupon}
                  onChangeText={setCoupon}
                />
              </Box>

              {/* Nút ÁP DỤNG */}
              <TouchableOpacity onPress={() => {}}>
                <Box
                  width={responsiveSize(64)}
                  height={responsiveSize(44)}
                  backgroundColor={theme.primary[2]}
                  radius={responsiveRadius(8)}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typo
                    weight="700"
                    fontSize={responsiveFont(11)}
                    color={DefaultColor.base[1]}
                    textAlign="center"
                    lineHeight={responsiveFont(15)}
                  >
                    {t("cart.coupon.apply")}
                  </Typo>
                </Box>
              </TouchableOpacity>
            </Box>

            {/* Summary */}
            <Box
              paddingHorizontal={responsiveSpacing(16)}
              paddingVertical={responsiveSpacingVertical(4)}
            >
              {/* Tạm tính */}
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                paddingVertical={responsiveSpacingVertical(10)}
              >
                <Typo fontSize={responsiveFont(13)} color={theme.base[5]}>
                  {t("cart.summary.subtotal")}
                </Typo>
                <Typo
                  weight="500"
                  fontSize={responsiveFont(13)}
                  color={theme.base[2]}
                >
                  {formatPrice(subtotal)}
                </Typo>
              </Box>

              {/* Tổng thanh toán */}
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                paddingVertical={responsiveSpacingVertical(10)}
              >
                <Typo
                  weight="700"
                  fontSize={responsiveFont(15)}
                  color={theme.base[2]}
                >
                  {t("cart.summary.total")}
                </Typo>
                {/* Tổng tiền — màu brand từ theme */}
                <Typo
                  weight="800"
                  fontSize={responsiveFont(16)}
                  color={theme.primary[2]}
                >
                  {formatPrice(total)}
                </Typo>
              </Box>
            </Box>

            {/* Spacer */}
            <Box height={responsiveSpacingVertical(16)} />

            {/* Nút THANH TOÁN */}
            <TouchableOpacity
              onPress={() => router.push("/(app)/(authenticate)/payment")}
              activeOpacity={0.85}
            >
              <Box
                backgroundColor={theme.primary[2]}
                radius={responsiveRadius(30)}
                height={responsiveSize(50)}
                alignItems="center"
                justifyContent="center"
              >
                <Typo
                  weight="700"
                  fontSize={responsiveFont(15)}
                  color={DefaultColor.base[1]}
                  style={{ letterSpacing: 1 }}
                >
                  {t("cart.checkout")}
                </Typo>
              </Box>
            </TouchableOpacity>
          </Box>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
