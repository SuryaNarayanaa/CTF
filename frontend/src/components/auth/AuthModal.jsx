import React from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-none border-2 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-96 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:text-white-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl mb-6 font-['Press_Start_2P'] text-center text-black">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export { AuthModal };