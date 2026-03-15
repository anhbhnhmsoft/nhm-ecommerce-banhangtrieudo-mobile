// screens/auth/otp.tsx
import { HeaderBack } from "@/components/ui";
import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { OtpCodeField } from "@/modules/auth/components";
import { useOtp } from "@/modules/auth/hook";
import { Fingerprint } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Otp() {
  const { t } = useTranslation();
  const theme = useThemeStore((state) => state.colors);
  const { otp, setOtp, countdown, canResend, resend, submit, isReady } =
    useOtp();

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

          <Box
            flex={1}
            paddingHorizontal={responsiveSpacing(24)}
            alignItems="center"
            justifyContent="center"
            paddingBottom={responsiveSpacingVertical(40)}
          >
            {/* Icon */}
            <Box
              width={responsiveSpacing(80)}
              height={responsiveSpacing(80)}
              radius={responsiveSpacing(40)}
              backgroundColor={theme.primary[3]}
              alignItems="center"
              justifyContent="center"
              marginBottom={responsiveSpacingVertical(24)}
            >
              <Fingerprint size={responsiveIcon(38)} color={theme.primary[2]} />
            </Box>

            {/* Title */}
            <Typo
              weight="700"
              fontSize={responsiveFont(26)}
              color={theme.base[2]}
              textAlign="center"
              marginBottom={responsiveSpacingVertical(12)}
            >
              {t("auth.otp.title")}
            </Typo>

            {/* Subtitle */}
            <Typo
              fontSize={responsiveFont(14)}
              color={theme.base[5]}
              textAlign="center"
              lineHeight={responsiveFont(22)}
              marginBottom={responsiveSpacingVertical(36)}
            >
              {t("auth.otp.subtitle")}
            </Typo>

            {/* OTP Input */}
            <Box width="100%" marginBottom={responsiveSpacingVertical(36)}>
              <OtpCodeField value={otp} setValue={setOtp} />
            </Box>

            {/* Confirm Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.confirmButton,
                {
                  backgroundColor: isReady ? theme.primary[2] : theme.base[3],
                },
              ]}
              onPress={submit}
              disabled={!isReady}
            >
              <Typo
                weight="700"
                fontSize={responsiveFont(16)}
                color={theme.base[1]}
              >
                {t("auth.otp.confirm_button")}
              </Typo>
            </TouchableOpacity>

            {/* Resend */}
            <Box alignItems="center" marginTop={responsiveSpacingVertical(20)}>
              <Typo fontSize={responsiveFont(13)} color={theme.base[5]}>
                {t("auth.otp.no_code")}
              </Typo>
              <TouchableOpacity
                onPress={resend}
                disabled={!canResend}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={{ marginTop: responsiveSpacingVertical(4) }}
              >
                <Typo
                  fontSize={responsiveFont(13)}
                  color={canResend ? theme.primary[2] : theme.base[5]}
                  weight="600"
                >
                  {canResend
                    ? t("auth.otp.resend")
                    : t("auth.otp.resend_after", { seconds: countdown })}
                </Typo>
              </TouchableOpacity>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  confirmButton: {
    width: "100%",
    borderRadius: responsiveSpacing(30),
    height: responsiveSpacingVertical(54),
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: { flexGrow: 1 },
});
