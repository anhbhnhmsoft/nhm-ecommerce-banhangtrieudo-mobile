import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { getDaysInMonth, getFirstDayOfMonth } from "../utils/date-utils";

// ─── Time slots helpers ───────────────────────────────────────────────────────
const generateTimeSlots = (
  startHour = 0,
  endHour = 23,
  intervalMinutes = 30,
): string[] => {
  const slots: string[] = [];
  let current = startHour * 60;
  const end = endHour * 60;
  while (current <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    current += intervalMinutes;
  }
  return slots;
};

const getNearestSlot = (slots: string[]): string => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return (
    slots.find((slot) => {
      const [h, m] = slot.split(":").map(Number);
      return h * 60 + m >= currentMinutes;
    }) ?? slots[0]
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────
export type CalendarCell = {
  day: number;
  isCurrentMonth: boolean;
};

type UseServiceDateTimePickerOptions = {
  onDateTimeChange?: (date: Date, time: string) => void;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useServiceDateTimePicker = ({
  onDateTimeChange,
}: UseServiceDateTimePickerOptions = {}) => {
  const today = useMemo(() => new Date(), []);

  // ── Calendar state ──
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  // ── Time slots state ──
  const scrollViewRef = useRef<ScrollView>(null);
  const timeSlots = useMemo(() => generateTimeSlots(0, 23, 30), []);
  const defaultTime = useMemo(() => getNearestSlot(timeSlots), [timeSlots]);
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  // ── Calendar computed ──
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarCells: CalendarCell[] = useMemo(() => {
    const cells: CalendarCell[] = [];
    for (let i = 0; i < 42; i++) {
      if (i < firstDay) {
        cells.push({
          day: prevMonthDays - firstDay + i + 1,
          isCurrentMonth: false,
        });
      } else if (i < firstDay + daysInMonth) {
        cells.push({ day: i - firstDay + 1, isCurrentMonth: true });
      } else {
        cells.push({
          day: i - (firstDay + daysInMonth) + 1,
          isCurrentMonth: false,
        });
      }
    }
    return cells;
  }, [firstDay, daysInMonth, prevMonthDays]);

  // ── Calendar helpers ──
  const isToday = useCallback(
    (day: number, isCurrentMonth: boolean) =>
      isCurrentMonth &&
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear(),
    [month, year, today],
  );

  const isPast = useCallback(
    (day: number, isCurrentMonth: boolean) => {
      if (!isCurrentMonth) return true;
      return (
        new Date(year, month, day) <
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
      );
    },
    [month, year, today],
  );

  // ── Handlers ──
  const handleDayChange = useCallback(
    (day: number) => {
      setSelectedDay(day);
      onDateTimeChange?.(new Date(year, month, day), selectedTime);
    },
    [year, month, selectedTime, onDateTimeChange],
  );

  const handleTimeChange = useCallback(
    (time: string) => {
      setSelectedTime(time);
      onDateTimeChange?.(new Date(year, month, selectedDay), time);
    },
    [year, month, selectedDay, onDateTimeChange],
  );

  const prevMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
    setSelectedDay(1);
  }, [month]);

  const nextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
    setSelectedDay(1);
  }, [month]);

  // ── Scroll to selected time ──
  const scrollToSelected = useCallback(() => {
    const index = timeSlots.indexOf(selectedTime);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * 70, animated: true });
    }
  }, [selectedTime, timeSlots]);

  // Khi component mount, ngay lập tức đẩy giá trị date + time mặc định lên form (hoặc callback)
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current) {
      onDateTimeChange?.(new Date(year, month, selectedDay), selectedTime);
      hasInitialized.current = true;
    }
  }, [onDateTimeChange, year, month, selectedDay, selectedTime]);

  useEffect(() => {
    scrollToSelected();
  }, [scrollToSelected]);

  return {
    // Calendar
    year,
    month,
    selectedDay,
    calendarCells,
    isToday,
    isPast,
    handleDayChange,
    prevMonth,
    nextMonth,
    // Time slots
    timeSlots,
    selectedTime,
    handleTimeChange,
    scrollViewRef,
  };
};
