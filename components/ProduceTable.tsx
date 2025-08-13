import React, { useState } from 'react';
import { ProduceItem, ColumnDefinition } from '../types';
import { SeasonPopup } from './SeasonPopup';

interface ProduceTableProps {
  data: ProduceItem[];
  columns: ColumnDefinition[];
}

export const ProduceTable: React.FC<ProduceTableProps> = ({ data, columns }) => {
  const [selectedItem, setSelectedItem] = useState<ProduceItem | null>(null);

  const visibleColumns = columns.filter(c => c.visible);

  return (
    <>
      <div className="overflow-x-auto min-h-[1100px]">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-600 uppercase bg-gray-100/50">
            <tr>
              {visibleColumns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  className={`p-4 font-semibold select-none ${col.id === 'Season' ? 'text-center' : ''}`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.PLU} className="bg-white border-b border-gray-200/50 hover:bg-gray-50/50 transition-colors duration-150">
                  {visibleColumns.map(col => (
                    <td key={`${item.PLU}-${col.id}`} className={`p-4 ${col.id === 'Season' ? 'text-center' : ''}`}>
                      {col.id === 'Season' ? (
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="bg-blue-600/50 text-white hover:bg-blue-600/75 transition-colors p-1 rounded-full"
                          aria-label={`View season for ${item.English}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1.5 9V8h3v7h-3z" clipRule="evenodd" />
                          </svg>
                        </button>
                      ) : (
                        item[col.id]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={visibleColumns.length} className="text-center p-8 text-gray-500">
                  No results found. Try a different search term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedItem && (
        <SeasonPopup item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};
