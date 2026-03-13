import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ─── Schema ───────────────────────────────────────────────────────────────────
const bookingSchema = z.object({
  date: z.date({ error: "Vui lòng chọn ngày" }),
  time: z.string().min(1, "Vui lòng chọn giờ"),
  note: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useBookingServices = () => {
  const [loading, setLoading] = useState(false);

  const today = new Date();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: today,
      time: "",
      note: "",
    },
  });

  // Cập nhật date + time cùng lúc từ ServiceDateTimePicker
  const handleDateTimeChange = useCallback(
    (date: Date, time: string) => {
      form.setValue("date", date, { shouldValidate: true });
      form.setValue("time", time, { shouldValidate: true });
    },
    [form],
  );

  // Submit
  const submit = async (values: BookingFormValues) => {
    console.log("Booking submitted:", values);
    setLoading(true);
    try {
      // Fake API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Booking submitted:", values);
      form.reset();
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    submit,
    handleDateTimeChange,
  };
};
