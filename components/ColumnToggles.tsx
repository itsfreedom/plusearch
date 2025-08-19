
import React, { useState, useRef } from 'react';
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
  const itemRefs = useRef<Partial<Record<ColumnKey, HTMLLabelElement | null>>>({});

  const reorderColumns = (dragKey: ColumnKey, dropKey: ColumnKey) => {
    if (dragKey === dropKey) return;

    const newOrder = [...columnOrder];
    const draggedIndex = newOrder.indexOf(dragKey);
    const targetIndex = newOrder.indexOf(dropKey);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, dragKey);

    onColumnOrderChange(newOrder);
  };

  // --- Desktop Drag & Drop Handlers ---
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
    if (draggedKey) {
        reorderColumns(draggedKey, targetKey);
    }
    setDraggedKey(null);
    setDragOverKey(null);
  };
  
  const handleDragEnd = () => {
    setDraggedKey(null);
    setDragOverKey(null);
  };

  // --- Mobile Touch Handlers ---
  const handleTouchStart = (key: ColumnKey) => {
    setDraggedKey(key);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!draggedKey) return;

    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    
    let currentOverKey: ColumnKey | null = null;
    if (targetElement) {
        for (const key of columnOrder) {
            if (itemRefs.current[key]?.contains(targetElement)) {
                currentOverKey = key;
                break;
            }
        }
    }
    
    if (currentOverKey && currentOverKey !== draggedKey) {
      setDragOverKey(currentOverKey);
    } else if (!currentOverKey) {
      setDragOverKey(null);
    }
  };

  const handleTouchEnd = () => {
    if (draggedKey && dragOverKey) {
        reorderColumns(draggedKey, dragOverKey);
    }
    setDraggedKey(null);
    setDragOverKey(null);
  };


  return (
    <div>
        <p className="text-sm text-gray-600 mb-2 font-semibold">Toggle & Reorder Columns</p>
        <div 
            className="flex flex-wrap gap-3"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseUp={handleDragEnd} // Also clean up on mouse up in case dragEnd doesn't fire
        >
            {columnOrder.map((key) => {
                const isDragging = draggedKey === key;
                const isDragOver = dragOverKey === key;
                return (
                    <label
                        key={key}
                        ref={el => { itemRefs.current[key] = el; }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, key)}
                        onDragOver={(e) => handleDragOver(e, key)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, key)}
                        onDragEnd={handleDragEnd}
                        onTouchStart={() => handleTouchStart(key)}
                        style={{ cursor: 'grab', touchAction: 'none' }}
                        className={`relative flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 bg-white border ${
                            visibility[key]
                            ? 'border-sky-500 shadow-sm'
                            : 'border-gray-300 hover:bg-gray-50'
                        } ${isDragging ? 'opacity-50 scale-105 shadow-lg' : 'opacity-100'}`}
                    >
                        {isDragOver && <div className="absolute top-0 left-0 h-full w-1 bg-sky-500 rounded" aria-hidden="true" />}
                        <input
                            type="checkbox"
                            checked={visibility[key]}
                            onChange={() => onToggle(key)}
                            className={`h-4 w-4 rounded transition-colors duration-200 focus:ring-2 focus:ring-offset-2 ${
                                visibility[key] 
                                ? 'bg-white border-sky-600 text-sky-600 focus:ring-sky-500 focus:ring-offset-white'
                                : 'bg-white border-gray-300 text-transparent focus:ring-sky-500 focus:ring-offset-white'
                            }`}
                        />
                        <span className={`ml-3 select-none text-sm font-medium ${visibility[key] ? 'text-sky-900' : 'text-gray-800'}`}>{columnDisplayNames[key]}</span>
                    </label>
                )
            })}
        </div>
    </div>
  );
};

export default ColumnToggles;