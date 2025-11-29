
import React, { useState, useEffect, useCallback } from 'react';
import { Question, UserAnswers } from '../types';
import { CheckIcon, XIcon, TrophyIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon, RefreshIcon } from './icons';

interface ResultsProps {
    questions: Question[];
    userAnswers: UserAnswers;
    onRestart: () => void;
    onRetry?: () => void; // New prop for retrying the same set
    setTitle: string;
    isPracticeMode: boolean;
    completionTime: number;
    restartLabel?: string;
}

const Results: React.FC<ResultsProps> = ({ questions, userAnswers, onRestart, onRetry, setTitle, isPracticeMode, completionTime, restartLabel }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const isSetMode = setTitle.includes('bộ đề');

    const score = questions.reduce((acc, q) => {
        return acc + (userAnswers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    const finalScore = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || seconds < 0) return "00:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


    const handleJumpToQuestion = useCallback((index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentQuestionIndex(index);
        }
    }, [questions.length]);
    
    const handleNextQuestion = useCallback(() => {
        handleJumpToQuestion(currentQuestionIndex + 1);
    }, [currentQuestionIndex, handleJumpToQuestion]);

    const handlePrevQuestion = useCallback(() => {
        handleJumpToQuestion(currentQuestionIndex - 1);
    }, [currentQuestionIndex, handleJumpToQuestion]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
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
    }, [handlePrevQuestion, handleNextQuestion]);
    
    const getQuestionNavClasses = (index: number) => {
        const baseClasses = "w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all duration-200 border transform hover:-translate-y-0.5";
        const question = questions[index];
        const isCorrect = userAnswers[question.id] === question.correctAnswer;

        if (index === currentQuestionIndex) {
            return `${baseClasses} bg-cyan-500 text-white border-cyan-600 shadow-md scale-110 ring-2 ring-offset-2 ring-cyan-400`;
        }
        if (isCorrect) {
            return `${baseClasses} bg-green-100 text-green-800 border-green-300 hover:bg-green-200`;
        }
        return `${baseClasses} bg-red-100 text-red-800 border-red-300 hover:bg-red-200`;
    };

    const getOptionClasses = (question: Question, optionKey: string): string => {
        const isCorrect = optionKey === question.correctAnswer;
        const isSelected = userAnswers[question.id] === optionKey;
        const wasAnswered = userAnswers[question.id] !== undefined;

        if (isCorrect) {
            return 'bg-green-100 border-green-500 text-green-900 ring-2 ring-green-300';
        }
        if (isSelected && !isCorrect) {
            return 'bg-red-100 border-red-500 text-red-900';
        }
        if (!isSelected && wasAnswered){
            return 'border-slate-200 text-slate-500 opacity-60';
        }
        return 'border-slate-200 text-slate-700';
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl p-6 mb-8 text-center shadow-xl border border-slate-200 animate-fade-in">
                <h2 className="text-3xl font-bold mb-2 text-slate-900">Kết quả {setTitle}</h2>
                <p className="text-slate-500 mb-6">Dưới đây là tổng kết bài làm của bạn.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                        <TrophyIcon className="h-10 w-10 text-cyan-500 mb-2"/>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Điểm số</p>
                        <p className="text-4xl font-bold text-cyan-600">{finalScore}<span className="text-2xl text-slate-400">/100</span></p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                        <CheckIcon />
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-2">Số câu đúng</p>
                        <p className="text-4xl font-bold text-slate-800">{score}<span className="text-2xl text-slate-400">/{questions.length}</span></p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                        <ClockIcon className="h-10 w-10 text-cyan-500 mb-2"/>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Thời gian</p>
                        <p className="text-3xl font-bold text-slate-800">{formatTime(completionTime)}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                     <button
                        onClick={onRestart}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-lg transition-colors border border-slate-300"
                    >
                        {restartLabel || "Về màn hình chính"}
                    </button>
                    
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <RefreshIcon className="h-5 w-5" />
                            Làm lại đề này
                        </button>
                    )}
                </div>
            </div>

            {/* Question Navigation Grid */}
            <div className="mb-8 p-4 bg-white rounded-xl border border-slate-200 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-slate-800 text-center">Xem lại câu trả lời</h3>
                <div className="flex flex-wrap justify-center items-center gap-2">
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

            {/* Single Question View */}
            {currentQuestion && (
                <div key={currentQuestion.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-xl border border-slate-200 animate-fade-in">
                    <div className="max-h-[60vh] overflow-y-auto pr-2">
                        <p className="text-lg font-semibold mb-4 text-slate-800"><span className="font-bold text-cyan-600">Câu {isSetMode ? currentQuestion.id : currentQuestionIndex + 1}:</span> {currentQuestion.question}</p>
                        <div className="space-y-3 mb-6">
                            {Object.entries(currentQuestion.options).map(([key, value]) => {
                                 const isCorrectAnswer = key === currentQuestion.correctAnswer;
                                 const isSelectedAnswer = userAnswers[currentQuestion.id] === key;

                                return (
                                <div key={key} className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 ${getOptionClasses(currentQuestion, key)}`}>
                                    <span>{key}. {value}</span>
                                    <div className="shrink-0">
                                        { isSelectedAnswer && !isCorrectAnswer ? <XIcon /> : (isCorrectAnswer ? <CheckIcon /> : null) }
                                    </div>
                                </div>
                            )})}
                        </div>
                        <div className="mt-4 p-4 bg-cyan-50/70 rounded-lg border border-cyan-200">
                           <p className="font-bold text-cyan-700">Lý giải:</p>
                           <p className="text-slate-800 font-bold mb-1">Câu {currentQuestion.id}-{currentQuestion.correctAnswer}</p>
                           <p className="text-slate-800">{currentQuestion.explanation}</p>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Sequential Navigation */}
            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="bg-white hover:bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-full transition-colors border border-slate-200 shadow-sm disabled:bg-slate-100/50 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none transform hover:-translate-x-1 flex items-center gap-2"
                    aria-label="Câu hỏi trước"
                >
                    <ChevronLeftIcon />
                    <span className="hidden sm:inline">Câu trước</span>
                </button>
                <span className="font-semibold text-lg text-slate-600">
                    {currentQuestionIndex + 1} / {questions.length}
                </span>
                <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="bg-white hover:bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-full transition-colors border border-slate-200 shadow-sm disabled:bg-slate-100/50 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none transform hover:translate-x-1 flex items-center gap-2"
                    aria-label="Câu hỏi tiếp theo"
                >
                    <span className="hidden sm:inline">Câu tiếp theo</span>
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
};

export default Results;
