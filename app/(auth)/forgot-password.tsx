// screens/auth/forgot-password.tsx
import { HeaderBack } from "@/components/ui";
import Box from "@/components/ui/box";
import { FormInput } from "@/components/ui/form-input";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { useForgotPassword } from "@/modules/auth/hook";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const theme = useThemeStore((state) => state.colors);
  const { form, submit } = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.primary[1] }]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <HeaderBack backgroudColor="transparent" />

          {/* Body */}
          <Box
            flex={1}
            paddingHorizontal={responsiveSpacing(24)}
            paddingTop={responsiveSpacingVertical(24)}
          >
            {/* Title */}
            <Box
              marginBottom={responsiveSpacingVertical(10)}
              alignItems="center"
            >
              <Typo
                weight="700"
                fontSize={responsiveFont(30)}
                color={theme.base[2]}
              >
                {t("auth.forgot_password.title")}
              </Typo>
            </Box>

            {/* Subtitle */}
            <Box
              marginBottom={responsiveSpacingVertical(36)}
              alignItems="center"
            >
              <Typo
                fontSize={responsiveFont(14)}
                color={theme.base[5]}
                lineHeight={responsiveFont(22)}
                textAlign="center"
              >
                {t("auth.forgot_password.subtitle")}
              </Typo>
            </Box>

            {/* Contact Input */}
            <Controller
              control={control}
              name="contact"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.forgot_password.contact_label")}
                  placeholder={t("auth.forgot_password.contact_placeholder")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.contact?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  leftIcon={
                    <FontAwesome
                      name="at"
                      size={responsiveIcon(17)}
                      color={theme.primary[2]}
                    />
                  }
                />
              )}
            />

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.submitButton,
                { backgroundColor: theme.primary[2] },
              ]}
              onPress={() => router.push("/reset-password")}
            >
              <Typo
                weight="700"
                fontSize={responsiveFont(15)}
                color={theme.base[1]}
                textTransform="uppercase"
              >
                {t("auth.forgot_password.submit_button")}
              </Typo>
            </TouchableOpacity>
          </Box>

          {/* Footer */}
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            paddingVertical={responsiveSpacingVertical(28)}
          >
            <Typo fontSize={responsiveFont(14)} color={theme.base[5]}>
              {t("auth.forgot_password.need_help")}{" "}
            </Typo>
            <TouchableOpacity
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Typo
                fontSize={responsiveFont(14)}
                color={theme.primary[2]}
                weight="600"
              >
                {t("auth.forgot_password.contact_support")}
              </Typo>
            </TouchableOpacity>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  submitButton: {
    borderRadius: responsiveSpacing(30),
    height: responsiveSpacingVertical(54),
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveSpacingVertical(8),
  },
});
