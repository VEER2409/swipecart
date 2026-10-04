import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Toast, Modal } from '../../components/admin/GenericUI';
import { Edit2, Trash2, Plus } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, id: null });
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', description: '' });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      setToast({ message: 'Failed to load categories', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/categories/${formData.id}`, { name: formData.name, description: formData.description });
        setToast({ message: 'Category updated', type: 'success' });
      } else {
        await api.post('/categories', { name: formData.name, description: formData.description });
        setToast({ message: 'Category created', type: 'success' });
      }
      setFormData({ id: '', name: '', description: '' });
      setIsEditing(false);
      fetchCategories();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Action failed', type: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/${modal.id}`);
      setToast({ message: 'Category deleted', type: 'success' });
      setModal({ isOpen: false, id: null });
      fetchCategories();
    } catch (err) {
      setToast({ message: 'Delete failed', type: 'error' });
      setModal({ isOpen: false, id: null });
    }
  };

  const handleEditClick = (cat) => {
    setIsEditing(true);
    setFormData({ id: cat._id, name: cat.name, description: cat.description || '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
      
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Category' : 'Add New Category'}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border-gray-300 rounded-md p-2 border focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input type="text" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full border-gray-300 rounded-md p-2 border focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
              {isEditing ? <Edit2 className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              {isEditing ? 'Update' : 'Add'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: '', name: '', description: '' }); }} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      {loading ? <div>Loading...</div> : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map(cat => (
                <tr key={cat._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cat.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                    <button onClick={() => handleEditClick(cat)} className="text-indigo-600 hover:text-indigo-900"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => setModal({ isOpen: true, id: cat._id })} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button>
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
        title="Delete Category" 
        message="Are you sure you want to delete this category? This action cannot be undone." 
        onConfirm={handleDelete} 
        onCancel={() => setModal({ isOpen: false, id: null })} 
      />
    </div>
  );
};

export default AdminCategories;
