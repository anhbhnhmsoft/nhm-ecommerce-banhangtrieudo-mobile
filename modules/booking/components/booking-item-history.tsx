import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { BoxShadow, Typo } from "@/components/ui";
import Box from "@/components/ui/box";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
} from "@/lib/utils/responsive";

export type BookingStatus = "confirmed" | "pending" | "cancelled";

export interface Booking {
  id: string;
  bookingCode: string;
  serviceName: string;
  time: string;
  date: string;
  totalPrice: string;
  status: BookingStatus;
  image: string;
}

interface BookingHistoryItemProps {
  item: Booking;
  onDetail: (item: Booking) => void;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; bgColor: string }
> = {
  confirmed: {
    label: "bookingHistory.status.confirmed",
    color: "#2E9E5B",
    bgColor: "#E8F7EF",
  },
  pending: {
    label: "bookingHistory.status.pending",
    color: "#E8A020",
    bgColor: "#FFF4E5",
  },
  cancelled: {
    label: "bookingHistory.status.cancelled",
    color: "#E84040",
    bgColor: "#FDEAEA",
  },
};

export const BookingHistoryItem = ({
  item,
  onDetail,
}: BookingHistoryItemProps) => {
  const { t } = useTranslation();
  const statusCfg = STATUS_CONFIG[item.status];
  const isConfirmed = item.status === "confirmed";

  return (
    <BoxShadow
      style={styles.container}
      radius={responsiveRadius(14)}
      padding={responsiveSpacing(12)}
    >
      {/* Row 1: Status badge (left) + Booking code (right) */}
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={responsiveSpacing(10)}
      >
        {/* Status badge */}
        <Box
          paddingHorizontal={responsiveSpacing(10)}
          paddingVertical={responsiveSpacing(3)}
          radius={responsiveRadius(20)}
          backgroundColor={statusCfg.bgColor}
        >
          <Typo
            fontSize={responsiveFont(10)}
            weight="700"
            color={statusCfg.color}
          >
            {t(statusCfg.label)}
          </Typo>
        </Box>

        {/* Booking code */}
        <Typo fontSize={responsiveFont(12)} weight="500" color="#888888">
          {item.bookingCode}
        </Typo>
      </Box>

      {/* Row 2: Image (left) + Service info (right) */}
      <Box
        flexDirection="row"
        alignItems="center"
        marginBottom={responsiveSpacing(12)}
      >
        {/* Image vuông bo góc */}
        <Box
          radius={responsiveRadius(10)}
          overflow="hidden"
          marginRight={responsiveSpacing(12)}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </Box>

        {/* Service name + time */}
        <Box flex={1}>
          <Typo
            fontSize={responsiveFont(15)}
            weight="700"
            color="#1A1A1A"
            marginBottom={responsiveSpacing(6)}
          >
            {item.serviceName}
          </Typo>

          <Box flexDirection="row" alignItems="center">
            <Ionicons
              name="time-outline"
              size={responsiveIcon(13)}
              color="#888888"
            />
            <Typo
              fontSize={responsiveFont(12)}
              weight="400"
              color="#888888"
              marginLeft={responsiveSpacing(4)}
            >
              {item.time}, {item.date}
            </Typo>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Box
        height={1}
        backgroundColor="#F0F0F0"
        marginBottom={responsiveSpacing(12)}
      />

      {/* Row 3: Total price (left) + Detail button (right) */}
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Total */}
        <Box>
          <Typo
            fontSize={responsiveFont(11)}
            weight="400"
            color="#888888"
            marginBottom={responsiveSpacing(2)}
          >
            {t("bookingHistory.totalPayment")}
          </Typo>
          <Typo fontSize={responsiveFont(16)} weight="700" color="#C9A84C">
            {item.totalPrice}
          </Typo>
        </Box>

        {/* Detail button */}
        <TouchableOpacity
          style={[
            styles.detailBtn,
            isConfirmed ? styles.detailBtnFilled : styles.detailBtnOutline,
          ]}
          activeOpacity={0.8}
          onPress={() => onDetail(item)}
        >
          <Typo
            fontSize={responsiveFont(13)}
            weight="600"
            color={isConfirmed ? "#FFFFFF" : "#1A1A1A"}
          >
            {t("bookingHistory.detail")}
          </Typo>
          <Ionicons
            name="chevron-forward"
            size={responsiveIcon(14)}
            color={isConfirmed ? "#FFFFFF" : "#1A1A1A"}
          />
        </TouchableOpacity>
      </Box>
    </BoxShadow>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsiveSpacing(16),
    marginBottom: responsiveSpacing(12),
  },
  image: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    borderRadius: responsiveRadius(10),
    backgroundColor: "#F5F5F5",
  },
  detailBtn: {
    paddingHorizontal: responsiveSpacing(18),
    paddingVertical: responsiveSpacing(9),
    borderRadius: responsiveRadius(20),
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSpacing(2),
  },
  detailBtnFilled: {
    backgroundColor: "#C9A84C",
  },
  detailBtnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
});

export default memo(BookingHistoryItem);
