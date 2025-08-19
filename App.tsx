
import React, { useState, useMemo, useEffect } from 'react';
import { pluData } from './data';
import type { PluItem, SortConfig, ColumnKey } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PluTable from './components/PluTable';
import Footer from './components/Footer';
import SeasonModal from './components/SeasonModal';
import ColumnToggles from './components/ColumnToggles';
import Pagination from './components/Pagination';

const initialColumns: ColumnKey[] = ['korean', 'english', 'french', 'season'];
const ITEMS_PER_PAGE = 10;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [selectedItem, setSelectedItem] = useState<PluItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [columnOrder, setColumnOrder] = useState<ColumnKey[]>(initialColumns);
  const [columnVisibility, setColumnVisibility] = useState<Record<ColumnKey, boolean>>({
    korean: true,
    english: true,
    french: false,
    season: false,
  });

  const filteredData = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (!lowercasedQuery) {
      return pluData;
    }

    return pluData.filter((item) =>
      item.plu.toLowerCase().includes(lowercasedQuery) ||
      item.korean.toLowerCase().includes(lowercasedQuery) ||
      item.english.toLowerCase().includes(lowercasedQuery) ||
      item.french.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const key = sortConfig.key;
        if (a[key] < b[key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortConfig]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  }, [sortedData]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);


  const requestSort = (key: keyof PluItem) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleInfoClick = (item: PluItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const toggleColumnVisibility = (key: ColumnKey) => {
    setColumnVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8">
        <Header />
      </div>
      
      <main className="max-w-5xl mx-auto w-full flex-grow px-4 sm:px-6 md:px-8 space-y-6 mt-6">
        
        {/* Search Section */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="sticky top-4 z-20 mb-4">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <ColumnToggles 
            visibility={columnVisibility}
            onToggle={toggleColumnVisibility}
            columnOrder={columnOrder}
            onColumnOrderChange={setColumnOrder}
          />
        </section>

        {/* Table & Pagination Section */}
        <section className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          {sortedData.length > 0 ? (
            <>
              <PluTable 
                data={paginatedData} 
                onSort={requestSort}
                sortConfig={sortConfig}
                onInfoClick={handleInfoClick}
                columnOrder={columnOrder}
                columnVisibility={columnVisibility}
              />
              {totalPages > 1 && (
                <div className="mt-8 mb-4">
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 px-4">
              <p className="text-xl text-gray-600">No results found.</p>
              <p className="text-md text-gray-400 mt-2">Try a different search term.</p>
            </div>
          )}
        </section>

        {/* Footer Section */}
        <section className="bg-sky-500/50 p-4 mt-8 rounded-t-lg">
            <Footer />
        </section>

      </main>

      <SeasonModal item={selectedItem} onClose={closeModal} />
    </div>
  );
};

export default App;