import { Box, HeaderApp, TextLabel } from "@/components/ui";
import { HotlineItem } from "@/components/utils";
import { CompanyCard } from "@/components/utils/company-card";
import { responsiveSpacing, responsiveSpacingVertical } from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

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
  company?: CompanyInfo;
  hotlines?: any[];
}

const MOCK_COMPANY: CompanyInfo = {
  name: "TVH",
  subtitle: "Nhà Quảng Cáo",
  address: "Số 5 Ngõ 58 Trần Vỹ",
  email: "contact@nhmsoft.vn",
  website: "https://nhmsoft.vn",
  workingHours: "Thứ 2 - Thứ 7: 8:00 - 18:00\nChủ nhật: 8:00 - 12:00",
};

const MOCK_HOTLINES: any[] = [
  {
    id: "1",
    label: "Tư vấn & đặt hàng",
    name: "Hotline 1",
    phone: "0901 234 567",
  },
  {
    id: "2",
    label: "Tư vấn & đặt hàng",
    name: "Hotline 3",
    phone: "0901 234 567",
  },
  {
    id: "3",
    label: "Tư vấn & đặt hàng",
    name: "Hotline 3",
    phone: "0901 234 567",
  },
];

export default function ContactScreen({
  company = MOCK_COMPANY,
  hotlines = MOCK_HOTLINES,
}: Props) {
  const theme = useThemeStore((s) => s.colors);
  const accentColor = theme.secondary[2];
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary[1] }}>
      <HeaderApp />
      <ScrollView
        contentContainerStyle={{ paddingBottom: responsiveSpacingVertical(40) }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hotlines Section ── */}
        <Box
          marginHorizontal={responsiveSpacing(16)}
          marginTop={responsiveSpacingVertical(20)}
        >
          <CompanyCard company={company} />
          {/* Section title */}
          <Box marginTop={responsiveSpacing(16)}>
            <TextLabel title={t("contact.contact_cooperation")} />

            {/* Hotline list */}
            {hotlines.map((item) => (
              <HotlineItem key={item.id} item={item} />
            ))}
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}
