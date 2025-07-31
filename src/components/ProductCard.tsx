import React, { useState } from 'react';
import { ShoppingCart, Eye, Edit, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import InquiryModal from './InquiryModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const { isAdmin, deleteProduct } = useApp();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product.id);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">
              Featured
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-blue-900">
              ₹{product.price.toLocaleString()}
            </span>
            <span className={`px-2 py-1 text-xs rounded ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="flex gap-2">
            {product.inStock && (
              <button
                onClick={() => setShowInquiryModal(true)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={16} className="mr-2" />
                Enquire Now
              </button>
            )}
            
            {isAdmin && (
              <div className="flex gap-1">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <Edit size={16} />
                </button>
                <button 
                  onClick={handleDelete}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showInquiryModal && (
        <InquiryModal
          product={product}
          onClose={() => setShowInquiryModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;