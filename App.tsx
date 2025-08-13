import React, { useState, useEffect, useMemo } from 'react';
import { ProduceItem, ColumnDefinition } from './types';
import { produceData } from './data/produceData';
import { ProduceTable } from './components/ProduceTable';
import { Pagination } from './components/Pagination';
import { ColumnManager } from './components/ColumnManager';

const initialColumns: ColumnDefinition[] = [
  { id: 'PLU', title: 'PLU', visible: true, isLanguage: false },
  { id: 'Korean', title: 'Korean', visible: true, isLanguage: true },
  { id: 'English', title: 'English', visible: true, isLanguage: true },
  { id: 'French', title: 'French', visible: false, isLanguage: true },
  { id: 'Season', title: 'Season', visible: true, isLanguage: false },
];

const ITEMS_PER_PAGE = 20;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState<ColumnDefinition[]>(initialColumns);
  const [currentPage, setCurrentPage] = useState(1);

  const allData: ProduceItem[] = produceData;
  
  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return allData;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return allData.filter(item => 
      item.PLU.toString().includes(lowercasedTerm) ||
      item.Korean.toLowerCase().includes(lowercasedTerm) ||
      item.English.toLowerCase().includes(lowercasedTerm) ||
      item.French.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, allData]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredData]);


  return (
    <div className="min-h-screen text-gray-800 font-sans bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        
        {/* Header Section */}
        <header className="bg-blue-600/50 py-6 px-[20px] rounded-b-xl shadow-lg mb-8">
          <div className="flex justify-between items-end relative" style={{ top: '5px' }}>
            <div className="flex items-end space-x-2">
              <img 
                src="https://justone.ai/user-assets/178c5f55dff548108de0f75df61d8402/367d490cad2a4a7aa6d6af60825eaec3/072ff6d98e9443caa47be34697b1426e" 
                alt="H-Mart Logo" 
                className="h-6 w-auto" 
              />
              <span className="text-red-600 text-xs font-bold relative -left-[7px]">Montreal</span>
            </div>
            <h1 className="text-xl font-bold text-white">Produce Search</h1>
          </div>
        </header>

        <section className="bg-white p-4 sm:p-6 rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-stretch mb-6">
            <div className="relative w-full lg:w-1/2 mb-4 lg:mb-0">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by PLU, Korean, English, or French name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-full p-4 pl-12 text-base border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                />
            </div>
            <div className="w-full lg:w-1/2 lg:ml-[15px]">
              <ColumnManager 
                columns={columns}
                setColumns={setColumns}
              />
            </div>
          </div>

          <ProduceTable 
            data={paginatedData}
            columns={columns}
          />

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
          )}
        </section>
        
        {/* Footer Section */}
        <footer className="mt-6 border-t border-gray-200">
          <div className="pt-[10px] pb-6">
            <p className="text-sm text-gray-500">H-Mart Montreal Produce Search © 2025 by Jun Kye</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;