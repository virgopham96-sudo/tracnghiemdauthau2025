
import React from 'react';

interface SetSelectorProps {
    totalSets: number;
    onSelectSet: (setIndex: number) => void;
    onBack: () => void;
}

const SetSelector: React.FC<SetSelectorProps> = ({ totalSets, onSelectSet, onBack }) => {
    return (
        <div className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto animate-fade-in">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
                 <button
                    onClick={onBack}
                    className="bg-white hover:bg-slate-100 text-slate-700 font-semibold py-1.5 px-3 md:py-2 md:px-4 rounded-full transition-colors flex items-center gap-1 md:gap-2 border border-slate-200 shadow-sm text-xs sm:text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Quay lại
                </button>
                <h2 className="text-lg md:text-2xl font-bold text-slate-900 text-center flex-1">Chọn bộ đề</h2>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 sm:gap-3 md:gap-4">
                {Array.from({ length: totalSets }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => onSelectSet(i)}
                        className="p-2.5 sm:p-3 md:p-4 bg-white rounded-xl text-xs sm:text-sm md:text-base font-bold text-slate-700 shadow-sm md:shadow-md border border-slate-200 hover:bg-cyan-500 hover:text-white hover:shadow-md hover:border-cyan-500 transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-center"
                    >
                        Bộ đề {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SetSelector;