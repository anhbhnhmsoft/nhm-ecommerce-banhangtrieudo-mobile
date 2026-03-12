import { DefaultColor, HeaderApp, TextLabel } from "@/components/ui";
import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  appInfo,
  responsiveFont,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import {
  HistoryTabs,
  LogoutButton,
  SettingsSection,
  UserInfoCard,
} from "@/modules/profile/components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: "Nguyễn Thị Linh",
  email: "linh.nguyen@taichonli.com.vn",
  phone: "0901 234 567",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
};

const MOCK_ORDERS = [
  {
    id: "DH001",
    name: "Cafe Arabica 500g",
    status: "delivering",
    date: "10/03/2026",
    price: "250.000 VND",
  },
  {
    id: "DH002",
    name: "Trà Ô Long Cao Cấp",
    status: "pending",
    date: "08/03/2026",
    price: "180.000 VND",
  },
  {
    id: "DH003",
    name: "Cà Phê Robusta 1kg",
    status: "done",
    date: "01/03/2026",
    price: "320.000 VND",
  },
];

const MOCK_BOOKINGS = [
  {
    id: "BK001",
    name: "Chăm Sóc Da Mặt Premium",
    status: "pending",
    date: "15/03/2026",
    time: "10:00",
  },
  {
    id: "BK002",
    name: "Massage Thư Giãn 60 phút",
    status: "done",
    date: "05/03/2026",
    time: "14:30",
  },
];

type TabKey = "orders" | "bookings";

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>("orders");

  return (
    <View style={{ flex: 1, backgroundColor: DefaultColor.primary[1] }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + responsiveSpacingVertical(32),
        }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderApp showProfile={false} />

        <Box
          paddingHorizontal={responsiveSpacing(16)}
          paddingTop={responsiveSpacingVertical(8)}
        >
          <Box>
            <TextLabel title={t("profile.info_title")} />
            <UserInfoCard user={MOCK_USER} />
          </Box>

          {/* ── Lịch sử — Tab ── */}
          <Box>
            <TextLabel title={t("profile.history.title")} />
            <HistoryTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              orders={MOCK_ORDERS}
              bookings={MOCK_BOOKINGS}
            />
          </Box>

          {/* ── Cài đặt ── */}
          <Box>
            <TextLabel title={t("profile.settings.title")} />
            <SettingsSection />
          </Box>

          {/* ── Đăng xuất ── */}
          <LogoutButton />

          <Typo
            fontSize={responsiveFont(11)}
            color={theme.base[5]}
            style={{ textAlign: "center" }}
            marginTop={responsiveSpacingVertical(12)}
          >
            {t("profile.version")} {appInfo.version} • © {appInfo.year}
          </Typo>
        </Box>
      </ScrollView>
    </View>
  );
}
