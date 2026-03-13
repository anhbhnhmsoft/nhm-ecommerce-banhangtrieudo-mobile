import { Box, BoxShadow, Typo } from "@/components/ui";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { memo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { useTranslation } from "react-i18next";
import { useServiceDateTimePicker } from "../hooks";
import { DAYS_OF_WEEK, MONTH_NAME_KEYS } from "../utils";

interface DateTimePickerProps {
  onDateTimeChange: (date: Date, time: string) => void;
}

const ServiceDateTimePickerBase = ({
  onDateTimeChange,
}: DateTimePickerProps) => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);
  const {
    year,
    month,
    selectedDay,
    calendarCells,
    isToday,
    isPast,
    handleDayChange,
    prevMonth,
    nextMonth,
    timeSlots,
    selectedTime,
    handleTimeChange,
    scrollViewRef,
  } = useServiceDateTimePicker({ onDateTimeChange });

  return (
    <Box
      paddingHorizontal={responsiveSpacing(16)}
      marginBottom={responsiveSpacingVertical(20)}
    >
      <Typo
        fontSize={responsiveFont(15)}
        weight="700"
        color={theme.base[2]}
        marginBottom={responsiveSpacingVertical(14)}
      >
        {t("services.book_service.pick_datetime")}
      </Typo>

      <BoxShadow radius={responsiveRadius(14)} padding={responsiveSpacing(14)}>
        {/* Header tháng */}
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={responsiveSpacingVertical(14)}
        >
          <TouchableOpacity
            onPress={prevMonth}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <ChevronLeft size={responsiveIcon(20)} color={theme.base[2]} />
          </TouchableOpacity>

          <Typo
            fontSize={responsiveFont(14)}
            weight="600"
            color={theme.base[2]}
          >
            {t(MONTH_NAME_KEYS[month])}, {year}
          </Typo>

          <TouchableOpacity
            onPress={nextMonth}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <ChevronRight size={responsiveIcon(20)} color={theme.base[2]} />
          </TouchableOpacity>
        </Box>

        {/* Header thứ */}
        <Box flexDirection="row" marginBottom={responsiveSpacingVertical(8)}>
          {DAYS_OF_WEEK.map((d) => (
            <Box key={d} flex={1} alignItems="center">
              <Typo
                fontSize={responsiveFont(11)}
                weight="500"
                color={d === "CN" ? theme.secondary[1] : theme.base[5]}
              >
                {d}
              </Typo>
            </Box>
          ))}
        </Box>

        {/* Ô ngày */}
        <Box flexDirection="row" flexWrap="wrap">
          {calendarCells.map((cell, i) => {
            const { day, isCurrentMonth } = cell;
            const isSelected = isCurrentMonth && day === selectedDay;
            const past = isPast(day, isCurrentMonth);
            const todayMark = isToday(day, isCurrentMonth);

            return (
              <TouchableOpacity
                key={`day-${i}`}
                onPress={() => isCurrentMonth && !past && handleDayChange(day)}
                disabled={!isCurrentMonth || past}
                style={styles.dayCell}
              >
                <Box
                  width={responsiveSize(32)}
                  height={responsiveSize(32)}
                  radius={responsiveSize(16)}
                  backgroundColor={
                    isSelected
                      ? theme.primary[2]
                      : todayMark
                        ? theme.primary[3]
                        : "transparent"
                  }
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typo
                    fontSize={responsiveFont(13)}
                    weight={isSelected || todayMark ? "600" : "400"}
                    color={
                      isSelected
                        ? theme.base[1]
                        : !isCurrentMonth
                          ? theme.base[4]
                          : past
                            ? theme.base[3]
                            : theme.base[2]
                    }
                  >
                    {day}
                  </Typo>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      </BoxShadow>

      {/* ── Time slots ── */}
      <Box marginTop={responsiveSpacingVertical(14)}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: responsiveSpacing(16) }}
        >
          <Box flexDirection="row" style={{ gap: responsiveSpacing(8) }}>
            {timeSlots.map((time) => {
              const isActive = time === selectedTime;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => handleTimeChange(time)}
                  activeOpacity={0.8}
                >
                  <Box
                    paddingHorizontal={responsiveSpacing(16)}
                    paddingVertical={responsiveSpacingVertical(8)}
                    radius={responsiveRadius(999)}
                    backgroundColor={
                      isActive ? theme.primary[2] : theme.base[1]
                    }
                    borderWidth={1}
                    borderColor={isActive ? theme.primary[2] : theme.base[4]}
                  >
                    <Typo
                      fontSize={responsiveFont(13)}
                      weight={isActive ? "600" : "400"}
                      color={isActive ? theme.base[1] : theme.base[2]}
                    >
                      {time}
                    </Typo>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export const ServiceDateTimePicker = memo(ServiceDateTimePickerBase);

const styles = StyleSheet.create({
  dayCell: {
    width: `${100 / 7}%`,
    alignItems: "center",
    paddingVertical: responsiveSpacingVertical(4),
  },
});
