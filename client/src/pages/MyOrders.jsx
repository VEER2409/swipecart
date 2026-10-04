import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my-orders')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  if (orders.length === 0) return <div className="text-center py-12 text-gray-500">You have no orders.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <span className="text-xs text-gray-500 uppercase">Order ID</span>
                <p className="text-sm font-medium text-gray-900">{order._id}</p>
              </div>
              <div className="mt-2 sm:mt-0 text-right">
                <span className="text-xs text-gray-500 uppercase">Date</span>
                <p className="text-sm font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {order.items.map((item, idx) => (
                  <li key={idx} className="py-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Total Amount</span>
              <span className="text-lg font-bold text-indigo-600">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
