
import React from 'react';
import { BookOpenIcon, ClipboardListIcon, InfinityIcon, SearchIcon, LightBulbIcon, AcademicCapIcon } from '../../components/icons';

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
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-6">
                <button
                    onClick={onSelectPracticeAll}
                    className="w-full text-left p-2.5 sm:p-4 md:p-5 bg-white border border-slate-200 md:border-2 rounded-xl shadow-sm md:shadow-lg hover:border-cyan-500 hover:shadow-md transition-all duration-300 flex items-center gap-x-3 group"
                >
                    <div className="bg-cyan-100 p-2 sm:p-2.5 rounded-lg shrink-0">
                        <BookOpenIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-[15px] sm:text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-700 block leading-tight">Chế độ Luyện tập</span>
                        <span className="block text-[11px] sm:text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-500 leading-snug">
                            Ôn tập toàn bộ 390 câu hỏi. Nhận phản hồi ngay.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTestBySet}
                    className="w-full text-left p-2.5 sm:p-4 md:p-5 bg-white border border-slate-200 md:border-2 rounded-xl shadow-sm md:shadow-lg hover:border-cyan-500 hover:shadow-md transition-all duration-300 flex items-center gap-x-3 group"
                >
                     <div className="bg-cyan-100 p-2 sm:p-2.5 rounded-lg shrink-0">
                        <ClipboardListIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-[15px] sm:text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-700 block leading-tight">Thi theo bộ đề</span>
                        <span className="block text-[11px] sm:text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-500 leading-snug">
                            Chọn 1 trong 39 bộ đề để làm bài thi.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectMockExam}
                    className="w-full text-left p-2.5 sm:p-4 md:p-5 bg-white border border-slate-200 md:border-2 rounded-xl shadow-sm md:shadow-lg hover:border-indigo-500 hover:shadow-md transition-all duration-300 flex items-center gap-x-3 group"
                >
                    <div className="bg-indigo-100 p-2 sm:p-2.5 rounded-lg shrink-0">
                        <AcademicCapIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-indigo-600" />
                    </div>
                    <div>
                        <span className="text-[15px] sm:text-lg md:text-xl font-bold text-slate-800 group-hover:text-indigo-700 block leading-tight">Luyện tập thi như thật</span>
                        <span className="block text-[11px] sm:text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-500 leading-snug">
                            Thi thử 70 câu ngẫu nhiên mô phỏng form thi thật.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTestRandom}
                    className="w-full text-left p-2.5 sm:p-4 md:p-5 bg-white border border-slate-200 md:border-2 rounded-xl shadow-sm md:shadow-lg hover:border-cyan-500 hover:shadow-md transition-all duration-300 flex items-center gap-x-3 group"
                >
                     <div className="bg-cyan-100 p-2 sm:p-2.5 rounded-lg shrink-0">
                        <InfinityIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-[15px] sm:text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-700 block leading-tight">Thi ngẫu nhiên</span>
                        <span className="block text-[11px] sm:text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-500 leading-snug">
                            Làm bài thi ngẫu nhiên tính thời gian.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectSearch}
                    className="w-full text-left p-2.5 sm:p-4 md:p-5 bg-white border border-slate-200 md:border-2 rounded-xl shadow-sm md:shadow-lg hover:border-cyan-500 hover:shadow-md transition-all duration-300 flex items-center gap-x-3 group"
                >
                     <div className="bg-cyan-100 p-2 sm:p-2.5 rounded-lg shrink-0">
                        <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-[15px] sm:text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-700 block leading-tight">Tra cứu câu hỏi</span>
                        <span className="block text-[11px] sm:text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-500 leading-snug">
                           Tìm kiếm câu hỏi theo từ khoá.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTheory}
                    className="w-full text-left p-2.5 sm:p-4 md:p-5 bg-white border border-slate-200 md:border-2 rounded-xl shadow-sm md:shadow-lg hover:border-yellow-500 hover:shadow-md transition-all duration-300 flex items-center gap-x-3 group"
                >
                    <div className="bg-yellow-100 p-2 sm:p-2.5 rounded-lg shrink-0">
                        <LightBulbIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-yellow-600" />
                    </div>
                    <div>
                        <span className="text-[15px] sm:text-lg md:text-xl font-bold text-slate-800 group-hover:text-yellow-700 block leading-tight">Tổng hợp lý thuyết</span>
                        <span className="block text-[11px] sm:text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-500 leading-snug">
                            Tóm tắt kiến thức trọng tâm 15 chủ đề.
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ModeSelector;
