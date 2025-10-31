
import React from 'react';
import { ImageResult } from '../types';

interface ImageResultCardProps {
    result: ImageResult;
}

const ImageDisplay: React.FC<{ src: string; label: string; fileName: string; }> = ({ src, label, fileName }) => (
    <div className="flex-1 min-w-0">
        <h3 className="text-xl font-semibold text-center text-gray-300 mb-2">{label}</h3>
        <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-md">
            <img src={src} alt={label} className="w-full h-full object-contain" />
        </div>
        <a
            href={src}
            download={`${label.toLowerCase().replace(' ', '-')}-${fileName}`}
            className="block w-full text-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 hover:bg-indigo-700 transition-colors duration-300"
        >
            <i className="fa-solid fa-download mr-2"></i>
            Download
        </a>
    </div>
);


export const ImageResultCard: React.FC<ImageResultCardProps> = ({ result }) => {
    return (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
            <h4 className="text-lg font-bold text-center text-indigo-400 mb-6 truncate" title={result.fileName}>
                {result.fileName}
            </h4>
            <div className="flex flex-col md:flex-row gap-6">
                <ImageDisplay src={result.originalSrc} label="Original" fileName={result.fileName} />
                <div className="flex items-center justify-center text-gray-500 text-2xl">
                    <i className="fa-solid fa-arrow-right-long hidden md:block"></i>
                    <i className="fa-solid fa-arrow-down-long block md:hidden"></i>
                </div>
                <ImageDisplay src={result.extendedSrc} label="Extended" fileName={result.fileName} />
            </div>
        </div>
    );
};
