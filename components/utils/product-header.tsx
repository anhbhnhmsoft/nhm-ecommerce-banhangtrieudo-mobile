import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { CategorySevicesItem } from "@/modules/services/components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface ProductListHeaderProps {
  textSearch: string;
  setTextSearch: (text: string) => void;
  listBrand: CategorySevicesItem[];
  selectedBrand?: string;
  handleSelectBrand: (id: string) => void;
  onOpenFilter: () => void;
}

export const ProductListHeader = ({
  textSearch,
  setTextSearch,
  listBrand,
  selectedBrand,
  handleSelectBrand,
}: ProductListHeaderProps) => {
  const theme = useThemeStore((s) => s.colors);

  return (
    <Box
      backgroundColor={theme.base[1]}
      paddingBottom={responsiveSpacingVertical(12)}
      marginBottom={responsiveSpacingVertical(10)}
    >
      {/* Search Bar */}
      <Box
        paddingHorizontal={responsiveSpacing(16)}
        marginTop={responsiveSpacingVertical(10)}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          borderWidth={1}
          borderColor={theme.base[3]}
          radius={responsiveRadius(12)}
          paddingHorizontal={responsiveSpacing(12)}
          height={responsiveSpacingVertical(46)}
          backgroundColor={theme.base[1]}
          style={styles.searchShadow}
        >
          <FontAwesome
            name="search"
            size={responsiveIcon(15)}
            color={theme.base[5]}
          />
          <TextInput
            value={textSearch}
            onChangeText={setTextSearch}
            style={[
              styles.input,
              { color: theme.base[2], fontSize: responsiveFont(14) },
            ]}
            placeholder="Tìm kiếm sản phẩm"
            placeholderTextColor={theme.base[5]}
          />
        </Box>
      </Box>

      {/* Brand Filter */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={listBrand}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.brandList}
        renderItem={({ item }) => {
          const isActive = selectedBrand === item.id;
          return (
            <TouchableOpacity
              onPress={() => handleSelectBrand(item.id)}
              activeOpacity={0.7}
              style={[
                styles.brandItem,
                {
                  backgroundColor: isActive ? theme.primary[2] : theme.base[1],
                  borderColor: isActive ? theme.primary[2] : theme.base[3],
                },
              ]}
            >
              <Typo
                fontSize={responsiveFont(13)}
                color={isActive ? theme.base[1] : theme.base[2]}
                weight={isActive ? "600" : "400"}
              >
                {item.label}
              </Typo>
            </TouchableOpacity>
          );
        }}
      />
    </Box>
  );
};

export default React.memo(ProductListHeader);

const styles = StyleSheet.create({
  searchShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    flex: 1,
    marginLeft: responsiveSpacing(8),
    includeFontPadding: false,
  },
  brandList: {
    paddingHorizontal: responsiveSpacing(16),
    paddingTop: responsiveSpacingVertical(10),
    gap: responsiveSpacing(8),
  },
  brandItem: {
    paddingHorizontal: responsiveSpacing(16),
    paddingVertical: responsiveSpacingVertical(7),
    borderRadius: responsiveRadius(20),
    borderWidth: 1,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: responsiveSpacing(12),
    paddingVertical: responsiveSpacingVertical(7),
    borderRadius: responsiveRadius(8),
  },
});
