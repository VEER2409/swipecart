import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = React.useContext(CartContext);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setProducts(res.data.slice(0, 4)); // Show first 4 popular products
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="bg-indigo-600 rounded-2xl p-8 sm:p-12 text-white text-center mb-12 shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Swipe Your Way to Style</h1>
        <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">Discover the latest trends with our innovative Swipe to Shop feature. Adding to cart has never been this fun.</p>
        <Link to="/swipe" className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          <span>Start Swiping</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-800 font-medium">View All</Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} onAdd={(p) => addToCart(p)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
