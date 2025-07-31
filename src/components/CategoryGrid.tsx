import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Armchair, 
  Utensils, 
  Zap, 
  Refrigerator, 
  ChefHat 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const iconMap = {
  Smartphone,
  Armchair,
  Utensils,
  Zap,
  Refrigerator,
  ChefHat
};

const CategoryGrid: React.FC = () => {
  const { categories, products } = useApp();

  const getCategoryProductCount = (categoryId: string) => {
    return products.filter(product => product.category === categoryId).length;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of electronics and home essentials
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map(category => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            const productCount = getCategoryProductCount(category.id);
            
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{productCount} items</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;