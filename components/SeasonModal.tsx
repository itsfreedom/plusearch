
import React from 'react';
import type { PluItem } from '../types';

interface SeasonModalProps {
  item: PluItem | null;
  onClose: () => void;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

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
        className="relative bg-white rounded-lg p-6 sm:p-8 shadow-xl text-gray-800 max-w-sm w-full mx-4 transform transition-transform duration-300 scale-95" 
        onClick={(e) => {
            e.stopPropagation();
            const target = e.currentTarget;
            target.classList.remove('scale-95');
            target.classList.add('scale-100');
        }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 rounded-full p-1"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        
        <div>
            <h2 id="season-modal-title" className="text-2xl font-bold text-gray-900 pr-8">{item.english} ({item.korean})</h2>
            <hr className="my-4 border-gray-200" />
            <p className="text-lg text-gray-600">
                <span className="font-semibold">Seasonality:</span> {item.season || 'N/A'}
            </p>
        </div>

      </div>
    </div>
  );
};

export default SeasonModal;