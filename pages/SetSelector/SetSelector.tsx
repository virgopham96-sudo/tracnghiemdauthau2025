import React from 'react';

interface SetSelectorProps {
    totalSets: number;
    onSelectSet: (setIndex: number) => void;
    onBack: () => void;
}

const SetSelector: React.FC<SetSelectorProps> = ({ totalSets, onSelectSet, onBack }) => {
    return (
        <div className="p-3 sm:p-5 md:p-6 max-w-6xl mx-auto animate-fade-in w-full">
            {/* Top Navigation */}
            <div className="flex items-center gap-2 mb-6 md:mb-8">
                <button
                    onClick={onBack}
                    className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-1.5 px-3.5 md:py-2 md:px-4 rounded-full transition-colors flex items-center gap-1 border border-slate-200 dark:border-slate-700 shadow-sm text-xs sm:text-sm md:text-base cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Quay lại
                </button>
                <div className="flex-1 text-center pr-12 sm:pr-20">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Chọn Bộ Đề Ôn Luyện
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Tổng hợp 43 bộ đề trắc nghiệm chuẩn (10 câu / bộ đề)
                    </p>
                </div>
            </div>

            {/* Grid 43 Bộ đề (Bộ đề 1 đến Bộ đề 43) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2.5 sm:gap-3 md:gap-3.5">
                    {Array.from({ length: totalSets }, (_, i) => {
                        const isNewSet = i >= 39; // Sets 40, 41, 42, 43
                        return (
                            <button
                                key={i}
                                onClick={() => onSelectSet(i)}
                                className={`relative p-3 sm:p-3.5 rounded-xl text-xs sm:text-sm md:text-base font-bold shadow-sm border transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 cursor-pointer text-center ${
                                    isNewSet
                                        ? 'bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300/80 dark:border-blue-700/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-blue-600 focus:ring-blue-400'
                                        : 'bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/80 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-blue-600 focus:ring-blue-400'
                                }`}
                            >
                                <span>Bộ đề {i + 1}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SetSelector;