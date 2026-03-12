import { Box, BoxShadow, Typo } from "@/components/ui";
import { InfoRow } from "@/components/utils/infor-row";
import {
  moderateScale,
  responsiveFont,
  responsiveIcon,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { Clock, Globe, Mail, MapPin } from "lucide-react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Image, Linking } from "react-native";

interface CompanyInfo {
  logo?: any;
  name: string;
  subtitle: string;
  address: string;
  email: string;
  website: string;
  workingHours: string;
}

interface Props {
  company: CompanyInfo;
}

export const CompanyCard = ({ company }: Props) => {
  const theme = useThemeStore((s) => s.colors);
  const accentColor = theme.secondary[2];
  const { t } = useTranslation();

  const openURL = useCallback(async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {}
  }, []);

  const iconProps = { size: responsiveIcon(18), color: theme.base[5] };

  return (
    <BoxShadow
      radius={moderateScale(18)}
      style={{
        borderColor: "transparent",
        overflow: "hidden",
        marginVertical: responsiveSpacingVertical(8),
      }}
    >
      {/* ── Header Card (gold) ── */}
      <Box
        padding={responsiveSpacing(16)}
        backgroundColor={theme.primary[2]}
        flexDirection="row"
      >
        {/* Logo */}
        <Box
          width={responsiveSize(56)}
          height={responsiveSize(56)}
          radius={moderateScale(14)}
          backgroundColor="rgba(255,255,255,0.25)"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          {company.logo ? (
            <Image
              source={company.logo}
              style={{ width: responsiveSize(48), height: responsiveSize(48) }}
            />
          ) : (
            <Typo fontSize={responsiveFont(22)} color="#fff" weight="700">
              {company.name[0]}
            </Typo>
          )}
        </Box>

        {/* Name */}
        <Box flex={1} marginLeft={responsiveSpacing(12)}>
          <Typo fontSize={responsiveFont(20)} color="#fff" weight="700">
            {company.name}
          </Typo>
          <Typo fontSize={responsiveFont(13)} color="rgba(255,255,255,0.8)">
            {company.subtitle}
          </Typo>
        </Box>
      </Box>

      {/* ── Info Card ── */}
      <Box
        backgroundColor={theme.base[1]}
        radius={moderateScale(16)}
        paddingHorizontal={responsiveSpacing(16)}
        paddingTop={responsiveSpacingVertical(4)}
      >
        <InfoRow
          icon={<MapPin {...iconProps} />}
          label={t("contact.address")}
          value={company.address}
          theme={theme}
          accentColor={accentColor}
        />
        <InfoRow
          icon={<Mail {...iconProps} />}
          label={t("contact.email")}
          value={company.email}
          isLink
          onPress={() => openURL(`mailto:${company.email}`)}
          theme={theme}
          accentColor={accentColor}
        />
        <InfoRow
          icon={<Globe {...iconProps} />}
          label={t("contact.website")}
          value={company.website}
          isLink
          onPress={() => openURL(company.website)}
          theme={theme}
          accentColor={accentColor}
        />
        <InfoRow
          icon={<Clock {...iconProps} />}
          label={t("contact.working_hours")}
          value={company.workingHours}
          theme={theme}
          accentColor={accentColor}
        />
      </Box>
    </BoxShadow>
  );
};
