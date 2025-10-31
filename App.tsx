import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { DimensionInputs } from './components/DimensionInputs';
import { Loader } from './components/Loader';
import { ImageResultCard } from './components/ImageResultCard';
import { extendImageWithGemini } from './services/geminiService';
import { createCompositeImage, fileToBase64 } from './utils/imageUtils';
import { ImageResult } from './types';
import { Footer } from './components/Footer';
import { ApiKeyInput } from './components/ApiKeyInput';

const App: React.FC = () => {
    const [apiKey, setApiKey] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [targetWidth, setTargetWidth] = useState<number>(1024);
    const [targetHeight, setTargetHeight] = useState<number>(1024);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<ImageResult[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFilesChange = (selectedFiles: FileList | null) => {
        if (selectedFiles) {
            setFiles(Array.from(selectedFiles));
            setResults([]);
            setError(null);
        }
    };

    const handleExtendClick = useCallback(async () => {
        if (!apiKey || files.length === 0 || !targetWidth || !targetHeight) {
            setError("Please provide an API key, upload images, and set valid dimensions.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResults([]);

        const newResults: ImageResult[] = [];

        for (const file of files) {
            try {
                const originalBase64 = await fileToBase64(file);
                
                const compositeImageBase64 = await createCompositeImage(originalBase64, targetWidth, targetHeight);
                const mimeType = file.type;

                const extendedBase64 = await extendImageWithGemini(apiKey, compositeImageBase64, mimeType);
                
                newResults.push({
                    originalSrc: originalBase64,
                    extendedSrc: `data:${mimeType};base64,${extendedBase64}`,
                    fileName: file.name
                });

            } catch (err) {
                console.error("Error processing file:", file.name, err);
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(`Failed to extend image "${file.name}". ${errorMessage}`);
                // Stop processing further images on error
                break; 
            }
        }

        setResults(newResults);
        setIsLoading(false);

    }, [apiKey, files, targetWidth, targetHeight]);

    const isButtonDisabled = !apiKey || files.length === 0 || isLoading || !targetWidth || !targetHeight;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <p className="text-center text-lg text-gray-400 mb-8">
                        Upload your images, define the final canvas size, and watch AI seamlessly extend your visuals.
                    </p>

                    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-8 mb-12 border border-gray-700">
                        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
                        <FileUpload onFilesChange={handleFilesChange} files={files} />
                        <DimensionInputs 
                            width={targetWidth}
                            height={targetHeight}
                            setWidth={setTargetWidth}
                            setHeight={setTargetHeight}
                        />
                        <button
                            onClick={handleExtendClick}
                            disabled={isButtonDisabled}
                            className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center text-xl"
                        >
                            {isLoading ? (
                                <>
                                    <Loader />
                                    <span>Extending...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-wand-magic-sparkles mr-3"></i>
                                    <span>Extend Images</span>
                                </>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative text-center" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    
                    {results.length > 0 && (
                        <div className="space-y-8 mt-12">
                            <h2 className="text-3xl font-bold text-center text-white">Results</h2>
                            {results.map((result, index) => (
                                <ImageResultCard key={index} result={result} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;