import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const TrendingSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'living', name: 'Living Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'dining', name: 'Dining' },
    { id: 'office', name: 'Office' },
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products.slice(0, 8) 
    : products.filter(product => product.category === activeCategory).slice(0, 8);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Trending Now</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
            Discover our latest and most popular furniture pieces
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-amber-800 text-white'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;