
import React from 'react';
import { BookOpenIcon, ClipboardListIcon, ShuffleIcon, HeartIcon, SearchIcon, LightBulbIcon } from './icons';

interface ModeSelectorProps {
    onSelectPracticeAll: () => void;
    onSelectTestBySet: () => void;
    onSelectTestRandom: () => void;
    onSelectSupport: () => void;
    onSelectSearch: () => void;
    onSelectTheory: () => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({
    onSelectPracticeAll,
    onSelectTestBySet,
    onSelectTestRandom,
    onSelectSupport,
    onSelectSearch,
    onSelectTheory
}) => {
    return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
            <div className="w-full space-y-5">
                <button
                    onClick={onSelectPracticeAll}
                    className="w-full text-left p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-x-5 group"
                >
                    <div className="bg-cyan-100 p-3 rounded-lg">
                        <BookOpenIcon className="h-8 w-8 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-slate-800 group-hover:text-cyan-700">Chế độ Luyện tập</span>
                        <span className="block text-sm font-normal mt-1 text-slate-600">
                            Ôn tập toàn bộ 340 câu hỏi. Nhận phản hồi và giải thích ngay lập tức.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTestBySet}
                    className="w-full text-left p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-x-5 group"
                >
                     <div className="bg-cyan-100 p-3 rounded-lg">
                        <ClipboardListIcon className="h-8 w-8 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-slate-800 group-hover:text-cyan-700">Thi theo bộ đề</span>
                        <span className="block text-sm font-normal mt-1 text-slate-600">
                            Chọn 1 trong 34 bộ đề. Làm bài thi tính giờ 15 phút.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTestRandom}
                    className="w-full text-left p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-x-5 group"
                >
                     <div className="bg-cyan-100 p-3 rounded-lg">
                        <ShuffleIcon className="h-8 w-8 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-slate-800 group-hover:text-cyan-700">Thi ngẫu nhiên</span>
                        <span className="block text-sm font-normal mt-1 text-slate-600">
                            Làm bài thi ngẫu nhiên. Tính giờ theo số lượng câu hỏi.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectSearch}
                    className="w-full text-left p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-x-5 group"
                >
                     <div className="bg-cyan-100 p-3 rounded-lg">
                        <SearchIcon className="h-8 w-8 text-cyan-600" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-slate-800 group-hover:text-cyan-700">Tra cứu câu hỏi</span>
                        <span className="block text-sm font-normal mt-1 text-slate-600">
                           Tìm kiếm câu hỏi theo từ khoá trong toàn bộ 340 câu.
                        </span>
                    </div>
                </button>
                <button
                    onClick={onSelectTheory}
                    className="w-full text-left p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-yellow-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-x-5 group"
                >
                    <div className="bg-yellow-100 p-3 rounded-lg">
                        <LightBulbIcon className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-slate-800 group-hover:text-yellow-700">Tổng hợp lý thuyết</span>
                        <span className="block text-sm font-normal mt-1 text-slate-600">
                            Tóm tắt kiến thức trọng tâm theo 15 chủ đề chính.
                        </span>
                    </div>
                </button>
                 <button
                    onClick={onSelectSupport}
                    className="w-full text-left p-6 bg-white border-2 border-slate-200 rounded-xl shadow-lg hover:border-rose-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-x-5 group"
                >
                     <div className="bg-rose-100 p-3 rounded-lg">
                        <HeartIcon className="h-8 w-8 text-rose-600" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-slate-800 group-hover:text-rose-700">Ủng hộ tác giả</span>
                        <span className="block text-sm font-normal mt-1 text-slate-600">
                           Nếu thấy hữu ích, bạn có thể ủng hộ tác giả một ly cà phê.
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ModeSelector;
