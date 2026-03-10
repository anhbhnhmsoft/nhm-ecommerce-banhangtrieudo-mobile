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
import { useRegister } from "@/modules/auth/hook/use-register";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const { t } = useTranslation();
  const theme = useThemeStore((state) => state.colors);
  const { form, submit } = useRegister();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const otpMethod = watch("otpMethod");
  const agreeTerms = watch("agreeTerms");

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
          <HeaderBack title={t("auth.register.title")} />

          {/* Body */}
          <Box
            flex={1}
            paddingHorizontal={responsiveSpacing(24)}
            paddingTop={responsiveSpacingVertical(8)}
          >
            {/* Heading */}
            <Box
              marginBottom={responsiveSpacingVertical(6)}
              alignItems="center"
            >
              <Typo
                weight="700"
                fontSize={responsiveFont(30)}
                color={theme.base[2]}
              >
                {t("auth.register.heading")}
              </Typo>
            </Box>

            {/* Subtitle */}
            <Box
              marginBottom={responsiveSpacingVertical(28)}
              alignItems="center"
            >
              <Typo
                fontSize={responsiveFont(14)}
                color={theme.base[5]}
                lineHeight={responsiveFont(22)}
                textAlign="center"
              >
                {t("auth.register.subtitle")}
              </Typo>
            </Box>

            {/* Full Name */}
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.register.fullname_label")}
                  placeholder={t("auth.register.fullname_placeholder")}
                  autoCapitalize="words"
                  error={errors.fullName?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  leftIcon={
                    <FontAwesome
                      name="user"
                      size={responsiveIcon(18)}
                      color={theme.primary[2]}
                    />
                  }
                />
              )}
            />

            {/* Phone */}
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.register.phone_label")}
                  placeholder={t("auth.register.phone_placeholder")}
                  keyboardType="phone-pad"
                  error={errors.phone?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  leftIcon={
                    <FontAwesome
                      name="phone"
                      size={responsiveIcon(18)}
                      color={theme.primary[2]}
                    />
                  }
                />
              )}
            />

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.register.email_label")}
                  placeholder={t("auth.register.email_placeholder")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  leftIcon={
                    <FontAwesome
                      name="envelope"
                      size={responsiveIcon(16)}
                      color={theme.primary[2]}
                    />
                  }
                />
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.register.password_label")}
                  placeholder={t("auth.register.password_placeholder")}
                  isPassword
                  error={errors.password?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  leftIcon={
                    <FontAwesome6
                      name="lock"
                      size={responsiveIcon(18)}
                      color={theme.primary[2]}
                    />
                  }
                />
              )}
            />

            {/* Confirm Password */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.register.confirm_password_label")}
                  placeholder={t("auth.register.confirm_password_placeholder")}
                  isPassword
                  error={errors.confirmPassword?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  leftIcon={
                    <FontAwesome5
                      name="lock"
                      size={responsiveIcon(16)}
                      color={theme.primary[2]}
                    />
                  }
                />
              )}
            />

            {/* OTP Method */}
            <Box
              flexDirection="row"
              alignItems="center"
              marginBottom={responsiveSpacingVertical(8)}
            >
              {(["phone", "email"] as const).map((method, index) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.radioOption,
                    {
                      borderColor:
                        otpMethod === method ? theme.primary[2] : theme.base[3],
                      backgroundColor:
                        otpMethod === method ? theme.primary[3] : theme.base[1],
                      marginRight: index === 0 ? responsiveSpacing(12) : 0,
                    },
                  ]}
                  onPress={() => setValue("otpMethod", method)}
                  activeOpacity={0.7}
                >
                  <Box
                    width={responsiveSpacing(16)}
                    height={responsiveSpacing(16)}
                    radius={responsiveSpacing(8)}
                    borderWidth={2}
                    borderColor={
                      otpMethod === method ? theme.primary[2] : theme.base[3]
                    }
                    alignItems="center"
                    justifyContent="center"
                    marginRight={responsiveSpacing(8)}
                  >
                    {otpMethod === method && (
                      <Box
                        width={responsiveSpacing(8)}
                        height={responsiveSpacing(8)}
                        radius={responsiveSpacing(4)}
                        backgroundColor={theme.primary[2]}
                      />
                    )}
                  </Box>
                  <Typo
                    fontSize={responsiveFont(13)}
                    color={
                      otpMethod === method ? theme.primary[2] : theme.base[2]
                    }
                    weight={otpMethod === method ? "600" : "400"}
                  >
                    {t(`auth.register.otp_${method}`)}
                  </Typo>
                </TouchableOpacity>
              ))}
            </Box>

            {/* Agree Terms */}
            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setValue("agreeTerms", !agreeTerms)}
              activeOpacity={0.7}
            >
              <Box
                width={responsiveSpacing(20)}
                height={responsiveSpacing(20)}
                radius={responsiveSpacing(4)}
                borderWidth={2}
                borderColor={agreeTerms ? theme.primary[2] : theme.base[3]}
                backgroundColor={agreeTerms ? theme.primary[2] : "transparent"}
                alignItems="center"
                justifyContent="center"
                marginRight={responsiveSpacing(8)}
              >
                {agreeTerms && (
                  <FontAwesome
                    name="check"
                    size={responsiveIcon(11)}
                    color={theme.base[1]}
                  />
                )}
              </Box>

              <Box flex={1}>
                <Text
                  style={{
                    fontSize: responsiveFont(14),
                    lineHeight: responsiveFont(20),
                  }}
                >
                  <Text style={{ color: theme.base[2] }}>
                    {t("auth.register.agree_terms")}
                  </Text>
                  <Text
                    style={{ color: theme.primary[2], fontWeight: "600" }}
                    onPress={() => {}}
                  >
                    {t("auth.register.terms_link")}
                  </Text>
                  <Text style={{ color: theme.base[2] }}>
                    {t("auth.register.and")}
                  </Text>
                  <Text
                    style={{ color: theme.primary[2], fontWeight: "600" }}
                    onPress={() => {}}
                  >
                    {t("auth.register.privacy_link")}
                  </Text>
                  <Text style={{ color: theme.base[2] }}>
                    {t("auth.register.terms_suffix")}
                  </Text>
                </Text>
              </Box>
            </TouchableOpacity>

            {/* Terms Error */}
            {errors.agreeTerms && (
              <Typo
                fontSize={responsiveFont(12)}
                color={theme.secondary[1]}
                italic
                marginBottom={responsiveSpacingVertical(16)}
              >
                {errors.agreeTerms.message}
              </Typo>
            )}

            {/* Register Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.registerButton,
                { backgroundColor: theme.primary[2] },
              ]}
              onPress={() => router.push("/verify-otp")}
            >
              <Typo
                weight="700"
                fontSize={responsiveFont(16)}
                color={theme.base[1]}
              >
                {t("auth.register.register_button")}
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
              {t("auth.register.have_account")}{" "}
            </Typo>
            <TouchableOpacity
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              onPress={() => router.replace("/login")}
            >
              <Typo
                fontSize={responsiveFont(14)}
                color={theme.primary[2]}
                weight="600"
              >
                {t("auth.register.login_now")}
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
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: responsiveSpacingVertical(10),
    marginTop: responsiveSpacingVertical(8),
  },
  registerButton: {
    borderRadius: responsiveSpacing(30),
    height: responsiveSpacingVertical(54),
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveSpacingVertical(8),
    marginBottom: responsiveSpacingVertical(8),
  },
  radioOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: responsiveSpacing(12),
    paddingHorizontal: responsiveSpacing(14),
    paddingVertical: responsiveSpacingVertical(12),
  },
});
