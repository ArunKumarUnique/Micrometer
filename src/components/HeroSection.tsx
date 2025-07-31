import React from 'react';
import { ChevronRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
          alt="Modern living room with stylish furniture"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
            Designed for <span className="font-medium">modern living</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Discover furniture that balances aesthetics with functionality,
            crafted for contemporary lifestyles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-neutral-900 py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center">
              Shop Collection <ChevronRight className="ml-1 h-4 w-4" />
            </button>
            <button className="border border-white text-white py-3 px-6 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-all">
              Explore Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;