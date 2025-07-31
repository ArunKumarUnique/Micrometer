export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Inquiry {
  id: number;
  productId: number;
  productName: string;
  customerName: string;
  mobile: string;
  email?: string;
  createdAt: string;
}