export type TabKey = "home" | "products" | "services" | "account";

export const TAB_ROUTES: Record<
  TabKey,
  | "/(app)/(tabs)/home"
  | "/(app)/(tabs)/products"
  | "/(app)/(tabs)/services"
  | "/(app)/(tabs)/account"
> = {
  home: "/(app)/(tabs)/home",
  products: "/(app)/(tabs)/products",
  services: "/(app)/(tabs)/services",
  account: "/(app)/(tabs)/account",
};
