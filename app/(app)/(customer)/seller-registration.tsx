import { Box, FormInput, HeaderBack, Typo } from "@/components/ui";
import {
  responsiveFont,
  responsiveRadius,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { useSellerRegistration } from "@/modules/user/hooks";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterNewsletterScreen() {
  const theme = useThemeStore((s) => s.colors);
  const { t } = useTranslation();

  const { form, loading, submit } = useSellerRegistration();

  const {
    control,
    formState: { errors },
  } = form;

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.primary[1] }]}>
      <HeaderBack title={t("newsletter.header_title")} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Heading ── */}
          <Box marginBottom={responsiveSpacingVertical(20)}>
            <Typo
              fontSize={responsiveFont(26)}
              weight="700"
              color={theme.base[2]}
              marginBottom={responsiveSpacingVertical(8)}
            >
              {t("newsletter.title")}
            </Typo>

            <Box
              width={responsiveSpacing(40)}
              height={3}
              radius={responsiveRadius(999)}
              backgroundColor={theme.primary[2]}
              marginBottom={responsiveSpacingVertical(14)}
            />

            <Typo
              fontSize={responsiveFont(13)}
              weight="400"
              color={theme.base[5]}
              lineHeight={responsiveSpacingVertical(22)}
            >
              {t("newsletter.desc_prefix")}{" "}
              <Typo
                fontSize={responsiveFont(13)}
                weight="600"
                color={theme.primary[2]}
              >
                {t("newsletter.desc_highlight")}
              </Typo>
              {". "}
              {t("newsletter.desc_suffix")}
            </Typo>
          </Box>

          {/* ── Họ và tên ── */}
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label={t("newsletter.full_name")}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Nguyễn Văn A"
                error={errors.fullName?.message}
                keyboardType="default"
                autoCapitalize="words"
              />
            )}
          />

          {/* ── Số điện thoại ── */}
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label={t("newsletter.phone")}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="09xx xxx xxx"
                error={errors.phone?.message}
                keyboardType="phone-pad"
                autoCapitalize="none"
              />
            )}
          />

          {/* ── Email ── */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label={t("newsletter.email")}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="example@gmail.com"
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          {/* ── Submit button ── */}
          <TouchableOpacity
            onPress={submit}
            disabled={loading}
            activeOpacity={0.85}
            style={[
              styles.submitBtn,
              {
                backgroundColor: theme.primary[2],
                opacity: loading ? 0.7 : 1,
              },
            ]}
          >
            <Typo
              fontSize={responsiveFont(14)}
              weight="700"
              color={theme.base[1]}
              textAlign="center"
              textTransform="uppercase"
            >
              {loading
                ? t("newsletter.submitting")
                : t("newsletter.submit_button")}
            </Typo>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: responsiveSpacing(16),
    paddingTop: responsiveSpacingVertical(20),
    paddingBottom: responsiveSpacingVertical(100),
  },
  submitBtn: {
    borderRadius: responsiveRadius(999),
    height: responsiveSpacingVertical(54),
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: responsiveSpacingVertical(16),
  },
});
