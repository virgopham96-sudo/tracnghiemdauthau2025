
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Question, UserAnswers } from '../types';
import { CheckIcon, XIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

interface PracticeAllProps {
    questions: Question[];
    onBack: () => void;
}

const categories = [
    'Quy định chung',
    'Hình thức và Phương thức LCNT',
    'Kế hoạch và Quy trình LCNT',
    'Hồ sơ mời thầu và Đánh giá HSDT',
    'Hợp đồng',
    'Đấu thầu qua mạng',
    'Trách nhiệm và Xử lý vi phạm',
    'Mua sắm đặc thù',
];

const PracticeAll: React.FC<PracticeAllProps> = ({ questions, onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [isFading, setIsFading] = useState(false);
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [isGridVisible, setIsGridVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredQuestions = useMemo(() => {
        if (selectedCategory !== 'all') {
            return questions.filter(q => q.category === selectedCategory);
        }
        return questions;
    }, [questions, selectedCategory]);

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
    }, [selectedCategory]);

    // Safeguard against index out of bounds when filteredQuestions shrinks
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
        // Prevent changing answer once it's given
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
            // Allow number keys to select answers
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
        return `${baseClasses} bg-white text-slate-700 border-slate-300`;
    };

    const getOptionClasses = (question: Question, optionKey: 'A' | 'B' | 'C' | 'D'): string => {
        const baseClasses = "flex justify-between items-start p-4 rounded-lg border-2 transition-all duration-300";
        const userAnswer = userAnswers[question.id];
        
        if (!userAnswer) {
            return `${baseClasses} bg-white border-slate-200 hover:bg-cyan-50/50 hover:border-cyan-300 cursor-pointer`;
        }

        const isCorrectAnswer = optionKey === question.correctAnswer;
        const isSelected = userAnswer === optionKey;

        if (isCorrectAnswer) {
            return `${baseClasses} bg-green-100 border-green-500 text-green-900 ring-2 ring-green-300`;
        }
        if (isSelected && !isCorrectAnswer) {
            return `${baseClasses} bg-red-100 border-red-500 text-red-900`;
        }
        return `${baseClasses} bg-white border-slate-200 text-slate-500 opacity-60`;
    };

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const isAnswered = currentQuestion && userAnswers[currentQuestion.id] !== undefined;
    
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="bg-white hover:bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-full transition-colors flex items-center gap-2 border border-slate-200 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Quay lại
                </button>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center flex-1">Luyện tập tổng hợp</h2>
            </div>
            
            <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex items-center gap-2">
                     <label htmlFor="category-filter" className="font-semibold text-slate-700 shrink-0">Chủ đề:</label>
                     <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full max-w-xs p-2 border border-slate-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white"
                     >
                        <option value="all">Tất cả ({questions.length} câu)</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat} ({questions.filter(q => q.category === cat).length} câu)
                            </option>
                        ))}
                     </select>
                </div>
            </div>
            
             <div className="text-center mb-6 flex justify-center items-center gap-4">
                <button
                    onClick={toggleGridVisibility}
                    className="bg-white hover:bg-slate-100 text-slate-700 font-semibold py-2 px-5 rounded-full transition-colors border border-slate-200 shadow-sm"
                >
                    {isGridVisible ? 'Ẩn danh sách câu hỏi' : `Hiển thị danh sách câu hỏi (${filteredQuestions.length})`}
                </button>
            </div>

            {isGridVisible && (
                 <div className="mb-8 p-4 bg-white/50 rounded-xl border border-slate-200 animate-fade-in">
                    <div className="flex flex-wrap justify-center gap-2">
                        {filteredQuestions.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => handleJumpToQuestion(index)}
                                className={getQuestionNavClasses(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Question Display */}
            {filteredQuestions.length > 0 ? (
                currentQuestion && (
                    <div className={`bg-white rounded-xl p-4 sm:p-6 shadow-xl border border-slate-200 transition-all duration-200 ease-in-out ${isFading ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'}`}>
                        <div className="max-h-[65vh] overflow-y-auto pr-2">
                            <p className="text-xl font-semibold mb-6 text-slate-800">
                                <span className="font-bold text-cyan-600 mr-2">Câu {currentQuestionIndex + 1}:</span> {currentQuestion.question}
                            </p>
                            <div className="space-y-4">
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
                                            <div className="flex items-start flex-grow">
                                                <span className="font-bold text-cyan-700 w-7 shrink-0">{key}.</span>
                                                <span className="text-slate-800 text-base">{value}</span>
                                            </div>
                                             {isAnswered && (
                                                <div className="shrink-0 ml-4">
                                                    { isSelectedAnswer && !isCorrectAnswer ? <XIcon /> : (isCorrectAnswer ? <CheckIcon /> : null) }
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {isAnswered && (
                                <div className="mt-6 p-4 bg-cyan-50/70 rounded-lg border border-cyan-200 animate-fade-in">
                                   <p className="font-bold text-cyan-700">Lý giải:</p>
                                   <p className="text-slate-800 font-bold mb-1">Câu {currentQuestion.id}-{currentQuestion.correctAnswer}</p>
                                   <p className="text-slate-800">{currentQuestion.explanation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            ) : (
                 <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-slate-200">
                    <p className="text-lg text-slate-600">
                        Không có câu hỏi nào cho chủ đề này.
                    </p>
                </div>
            )}
            
             {/* Sequential Navigation */}
            {filteredQuestions.length > 0 && (
                <div className="flex justify-between items-center mt-6">
                     <button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestionIndex === 0}
                            className="bg-white hover:bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-full transition-colors border border-slate-200 shadow-sm disabled:bg-slate-100/50 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none transform hover:-translate-x-1 flex items-center gap-2"
                        >
                            <ChevronLeftIcon />
                            Câu trước
                        </button>
                        <span className="font-semibold text-lg text-slate-600">
                            {filteredQuestions.length > 0 ? currentQuestionIndex + 1 : 0} / {filteredQuestions.length}
                        </span>
                        <button
                            onClick={handleNextQuestion}
                            disabled={currentQuestionIndex === filteredQuestions.length - 1}
                            className="bg-white hover:bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-full transition-colors border border-slate-200 shadow-sm disabled:bg-slate-100/50 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none transform hover:translate-x-1 flex items-center gap-2"
                        >
                            Câu tiếp theo
                            <ChevronRightIcon />
                        </button>
                </div>
            )}

            {showGoToTop && (
                <button
                    onClick={handleGoToTop}
                    className="fixed bottom-8 right-4 md:right-8 z-20 p-3 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 animate-fade-in"
                    aria-label="Lên đầu trang"
                >
                    <ArrowUpIcon />
                </button>
            )}
        </div>
    );
};

export default PracticeAll;
