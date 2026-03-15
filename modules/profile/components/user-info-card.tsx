import { BoxShadow } from "@/components/ui";
import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { Mail, Phone, User } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserInfoCardProps {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  style?: object;
}

// ─── InfoRow ──────────────────────────────────────────────────────────────────

const InfoRow = ({
  icon: Icon,
  label,
  value,
  showDivider = true,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  showDivider?: boolean;
}) => {
  const theme = useThemeStore((s) => s.colors);

  return (
    <>
      <Box
        flexDirection="row"
        alignItems="center"
        paddingVertical={responsiveSpacingVertical(12)}
        style={{ gap: responsiveSpacing(12) }}
      >
        <Box
          width={responsiveSize(36)}
          height={responsiveSize(36)}
          radius={responsiveRadius(10)}
          alignItems="center"
          justifyContent="center"
          backgroundColor="#F5F5F5"
        >
          <Icon size={responsiveIcon(16)} color="#D4AF37" />
        </Box>

        <Box flex={1}>
          <Typo fontSize={responsiveFont(11)} color={theme.base[5]}>
            {label}
          </Typo>
          <Typo
            fontSize={responsiveFont(14)}
            color={theme.base[2]}
            weight="500"
            marginTop={responsiveSpacingVertical(2)}
          >
            {value}
          </Typo>
        </Box>
      </Box>

      {showDivider && <Box height={1} backgroundColor={theme.base[4]} />}
    </>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

export const UserInfoCard = ({ user, style }: UserInfoCardProps) => {
  const { t } = useTranslation();

  const rows = [
    { icon: User, label: t("profile.fields.name"), value: user.name },
    { icon: Mail, label: t("profile.fields.email"), value: user.email },
    { icon: Phone, label: t("profile.fields.phone"), value: user.phone },
  ];

  return (
    <BoxShadow
      radius={responsiveRadius(20)}
      padding={responsiveSpacing(16)}
      style={[{ marginBottom: responsiveSpacingVertical(12) }, style]}
    >
      {rows.map((row, i) => (
        <InfoRow
          key={i}
          icon={row.icon}
          label={row.label}
          value={row.value}
          showDivider={i < rows.length - 1}
        />
      ))}
    </BoxShadow>
  );
};
