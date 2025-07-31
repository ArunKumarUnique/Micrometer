import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Inquiry } from '../types';

interface AppContextType {
  products: Product[];
  categories: Category[];
  inquiries: Inquiry[];
  isAdmin: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  filteredProducts: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialCategories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'furniture', name: 'Furniture', icon: 'Armchair' },
  { id: 'cutlery', name: 'Cutlery', icon: 'Utensils' },
  { id: 'electricals', name: 'Electricals', icon: 'Zap' },
  { id: 'appliances', name: 'Home Appliances', icon: 'Refrigerator' },
  { id: 'kitchenware', name: 'Kitchenware', icon: 'ChefHat' },
];

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Samsung 55" Smart TV',
    category: 'electronics',
    price: 45000,
    image: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg',
    description: 'Ultra HD 4K Smart TV with built-in WiFi and streaming apps',
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'LG Double Door Refrigerator',
    category: 'appliances',
    price: 35000,
    image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg',
    description: '260L capacity with inverter technology for energy efficiency',
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Wooden Dining Table Set',
    category: 'furniture',
    price: 18000,
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    description: '6-seater dining table with chairs, solid wood construction',
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: 'Stainless Steel Cutlery Set',
    category: 'cutlery',
    price: 2500,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    description: '24-piece premium cutlery set with elegant finish',
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: 'Ceiling Fan with LED Light',
    category: 'electricals',
    price: 4500,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    description: 'Energy efficient ceiling fan with integrated LED lighting',
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: 'Pressure Cooker 5L',
    category: 'kitchenware',
    price: 3200,
    image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg',
    description: 'Aluminum pressure cooker with safety features',
    inStock: true,
    featured: false
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories] = useState<Category[]>(initialCategories);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    categories.find(cat => cat.id === product.category)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.max(...inquiries.map(i => i.id), 0) + 1,
      createdAt: new Date().toISOString()
    };
    setInquiries([...inquiries, newInquiry]);
  };

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in production, use proper authentication
    if (username === 'admin' && password === 'raviteja123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <AppContext.Provider value={{
      products,
      categories,
      inquiries,
      isAdmin,
      searchQuery,
      setSearchQuery,
      addProduct,
      updateProduct,
      deleteProduct,
      addInquiry,
      login,
      logout,
      filteredProducts
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};