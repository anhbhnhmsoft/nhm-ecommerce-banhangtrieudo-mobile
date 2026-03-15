export type TabKey = "home" | "products" | "services" | "news" | "contact";

export const TAB_ROUTES: Record<
  TabKey,
  | "/(app)/(tabs)/home"
  | "/(app)/(tabs)/products"
  | "/(app)/(tabs)/services"
  | "/(app)/(tabs)/news"
  | "/(app)/(tabs)/contact"
> = {
  home: "/(app)/(tabs)/home",
  products: "/(app)/(tabs)/products",
  services: "/(app)/(tabs)/services",
  contact: "/(app)/(tabs)/contact",
  news: "/(app)/(tabs)/news",
};
