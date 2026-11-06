import React, { useState, useMemo, useEffect } from 'react';
import { Question } from '../../types';
import { PdfExportModal } from '../../components/PdfExportModal';
import { getFullCategoryMapping, getOrderedCategories } from '../../data/categories';

const highlightText = (text: string, highlight: string): React.ReactNode => {
    if (!highlight.trim()) {
        return text;
    }
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-emerald-100 text-emerald-900 px-1 rounded font-medium">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

interface SearchProps {
    questions: Question[];
    onBack: () => void;
}

const ITEMS_PER_PAGE = 50;

const Search: React.FC<SearchProps> = ({ questions, onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

    // Compute original category mappings and ordered list
    const categoryMapping = useMemo(() => getFullCategoryMapping(questions), [questions]);
    const orderedCategories = useMemo(() => getOrderedCategories(categoryMapping), [categoryMapping]);

    // Reset visible count when switching category or searching
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [selectedCategory, searchTerm]);

    // Filter questions based on selected category and search term
    const searchResults = useMemo(() => {
        let pool = questions;

        // Filter by original category mapping
        if (selectedCategory !== 'all') {
            const allowedIds = new Set(categoryMapping[selectedCategory] || []);
            pool = questions.filter((q) => allowedIds.has(q.id));
        }

        const trimmedTerm = searchTerm.trim().toLowerCase();
        if (!trimmedTerm) {
            return pool;
        }

        return pool.filter(
            (q) =>
                q.id.toString() === trimmedTerm ||
                q.question.toLowerCase().includes(trimmedTerm) ||
                Object.values(q.options).some((opt) =>
                    (opt as string).toLowerCase().includes(trimmedTerm)
                ) ||
                q.explanation.toLowerCase().includes(trimmedTerm)
        );
    }, [questions, selectedCategory, categoryMapping, searchTerm]);

    const displayedQuestions = useMemo(() => {
        // If results fit in 100, display all immediately, otherwise paginate for smooth rendering
        if (searchResults.length <= 100) {
            return searchResults;
        }
        return searchResults.slice(0, visibleCount);
    }, [searchResults, visibleCount]);

    return (
        <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-4 sm:py-6 px-3 sm:px-6">
            <div className="max-w-[1320px] mx-auto animate-fade-in space-y-4 sm:space-y-5">
                {/* Top Header Bar */}
                <header className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Title & Question Count */}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                            Kiến thức tổng hợp
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Ngân hàng câu hỏi:{' '}
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                {questions.length}
                            </span>{' '}
                            câu hỏi
                        </p>
                    </div>

                    {/* Right: Search Input, Save PDF & Close Button */}
                    <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
                        {/* Search Input Field */}
                        <div className="relative flex-1 sm:w-72 md:w-80">
                            <svg
                                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Nhập từ khóa..."
                                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                                    title="Xóa từ khóa"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* PDF Export Button */}
                        <button
                            type="button"
                            onClick={() => setIsPdfModalOpen(true)}
                            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-800 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
                            title="Lưu toàn bộ câu hỏi và đáp án dạng PDF"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <span className="hidden sm:inline">Lưu PDF</span>
                        </button>

                        {/* Đóng (Back) Button */}
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-5 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs transition-colors shrink-0"
                        >
                            Đóng
                        </button>
                    </div>
                </header>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* Left Sidebar: NHÓM NỘI DUNG */}
                    <aside className="lg:col-span-4 xl:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-3.5 sm:p-4 shadow-sm lg:sticky lg:top-4">
                        {/* Section Header */}
                        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                                </svg>
                                <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                                    NHÓM NỘI DUNG
                                </span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-medium">
                                {orderedCategories.length} nhóm
                            </span>
                        </div>

                        {/* Category List */}
                        <nav className="space-y-1 max-h-[calc(100vh-170px)] overflow-y-auto pr-1">
                            {/* All Categories Option */}
                            <button
                                type="button"
                                onClick={() => setSelectedCategory('all')}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all ${
                                    selectedCategory === 'all'
                                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold shadow-xs'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent font-medium'
                                }`}
                            >
                                <span className="truncate pr-2">Tất cả nhóm nội dung</span>
                                <span
                                    className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                        selectedCategory === 'all'
                                            ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                    }`}
                                >
                                    {questions.length}
                                </span>
                            </button>

                            {/* 17 Original Categories */}
                            {orderedCategories.map((cat) => {
                                const count = categoryMapping[cat]?.length || 0;
                                const isActive = selectedCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                                            isActive
                                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold shadow-xs'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent font-medium'
                                        }`}
                                    >
                                        <span className="truncate pr-2" title={cat}>
                                            {cat}
                                        </span>
                                        <span
                                            className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                                isActive
                                                    ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Right Panel: Search Results & Questions */}
                    <main className="lg:col-span-8 xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 sm:p-7 shadow-sm min-h-[550px]">
                        {/* Results Count & Action Header */}
                        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                            <div>
                                Tìm thấy{' '}
                                <span className="inline-block px-2.5 py-0.5 mx-1 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                                    {searchResults.length}
                                </span>{' '}
                                kết quả phù hợp
                            </div>

                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm('')}
                                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                                >
                                    Xóa tìm kiếm
                                </button>
                            )}
                        </div>

                        {/* Empty State */}
                        {searchResults.length === 0 ? (
                            <div className="text-center py-12 px-4">
                                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                                    Không tìm thấy câu hỏi phù hợp
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                    Vui lòng thử tìm với từ khóa khác hoặc chọn chuyên đề khác.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {displayedQuestions.map((q) => (
                                    <article key={q.id} className="group">
                                        {/* Question ID Badge */}
                                        <div className="mb-3">
                                            <span className="inline-block px-3 py-0.5 rounded-full border border-emerald-400 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50/40 dark:bg-emerald-950/20">
                                                CÂU {q.id}
                                            </span>
                                        </div>

                                        {/* Question Text */}
                                        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed mb-4">
                                            {highlightText(q.question, searchTerm)}
                                        </h2>

                                        {/* Option Rows */}
                                        <div className="space-y-2 mb-3">
                                            {Object.entries(q.options).map(([key, value]) => {
                                                const isCorrect = key === q.correctAnswer;
                                                return isCorrect ? (
                                                    <div
                                                        key={key}
                                                        className="w-full p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 flex items-start gap-3 transition-colors shadow-xs"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                                                            {key}
                                                        </div>
                                                        <div className="font-semibold text-emerald-950 dark:text-emerald-100 text-xs sm:text-sm md:text-base leading-relaxed">
                                                            {highlightText(value as string, searchTerm)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        key={key}
                                                        className="w-full p-2.5 rounded-xl flex items-start gap-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-semibold text-xs shrink-0 mt-0.5">
                                                            {key}
                                                        </div>
                                                        <div className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                                                            {highlightText(value as string, searchTerm)}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Optional Expandable Explanation / Legal Basis */}
                                        {q.explanation && (
                                            <div className="mt-3 pt-1">
                                                <details className="group/details">
                                                    <summary className="cursor-pointer text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1.5 select-none py-1">
                                                        <svg
                                                            className="w-3.5 h-3.5 transition-transform group-open/details:rotate-90 text-emerald-600"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 5l7 7-7 7"
                                                            />
                                                        </svg>
                                                        <span>Căn cứ pháp lý & Lý giải</span>
                                                    </summary>
                                                    <div className="mt-2 p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                                        <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center justify-between flex-wrap gap-1">
                                                            <span>Căn cứ & Lý giải (Đáp án {q.correctAnswer}):</span>
                                                            {q.newExamNote && (
                                                                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                                                                    ({q.newExamNote})
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="whitespace-pre-line">
                                                            {highlightText(q.explanation, searchTerm)}
                                                        </p>
                                                    </div>
                                                </details>
                                            </div>
                                        )}

                                        {/* Question Separator Divider */}
                                        <hr className="border-slate-100 dark:border-slate-800 my-6" />
                                    </article>
                                ))}

                                {/* Load More Button for large result sets */}
                                {searchResults.length > visibleCount && (
                                    <div className="pt-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
                                            }
                                            className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-all shadow-xs"
                                        >
                                            Xem thêm {Math.min(ITEMS_PER_PAGE, searchResults.length - visibleCount)} câu hỏi tiếp theo ({visibleCount} / {searchResults.length})
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* PDF Export Modal */}
            <PdfExportModal
                isOpen={isPdfModalOpen}
                onClose={() => setIsPdfModalOpen(false)}
                questionsToExport={searchResults}
                totalQuestionsCount={questions.length}
                allQuestions={questions}
                searchTerm={searchTerm}
            />
        </div>
    );
};

export default Search;
