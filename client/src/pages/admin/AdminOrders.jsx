import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Toast } from '../../components/admin/GenericUI';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/orders');
      setOrders(res.data);
    } catch (err) {
      setToast({ message: 'Failed to load orders', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus });
      setToast({ message: 'Order status updated', type: 'success' });
      fetchOrders();
    } catch (err) {
      setToast({ message: 'Status update failed', type: 'error' });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID & Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items & Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order._id}</div>
                  <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">{order.shippingAddress?.name || order.user?.name}</div>
                  <div className="text-sm text-gray-500">{order.shippingAddress?.city}, {order.shippingAddress?.pincode}</div>
                  <div className="text-xs text-gray-500">{order.shippingAddress?.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-bold">${order.totalAmount.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">{order.items.reduce((acc, i) => acc + i.quantity, 0)} items</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`text-sm rounded-full px-3 py-1 font-semibold border-0 ring-1 ring-inset ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
                      order.status === 'Cancelled' ? 'bg-red-50 text-red-700 ring-red-600/20' : 
                      'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminOrders;
