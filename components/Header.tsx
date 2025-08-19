import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
    return (
        <header className="bg-sky-500/50 text-sky-900 p-6 shadow-md rounded-b-lg">
            <div className="flex justify-between items-end">
                <div className="flex items-end space-x-2">
                    <Logo className="h-6" />
                    <span 
                        className="text-sm font-bold relative top-[3px]"
                        style={{ color: '#DC143C' }}
                    >
                        Montreal
                    </span>
                </div>
                <h2 className="text-lg font-bold relative top-[5px] text-white">Produce Search</h2>
            </div>
        </header>
    );
};

export default Header;