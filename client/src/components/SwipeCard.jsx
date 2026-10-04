import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';

const SwipeCard = ({ product, onSwipe, disabled }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Feedback opacity
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (event, info) => {
    if (disabled) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      onSwipe('right', product);
    } else if (offset < -100 || velocity < -500) {
      onSwipe('left', product);
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag={!disabled ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className={`absolute w-full h-[60vh] max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing ${disabled ? 'opacity-50 grayscale' : ''}`}
    >
      <img src={product.image} alt={product.name} className="w-full h-3/5 object-cover pointer-events-none" />
      
      {/* Feedback Overlay */}
      <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 right-8 border-4 border-green-500 text-green-500 font-bold text-4xl px-4 py-1 rounded-lg transform rotate-12 z-10 pointer-events-none">
        ADD
      </motion.div>
      <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 left-8 border-4 border-red-500 text-red-500 font-bold text-4xl px-4 py-1 rounded-lg transform -rotate-12 z-10 pointer-events-none">
        SKIP
      </motion.div>

      <div className="p-6 h-2/5 flex flex-col pointer-events-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h2>
        <p className="text-indigo-600 font-medium text-sm mb-4">{product.category?.name}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-3xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
          <span className={`text-sm font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
