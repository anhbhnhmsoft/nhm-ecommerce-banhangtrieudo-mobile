export type TabKey = "home" | "products" | "services" | "news";

export const TAB_ROUTES: Record<
  TabKey,
  | "/(app)/(tabs)/home"
  | "/(app)/(tabs)/products"
  | "/(app)/(tabs)/services"
  | "/(app)/(tabs)/news"
> = {
  home: "/(app)/(tabs)/home",
  products: "/(app)/(tabs)/products",
  services: "/(app)/(tabs)/services",
  news: "/(app)/(tabs)/news",
};
