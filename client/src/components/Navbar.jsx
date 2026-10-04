import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">SwipeCart</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/products" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-medium">Products</Link>
              <Link to="/swipe" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-medium">Swipe to Shop</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="text-gray-500 hover:text-gray-900 relative p-2">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/my-orders" className="text-sm font-medium text-gray-700 hover:text-gray-900">My Orders</Link>
                {user.role === 'admin' && <Link to="/admin" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Admin Dashboard</Link>}
                <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-900">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">Login</Link>
                <Link to="/register" className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md">Sign Up</Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <Link to="/cart" className="text-gray-500 hover:text-gray-900 relative p-2 mr-4">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-900 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Products</Link>
            <Link to="/swipe" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Swipe to Shop</Link>
            {user ? (
              <>
                <Link to="/my-orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">My Orders</Link>
                {user.role === 'admin' && <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">Admin Dashboard</Link>}
                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-gray-50">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
