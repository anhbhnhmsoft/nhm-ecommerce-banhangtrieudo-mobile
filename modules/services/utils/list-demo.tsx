import { ServiceItem } from "../components";

export type CategorySevicesItem = {
  id: string;
  label: string;
  image: string;
};

export const serviceCategories: CategorySevicesItem[] = [
  {
    id: "design",
    label: "Thiết Kế",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
  },
  {
    id: "homestay",
    label: "Home Stay",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  },
  {
    id: "ads",
    label: "Quảng Cáo",

    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  },
  {
    id: "real_estate",
    label: "Bất Động Sản",

    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
    id: "finance",
    label: "HT Tài Chính",

    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818",
  },
];

export const SERVICE_DATA: ServiceItem[] = [
  {
    id: "1",
    title: "Tư vấn chiến lược Marketing tổng thể",
    subtitle: "Từ 5.000.000đ",
    tag: "Kinh nghiệm 10 năm",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
  },
  {
    id: "2",
    title: "Luật sư tư vấn doanh nghiệp trọn gói",
    subtitle: "Liên hệ báo giá",
    tag: "Pháp lý tin cậy",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
  },
];
