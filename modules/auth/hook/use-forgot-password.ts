// modules/auth/hook/use-forgot-password.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { ForgotPasswordRequest } from "../types";

const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useForgotPassword = () => {
  const { t } = useTranslation();

  const schema = useMemo(
    () =>
      z.object({
        contact: z
          .string()
          .min(1, {
            message: t("auth.forgot_password.validation.contact_required"),
          })
          .refine((value) => phoneRegex.test(value) || emailRegex.test(value), {
            message: t("auth.forgot_password.validation.contact_invalid"),
          }),
      }),
    [t],
  );

  const form = useForm<ForgotPasswordRequest>({
    defaultValues: { contact: "" },
    resolver: zodResolver(schema),
  });

  const submit = useCallback((data: ForgotPasswordRequest) => {
    console.log("Forgot password:", data);
    // TODO: call API
  }, []);

  return { form, submit };
};
