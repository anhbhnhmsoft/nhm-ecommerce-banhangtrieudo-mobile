import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { LoginRequest } from "../types";

const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useLogin = () => {
  const { t } = useTranslation();

  const form = useForm<LoginRequest>({
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: zodResolver(
      z.object({
        phone: z
          .string()
          .min(1, { message: t("auth.validation.phone_required") })
          .refine((value) => phoneRegex.test(value) || emailRegex.test(value), {
            message: t("auth.validation.phone_invalid"),
          }),
        password: z
          .string()
          .min(1, { message: t("auth.validation.password_required") })
          .min(8, { message: t("auth.validation.password_min") })
          .regex(/[a-z]/, { message: t("auth.validation.password_lowercase") })
          .regex(/[A-Z]/, { message: t("auth.validation.password_uppercase") })
          .regex(/[0-9]/, { message: t("auth.validation.password_number") }),
      }),
    ),
  });

  const submit = useCallback(() => {
    console.log("thanhf coon ");
  }, []);
  return { form, submit };
};
