import React, { useEffect } from 'react';
import { ProduceItem } from '../types';

interface SeasonPopupProps {
    item: ProduceItem;
    onClose: () => void;
}

export const SeasonPopup: React.FC<SeasonPopupProps> = ({ item, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="season-popup-title"
        >
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-md m-4 transform transition-all overflow-hidden" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center bg-blue-600/50 text-white p-4">
                    <h3 id="season-popup-title" className="text-xl font-bold">
                        {item.English} <span className="text-base font-medium opacity-80">({item.Korean})</span>
                        <span className="block text-sm font-medium opacity-80 mt-1">PLU: {item.PLU}</span>
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="text-white opacity-70 hover:opacity-100 p-1 rounded-full hover:bg-black/20 transition-all"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-base text-gray-600">
                        Typical Harvest Months: <span className="font-bold text-green-800">{item.Season}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
