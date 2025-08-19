
import React, { useState } from 'react';
import type { ColumnKey } from '../types';

interface ColumnTogglesProps {
  visibility: Record<ColumnKey, boolean>;
  onToggle: (key: ColumnKey) => void;
  columnOrder: ColumnKey[];
  onColumnOrderChange: (newOrder: ColumnKey[]) => void;
}

const columnDisplayNames: Record<ColumnKey, string> = {
  korean: 'Korean',
  english: 'English',
  french: 'French',
  season: 'Season',
};

const ColumnToggles: React.FC<ColumnTogglesProps> = ({ visibility, onToggle, columnOrder, onColumnOrderChange }) => {
  const [draggedKey, setDraggedKey] = useState<ColumnKey | null>(null);
  const [dragOverKey, setDragOverKey] = useState<ColumnKey | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLabelElement>, key: ColumnKey) => {
    setDraggedKey(key);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', key);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>, key: ColumnKey) => {
    e.preventDefault();
    if (key !== draggedKey) {
        setDragOverKey(key);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOverKey(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, targetKey: ColumnKey) => {
    e.preventDefault();
    if (!draggedKey || draggedKey === targetKey) {
      return;
    }

    const newOrder = [...columnOrder];
    const draggedIndex = newOrder.indexOf(draggedKey);
    const targetIndex = newOrder.indexOf(targetKey);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedKey);

    onColumnOrderChange(newOrder);
    setDraggedKey(null);
    setDragOverKey(null);
  };
  
  const handleDragEnd = () => {
    setDraggedKey(null);
    setDragOverKey(null);
  };


  return (
    <div>
        <p className="text-sm text-gray-600 mb-2 font-semibold">Toggle & Reorder Columns</p>
        <div className="flex flex-wrap gap-3">
            {columnOrder.map((key) => {
                const isDragging = draggedKey === key;
                const isDragOver = dragOverKey === key;
                return (
                    <label
                        key={key}
                        draggable
                        onDragStart={(e) => handleDragStart(e, key)}
                        onDragOver={(e) => handleDragOver(e, key)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, key)}
                        onDragEnd={handleDragEnd}
                        style={{ cursor: 'grab' }}
                        className={`relative flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 bg-white border ${
                            visibility[key]
                            ? 'border-teal-500 shadow-sm'
                            : 'border-gray-300 hover:bg-gray-50'
                        } ${isDragging ? 'opacity-50 scale-105 shadow-lg' : 'opacity-100'}`}
                    >
                        {isDragOver && <div className="absolute top-0 left-0 h-full w-1 bg-teal-400 rounded" aria-hidden="true" />}
                        <input
                            type="checkbox"
                            checked={visibility[key]}
                            onChange={() => onToggle(key)}
                            className={`h-4 w-4 rounded transition-colors duration-200 focus:ring-2 focus:ring-offset-2 ${
                                visibility[key] 
                                ? 'bg-teal-600 border-transparent text-white focus:ring-white focus:ring-offset-teal-600'
                                : 'bg-white border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-offset-gray-100'
                            }`}
                        />
                        <span className={`ml-3 select-none text-sm font-medium ${visibility[key] ? 'text-teal-700' : 'text-gray-800'}`}>{columnDisplayNames[key]}</span>
                    </label>
                )
            })}
        </div>
    </div>
  );
};

export default ColumnToggles;
