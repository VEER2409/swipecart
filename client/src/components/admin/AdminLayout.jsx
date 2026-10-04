import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, ShoppingCart, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="p-4 flex items-center justify-center border-b border-indigo-700">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/categories" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded transition-colors">
            <Tag className="w-5 h-5" />
            <span>Categories</span>
          </Link>
          <Link to="/admin/products" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded transition-colors">
            <Package className="w-5 h-5" />
            <span>Products</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span>Orders</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-indigo-700">
          <button onClick={handleLogout} className="flex items-center space-x-2 w-full p-2 hover:bg-indigo-700 rounded transition-colors text-red-300 hover:text-red-100">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
