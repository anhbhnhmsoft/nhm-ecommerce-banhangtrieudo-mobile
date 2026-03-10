// modules/auth/hook/use-register.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { RegisterRequest } from "../types";

export const useRegister = () => {
  const { t } = useTranslation();

  const schema = useMemo(
    () =>
      z
        .object({
          fullName: z
            .string()
            .min(1, {
              message: t("auth.register.validation.fullname_required"),
            })
            .min(2, { message: t("auth.register.validation.fullname_min") }),
          phone: z
            .string()
            .min(1, { message: t("auth.register.validation.phone_required") })
            .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
              message: t("auth.register.validation.phone_invalid"),
            }),
          email: z
            .string()
            .min(1, { message: t("auth.register.validation.email_required") })
            .email({ message: t("auth.register.validation.email_invalid") }),
          password: z
            .string()
            .min(1, {
              message: t("auth.register.validation.password_required"),
            })
            .min(8, { message: t("auth.register.validation.password_min") })
            .regex(/[a-z]/, {
              message: t("auth.register.validation.password_lowercase"),
            })
            .regex(/[A-Z]/, {
              message: t("auth.register.validation.password_uppercase"),
            })
            .regex(/[0-9]/, {
              message: t("auth.register.validation.password_number"),
            }),
          confirmPassword: z.string().min(1, {
            message: t("auth.register.validation.confirm_password_required"),
          }),
          otpMethod: z.enum(["phone", "email"]),
          agreeTerms: z.boolean().refine((val) => val === true, {
            message: t("auth.register.validation.agree_terms_required"),
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t("auth.register.validation.confirm_password_mismatch"),
          path: ["confirmPassword"],
        }),
    [t],
  );

  const form = useForm<RegisterRequest>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      otpMethod: "phone",
      agreeTerms: false,
    },
    resolver: zodResolver(schema),
  });

  const submit = useCallback((data: RegisterRequest) => {
    console.log("Register data:", data);
    // TODO: call API
  }, []);

  return { form, submit };
};
