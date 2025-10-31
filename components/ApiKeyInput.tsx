import React from 'react';

interface ApiKeyInputProps {
    apiKey: string;
    setApiKey: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey }) => {
    return (
        <div>
            <label htmlFor="apiKey" className="block text-lg font-medium text-gray-300 mb-2">
                0. Your Google Gemini API Key
            </label>
            <div className="relative">
                <i className="fa-solid fa-key absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    placeholder="Enter your API key"
                    aria-label="Google Gemini API Key"
                />
            </div>
            <p className="text-xs text-gray-500 mt-2">
                You can get your API key from{' '}
                <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-400 hover:underline"
                >
                    Google AI Studio
                </a>.
                Your key is not stored; it's only used for this session.
            </p>
        </div>
    );
};
