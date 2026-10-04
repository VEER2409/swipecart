import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Toast, Modal } from '../../components/admin/GenericUI';
import { Edit2, Trash2, Plus } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, id: null });
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', description: '', price: '', image: '', category: '', stock: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([api.get('/products'), api.get('/categories')]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      setToast({ message: 'Failed to load data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, price: Number(formData.price), stock: Number(formData.stock) };
      if (isEditing) {
        await api.put(`/products/${formData.id}`, payload);
        setToast({ message: 'Product updated', type: 'success' });
      } else {
        await api.post('/products', payload);
        setToast({ message: 'Product created', type: 'success' });
      }
      resetForm();
      fetchData();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Action failed', type: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${modal.id}`);
      setToast({ message: 'Product deleted', type: 'success' });
      setModal({ isOpen: false, id: null });
      fetchData();
    } catch (err) {
      setToast({ message: 'Delete failed', type: 'error' });
      setModal({ isOpen: false, id: null });
    }
  };

  const handleEditClick = (prod) => {
    setIsEditing(true);
    setFormData({ 
      id: prod._id, name: prod.name, description: prod.description, 
      price: prod.price, image: prod.image, category: prod.category._id, stock: prod.stock 
    });
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({ id: '', name: '', description: '', price: '', image: '', category: '', stock: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
      
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input type="number" required min="0" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock (Units)</label>
            <input type="number" required min="0" step="1" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea required rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex gap-2 justify-end">
            {isEditing && (
              <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
            )}
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
              {isEditing ? <Edit2 className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      {loading ? <div>Loading...</div> : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(prod => (
                <tr key={prod._id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img src={prod.image} alt="" className="w-10 h-10 rounded object-cover mr-3" />
                    <span className="text-sm font-medium text-gray-900">{prod.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prod.category?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${prod.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prod.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                    <button onClick={() => handleEditClick(prod)} className="text-indigo-600 hover:text-indigo-900"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => setModal({ isOpen: true, id: prod._id })} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Modal 
        isOpen={modal.isOpen} 
        title="Delete Product" 
        message="Are you sure you want to delete this product? This action cannot be undone." 
        onConfirm={handleDelete} 
        onCancel={() => setModal({ isOpen: false, id: null })} 
      />
    </div>
  );
};

export default AdminProducts;
