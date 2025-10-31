import React, { useRef, useState } from 'react';

interface FileUploadProps {
    onFilesChange: (files: FileList | null) => void;
    files: File[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesChange, files }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleAreaClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onFilesChange(event.target.files);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            onFilesChange(droppedFiles);
        }
    };

    const dropzoneClasses = `
        group relative flex flex-col items-center justify-center w-full p-8 
        border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300
        ${isDragging 
            ? 'border-indigo-500 bg-gray-800/50' 
            : 'border-gray-600 hover:border-indigo-500 hover:bg-gray-800/50'
        }
    `;

    return (
        <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">1. Upload Images</label>
            <div
                onClick={handleAreaClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={dropzoneClasses}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="text-center">
                    <i className="fa-solid fa-cloud-arrow-up text-5xl text-gray-500 group-hover:text-indigo-400 transition-colors duration-300"></i>
                    <p className="mt-4 text-lg text-gray-400">
                        <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG, or WEBP</p>
                </div>
            </div>
            {files.length > 0 && (
                <div className="mt-4">
                    <p className="font-semibold text-gray-300">Selected files:</p>
                    <ul className="list-disc list-inside mt-2 text-gray-400">
                        {files.map((file, index) => (
                            <li key={index} className="truncate">{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};