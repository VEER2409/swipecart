import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import SwipeCard from '../components/SwipeCard';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const SwipeToShop = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSwipe = (direction, product) => {
    if (direction === 'right') {
      if (product.stock > 0) {
        addToCart(product, 1);
      }
    }
    setCurrentIndex(prev => prev + 1);
  };

  const currentProduct = products[currentIndex];

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] overflow-hidden">
      <div className="relative w-full max-w-sm sm:max-w-md h-[60vh] flex items-center justify-center">
        {currentIndex >= products.length ? (
          <div className="text-center p-8 bg-white rounded-2xl shadow-sm w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">You've seen them all!</h2>
            <p className="text-gray-500">Check out your cart to complete your order.</p>
          </div>
        ) : (
          <AnimatePresence>
            {currentProduct && (
              <SwipeCard 
                key={currentProduct._id} 
                product={currentProduct} 
                onSwipe={handleSwipe} 
                disabled={currentProduct.stock === 0}
              />
            )}
          </AnimatePresence>
        )}
      </div>

      {currentIndex < products.length && currentProduct && (
        <div className="mt-8 flex justify-center space-x-6">
          <button 
            onClick={() => handleSwipe('left', currentProduct)}
            className="w-16 h-16 flex items-center justify-center bg-white border-2 border-red-100 text-red-500 rounded-full shadow-lg hover:bg-red-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            <X className="w-8 h-8" />
          </button>
          <button 
            onClick={() => handleSwipe('right', currentProduct)}
            disabled={currentProduct.stock === 0}
            className="w-16 h-16 flex items-center justify-center bg-white border-2 border-green-100 text-green-500 rounded-full shadow-lg hover:bg-green-50 hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:hover:scale-100"
          >
            <ShoppingCart className="w-7 h-7" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SwipeToShop;
