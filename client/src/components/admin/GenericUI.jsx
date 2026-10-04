import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-bounce">
      <div className={`rounded-lg shadow-lg p-4 flex items-center space-x-3 text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
        {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="hover:text-gray-200 focus:outline-none">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const Modal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
      <div className="relative w-auto max-w-sm mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex items-center justify-end space-x-4">
            <button
              className="px-4 py-2 text-sm font-bold text-gray-600 uppercase transition-all duration-150 ease-linear hover:text-gray-900"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-600 rounded shadow hover:shadow-md hover:bg-red-700"
              type="button"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
