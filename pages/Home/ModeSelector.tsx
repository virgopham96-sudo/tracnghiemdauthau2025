import React from 'react';
import { 
    BookOpenIcon, 
    ClipboardListIcon, 
    InfinityIcon, 
    SearchIcon, 
    LightBulbIcon, 
    AcademicCapIcon 
} from '../../components/icons';

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
        <div className="w-full max-w-[1150px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex flex-col items-center animate-fade-in">

            {/* 2. Grid 3 cột x 2 hàng */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                
                {/* HÀNG 1 - CỘT 1: Chế độ Luyện tập */}
                <button
                    onClick={onSelectPracticeAll}
                    type="button"
                    className="flex flex-col justify-between text-left p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 group relative cursor-pointer"
                >
                    <div>
                        {/* Top Row: Squircle icon + Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
                                <BookOpenIcon className="w-6 h-6" />
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-800/60">
                                430 câu
                            </span>
                        </div>

                        {/* Title & Desc */}
                        <h2 className="text-lg sm:text-[19px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Chế độ Luyện tập
                        </h2>
                        <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                            Ôn tập toàn bộ 430 câu hỏi. Nhận phản hồi đáp án và căn cứ pháp lý ngay sau mỗi câu.
                        </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span>Bắt đầu ôn tập</span>
                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">→</span>
                    </div>
                </button>

                {/* HÀNG 1 - CỘT 2: Thi theo bộ đề */}
                <button
                    onClick={onSelectTestBySet}
                    type="button"
                    className="flex flex-col justify-between text-left p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 group relative cursor-pointer"
                >
                    <div>
                        {/* Top Row: Squircle icon + Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                                <ClipboardListIcon className="w-6 h-6" />
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/60">
                                43 đề
                            </span>
                        </div>

                        {/* Title & Desc */}
                        <h2 className="text-lg sm:text-[19px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Thi theo bộ đề
                        </h2>
                        <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                            Chọn 1 trong 43 bộ đề chuẩn (10 câu/đề) để rèn luyện kỹ năng giải đề theo từng phần kiến thức.
                        </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span>Chọn bộ đề</span>
                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">→</span>
                    </div>
                </button>

                {/* HÀNG 1 - CỘT 3: Luyện tập thi như thật (Card Nổi Bật) */}
                <button
                    onClick={onSelectMockExam}
                    type="button"
                    className="flex flex-col justify-between text-left p-5 sm:p-6 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900 rounded-2xl border-2 border-indigo-400/80 dark:border-indigo-500/70 shadow-md hover:shadow-2xl hover:border-indigo-600 dark:hover:border-indigo-400 transition-all duration-300 hover:-translate-y-1.5 group relative cursor-pointer ring-4 ring-indigo-500/10 dark:ring-indigo-400/10"
                >
                    {/* Top Highlight Tag */}
                    <div className="absolute -top-3 left-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping"></span>
                            Mô phỏng kỳ thi
                        </span>
                    </div>

                    <div>
                        {/* Top Row: Squircle icon + Badge */}
                        <div className="flex items-center justify-between mb-4 mt-1">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                                <AcademicCapIcon className="w-6 h-6" />
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100/90 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                70 câu / 60p
                            </span>
                        </div>

                        {/* Title & Desc */}
                        <h2 className="text-lg sm:text-[19px] font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            Luyện tập thi như thật
                        </h2>
                        <p className="mt-2 text-sm text-[#64748B] dark:text-slate-300 leading-relaxed">
                            Thi thử 70 câu ngẫu nhiên mô phỏng cấu trúc kỳ thi thật, tính giờ đếm ngược 60 phút và chấm điểm đạt/không đạt.
                        </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3.5 border-t border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                        <span>Vào thi ngay</span>
                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-extrabold">→</span>
                    </div>
                </button>

                {/* HÀNG 2 - CỘT 1: Thi ngẫu nhiên */}
                <button
                    onClick={onSelectTestRandom}
                    type="button"
                    className="flex flex-col justify-between text-left p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 group relative cursor-pointer"
                >
                    <div>
                        {/* Top Row: Squircle icon + Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                                <InfinityIcon className="w-6 h-6" />
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/60">
                                Tính giờ
                            </span>
                        </div>

                        {/* Title & Desc */}
                        <h2 className="text-lg sm:text-[19px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Thi ngẫu nhiên
                        </h2>
                        <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                            Làm bài thi trích xuất ngẫu nhiên câu hỏi theo số lượng tự chọn (10 - 70 câu), có bấm giờ và bảng điểm chi tiết.
                        </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span>Tùy chọn thi</span>
                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">→</span>
                    </div>
                </button>

                {/* HÀNG 2 - CỘT 2: Tra cứu câu hỏi */}
                <button
                    onClick={onSelectSearch}
                    type="button"
                    className="flex flex-col justify-between text-left p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 group relative cursor-pointer"
                >
                    <div>
                        {/* Top Row: Squircle icon + Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                                <SearchIcon className="w-6 h-6" />
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800/60">
                                Tìm nhanh
                            </span>
                        </div>

                        {/* Title & Desc */}
                        <h2 className="text-lg sm:text-[19px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Tra cứu câu hỏi
                        </h2>
                        <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                            Tìm kiếm nhanh câu hỏi, đáp án chính xác và căn cứ pháp lý tương ứng bằng bất kỳ từ khóa hoặc số thứ tự nào.
                        </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span>Tra cứu ngay</span>
                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">→</span>
                    </div>
                </button>

                {/* HÀNG 2 - CỘT 3: Tổng hợp lý thuyết */}
                <button
                    onClick={onSelectTheory}
                    type="button"
                    className="flex flex-col justify-between text-left p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 group relative cursor-pointer"
                >
                    <div>
                        {/* Top Row: Squircle icon + Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                                <LightBulbIcon className="w-6 h-6" />
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-rose-800/60">
                                15 chủ đề
                            </span>
                        </div>

                        {/* Title & Desc */}
                        <h2 className="text-lg sm:text-[19px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Tổng hợp lý thuyết
                        </h2>
                        <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                            Hệ thống hóa toàn bộ kiến thức cốt lõi qua 15 chủ đề trọng tâm, thuật ngữ và sơ đồ quy trình đấu thầu.
                        </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span>Xem lý thuyết</span>
                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">→</span>
                    </div>
                </button>

            </div>
        </div>
    );
};

export default ModeSelector;
