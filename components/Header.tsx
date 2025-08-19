
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-teal-600 text-white p-6 shadow-md rounded-b-lg">
            <div className="flex justify-between items-end">
                <div className="flex items-end space-x-4">
                    <img src="../logo.png" alt="H Mart Logo" className="h-8" />
                    <span 
                        className="text-lg font-bold pb-1"
                        style={{ color: '#DC143C' }}
                    >
                        Montreal
                    </span>
                </div>
                <h2 className="text-xl font-bold">Produce Search</h2>
            </div>
        </header>
    );
};

export default Header;