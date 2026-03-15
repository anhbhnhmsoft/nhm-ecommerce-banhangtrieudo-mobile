import { HeaderApp } from "@/components/ui";
import { ProductListHeader } from "@/components/utils";
import { isTablet, responsiveSpacing } from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { ProductCard } from "@/modules/products/components";
import { FEATURED_DATA, productCategories } from "@/modules/products/utils";
import { FlatList, StyleSheet, View } from "react-native";

export const COLUMNS = isTablet ? 3 : 2;

export default function ProductScreen() {
  const theme = useThemeStore((state) => state.colors);
  return (
    <View style={[styles.safeArea, { backgroundColor: theme.primary[1] }]}>
      <HeaderApp />

      <FlatList
        data={FEATURED_DATA}
        keyExtractor={(i) => i.id}
        numColumns={COLUMNS}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ProductListHeader
            listBrand={productCategories}
            textSearch=""
            setTextSearch={() => {}}
            onOpenFilter={() => {}}
            handleSelectBrand={() => {}}
          />
        }
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: responsiveSpacing(16),
          marginBottom: responsiveSpacing(4),
        }}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
});
