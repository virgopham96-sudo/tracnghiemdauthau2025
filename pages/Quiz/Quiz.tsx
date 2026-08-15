import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Question, UserAnswers } from '../../types';
import { ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from '../../components/icons';

interface QuizProps {
    questions: Question[];
    onSubmit: (answers: UserAnswers, timeTaken: number) => void;
    onBack: () => void;
    setTitle: string;
    isPracticeMode: boolean;
    totalTime: number;
}

const EXCLUDED_FROM_SHUFFLE = [2, 6, 9, 10, 11, 17, 18, 20, 21, 27, 29, 30, 41, 43, 44, 45, 46, 59, 65, 66, 67, 71, 73, 74, 85, 87, 89, 90, 92, 93, 94, 95, 100, 101, 103, 107, 108, 110, 113, 114, 115, 117, 118, 120, 123, 125, 131, 132, 135, 138, 139, 148, 149, 165, 170, 174, 176, 178, 183, 184, 186, 193, 201, 209, 211, 213, 214, 215, 221, 222, 224, 230, 231, 232, 233, 234, 237, 238, 241, 242, 243, 247, 250, 252, 253, 254, 255, 256, 260, 261, 262, 265, 269, 272, 273, 274, 275, 276, 277, 282, 286, 293, 294, 295, 296, 298, 299, 300, 301, 312, 314, 318, 339];

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const Quiz: React.FC<QuizProps> = ({ questions, onSubmit, onBack, setTitle, isPracticeMode, totalTime }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<UserAnswers>({});
    const [timeRemaining, setTimeRemaining] = useState(totalTime);
    const [isFading, setIsFading] = useState(false); // State for fade transition
    const [showHint, setShowHint] = useState(false); // State for hint visibility
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [autoNext, setAutoNext] = useState(false);
    const [isGridVisible, setIsGridVisible] = useState(false);

    const isSetMode = setTitle.includes('bộ đề');

    // Ref to hold the latest answers to avoid stale closure in setInterval
    const answersRef = useRef(selectedAnswers);
    answersRef.current = selectedAnswers;
    
    const toggleGridVisibility = () => {
        setIsGridVisible(prev => !prev);
    };

    // Compute shuffled mappings once when questions load
    const optionMappings = useMemo(() => {
        const mappings: Record<number, string[]> = {};
        // Check if it is Random Test Mode (not practice, and title contains "ngẫu nhiên")
        const isRandomTest = !isPracticeMode && setTitle.toLowerCase().includes('ngẫu nhiên');

        questions.forEach(q => {
            if (isRandomTest && !EXCLUDED_FROM_SHUFFLE.includes(q.id)) {
                mappings[q.id] = shuffleArray(['A', 'B', 'C', 'D']);
            } else {
                mappings[q.id] = ['A', 'B', 'C', 'D'];
            }
        });
        return mappings;
    }, [questions, isPracticeMode, setTitle]);

    useEffect(() => {
        if (isPracticeMode) return; // Don't start timer in practice mode

        const timerId = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    onSubmit(answersRef.current, totalTime); // Auto-submit with latest answers
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerId); // Cleanup on unmount
    }, [onSubmit, isPracticeMode, totalTime]);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowGoToTop(true);
            } else {
                setShowGoToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleJumpToQuestion = useCallback((index: number) => {
        if (index >= 0 && index < questions.length && index !== currentQuestionIndex) {
            setIsFading(true);
            setShowHint(false); // Hide hint when changing question
            setTimeout(() => {
                setCurrentQuestionIndex(index);
                setIsFading(false);
            }, 200);
        }
    }, [currentQuestionIndex, questions.length]);

    const handleNextQuestion = useCallback(() => {
        handleJumpToQuestion(currentQuestionIndex + 1);
    }, [currentQuestionIndex, handleJumpToQuestion]);

    const handlePrevQuestion = useCallback(() => {
        handleJumpToQuestion(currentQuestionIndex - 1);
    }, [currentQuestionIndex, handleJumpToQuestion]);

    const handleOptionChange = useCallback((questionId: number, option: 'A' | 'B' | 'C' | 'D') => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
        if (autoNext) {
            setTimeout(() => {
                handleNextQuestion();
            }, 300);
        }
    }, [autoNext, handleNextQuestion]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const activeElement = document.activeElement as HTMLElement;

            // Allow number keys to select answers based on visual position
            const keyIndexMap: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3 };
            const index = keyIndexMap[event.key];
            
            if (index !== undefined) {
                const currentQuestion = questions[currentQuestionIndex];
                if (currentQuestion) {
                    const currentMapping = optionMappings[currentQuestion.id] || ['A', 'B', 'C', 'D'];
                    const originalKey = currentMapping[index] as 'A' | 'B' | 'C' | 'D';
                    handleOptionChange(currentQuestion.id, originalKey);
                }
                event.preventDefault(); // Prevent default action (e.g., typing '1' in a field)
                return;
            }

            // Allow up/down arrows if focus is within the options container
            if (activeElement && activeElement.closest('.quiz-options-container')) {
                 if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    // Logic for arrow navigation remains mostly UI based, focusing elements
                    // Just getting the list of option divs
                    const optionDivs = Array.from(
                        document.querySelectorAll('.quiz-option-item')
                    ) as HTMLElement[];
                    
                    // Find currently selected or focused
                    // This part is a bit tricky since we don't have standard radio inputs. 
                    // We can simplify by just focusing next/prev div.
                    // For now, let's skip complex focus management for arrows inside options 
                    // as the previous implementation relied on input[type=radio] which we don't strictly have in the render loop below.
                    // We will rely on number keys for selection efficiency.
                    
                    return; 
                 }
            }
            
            // Global left/right navigation
            if (event.key === 'ArrowLeft') {
                handlePrevQuestion();
                event.preventDefault();
            } else if (event.key === 'ArrowRight') {
                handleNextQuestion();
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handlePrevQuestion, handleNextQuestion, questions, currentQuestionIndex, handleOptionChange, optionMappings]);


    
    const answeredCount = useMemo(() => Object.keys(selectedAnswers).length, [selectedAnswers]);

    const handleSubmit = () => {
        onSubmit(selectedAnswers, totalTime - timeRemaining);
    };
    
    const handleGoToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const toggleHint = () => {
        setShowHint(prev => !prev);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const timerClasses = timeRemaining < 60 
        ? 'text-red-500 font-bold animate-pulse' 
        : 'text-slate-800 dark:text-slate-200';

    const currentQuestion = questions[currentQuestionIndex];
    
    // Standard UI keys to iterate over for display (always A, B, C, D visually)
    const uiKeys = ['A', 'B', 'C', 'D'];
    const currentMapping = currentQuestion ? (optionMappings[currentQuestion.id] || uiKeys) : uiKeys;

    const getQuestionNavClasses = (index: number) => {
        let baseClasses = "w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all duration-200 border transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400";
        if (index === currentQuestionIndex) {
            return `${baseClasses} bg-cyan-500 text-white border-cyan-600 shadow-md`;
        }
        if (selectedAnswers[questions[index].id]) {
            return `${baseClasses} bg-green-500 text-white border-green-600`;
        }
        return `${baseClasses} bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700`;
    };


    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col pb-8 animate-fade-in">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4 text-slate-900 dark:text-slate-100">{setTitle}</h2>

            {/* Top Control Bar */}
            <div className="mb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm">
                <div className="flex justify-between items-center text-sm md:text-base gap-2">
                    <button
                        onClick={onBack}
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-3.5 sm:px-4 rounded-xl transition-colors text-xs sm:text-sm shrink-0"
                    >
                        Thoát
                    </button>
                    <div className="flex flex-col items-center flex-grow text-center px-2">
                         {!isPracticeMode ? (
                             <>
                                 <div className={`text-lg sm:text-xl md:text-2xl font-mono font-bold ${timerClasses}`}>{formatTime(timeRemaining)}</div>
                                 <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Đã trả lời: <span className="font-bold text-cyan-600 dark:text-cyan-400">{answeredCount}</span>/{questions.length}</div>
                             </>
                         ) : (
                             <>
                                 <div className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">Chế độ Luyện tập</div>
                                 <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">Đã trả lời: <span className="font-bold text-cyan-600 dark:text-cyan-400">{answeredCount}</span>/{questions.length}</div>
                             </>
                         )}
                         <div className="mt-1 hidden sm:block">
                            <label className="flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={autoNext}
                                    onChange={(e) => setAutoNext(e.target.checked)}
                                    className="h-3.5 w-3.5 rounded text-cyan-600 focus:ring-cyan-500 border-slate-300 dark:border-slate-700"
                                />
                                <span className="ml-1.5 font-medium">Tự động chuyển câu sau khi chọn</span>
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 sm:px-5 rounded-xl transition-all shadow hover:shadow-md transform hover:-translate-y-0.5 text-xs sm:text-sm md:text-base shrink-0"
                    >
                        Nộp bài
                    </button>
                </div>
            </div>
            
            <div className="text-center mb-3">
                <button
                    onClick={toggleGridVisibility}
                    className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-1.5 px-4 text-xs sm:text-sm rounded-full transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                    {isGridVisible ? '▲ Ẩn danh sách câu hỏi' : `▼ Hiển thị danh sách (${questions.length} câu)`}
                </button>
            </div>
            
            {isGridVisible && (
                 <div className="mb-4 p-3.5 bg-slate-50/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 animate-fade-in max-h-48 overflow-y-auto">
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleJumpToQuestion(index)}
                                className={getQuestionNavClasses(index)}
                            >
                                {isSetMode ? questions[index].id : index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Question Area - Open, spacious layout with clear typography */}
            <div className="w-full">
                {currentQuestion && (
                    <div className={`transition-all duration-200 ease-in-out ${isFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                        {/* Question Content */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-4">
                            <div className="mb-5 sm:mb-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm sm:text-base font-extrabold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 mb-2.5">
                                    Câu {isSetMode ? currentQuestion.id : currentQuestionIndex + 1}
                                </span>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50 leading-relaxed">
                                    {currentQuestion.question}
                                </h3>
                            </div>

                            {/* Options List */}
                            <div className="space-y-3 sm:space-y-3.5 quiz-options-container">
                                {uiKeys.map((uiKey, index) => {
                                    const originalKey = currentMapping[index] as 'A' | 'B' | 'C' | 'D';
                                    const value = currentQuestion.options[originalKey];
                                    const isSelected = selectedAnswers[currentQuestion.id] === originalKey;
                                    
                                    return (
                                        <div
                                            key={uiKey}
                                            onClick={() => handleOptionChange(currentQuestion.id, originalKey)}
                                            className={`quiz-option-item flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 md:p-5 rounded-xl border-2 transition-all cursor-pointer ${
                                                isSelected 
                                                    ? 'bg-cyan-50/80 dark:bg-cyan-950/50 border-cyan-500 shadow-sm ring-1 ring-cyan-400 dark:ring-cyan-600' 
                                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/60'
                                            }`}
                                        >
                                            <span className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg font-bold text-base sm:text-lg shrink-0 transition-colors ${
                                                isSelected
                                                    ? 'bg-cyan-600 text-white shadow-sm'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}>
                                                {uiKey}
                                            </span>
                                            <span className={`text-base sm:text-lg md:text-xl leading-relaxed flex-1 pt-0.5 ${
                                                isSelected
                                                    ? 'font-medium text-slate-950 dark:text-white'
                                                    : 'text-slate-800 dark:text-slate-200'
                                            }`}>
                                                {value}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Hint and Explanation Toggle */}
                            <div className="mt-5 flex justify-end">
                                <button
                                    onClick={toggleHint}
                                    className="text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-200 font-semibold text-xs sm:text-sm py-1.5 px-4 rounded-full bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition-all border border-cyan-200/60 dark:border-cyan-800/60"
                                >
                                    {showHint ? 'Ẩn gợi ý & giải thích' : '💡 Xem gợi ý & giải thích'}
                                </button>
                            </div>

                            {showHint && (
                                <div className="mt-4 p-4 sm:p-5 bg-cyan-50/60 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800/80 animate-fade-in text-sm sm:text-base md:text-lg leading-relaxed">
                                   <div className="flex items-center gap-2 font-bold text-cyan-800 dark:text-cyan-300 mb-1.5">
                                       <span>Đáp án đúng:</span>
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
                )}

                {/* Bottom Navigation */}
                <div className="flex justify-between items-center mt-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <button
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 sm:px-5 rounded-xl transition-all border border-slate-200 dark:border-slate-700 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transform hover:-translate-x-0.5 flex items-center gap-1.5 text-xs sm:text-sm md:text-base"
                        aria-label="Câu hỏi trước"
                    >
                        <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Câu trước</span>
                    </button>

                    <div className="text-center">
                        <span className="font-extrabold text-base sm:text-lg md:text-xl text-slate-800 dark:text-slate-200">
                            {currentQuestionIndex + 1}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 font-medium text-sm sm:text-base mx-1">/</span>
                        <span className="text-slate-500 dark:text-slate-400 font-semibold text-sm sm:text-base">
                            {questions.length}
                        </span>
                    </div>

                    <button
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 sm:px-5 rounded-xl transition-all border border-slate-200 dark:border-slate-700 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transform hover:translate-x-0.5 flex items-center gap-1.5 text-xs sm:text-sm md:text-base"
                        aria-label="Câu hỏi tiếp theo"
                    >
                        <span>Câu tiếp</span>
                        <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>

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

export default Quiz;
