import { CategorySevicesItem } from "@/modules/services/components";
import { Product } from "./type";

export const productCategories: CategorySevicesItem[] = [
  {
    id: "cafe",
    label: "Cafe",

    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    id: "food",
    label: "Thực Phẩm",

    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
  },
  {
    id: "agriculture",
    label: "Nông Nghiệp",

    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    id: "pawn",
    label: "Cầm Đồ",

    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
  },
];

export const FEATURED_DATA: Product[] = [
  {
    id: "1",
    title: "Cafe Arabica ",
    price: "250.000đ",
    location: "TP. Hồ Chí Minh",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Homestay View Hồ Đà Lạt - Căn 2PN",
    price: "1.200.000đ",
    location: "Đà Lạt",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
  },
  {
    id: "3",
    title: "Trà Oolong Cao Sơn Đà Lạt 250g",
    price: "180.000đ",
    location: "Đà Lạt",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
  },
];
