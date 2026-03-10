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
import { useLogin } from "@/modules/auth/hook";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Lock } from "lucide-react-native";
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

export default function Login() {
  const { t } = useTranslation();
  const theme = useThemeStore((state) => state.colors);
  const { form, submit } = useLogin();

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
          <HeaderBack showBack={false} title={t("auth.login.title")} />
          {/* Body */}
          <Box
            flex={1}
            paddingHorizontal={responsiveSpacing(24)}
            paddingTop={responsiveSpacingVertical(16)}
          >
            {/* Lock Icon */}
            <Box
              alignItems="center"
              marginBottom={responsiveSpacingVertical(24)}
            >
              <Box
                width={responsiveSpacing(70)}
                height={responsiveSpacing(70)}
                radius={responsiveSpacing(35)}
                backgroundColor={theme.primary[3]}
                alignItems="center"
                justifyContent="center"
              >
                <Lock size={responsiveIcon(36)} color={theme.primary[2]} />
              </Box>
            </Box>

            {/* Title */}
            <Box
              alignItems="center"
              marginBottom={responsiveSpacingVertical(10)}
            >
              <Typo
                weight="700"
                fontSize={responsiveFont(28)}
                color={theme.base[2]}
                textAlign="center"
              >
                {t("auth.login.welcome")}
              </Typo>
            </Box>

            {/* Subtitle */}
            <Box
              alignItems="center"
              marginBottom={responsiveSpacingVertical(36)}
            >
              <Typo
                fontSize={responsiveFont(14)}
                color={theme.base[5]}
                textAlign="center"
                lineHeight={responsiveFont(22)}
              >
                {t("auth.login.subtitle")}
              </Typo>
            </Box>

            {/* Email Input */}
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.login.email_label")}
                  placeholder={t("auth.login.email_placeholder")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.phone?.message}
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

            {/* Password Input */}
            <Controller
              control={form.control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label={t("auth.login.password_label")}
                  placeholder={t("auth.login.password_placeholder")}
                  isPassword
                  error={errors.password?.message}
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
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

            {/* Forgot Password */}
            <Box
              alignItems="flex-end"
              marginBottom={responsiveSpacingVertical(28)}
            >
              <TouchableOpacity
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => router.push("/forgot-password")}
              >
                <Typo
                  fontSize={responsiveFont(14)}
                  color={theme.primary[2]}
                  weight="500"
                >
                  {t("auth.login.forgot_password")}
                </Typo>
              </TouchableOpacity>
            </Box>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.loginButton,
                { backgroundColor: theme.primary[2] },
              ]}
              onPress={handleSubmit(submit)}
            >
              <Typo
                weight="700"
                fontSize={responsiveFont(16)}
                color={theme.base[1]}
              >
                {t("auth.login.login_button")}
              </Typo>
            </TouchableOpacity>
          </Box>

          {/* Footer */}
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            paddingVertical={responsiveSpacingVertical(32)}
          >
            <Typo fontSize={responsiveFont(14)} color={theme.base[5]}>
              {t("auth.login.no_account")}
              {""}
            </Typo>
            <TouchableOpacity
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              onPress={() => router.push("/register")}
            >
              <Typo
                fontSize={responsiveFont(14)}
                color={theme.primary[2]}
                weight="600"
              >
                {t("auth.login.register_now")}
              </Typo>
            </TouchableOpacity>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  loginButton: {
    borderRadius: responsiveSpacing(30),
    height: responsiveSpacingVertical(54),
    alignItems: "center",
    justifyContent: "center",
  },
});
