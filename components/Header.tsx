
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="py-6 text-center bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                    Image Extender AI
                </span>
            </h1>
        </header>
    );
};
