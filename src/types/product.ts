export interface Product {
  id: number;
  name: string;
  price: number;
  discountPercentage: number;
  category: string;
  image: string;
  featured: boolean;
  description: string;
  colors: string[];
  material: string;
}