export type FeaturedProduct = {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
};

export type Product = {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
};
