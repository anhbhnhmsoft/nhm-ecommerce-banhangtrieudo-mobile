import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";

import { HeaderBack } from "@/components/ui";
import Box from "@/components/ui/box";
import FilterTabs, { FilterTab } from "@/components/utils/filter-tabs";
import { responsiveSpacing } from "@/lib/utils/responsive";
import { useThemeStore } from "@/modules/app/stores";
import { Booking, BookingHistoryItem } from "@/modules/booking/components";

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    bookingCode: "#BK-8821",
    serviceName: "Liệu trình trẻ hóa da Gold",
    time: "14:00",
    date: "25 Tháng 10, 2023",
    totalPrice: "2.500.000đ",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200",
  },
  {
    id: "2",
    bookingCode: "#BK-9042",
    serviceName: "Massage đá nóng chuyên sâu",
    time: "09:00",
    date: "28 Tháng 10, 2023",
    totalPrice: "1.200.000đ",
    status: "pending",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200",
  },
  {
    id: "3",
    bookingCode: "#BK-9115",
    serviceName: "Chăm sóc tóc phủ lụa",
    time: "16:30",
    date: "30 Tháng 10, 2023",
    totalPrice: "850.000đ",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=200",
  },
];

const BookingHistoryScreen = () => {
  const theme = useThemeStore((state) => state.colors);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const handleDetail = useCallback((item: Booking) => {
    // TODO: navigate to booking detail
    console.log("Detail:", item.id);
  }, []);

  return (
    <Box style={styles.safeArea} backgroundColor={theme.primary[1]}>
      <HeaderBack title={t("bookingHistory.title")} />

      <Box>
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </Box>

      {/* Booking list */}
      <FlatList
        data={MOCK_BOOKINGS}
        renderItem={({ item }) => (
          <BookingHistoryItem item={item} onDetail={handleDetail} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingTop: responsiveSpacing(16),
    paddingBottom: responsiveSpacing(32),
  },
});

export default BookingHistoryScreen;
