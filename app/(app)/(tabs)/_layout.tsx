import { BottomNavigation, TabKey, TABS } from "@/components/ui";
import { Tabs, useRouter } from "expo-router";

const TAB_ROUTES: Record<
  TabKey,
  | "/(app)/(tabs)/home"
  | "/(app)/(tabs)/manage"
  | "/(app)/(tabs)/post"
  | "/(app)/(tabs)/zalo"
  | "/(app)/(tabs)/account"
> = {
  home: "/(app)/(tabs)/home",
  manage: "/(app)/(tabs)/manage",
  post: "/(app)/(tabs)/post",
  zalo: "/(app)/(tabs)/zalo",
  account: "/(app)/(tabs)/account",
};

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
