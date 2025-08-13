import React, { useState } from 'react';
import { ProduceItem, ColumnDefinition } from '../types';

interface ColumnManagerProps {
  columns: ColumnDefinition[];
  setColumns: (cols: ColumnDefinition[]) => void;
}

export const ColumnManager: React.FC<ColumnManagerProps> = ({ columns, setColumns }) => {
  const [draggedId, setDraggedId] = useState<keyof ProduceItem | null>(null);

  const toggleColumnVisibility = (id: keyof ProduceItem) => {
    setColumns(columns.map(col => col.id === id ? { ...col, visible: !col.visible } : col));
  };
  
  const languageColumns = columns.filter(c => c.isLanguage);

  const handleDragStart = (e: React.DragEvent<HTMLLabelElement>, id: keyof ProduceItem) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, droppedOnId: keyof ProduceItem) => {
    e.preventDefault();
    if (draggedId === null || draggedId === droppedOnId) {
      setDraggedId(null);
      return;
    }
    
    const newColumns = [...columns];
    const draggedIndex = newColumns.findIndex(c => c.id === draggedId);
    const droppedOnIndex = newColumns.findIndex(c => c.id === droppedOnId);
    
    if (draggedIndex === -1 || droppedOnIndex === -1) return;

    const [draggedItem] = newColumns.splice(draggedIndex, 1);
    newColumns.splice(droppedOnIndex, 0, draggedItem);
    
    setColumns(newColumns);
    setDraggedId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  return (
    <div className="p-4 bg-white border border-gray-200/50 rounded-lg shadow-sm h-full flex items-center">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end w-full lg:gap-4">
        <p className="text-sm text-gray-500 mb-2 lg:mb-0 flex-shrink-0">Toggle or drag languages:</p>
        <div className="flex flex-wrap items-center gap-2">
          {languageColumns.map(col => (
            <label 
              key={col.id} 
              className={`py-1 px-3 border border-gray-300 rounded-lg cursor-grab bg-white shadow-sm hover:border-blue-400/50 active:cursor-grabbing transition-all duration-300 ${draggedId === col.id ? 'opacity-50 scale-105 shadow-lg' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, col.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              onDragEnd={handleDragEnd}
              title={`Toggle visibility or drag to reorder ${col.title}`}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={col.visible}
                  onChange={() => toggleColumnVisibility(col.id)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded-md border-2 border-gray-300 bg-white transition-all duration-300 peer-checked:bg-blue-600/50 peer-checked:border-transparent flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-700 select-none">{col.title}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}