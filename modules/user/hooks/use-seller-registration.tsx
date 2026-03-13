import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { RegisterNewsletterForm } from "../utils/type";

export const SERVICE_OPTIONS = [
  { id: "1", label: "Chăm sóc da mặt" },
  { id: "2", label: "Massage body" },
  { id: "3", label: "Nail & Chân tay" },
  { id: "4", label: "Tóc & Tạo kiểu" },
  { id: "5", label: "Waxing" },
  { id: "6", label: "Phun xăm thẩm mỹ" },
];

export const useSellerRegistration = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const form = useForm<RegisterNewsletterForm>({
    defaultValues: { fullName: "", phone: "", email: "", serviceId: "" },
    resolver: zodResolver(
      z.object({
        fullName: z.string().min(2, t("newsletter.errors.full_name_required")),
        phone: z
          .string()
          .min(9, t("newsletter.errors.phone_invalid"))
          .regex(/^[0-9]+$/, t("newsletter.errors.phone_numbers_only")),
        email: z.string().email(t("newsletter.errors.email_invalid")),
        serviceId: z.string().min(1, t("newsletter.errors.service_required")),
      }),
    ),
  });

  const selectedServiceId = form.watch("serviceId");
  const selectedService = SERVICE_OPTIONS.find(
    (s) => s.id === selectedServiceId,
  );

  const selectService = useCallback(
    (id: string) => {
      form.setValue("serviceId", id, { shouldValidate: true });
      setShowPicker(false);
    },
    [form],
  );

  const submit = useCallback(
    async (values: RegisterNewsletterForm) => {
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 1500));
        console.log("Submitted:", values);
        form.reset();
      } catch (error) {
        console.error("Register error:", error);
      } finally {
        setLoading(false);
      }
    },
    [form],
  );

  return {
    form,
    loading,
    showPicker,
    setShowPicker,
    selectedService,
    selectedServiceId,
    selectService,
    submit: form.handleSubmit(submit),
  };
};
