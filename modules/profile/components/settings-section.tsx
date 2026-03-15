import { BoxShadow } from "@/components/ui";
import {
  responsiveRadius,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import {
  BookOpen,
  ClipboardList,
  Globe,
  HelpCircle,
  Settings,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { SettingItem } from "./setting-item";

interface SettingsSectionProps {
  onItemPress?: (item: any) => void;
  style?: object;
}

export const SettingsSection = ({
  onItemPress,
  style,
}: SettingsSectionProps) => {
  const { t } = useTranslation();

  return (
    <BoxShadow
      radius={responsiveRadius(20)}
      padding={responsiveSpacing(16)}
      style={[{ marginBottom: responsiveSpacingVertical(12) }, style]}
    >
      <SettingItem
        icon={Settings}
        label={t("profile.settings.change_info")}
        color="#D4AF37"
      />
      <SettingItem
        icon={Globe}
        label={t("profile.settings.language")}
        color="#00A63E"
        value="Tiếng Việt"
      />
      <SettingItem
        icon={BookOpen}
        label={t("profile.settings.user_guide")}
        color="#9C27B0"
      />
      <SettingItem
        icon={HelpCircle}
        label={t("profile.settings.terms")}
        color="#2B7FFF"
      />
      <SettingItem
        icon={ClipboardList}
        label={t("profile.settings.privacy")}
        color="#FF6900"
      />
    </BoxShadow>
  );
};
