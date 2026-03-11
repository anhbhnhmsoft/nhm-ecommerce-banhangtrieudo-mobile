import { BottomNavigation, TABS } from "@/components/ui";
import { TAB_ROUTES, TabKey } from "@/modules/app/utils/type";
import { Tabs, useRouter } from "expo-router";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => (
        <BottomNavigation
          activeTab={props.state.routes[props.state.index].name as TabKey}
          onTabPress={(tab) => router.push(TAB_ROUTES[tab])}
        />
      )}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.key}
          name={tab.key}
          options={{
            title: tab.label,
          }}
        />
      ))}
    </Tabs>
  );
}
