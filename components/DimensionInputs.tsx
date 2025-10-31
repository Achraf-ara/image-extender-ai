
import React from 'react';

interface DimensionInputsProps {
    width: number;
    height: number;
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
}

const DimensionInput: React.FC<{ label: string; value: number; setValue: (value: number) => void; icon: string; }> = ({ label, value, setValue, icon }) => (
    <div className="relative flex-1">
        <i className={`fa-solid ${icon} absolute left-3 top-1/2 -translate-y-1/2 text-gray-500`}></i>
        <input
            type="number"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)}
            min="1"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            placeholder={label}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">px</span>
    </div>
);


export const DimensionInputs: React.FC<DimensionInputsProps> = ({ width, height, setWidth, setHeight }) => {
    return (
        <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">2. Set Final Dimensions</label>
            <div className="flex flex-col sm:flex-row gap-4">
                <DimensionInput label="Width" value={width} setValue={setWidth} icon="fa-arrows-left-right" />
                <DimensionInput label="Height" value={height} setValue={setHeight} icon="fa-arrows-up-down" />
            </div>
        </div>
    );
};
