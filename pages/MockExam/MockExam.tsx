import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Question, UserAnswers } from '../../types';
import { BellIcon } from '../../components/icons';

interface MockExamProps {
    questions: Question[];
    onSubmit: (answers: UserAnswers, timeTaken: number) => void;
    onBack: () => void;
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

export const MockExam: React.FC<MockExamProps> = ({ questions, onSubmit, onBack }) => {
    const totalTime = 60 * 60; // 60 minutes
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<UserAnswers>({});
    const [marked, setMarked] = useState<Set<number>>(new Set());
    const [timeRemaining, setTimeRemaining] = useState(totalTime);
    
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    // Timer integration
    const answersRef = useRef(selectedAnswers);
    useEffect(() => {
        answersRef.current = selectedAnswers;
    }, [selectedAnswers]);

    const optionMappings = useMemo(() => {
        const mappings: Record<number, string[]> = {};
        questions.forEach(q => {
            if (!EXCLUDED_FROM_SHUFFLE.includes(q.id)) {
                mappings[q.id] = shuffleArray(['A', 'B', 'C', 'D']);
            } else {
                mappings[q.id] = ['A', 'B', 'C', 'D'];
            }
        });
        return mappings;
    }, [questions]);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    onSubmit(answersRef.current, totalTime);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [onSubmit, totalTime]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (showConfirmModal) return;
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement && activeElement.tagName === 'INPUT') return;

            const keyIndexMap: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3 };
            const index = keyIndexMap[event.key];
            if (index !== undefined) {
                const q = questions[currentQuestionIndex];
                if (q) {
                    const mapping = optionMappings[q.id] || ['A', 'B', 'C', 'D'];
                    handleOptionChange(q.id, mapping[index] as any);
                }
                event.preventDefault();
                return;
            }

            if (event.key === 'ArrowLeft') {
                handlePrev();
                event.preventDefault();
            } else if (event.key === 'ArrowRight') {
                handleNext();
                event.preventDefault();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentQuestionIndex, questions, optionMappings, showConfirmModal]);

    const handleOptionChange = (questionId: number, option: 'A'|'B'|'C'|'D') => {
        setSelectedAnswers(prev => ({...prev, [questionId]: option}));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };
    
    const handleJump = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const toggleMark = () => {
        setMarked(prev => {
            const newSet = new Set(prev);
            if (newSet.has(currentQuestionIndex)) {
                newSet.delete(currentQuestionIndex);
            } else {
                newSet.add(currentQuestionIndex);
            }
            return newSet;
        });
    };

    const handleSubmitClick = () => {
        setShowConfirmModal(true);
    };

    const confirmSubmit = () => {
        setShowConfirmModal(false);
        onSubmit(selectedAnswers, totalTime - timeRemaining);
    };

    const cancelSubmit = () => {
        setShowConfirmModal(false);
    };

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    const uiKeys = ['A', 'B', 'C', 'D'];
    const currentMapping = optionMappings[currentQuestion.id] || uiKeys;
    const isMarked = marked.has(currentQuestionIndex);
    const answeredCount = Object.keys(selectedAnswers).length;
    const isFinished = answeredCount === questions.length;

    const getGridBtnClass = (index: number) => {
        let base = "w-10 h-10 rounded-md border flex items-center justify-center text-sm font-semibold transition-colors duration-200 ";
        let isSelected = index === currentQuestionIndex;
        let isAnswered = selectedAnswers[questions[index].id] !== undefined;
        let isQuestionMarked = marked.has(index);

        if (isSelected) {
            base += "ring-2 ring-offset-1 ring-[#0983c2] ";
        }
        
        if (isQuestionMarked) {
             base += "bg-yellow-100 dark:bg-yellow-900/60 border-yellow-400 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200 ";
        } else if (isAnswered) {
             base += "bg-[#e8f1f8] dark:bg-cyan-950/60 border-[#0983c2] text-[#0983c2] dark:text-cyan-400 ";
        } else {
             base += "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 ";
        }
        return base;
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto h-full min-h-[calc(100vh-140px)] animate-fade-in relative z-0">
            {/* Left Panel */}
            <div className="w-full md:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:h-[calc(100vh-140px)] md:sticky top-6 shadow-sm">
                <div className="mb-4 flex justify-between items-center">
                    <p className="font-bold text-slate-800 dark:text-slate-100 text-lg">Câu hỏi</p>
                    <button 
                        onClick={onBack}
                        className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg"
                    >
                        Thoát
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 pb-4 grid grid-cols-5 gap-2 content-start">
                    {questions.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => handleJump(i)}
                            className={getGridBtnClass(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                    <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                         <span className="font-semibold text-slate-600 dark:text-slate-300">Thời gian còn lại</span>
                         <span className={`font-mono text-xl font-bold ${timeRemaining < 300 ? 'text-red-600 animate-pulse' : 'text-slate-800 dark:text-slate-100'}`}>
                             {formatTime(timeRemaining)}
                         </span>
                    </div>
                    <button
                        onClick={handleSubmitClick}
                        className="w-full bg-[#d32f2f] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm mt-2"
                    >
                        NỘP BÀI
                    </button>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-5">
                     <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100">Câu {currentQuestionIndex + 1}</h3>
                     <button
                         onClick={toggleMark}
                         className={`flex items-center gap-1 font-bold text-xs sm:text-sm px-3 py-1.5 rounded-lg transition-colors ${isMarked ? 'text-yellow-700 dark:text-yellow-300 bg-yellow-100/50 dark:bg-yellow-900/40' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                     >
                         ĐÁNH DẤU <BellIcon className={`w-4 h-4 md:w-5 md:h-5 ${isMarked ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
                     </button>
                </div>

                <div className="flex-1">
                    <p className="text-slate-900 dark:text-slate-50 text-lg sm:text-xl md:text-2xl font-bold mb-6 leading-relaxed">
                        {currentQuestion.question}
                    </p>

                    <div className="space-y-3 sm:space-y-3.5">
                        {uiKeys.map((uiKey, index) => {
                            const originalKey = currentMapping[index] as 'A' | 'B' | 'C' | 'D';
                            const value = currentQuestion.options[originalKey];
                            if (!value) return null;
                            const isSelected = selectedAnswers[currentQuestion.id] === originalKey;

                            return (
                                <label 
                                    key={uiKey}
                                    className={`flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-4 md:p-4.5 rounded-xl border-2 cursor-pointer transition-all ${
                                        isSelected 
                                            ? 'border-[#0983c2] bg-[#f0f7fc] dark:bg-cyan-950/50 shadow-sm ring-1 ring-[#0983c2]' 
                                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                    }`}
                                >
                                    <span className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg font-bold text-base sm:text-lg shrink-0 transition-colors ${
                                        isSelected
                                            ? 'bg-[#0983c2] text-white shadow-sm'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                    }`}>
                                        {uiKey}
                                    </span>
                                    <span className={`text-base sm:text-lg md:text-xl leading-relaxed flex-1 pt-0.5 select-none ${
                                        isSelected ? 'font-medium text-slate-950 dark:text-white' : 'text-slate-800 dark:text-slate-200'
                                    }`}>
                                        {value}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className="bg-[#90caf9] dark:bg-sky-800 hover:bg-[#64b5f6] dark:hover:bg-sky-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                       <span className="text-xl leading-none -mt-1 mr-1">‹</span> TRƯỚC
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className="bg-[#0983c2] dark:bg-cyan-600 hover:bg-[#076a9e] dark:hover:bg-cyan-500 text-white font-bold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                        NEXT <span className="text-xl leading-none -mt-1 ml-1">›</span>
                    </button>
                </div>
            </div>

            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl transform transition-all relative">
                         <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                             Xác nhận nộp bài
                         </h3>
                         {!isFinished ? (
                             <p className="text-slate-600 dark:text-slate-300 mb-6 bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl">
                                 Bạn mới hoàn thành <span className="font-bold">{answeredCount}/{questions.length}</span> câu hỏi. Bạn có chắc chắn muốn nộp bài bây giờ không?
                             </p>
                         ) : (
                             <p className="text-slate-600 dark:text-slate-300 mb-6 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 p-4 rounded-xl">
                                 Bạn đã hoàn thành tất cả câu hỏi. Bạn có muốn nộp bài và xem kết quả?
                             </p>
                         )}
                         <div className="flex justify-end gap-3">
                             <button
                                 onClick={cancelSubmit}
                                 className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg transition-colors"
                             >
                                 Tiếp tục làm bài
                             </button>
                             <button
                                 onClick={confirmSubmit}
                                 className="px-5 py-2.5 bg-[#d32f2f] hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-sm"
                             >
                                 Nộp bài ngay
                             </button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};
