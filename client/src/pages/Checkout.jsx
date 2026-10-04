import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const items = cart.map(item => ({ productId: item._id, quantity: item.quantity }));
      await api.post('/orders', { items, shippingAddress });
      clearCart();
      navigate('/my-orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
        {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-sm rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" name="phone" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea name="address" required rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange}></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" name="city" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <input type="text" name="pincode" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500" onChange={handleChange} />
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50">
              {loading ? 'Processing...' : 'Place Order (Cash on Delivery)'}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/3">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map(item => (
              <li key={item._id} className="py-3 flex justify-between">
                <div className="text-sm">
                  <span className="text-gray-900 font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 pt-4 flex justify-between">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-indigo-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
