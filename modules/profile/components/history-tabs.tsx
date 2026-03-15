import { BoxShadow } from "@/components/ui";
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
import { ChevronRight, ClipboardList, ShoppingBag } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, TouchableOpacity } from "react-native";
import { BookingItem } from "./booking-item";
import { OrderItem } from "./order_item";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "orders" | "bookings";

interface HistoryTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  orders: {
    id: string;
    name: string;
    status: string;
    date: string;
    price: string;
  }[];
  bookings: {
    id: string;
    name: string;
    status: string;
    date: string;
    time: string;
  }[];
  onOrderPress?: (order: any) => void;
  onBookingPress?: (booking: any) => void;
  onSeeAllOrders?: () => void;
  onSeeAllBookings?: () => void;
  style?: object;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const HistoryTabs = ({
  activeTab,
  onTabChange,
  orders,
  bookings,
  onOrderPress,
  onBookingPress,
  onSeeAllOrders,
  onSeeAllBookings,
  style,
}: HistoryTabsProps) => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);

  const tabs = [
    {
      key: "orders" as TabKey,
      icon: ShoppingBag,
      label: t("profile.history.orders"),
    },
    {
      key: "bookings" as TabKey,
      icon: ClipboardList,
      label: t("profile.history.bookings"),
    },
  ];

  const handleSeeAll =
    activeTab === "orders" ? onSeeAllOrders : onSeeAllBookings;

  return (
    <BoxShadow
      radius={responsiveRadius(20)}
      padding={responsiveSpacing(16)}
      style={[{ marginBottom: responsiveSpacingVertical(12) }, style]}
    >
      {/* ── Header: title + Xem tất cả ── */}
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        marginBottom={responsiveSpacingVertical(12)}
      >
        <TouchableOpacity
          onPress={handleSeeAll}
          activeOpacity={0.7}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Typo
            fontSize={responsiveFont(12)}
            color={theme.primary[2]}
            weight="600"
          >
            {t("common.see_all")}
          </Typo>
          <ChevronRight size={responsiveIcon(13)} color={theme.primary[2]} />
        </TouchableOpacity>
      </Box>

      {/* ── Tab Switcher ── */}
      <Box
        flexDirection="row"
        backgroundColor={theme.base[4]}
        radius={responsiveRadius(12)}
        padding={responsiveSpacing(4)}
        marginBottom={responsiveSpacingVertical(16)}
      >
        {tabs.map(({ key, icon: Icon, label }) => {
          const isActive = activeTab === key;
          return (
            <TouchableOpacity
              key={key}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: responsiveSpacingVertical(8),
                borderRadius: responsiveRadius(10),
                backgroundColor: isActive ? theme.base[1] : "transparent",
                ...(isActive && Platform.OS === "ios"
                  ? {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.08,
                      shadowRadius: 4,
                    }
                  : {}),
              }}
              onPress={() => onTabChange(key)}
              activeOpacity={0.8}
            >
              <Icon
                size={responsiveIcon(13)}
                color={isActive ? theme.primary[2] : theme.base[5]}
              />
              <Typo
                fontSize={responsiveFont(12)}
                color={isActive ? theme.primary[2] : theme.base[5]}
                weight={isActive ? "700" : "400"}
                marginLeft={responsiveSpacing(5)}
              >
                {label}
              </Typo>
            </TouchableOpacity>
          );
        })}
      </Box>

      {/* ── Tab Content ── */}
      {activeTab === "orders" && (
        <Box style={{ gap: responsiveSpacingVertical(10) }}>
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onPress={() => onOrderPress?.(order)}
            />
          ))}
        </Box>
      )}

      {activeTab === "bookings" && (
        <Box style={{ gap: responsiveSpacingVertical(10) }}>
          {bookings.map((booking) => (
            <BookingItem
              key={booking.id}
              booking={booking}
              onPress={() => onBookingPress?.(booking)}
            />
          ))}
        </Box>
      )}
    </BoxShadow>
  );
};
