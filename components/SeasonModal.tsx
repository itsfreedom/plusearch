
import React from 'react';
import type { PluItem } from '../types';

interface SeasonModalProps {
  item: PluItem | null;
  onClose: () => void;
}

const SeasonModal: React.FC<SeasonModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="season-modal-title"
    >
      <div 
        className="bg-white rounded-lg p-6 sm:p-8 shadow-xl text-gray-800 max-w-sm w-full mx-4 transform transition-transform duration-300 scale-95" 
        onClick={(e) => {
            e.stopPropagation();
            const target = e.currentTarget;
            target.classList.remove('scale-95');
            target.classList.add('scale-100');
        }}
      >
        <header className="mb-4">
            <h2 id="season-modal-title" className="text-2xl font-bold text-gray-900">{item.korean}</h2>
            <p className="text-lg text-gray-600">{item.english}</p>
        </header>
        
        <div className="mt-4">
            <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Seasonality</h3>
            <p className="text-xl mt-1 font-semibold">{item.season || 'N/A'}</p>
        </div>
        
        <button 
          onClick={onClose} 
          className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition duration-300"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SeasonModal;