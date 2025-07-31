import React from 'react';

type Category = {
  id: number;
  name: string;
  image: string;
};

const CategorySection: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Living Room',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    },
    {
      id: 2,
      name: 'Bedroom',
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
    },
    {
      id: 3,
      name: 'Dining',
      image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg',
    },
    {
      id: 4,
      name: 'Office',
      image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg',
    },
    {
      id: 5,
      name: 'Outdoor',
      image: 'https://images.pexels.com/photos/1368343/pexels-photo-1368343.jpeg',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Browse by Category</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our range of carefully curated furniture collections
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={`#${category.name.toLowerCase().replace(' ', '-')}`}
              className="group overflow-hidden rounded-lg relative h-64 md:h-80 block"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-xl font-medium p-6">{category.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;