import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationButton: React.FC<{ onClick?: () => void; disabled?: boolean; isActive?: boolean; children: React.ReactNode; isNav?: boolean }> = ({
  onClick,
  disabled = false,
  isActive = false,
  children,
  isNav = false
}) => {
  const baseClasses = "flex items-center justify-center h-9 leading-tight border rounded-md shadow-sm transition-colors duration-150";
  const shapeClasses = isNav ? "px-2" : "px-3";
  const activeClasses = "bg-blue-600/50 border-blue-600/50 text-white font-semibold z-10";
  const defaultClasses = "bg-white border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700";
  const disabledClasses = "bg-gray-100 text-gray-400 cursor-not-allowed";

  const classes = `${baseClasses} ${shapeClasses} ${disabled ? disabledClasses : isActive ? activeClasses : defaultClasses}`;

  return (
    <li>
      <button onClick={onClick} disabled={disabled} className={classes} aria-current={isActive ? 'page' : undefined}>
        {children}
      </button>
    </li>
  );
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageCount = 5;
    if (totalPages <= pageCount) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex items-center space-x-2 text-sm">
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          isNav
        >
          <span className="sr-only">Previous</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </PaginationButton>
        
        {pageNumbers.map((page) => (
           <PaginationButton
             key={`page-${page}`}
             onClick={() => onPageChange(page)}
             isActive={page === currentPage}
           >
             {page}
           </PaginationButton>
        ))}

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          isNav
        >
          <span className="sr-only">Next</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </PaginationButton>
      </ul>
    </nav>
  );
};