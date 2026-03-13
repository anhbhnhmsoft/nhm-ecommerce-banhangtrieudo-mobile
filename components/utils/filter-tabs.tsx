import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import {
  responsiveSpacing,
  responsiveFont,
  responsiveRadius,
} from "@/lib/utils/responsive";
import { Box, Typo } from "../ui";

export type FilterTab = "all" | "processing" | "delivered";

interface FilterTabsProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
}

const TABS: { key: FilterTab; labelKey: string }[] = [
  { key: "all", labelKey: "purchasedProducts.tabs.all" },
  { key: "processing", labelKey: "purchasedProducts.tabs.processing" },
  { key: "delivered", labelKey: "purchasedProducts.tabs.delivered" },
];

const FilterTabs = ({ activeTab, onTabChange }: FilterTabsProps) => {
  const { t } = useTranslation();

  return (
    <Box borderBottomWidth={1} borderBottomColor="#EEEEEE">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabChange(tab.key)}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <Typo
                fontSize={responsiveFont(14)}
                weight={isActive ? "600" : "400"}
                color={isActive ? "#C9A84C" : "#888888"}
              >
                {t(tab.labelKey)}
              </Typo>
              {isActive && <Box style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: responsiveSpacing(16),
  },
  tabItem: {
    paddingVertical: responsiveSpacing(12),
    marginRight: responsiveSpacing(24),
    alignItems: "center",
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#C9A84C",
    borderRadius: responsiveRadius(2),
  },
});

export default memo(FilterTabs);
