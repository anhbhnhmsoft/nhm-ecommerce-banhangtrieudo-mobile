import { HeaderApp } from "@/components/ui";
import Box from "@/components/ui/box";
import { ProductListHeader } from "@/components/utils";
import { isTablet, responsiveSpacing } from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { ServiceCard } from "@/modules/services/components";
import { SERVICE_DATA, serviceCategories } from "@/modules/services/utils";
import { FlatList, StyleSheet, View } from "react-native";

export const COLUMNS = isTablet ? 3 : 2;

export default function ProductScreen() {
  const theme = useThemeStore((state) => state.colors);
  return (
    <View style={[styles.safeArea, { backgroundColor: theme.primary[1] }]}>
      <HeaderApp />

      <FlatList
        data={SERVICE_DATA}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ProductListHeader
            listBrand={serviceCategories}
            textSearch=""
            setTextSearch={() => {}}
            onOpenFilter={() => {}}
            handleSelectBrand={() => {}}
          />
        }
        renderItem={({ item }) => (
          <Box paddingHorizontal={responsiveSpacing(16)}>
            <ServiceCard item={item} />
          </Box>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
});
