import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";

import { Box, HeaderBack } from "@/components/ui";
import { FilterTab } from "@/components/utils";
import FilterTabs from "@/components/utils/filter-tabs";
import { responsiveSize, responsiveSpacing } from "@/lib/utils/responsive";
import { useThemeStore } from "@/modules/app/stores";
import { OderHistoryItem, Product } from "@/modules/oders/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_PRODUCTS: any[] = [
  {
    id: "1",
    name: "Đồng hồ Classic Gold",
    price: "15.500.000đ",
    date: "24/05/2024",
    status: "processing",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
  },
  {
    id: "2",
    name: "Nhẫn Kim Cương 18K",
    price: "42.000.000đ",
    date: "15/03/2024",
    status: "delivered",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200",
  },
  {
    id: "3",
    name: "Vòng cổ Aura Gold",
    price: "28.500.000đ",
    date: "10/01/2024",
    status: "delivered",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200",
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
const PurchasedProductsScreen = ({ navigation }: any) => {
  const theme = useThemeStore((s) => s.colors);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const insets = useSafeAreaInsets();

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) => p.status === activeTab);
  }, [activeTab]);

  const handleBuyAgain = useCallback((item: Product) => {
    // TODO: navigate to product detail or add to cart
    console.log("Buy again:", item.id);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <OderHistoryItem item={item} onBuyAgain={handleBuyAgain} />
    ),
    [handleBuyAgain],
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  return (
    <Box flex={1} backgroundColor={theme.primary[1]}>
      {/* Header */}
      <HeaderBack title={t("purchasedProducts.title")} />

      {/* Tabs */}
      <Box>
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </Box>

      {/* List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingTop: responsiveSpacing(16),
    paddingBottom: responsiveSpacing(32),
  },
  avatar: {
    width: responsiveSize(36),
    height: responsiveSize(36),
  },
});

export default PurchasedProductsScreen;
