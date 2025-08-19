
import React from 'react';
import type { PluItem, SortConfig, ColumnKey } from '../types';

interface PluTableProps {
  data: PluItem[];
  onSort: (key: keyof PluItem) => void;
  sortConfig: SortConfig;
  onInfoClick: (item: PluItem) => void;
  columnOrder: ColumnKey[];
  columnVisibility: Record<ColumnKey, boolean>;
}

const ITEMS_PER_PAGE = 20;

const SortIcon: React.FC<{ direction: 'ascending' | 'descending' | null }> = ({ direction }) => {
  if (direction === 'ascending') return <span className="text-teal-500">▲</span>;
  if (direction === 'descending') return <span className="text-teal-500">▼</span>;
  return <span className="text-gray-400">↕</span>;
};

const InfoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const columnDisplayNames: Record<ColumnKey, string> = {
  korean: 'Korean',
  english: 'English',
  french: 'French',
  season: 'Season',
};

const PluTable: React.FC<PluTableProps> = ({ 
    data, onSort, sortConfig, onInfoClick,
    columnOrder, columnVisibility
}) => {
  const getSortDirection = (key: keyof PluItem) => {
      if (!sortConfig || sortConfig.key !== key) return null;
      return sortConfig.direction;
  }

  const emptyRows = ITEMS_PER_PAGE - data.length;
  const visibleColumnCount = 1 + columnOrder.filter(key => columnVisibility[key]).length;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold w-1/6">
                <button onClick={() => onSort('plu')} className="flex items-center gap-2 hover:text-gray-900">PLU <SortIcon direction={getSortDirection('plu')} /></button>
            </th>
            {columnOrder.map(key => {
              if (!columnVisibility[key]) return null;
              return (
                <th 
                  key={key} 
                  scope="col" 
                  className="px-6 py-4 font-semibold"
                >
                  <button onClick={() => onSort(key)} className="flex items-center gap-2 hover:text-gray-900">{columnDisplayNames[key]} <SortIcon direction={getSortDirection(key)} /></button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={`${item.plu}-${index}`} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
              <td className="px-6 py-4 font-mono font-bold text-teal-600 whitespace-nowrap">{item.plu}</td>
              {columnOrder.map(key => {
                if (!columnVisibility[key]) return null;
                
                if (key === 'season') {
                  return (
                    <td key={key} className="px-6 py-4 text-center">
                      <button onClick={() => onInfoClick(item)} className="text-gray-400 hover:text-teal-500 transition-colors" aria-label={`View season for ${item.english}`}>
                          <InfoIcon />
                      </button>
                    </td>
                  );
                }

                return <td key={key} className="px-6 py-4">{item[key]}</td>;
              })}
            </tr>
          ))}
          {emptyRows > 0 && Array.from({ length: emptyRows }).map((_, index) => (
            <tr key={`empty-${index}`}>
              <td colSpan={visibleColumnCount} className="px-6 py-4">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PluTable;
