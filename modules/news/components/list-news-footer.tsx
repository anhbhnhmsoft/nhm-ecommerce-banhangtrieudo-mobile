import { Box, DefaultColor, Typo } from "@/components/ui";
import {
  moderateScale,
  responsiveFont,
  responsiveIcon,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { Mail, Send } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextInput, TouchableOpacity } from "react-native";

export const NewsletterBlock = () => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);
  const [email, setEmail] = useState("");

  return (
    <Box
      backgroundColor={theme.primary[3]} // #F4EFE2 — kem ấm
      radius={moderateScale(20)}
      padding={responsiveSpacing(20)}
      marginHorizontal={responsiveSpacing(16)}
      marginTop={responsiveSpacing(20)}
      marginBottom={responsiveSpacingVertical(24)}
      alignItems="center"
      borderColor={theme.primary[2] + "55"}
      borderWidth={1}
    >
      {/* Gold icon bubble */}
      <Box
        width={responsiveSize(52)}
        height={responsiveSize(52)}
        radius={999}
        backgroundColor={theme.primary[2]}
        alignItems="center"
        justifyContent="center"
        marginBottom={responsiveSpacingVertical(12)}
        style={{
          shadowColor: theme.primary[2],
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.35,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Mail size={responsiveIcon(24)} color={theme.base[1]} />
      </Box>

      {/* Title */}
      <Typo
        fontSize={responsiveFont(16)}
        color={DefaultColor.base[2]} // #000000
        weight="700"
        style={{ textAlign: "center" }}
        marginBottom={responsiveSpacingVertical(6)}
      >
        {t("news.newsletter.title")}
      </Typo>

      {/* Subtitle */}
      <Typo
        fontSize={responsiveFont(12)}
        color={DefaultColor.base[5]} // #A1A1A1
        style={{ textAlign: "center" }}
        marginBottom={responsiveSpacingVertical(18)}
      >
        {t("news.newsletter.subtitle")}
      </Typo>

      {/* Input */}
      <Box
        flexDirection="row"
        alignItems="center"
        backgroundColor={DefaultColor.base[1]} // #FFFFFF
        radius={moderateScale(12)}
        paddingHorizontal={responsiveSpacing(14)}
        marginBottom={responsiveSpacingVertical(10)}
        style={{
          width: "100%",
          height: responsiveSize(48),
          borderWidth: 1,
          borderColor: theme.primary[2] + "55", // gold mờ
          gap: responsiveSpacing(8),
        }}
      >
        <Mail size={responsiveIcon(14)} color={DefaultColor.base[5]} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t("news.newsletter.placeholder")}
          placeholderTextColor={DefaultColor.base[3]} // #C8C8C8
          style={{
            flex: 1,
            color: DefaultColor.base[2],
            fontSize: responsiveFont(13),
            paddingVertical: responsiveSpacingVertical(10),
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Box>

      <TouchableOpacity activeOpacity={0.82} style={{ width: "100%" }}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          backgroundColor={theme.primary[2]} // #D4AF37
          radius={moderateScale(12)}
          marginTop={responsiveSpacing(16)}
        >
          <Send size={responsiveIcon(14)} color={DefaultColor.base[1]} />
          <Typo
            fontSize={responsiveFont(13)}
            color={DefaultColor.base[1]} // #FFFFFF
            weight="700"
            paddingVertical={responsiveSpacingVertical(12)}
            marginLeft={responsiveSpacingVertical(16)}
          >
            {t("news.newsletter.cta")}
          </Typo>
        </Box>
      </TouchableOpacity>

      {/* Note */}
      <Typo
        fontSize={responsiveFont(10)}
        color={theme.base[5]} // #A1A1A1
        style={{ textAlign: "center" }}
        marginTop={responsiveSpacingVertical(10)}
      >
        {t("news.newsletter.note")}
      </Typo>
    </Box>
  );
};
