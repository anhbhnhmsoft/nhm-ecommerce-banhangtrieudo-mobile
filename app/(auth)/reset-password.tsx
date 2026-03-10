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
import { useThemeStore } from "@/modules/app";
import { useResetPassword } from "@/modules/auth/hook";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { CheckCircle2, Circle } from "lucide-react-native";
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

const PasswordHintItem = ({
  passed,
  label,
}: {
  passed: boolean;
  label: string;
}) => {
  const theme = useThemeStore((state) => state.colors);
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      marginBottom={responsiveSpacingVertical(6)}
    >
      {passed ? (
        <CheckCircle2 size={responsiveIcon(16)} color={theme.secondary[4]} />
      ) : (
        <Circle size={responsiveIcon(16)} color={theme.base[3]} />
      )}
      <Typo
        fontSize={responsiveFont(13)}
        color={passed ? theme.secondary[4] : theme.base[5]}
        marginLeft={responsiveSpacing(8)}
      >
        {label}
      </Typo>
    </Box>
  );
};

export default function ResetPassword() {
  const { t } = useTranslation();
  const theme = useThemeStore((state) => state.colors);
  const { form, submit } = useResetPassword();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const password = watch("password");

  const hints = [
    {
      key: "length",
      label: t("auth.reset_password.hint_length"),
      passed: password.length >= 8,
    },
    {
      key: "uppercase",
      label: t("auth.reset_password.hint_uppercase"),
      passed: /[A-Z]/.test(password),
    },
    {
      key: "lowercase",
      label: t("auth.reset_password.hint_lowercase"),
      passed: /[a-z]/.test(password),
    },
    {
      key: "number",
      label: t("auth.reset_password.hint_number"),
      passed: /[0-9]/.test(password),
    },
  ];

  const allPassed = hints.every((h) => h.passed);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.primary[1] }]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
        >
          {/* Header */}
          <HeaderBack />

          <Box
            flex={1}
            paddingHorizontal={responsiveSpacing(24)}
            paddingTop={responsiveSpacingVertical(16)}
          >
            {/* Icon */}
            <Box
              alignItems="center"
              marginBottom={responsiveSpacingVertical(24)}
            >
              <Box
                width={responsiveSpacing(80)}
                height={responsiveSpacing(80)}
                radius={responsiveSpacing(40)}
                backgroundColor={theme.primary[3]}
                alignItems="center"
                justifyContent="center"
              >
                <FontAwesome6
                  name="lock"
                  size={responsiveIcon(32)}
                  color={theme.primary[2]}
                />
              </Box>
            </Box>

            {/* Title */}
            <Box
              alignItems="center"
              marginBottom={responsiveSpacingVertical(10)}
            >
              <Typo
                weight="700"
                fontSize={responsiveFont(26)}
                color={theme.base[2]}
                textAlign="center"
              >
                {t("auth.reset_password.title")}
              </Typo>
            </Box>

            {/* Subtitle */}
            <Box
              alignItems="center"
              marginBottom={responsiveSpacingVertical(32)}
            >
              <Typo
                fontSize={responsiveFont(14)}
                color={theme.base[5]}
                textAlign="center"
                lineHeight={responsiveFont(22)}
              >
                {t("auth.reset_password.subtitle")}
              </Typo>
            </Box>

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.reset_password.password_label")}
                  placeholder={t("auth.reset_password.password_placeholder")}
                  isPassword
                  error={errors.password?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  leftIcon={
                    <FontAwesome6
                      name="lock"
                      size={responsiveIcon(17)}
                      color={theme.base[3]}
                    />
                  }
                />
              )}
            />

            {/* Password Hints */}
            <Box
              backgroundColor={theme.primary[3]}
              radius={responsiveSpacing(12)}
              padding={responsiveSpacing(14)}
              marginTop={responsiveSpacingVertical(-8)}
              marginBottom={responsiveSpacingVertical(16)}
            >
              {hints.map((hint) => (
                <PasswordHintItem
                  key={hint.key}
                  passed={hint.passed}
                  label={hint.label}
                />
              ))}
            </Box>

            {/* Confirm Password Input */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.reset_password.confirm_label")}
                  placeholder={t("auth.reset_password.confirm_placeholder")}
                  isPassword
                  error={errors.confirmPassword?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  leftIcon={
                    <FontAwesome6
                      name="lock"
                      size={responsiveIcon(17)}
                      color={theme.base[3]}
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
                {
                  backgroundColor: allPassed ? theme.primary[2] : theme.base[3],
                },
              ]}
              onPress={handleSubmit(submit)}
              disabled={!allPassed}
            >
              <Typo
                weight="700"
                fontSize={responsiveFont(16)}
                color={theme.base[1]}
              >
                {t("auth.reset_password.submit_button")}
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
    marginBottom: responsiveSpacingVertical(24),
  },
});
