import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Package, Tag, ShoppingCart } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes, orderRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
          api.get('/admin/orders')
        ]);
        setStats({
          products: prodRes.data.length,
          categories: catRes.data.length,
          orders: orderRes.data.length
        });
      } catch (error) {
        console.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">Categories</p>
            <p className="text-3xl font-bold text-gray-900">{stats.categories}</p>
          </div>
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full"><Tag className="w-8 h-8" /></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">Products</p>
            <p className="text-3xl font-bold text-gray-900">{stats.products}</p>
          </div>
          <div className="p-3 bg-green-100 text-green-600 rounded-full"><Package className="w-8 h-8" /></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">{stats.orders}</p>
          </div>
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full"><ShoppingCart className="w-8 h-8" /></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
