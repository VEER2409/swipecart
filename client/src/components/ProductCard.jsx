import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-sm text-gray-500 mb-1">{product.category?.name}</div>
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAdd(product)}
            disabled={product.stock === 0}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${product.stock > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.stock > 0 ? 'Add' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
