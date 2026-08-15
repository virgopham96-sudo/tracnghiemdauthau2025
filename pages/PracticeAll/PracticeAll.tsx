
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Question, UserAnswers } from '../../types';
import { CheckIcon, XIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from '../../components/icons';
import { BASE_CATEGORY_MAPPING, getFullCategoryMapping, getOrderedCategories } from '../../data/categories';

interface PracticeAllProps {
    questions: Question[];
    onBack: () => void;
}

const PracticeAll: React.FC<PracticeAllProps> = ({ questions, onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [isFading, setIsFading] = useState(false);
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [isGridVisible, setIsGridVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showHint, setShowHint] = useState(false);

    const fullCategoryMapping = useMemo(() => {
        return getFullCategoryMapping(questions);
    }, [questions]);

    // Custom sorting for categories
    const categories = useMemo(() => {
        return getOrderedCategories(fullCategoryMapping);
    }, [fullCategoryMapping]);

    const filteredQuestions = useMemo(() => {
        if (selectedCategory !== 'all') {
            const allowedIds = fullCategoryMapping[selectedCategory];
            if (allowedIds) {
                // Ensure we respect the order of IDs if possible, or just filter
                // Ideally, show them in ID order
                return questions.filter(q => allowedIds.includes(q.id));
            }
            return [];
        }
        return questions;
    }, [questions, selectedCategory, fullCategoryMapping]);

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setShowHint(false);
    }, [selectedCategory]);

    useEffect(() => {
        if (filteredQuestions.length > 0 && currentQuestionIndex >= filteredQuestions.length) {
            setCurrentQuestionIndex(filteredQuestions.length - 1);
        }
    }, [filteredQuestions, currentQuestionIndex]);

    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const toggleGridVisibility = () => {
        setIsGridVisible(prev => !prev);
    };

    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleJumpToQuestion = useCallback((index: number) => {
        if (index >= 0 && index < filteredQuestions.length && index !== currentQuestionIndex) {
            setIsFading(true);
            setShowHint(false);
            setTimeout(() => {
                setCurrentQuestionIndex(index);
                setIsFading(false);
            }, 200);
        }
    }, [currentQuestionIndex, filteredQuestions.length]);
    
    const handleNextQuestion = useCallback(() => {
        handleJumpToQuestion(currentQuestionIndex + 1);
    }, [currentQuestionIndex, handleJumpToQuestion]);

    const handlePrevQuestion = useCallback(() => {
        handleJumpToQuestion(currentQuestionIndex - 1);
    }, [currentQuestionIndex, handleJumpToQuestion]);

    const handleOptionChange = useCallback((questionId: number, option: 'A' | 'B' | 'C' | 'D') => {
        if (userAnswers[questionId]) {
            return;
        }

        setUserAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
    }, [userAnswers]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const keyMap = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
            const option = keyMap[event.key as keyof typeof keyMap];
            if (option) {
                const currentQuestion = filteredQuestions[currentQuestionIndex];
                if (currentQuestion) {
                    handleOptionChange(currentQuestion.id, option as 'A' | 'B' | 'C' | 'D');
                }
                event.preventDefault();
                return;
            }

            if (event.key === 'ArrowLeft') {
                handlePrevQuestion();
            } else if (event.key === 'ArrowRight') {
                handleNextQuestion();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handlePrevQuestion, handleNextQuestion, filteredQuestions, currentQuestionIndex, handleOptionChange]);

    const getQuestionNavClasses = (index: number) => {
        let baseClasses = "w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all duration-200 border transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400";
        if (index === currentQuestionIndex) {
            return `${baseClasses} bg-cyan-500 text-white border-cyan-600 shadow-md scale-110`;
        }
        const question = filteredQuestions[index];
        const userAnswer = userAnswers[question.id];
        if (userAnswer !== undefined) {
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) {
                 return `${baseClasses} bg-green-500 text-white border-green-600`;
            } else {
                 return `${baseClasses} bg-red-500 text-white border-red-600`;
            }
        }
        return `${baseClasses} bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700`;
    };

    const getOptionClasses = (question: Question, optionKey: 'A' | 'B' | 'C' | 'D'): string => {
        const baseClasses = "flex justify-between items-start gap-3 sm:gap-4 p-3.5 sm:p-4 md:p-5 rounded-xl border-2 transition-all duration-200";
        const userAnswer = userAnswers[question.id];
        
        if (!userAnswer) {
            return `${baseClasses} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 cursor-pointer`;
        }

        const isCorrectAnswer = optionKey === question.correctAnswer;
        const isSelected = userAnswer === optionKey;

        if (isCorrectAnswer) {
            return `${baseClasses} bg-green-50 dark:bg-green-950/60 border-green-500 dark:border-green-600 text-green-950 dark:text-green-100 ring-2 ring-green-300 dark:ring-green-900`;
        }
        if (isSelected && !isCorrectAnswer) {
            return `${baseClasses} bg-red-50 dark:bg-red-950/60 border-red-500 dark:border-red-600 text-red-950 dark:text-red-100`;
        }
        return `${baseClasses} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-50`;
    };

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const isAnswered = currentQuestion && userAnswers[currentQuestion.id] !== undefined;
    
    return (
        <div className="w-full max-w-5xl mx-auto animate-fade-in flex flex-col pb-8">
            {/* Header controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                <button
                    onClick={onBack}
                    className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-3.5 sm:px-4 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 shadow-sm text-xs sm:text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Quay lại</span>
                </button>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 text-center flex-1">Luyện tập tổng hợp</h2>
                <button
                    onClick={toggleGridVisibility}
                    className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-3.5 sm:px-4 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 shadow-sm text-xs sm:text-sm"
                >
                    {isGridVisible ? '▲ Ẩn danh sách' : `▼ Câu hỏi (${filteredQuestions.length})`}
                </button>
            </div>
            
            {/* Topic selector */}
            <div className="mb-4 flex justify-center items-center w-full">
                <div className="flex items-center gap-2.5 w-full bg-white/95 dark:bg-slate-900/95 p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <label htmlFor="category-filter" className="font-semibold text-xs sm:text-sm text-slate-600 dark:text-slate-300 shrink-0">Chủ đề:</label>
                     <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 text-xs sm:text-sm md:text-base border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 truncate font-medium"
                     >
                        <option value="all">Tất cả ({questions.length} câu)</option>
                        {categories.map(cat => {
                            const count = fullCategoryMapping[cat].length;
                            return (
                                <option key={cat} value={cat}>
                                    {cat} ({count} câu)
                                </option>
                            );
                        })}
                     </select>
                </div>
            </div>

            {isGridVisible && (
                 <div className="mb-4 p-3.5 bg-slate-50/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 animate-fade-in max-h-48 overflow-y-auto">
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                        {filteredQuestions.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => handleJumpToQuestion(index)}
                                className={getQuestionNavClasses(index)}
                            >
                                {selectedCategory === 'all' ? index + 1 : q.id}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Question Area */}
            {filteredQuestions.length > 0 ? (
                currentQuestion && (
                    <div className={`transition-all duration-200 ease-in-out ${isFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-4">
                            <div className="mb-5 sm:mb-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm sm:text-base font-extrabold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 mb-2.5">
                                    Câu {currentQuestion.id}
                                </span>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50 leading-relaxed">
                                    {currentQuestion.question}
                                </h3>
                            </div>

                            <div className="space-y-3 sm:space-y-3.5">
                                {Object.entries(currentQuestion.options).map(([key, value]) => {
                                    const optionKey = key as 'A' | 'B' | 'C' | 'D';
                                    const userAnswer = userAnswers[currentQuestion.id];
                                    const isCorrectAnswer = optionKey === currentQuestion.correctAnswer;
                                    const isSelectedAnswer = userAnswer === optionKey;

                                    return (
                                        <div 
                                            key={key} 
                                            className={getOptionClasses(currentQuestion, optionKey)}
                                            onClick={() => handleOptionChange(currentQuestion.id, optionKey)}
                                        >
                                            <div className="flex items-start gap-3 sm:gap-4 flex-grow">
                                                <span className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg font-bold text-base sm:text-lg shrink-0 ${
                                                    isAnswered
                                                        ? (isCorrectAnswer 
                                                            ? 'bg-green-600 text-white' 
                                                            : (isSelectedAnswer ? 'bg-red-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'))
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                                }`}>
                                                    {key}
                                                </span>
                                                <span className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-800 dark:text-slate-200 flex-1 pt-0.5">
                                                    {value}
                                                </span>
                                            </div>
                                             {isAnswered && (
                                                <div className="shrink-0 pt-1">
                                                    { isSelectedAnswer && !isCorrectAnswer ? <XIcon /> : (isCorrectAnswer ? <CheckIcon /> : null) }
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            
                            <div className="mt-5 flex justify-end">
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-200 font-semibold text-xs sm:text-sm py-1.5 px-4 rounded-full bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition-all border border-cyan-200/60 dark:border-cyan-800/60"
                                >
                                    {showHint ? 'Ẩn giải thích' : (isAnswered ? '💡 Xem lại giải thích' : '💡 Xem gợi ý & đáp án')}
                                </button>
                            </div>

                            {(isAnswered || showHint) && (
                                <div className="mt-4 p-4 sm:p-5 bg-cyan-50/60 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800/80 animate-fade-in text-sm sm:text-base md:text-lg leading-relaxed">
                                   <div className="flex items-center gap-2 font-bold text-cyan-800 dark:text-cyan-300 mb-1.5">
                                       <span>{isAnswered ? 'Lý giải:' : 'Gợi ý:'}</span>
                                       <span className="px-2 py-0.5 bg-cyan-600 text-white rounded font-extrabold text-sm sm:text-base">
                                           {currentQuestion.correctAnswer}
                                       </span>
                                       <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                                           (Câu {currentQuestion.id})
                                       </span>
                                   </div>
                                   <p className="text-slate-800 dark:text-slate-200 mt-2">{currentQuestion.explanation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            ) : (
                 <div className="flex justify-center items-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                        Không có câu hỏi nào cho chủ đề này.
                    </p>
                </div>
            )}
            
            {filteredQuestions.length > 0 && (
                <div className="flex justify-between items-center mt-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                     <button
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 sm:px-5 rounded-xl transition-all border border-slate-200 dark:border-slate-700 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transform hover:-translate-x-0.5 flex items-center gap-1.5 text-xs sm:text-sm md:text-base"
                    >
                        <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Câu trước</span>
                    </button>

                    <div className="text-center">
                        <span className="font-extrabold text-base sm:text-lg md:text-xl text-slate-800 dark:text-slate-200">
                            {filteredQuestions.length > 0 ? currentQuestionIndex + 1 : 0}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 font-medium text-sm sm:text-base mx-1">/</span>
                        <span className="text-slate-500 dark:text-slate-400 font-semibold text-sm sm:text-base">
                            {filteredQuestions.length}
                        </span>
                    </div>

                    <button
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === filteredQuestions.length - 1}
                        className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 sm:px-5 rounded-xl transition-all border border-slate-200 dark:border-slate-700 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transform hover:translate-x-0.5 flex items-center gap-1.5 text-xs sm:text-sm md:text-base"
                    >
                        <span>Câu tiếp</span>
                        <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            )}

            {showGoToTop && (
                <button
                    onClick={handleGoToTop}
                    className="fixed bottom-8 right-4 md:right-8 z-20 p-2.5 sm:p-3 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 animate-fade-in"
                    aria-label="Lên đầu trang"
                >
                    <ArrowUpIcon />
                </button>
            )}
        </div>
    );
};

export default PracticeAll;
