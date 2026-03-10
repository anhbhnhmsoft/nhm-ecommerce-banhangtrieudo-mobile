// modules/auth/hook/use-reset-password.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { ResetPasswordRequest } from "../types";

export const useResetPassword = () => {
  const { t } = useTranslation();

  const schema = useMemo(
    () =>
      z
        .object({
          password: z
            .string()
            .min(1, {
              message: t("auth.reset_password.validation.password_required"),
            })
            .min(8, {
              message: t("auth.reset_password.validation.password_min"),
            })
            .regex(/[a-z]/, {
              message: t("auth.reset_password.validation.password_lowercase"),
            })
            .regex(/[A-Z]/, {
              message: t("auth.reset_password.validation.password_uppercase"),
            })
            .regex(/[0-9]/, {
              message: t("auth.reset_password.validation.password_number"),
            }),
          confirmPassword: z.string().min(1, {
            message: t("auth.reset_password.validation.confirm_required"),
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t("auth.reset_password.validation.confirm_mismatch"),
          path: ["confirmPassword"],
        }),
    [t],
  );

  const form = useForm<ResetPasswordRequest>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const submit = useCallback((data: ResetPasswordRequest) => {
    console.log("Reset password:", data);
    // TODO: call API
  }, []);

  return { form, submit };
};
