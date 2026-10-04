import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800 font-medium">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item._id} className="p-6 flex flex-col sm:flex-row sm:items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6" />
              <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900"><Link to={`/products/${item._id}`}>{item.name}</Link></h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1, item.stock)} className="p-2 text-gray-600 hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
                    <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1, item.stock)} className="p-2 text-gray-600 hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="text-lg font-bold text-gray-900 w-20 text-right">${(item.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => removeFromCart(item._id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">
            Subtotal: <span className="text-2xl font-bold ml-2">${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
