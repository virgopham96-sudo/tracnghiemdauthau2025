
import React from 'react';
import { BookOpenIcon, ClipboardListIcon, InfinityIcon, SearchIcon, LightBulbIcon, AcademicCapIcon } from './icons';

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
        <div className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-100px)] animate-fade-in">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                <button
                    onClick={onSelectPracticeAll}
                    className="w-full text-left p-4 md:p-5 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-x-4 group"
                >
                    <div className="bg-cyan-100 p-2.5 rounded-lg shrink-0">
                        <BookOpenIcon className="h-6 w-6 md:h-7 md:w-7 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-700">Chế độ Luyện tập</span>
                        <span className="block text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-600">
                            Ôn tập toàn bộ 390 câu hỏi. Nhận phản hồi và giải thích ngay lập tức.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTestBySet}
                    className="w-full text-left p-4 md:p-5 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-x-4 group"
                >
                     <div className="bg-cyan-100 p-2.5 rounded-lg shrink-0">
                        <ClipboardListIcon className="h-6 w-6 md:h-7 md:w-7 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-700">Thi theo bộ đề</span>
                        <span className="block text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-600">
                            Chọn 1 trong 39 bộ đề. Làm bài thi tính giờ 15 phút.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectMockExam}
                    className="w-full text-left p-4 md:p-5 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-x-4 group"
                >
                    <div className="bg-indigo-100 p-2.5 rounded-lg shrink-0">
                        <AcademicCapIcon className="h-6 w-6 md:h-7 md:w-7 text-indigo-600" />
                    </div>
                    <div>
                        <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-indigo-700">Luyện tập thi như thật</span>
                        <span className="block text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-600">
                            Thi thử 70 câu hỏi ngẫu nhiên trong 60 phút với giao diện mô phỏng thi thật.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTestRandom}
                    className="w-full text-left p-4 md:p-5 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-x-4 group"
                >
                     <div className="bg-cyan-100 p-2.5 rounded-lg shrink-0">
                        <InfinityIcon className="h-6 w-6 md:h-7 md:w-7 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-700">Thi ngẫu nhiên</span>
                        <span className="block text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-600">
                            Làm bài thi ngẫu nhiên. Tính giờ theo số lượng câu hỏi.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectSearch}
                    className="w-full text-left p-4 md:p-5 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-x-4 group"
                >
                     <div className="bg-cyan-100 p-2.5 rounded-lg shrink-0">
                        <SearchIcon className="h-6 w-6 md:h-7 md:w-7 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-700">Tra cứu câu hỏi</span>
                        <span className="block text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-600">
                           Tìm kiếm câu hỏi theo từ khoá trong toàn bộ 390 câu.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTheory}
                    className="w-full text-left p-4 md:p-5 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-yellow-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-x-4 group"
                >
                    <div className="bg-yellow-100 p-2.5 rounded-lg shrink-0">
                        <LightBulbIcon className="h-6 w-6 md:h-7 md:w-7 text-yellow-600" />
                    </div>
                    <div>
                        <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-yellow-700">Tổng hợp lý thuyết</span>
                        <span className="block text-xs md:text-sm font-normal mt-0.5 md:mt-1 text-slate-600">
                            Tóm tắt kiến thức trọng tâm theo 15 chủ đề chính.
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ModeSelector;
