// components/ui/bottom-navigation.tsx
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { TabKey } from "@/modules/app/utils/type";
import { Feather, Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabItem {
  key: TabKey;
  label: string;
  icon: (color: string, size: number) => React.ReactNode;
  isCenter?: boolean;
}

interface BottomNavigationProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}

export const TABS: TabItem[] = [
  {
    key: "home",
    label: "Trang chủ",
    icon: (color, size) => (
      <FontAwesome name="home" size={size} color={color} />
    ),
  },
  {
    key: "products",
    label: "Sản phẩm",
    icon: (color, size) => (
      <Feather name="shopping-bag" size={size} color={color} />
    ),
  },
  {
    key: "services",
    label: "Dịch vụ",
    icon: (color, size) => (
      <MaterialCommunityIcons
        name="briefcase-outline"
        size={size}
        color={color}
      />
    ),
  },
  {
    key: "contact",
    label: "Liên hệ",
    icon: (color, size) => (
      <Ionicons name="call-outline" size={size} color={color} />
    ),
  },

  {
    key: "news",
    label: "Tin tức",
    icon: (color, size) => (
      <Ionicons name="newspaper-outline" size={size} color={color} />
    ),
  },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const theme = useThemeStore((state) => state.colors);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.base[1],
          paddingBottom: insets.bottom + responsiveSpacingVertical(8),
        },
      ]}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;

        if (tab.isCenter) {
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.centerButton,
                  { backgroundColor: theme.primary[2] },
                ]}
              >
                {tab.icon(theme.base[1], responsiveIcon(22))}
              </View>
              <Typo
                fontSize={responsiveFont(10)}
                color={isActive ? theme.primary[2] : theme.base[5]}
                weight={isActive ? "600" : "400"}
                marginTop={responsiveSpacingVertical(4)}
              >
                {tab.label}
              </Typo>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            {tab.icon(
              isActive ? theme.primary[2] : theme.base[5],
              responsiveIcon(22),
            )}
            <Typo
              fontSize={responsiveFont(11)}
              color={isActive ? theme.primary[2] : theme.base[5]}
              weight={isActive ? "600" : "400"}
              marginTop={responsiveSpacingVertical(4)}
            >
              {tab.label}
            </Typo>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: responsiveSpacingVertical(10),
    paddingHorizontal: responsiveSpacing(8),
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: responsiveSpacingVertical(4),
  },
  centerButton: {
    width: responsiveSpacing(54),
    height: responsiveSpacing(54),
    borderRadius: responsiveSpacing(27),
    alignItems: "center",
    justifyContent: "center",
    marginTop: -responsiveSpacingVertical(16),
    marginBottom: responsiveSpacingVertical(2),
    ...Platform.select({
      ios: {
        shadowColor: "#D4AF37",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
