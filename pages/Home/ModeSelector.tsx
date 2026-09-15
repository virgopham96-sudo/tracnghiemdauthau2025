
import React from 'react';
import { BookOpenIcon, ClipboardListIcon, InfinityIcon, SearchIcon, LightBulbIcon, AcademicCapIcon } from '../../components/icons';
import { openRandomAdLink } from '../../data/adLinks';

interface ModeSelectorProps {
    onSelectPracticeAll: () => void;
    onSelectTestBySet: () => void;
    onSelectMockExam: () => void;
    onSelectTestRandom: () => void;
    onSelectSearch: () => void;
    onSelectTheory: () => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({
    onSelectPracticeAll,
    onSelectTestBySet,
    onSelectMockExam,
    onSelectTestRandom,
    onSelectSearch,
    onSelectTheory
}) => {
    return (
        <div className="px-1 md:p-4 max-w-5xl mx-auto flex flex-col items-center justify-center w-full animate-fade-in -mt-2 sm:mt-0">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                <button
                    onClick={onSelectPracticeAll}
                    className="w-full text-left p-3 sm:p-4 md:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:border-2 rounded-xl shadow-sm md:shadow-md hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-lg transition-all duration-300 flex items-center gap-x-3.5 group"
                >
                    <div className="bg-cyan-100 dark:bg-cyan-950/80 p-2.5 sm:p-3 rounded-lg shrink-0">
                        <BookOpenIcon className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                        <span className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 block leading-tight">Chế độ Luyện tập</span>
                        <span className="block text-xs sm:text-sm font-normal mt-0.5 text-slate-500 dark:text-slate-400 leading-snug">
                            Ôn tập toàn bộ 390 câu hỏi. Nhận phản hồi ngay.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTestBySet}
                    className="w-full text-left p-3 sm:p-4 md:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:border-2 rounded-xl shadow-sm md:shadow-md hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-lg transition-all duration-300 flex items-center gap-x-3.5 group"
                >
                     <div className="bg-cyan-100 dark:bg-cyan-950/80 p-2.5 sm:p-3 rounded-lg shrink-0">
                        <ClipboardListIcon className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                        <span className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 block leading-tight">Thi theo bộ đề</span>
                        <span className="block text-xs sm:text-sm font-normal mt-0.5 text-slate-500 dark:text-slate-400 leading-snug">
                            Chọn 1 trong 39 bộ đề để làm bài thi.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectMockExam}
                    className="w-full text-left p-3 sm:p-4 md:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:border-2 rounded-xl shadow-sm md:shadow-md hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-300 flex items-center gap-x-3.5 group"
                >
                    <div className="bg-indigo-100 dark:bg-indigo-950/80 p-2.5 sm:p-3 rounded-lg shrink-0">
                        <AcademicCapIcon className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <span className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 block leading-tight">Luyện tập thi như thật</span>
                        <span className="block text-xs sm:text-sm font-normal mt-0.5 text-slate-500 dark:text-slate-400 leading-snug">
                            Thi thử 70 câu ngẫu nhiên mô phỏng form thi thật.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTestRandom}
                    className="w-full text-left p-3 sm:p-4 md:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:border-2 rounded-xl shadow-sm md:shadow-md hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-lg transition-all duration-300 flex items-center gap-x-3.5 group"
                >
                     <div className="bg-cyan-100 dark:bg-cyan-950/80 p-2.5 sm:p-3 rounded-lg shrink-0">
                        <InfinityIcon className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                        <span className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 block leading-tight">Thi ngẫu nhiên</span>
                        <span className="block text-xs sm:text-sm font-normal mt-0.5 text-slate-500 dark:text-slate-400 leading-snug">
                            Làm bài thi ngẫu nhiên tính thời gian.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectSearch}
                    className="w-full text-left p-3 sm:p-4 md:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:border-2 rounded-xl shadow-sm md:shadow-md hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-lg transition-all duration-300 flex items-center gap-x-3.5 group"
                >
                     <div className="bg-cyan-100 dark:bg-cyan-950/80 p-2.5 sm:p-3 rounded-lg shrink-0">
                        <SearchIcon className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                        <span className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 block leading-tight">Tra cứu câu hỏi</span>
                        <span className="block text-xs sm:text-sm font-normal mt-0.5 text-slate-500 dark:text-slate-400 leading-snug">
                           Tìm kiếm câu hỏi theo từ khoá.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTheory}
                    className="w-full text-left p-3 sm:p-4 md:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:border-2 rounded-xl shadow-sm md:shadow-md hover:border-yellow-500 dark:hover:border-yellow-500 hover:shadow-lg transition-all duration-300 flex items-center gap-x-3.5 group"
                >
                    <div className="bg-yellow-100 dark:bg-yellow-950/80 p-2.5 sm:p-3 rounded-lg shrink-0">
                        <LightBulbIcon className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                        <span className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-yellow-700 dark:group-hover:text-yellow-400 block leading-tight">Tổng hợp lý thuyết</span>
                        <span className="block text-xs sm:text-sm font-normal mt-0.5 text-slate-500 dark:text-slate-400 leading-snug">
                            Tóm tắt kiến thức trọng tâm 15 chủ đề.
                        </span>
                    </div>
                </button>
            </div>

            <div className="mt-4 sm:mt-5 flex justify-center w-full">
                <button
                    onClick={openRandomAdLink}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-300 dark:border-amber-800/70 hover:border-amber-400 dark:hover:border-amber-600 text-amber-800 dark:text-amber-300 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all duration-200 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                    title="Mở ngẫu nhiên link Shopee để ủng hộ tác giả"
                >
                    <span className="text-sm sm:text-base">🎁</span>
                    <span>Ấn vào quảng cáo để ủng hộ tác giả</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ModeSelector;
