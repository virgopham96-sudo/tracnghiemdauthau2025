
import React, { useState } from 'react';
import { Question } from '../../types';
import { CheckIcon } from '../../components/icons';

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
                    <mark key={i} className="bg-yellow-200 text-yellow-800 px-1 rounded">
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

const Search: React.FC<SearchProps> = ({ questions, onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Question[]>(questions);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedTerm = searchTerm.trim().toLowerCase();

        if (!trimmedTerm) {
            setSearchResults(questions);
            return;
        }

        const results = questions.filter(q =>
            q.question.toLowerCase().includes(trimmedTerm) ||
            Object.values(q.options).some(opt => (opt as string).toLowerCase().includes(trimmedTerm)) ||
            q.explanation.toLowerCase().includes(trimmedTerm)
        );
        setSearchResults(results);
    };

    return (
        <div className="p-2 md:p-4 max-w-7xl mx-auto flex flex-col h-[calc(100vh-100px)] animate-fade-in">
            <div className="flex items-center gap-2 mb-4 shrink-0">
                <button
                    onClick={onBack}
                    className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-1.5 px-3 md:py-2 md:px-4 rounded-full transition-colors flex items-center gap-1 md:gap-2 border border-slate-200 dark:border-slate-700 shadow-sm text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden md:inline">Quay lại</span>
                </button>
                <h2 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-slate-100 text-center flex-1">Tra cứu câu hỏi</h2>
            </div>

            <form onSubmit={handleSearch} className="mb-4 flex flex-col sm:flex-row gap-2 shrink-0">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nhập từ khoá cần tìm..."
                    className="w-full flex-grow p-2.5 sm:p-3 text-sm md:text-base border-2 border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition"
                    aria-label="Từ khoá tìm kiếm"
                />
                <button
                    type="submit"
                    className="bg-cyan-500 dark:bg-cyan-600 hover:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-bold py-2.5 px-5 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm md:text-base whitespace-nowrap"
                >
                    Tìm kiếm
                </button>
            </form>

            <div className="flex-1 overflow-y-auto min-h-0 space-y-3 pb-4">
                {searchResults.length === 0 ? (
                     <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Không tìm thấy câu hỏi nào phù hợp với từ khoá của bạn.</p>
                    </div>
                ) : (
                    <div className="text-center mb-2 text-slate-600 dark:text-slate-400 font-medium text-xs sm:text-sm md:text-base">
                        {searchTerm.trim() ? `Tìm thấy ${searchResults.length} câu hỏi phù hợp.` : `Hiển thị toàn bộ ${searchResults.length} câu hỏi.`}
                    </div>
                )}
                
                {searchResults.map((q) => (
                    <div key={q.id} className="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-5 shadow-md border border-slate-200 dark:border-slate-800 animate-fade-in">
                        <p className="text-sm sm:text-base md:text-lg font-bold mb-3 text-slate-900 dark:text-slate-100 leading-snug">
                           <span className="font-extrabold text-cyan-600 dark:text-cyan-400 mr-1.5">Câu {q.id}:</span> {highlightText(q.question, searchTerm)}
                        </p>
                        <div className="space-y-2 mb-3">
                             {Object.entries(q.options).map(([key, value]) => (
                                <div key={key} className={`flex items-start justify-between p-2.5 sm:p-3 rounded-lg border-2 ${key === q.correctAnswer ? 'bg-green-50 dark:bg-green-950/40 border-green-400 dark:border-green-600' : 'border-slate-200 dark:border-slate-800'}`}>
                                    <div className="flex items-start flex-grow">
                                        <span className="font-bold text-slate-700 dark:text-slate-300 w-5 sm:w-7 shrink-0 text-xs sm:text-sm md:text-base">{key}.</span>
                                        <span className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">{highlightText(value as string, searchTerm)}</span>
                                    </div>
                                     {key === q.correctAnswer && <div className="shrink-0 ml-2"><CheckIcon className="w-4 h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400" /></div>}
                                </div>
                             ))}
                        </div>
                         <div className="mt-3 p-3 bg-cyan-50/70 dark:bg-cyan-950/40 rounded-lg border border-cyan-200 dark:border-cyan-800 text-xs sm:text-sm md:text-base leading-relaxed">
                           <p className="font-bold text-cyan-700 dark:text-cyan-400">Lý giải:</p>
                           <p className="text-slate-800 dark:text-slate-200 font-bold mb-0.5">Câu {q.id}-{q.correctAnswer}</p>
                           <p className="text-slate-800 dark:text-slate-200">{highlightText(q.explanation, searchTerm)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
