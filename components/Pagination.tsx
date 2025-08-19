import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PrevIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
  </svg>
);

const NextIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
  </svg>
);

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  const commonButtonClasses = "w-10 h-10 flex items-center justify-center text-sm font-medium rounded-md transition-colors duration-150";
  const activeClasses = "bg-sky-600 text-white border border-sky-600";
  const inactiveClasses = "bg-white text-gray-700 hover:bg-sky-100 border border-gray-300";
  const disabledClasses = "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200";

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${commonButtonClasses} ${currentPage === 1 ? disabledClasses : inactiveClasses}`}
        aria-label="Go to previous page"
      >
        <span className="sr-only">Previous</span>
        <PrevIcon />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${commonButtonClasses} ${currentPage === page ? activeClasses : inactiveClasses}`}
          aria-current={currentPage === page ? 'page' : undefined}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${commonButtonClasses} ${currentPage === totalPages ? disabledClasses : inactiveClasses}`}
        aria-label="Go to next page"
      >
        <span className="sr-only">Next</span>
        <NextIcon />
      </button>
    </nav>
  );
};

export default Pagination;
