import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (error || !product) return <div className="text-center py-12 text-red-600">{error || 'Product not found'}</div>;

  const handleAdd = () => {
    if (addToCart(product, quantity)) {
      navigate('/cart');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover max-h-[500px]" />
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col">
        <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">{product.category?.name}</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
        <p className="text-gray-500 mb-6 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        
        {product.stock > 0 && (
          <div className="flex space-x-4">
            <div className="w-24">
              <input 
                type="number" 
                min="1" 
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full text-center border-gray-300 rounded-md py-3 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button 
              onClick={handleAdd}
              className="flex-grow flex justify-center items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
