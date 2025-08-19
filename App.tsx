
import React, { useState, useMemo } from 'react';
import { pluData } from './data';
import type { PluItem, SortConfig, ColumnKey } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PluTable from './components/PluTable';
import Footer from './components/Footer';
import SeasonModal from './components/SeasonModal';
import ColumnToggles from './components/ColumnToggles';

const initialColumns: ColumnKey[] = ['korean', 'english', 'french', 'season'];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [selectedItem, setSelectedItem] = useState<PluItem | null>(null);
  
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

  const requestSort = (key: keyof PluItem) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
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
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans flex flex-col">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8">
        <Header />
      </div>
      
      <main className="max-w-5xl mx-auto w-full flex-grow px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 space-y-6">
        
        {/* Search Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
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

        {/* Table Section */}
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <PluTable 
            data={sortedData} 
            onSort={requestSort}
            sortConfig={sortConfig}
            onInfoClick={handleInfoClick}
            columnOrder={columnOrder}
            columnVisibility={columnVisibility}
          />
        </section>

        {/* Footer Section */}
        <section className="bg-white p-4 rounded-lg shadow-md">
            <Footer />
        </section>

      </main>

      <SeasonModal item={selectedItem} onClose={closeModal} />
    </div>
  );
};

export default App;
