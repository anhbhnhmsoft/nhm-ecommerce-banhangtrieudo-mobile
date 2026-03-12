import { TABS } from "@/components/ui";
import { responsiveFont, responsiveIcon } from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const theme = useThemeStore((state) => state.colors);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary[2],
        tabBarInactiveTintColor: theme.base[5],
        tabBarLabelStyle: {
          fontSize: responsiveFont(11),
        },
        tabBarStyle: {
          backgroundColor: theme.base[1],
          borderTopColor: "#F0F0F0",
          borderTopWidth: 1,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.key}
          name={tab.key}
          options={{
            title: tab.label,
            tabBarIcon: ({ color }) => tab.icon(color, responsiveIcon(22)),
          }}
        />
      ))}
    </Tabs>
  );
}
