
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import ModeSelector from './components/ModeSelector';
import SetSelector from './components/SetSelector';
import RandomQuizSetup from './components/RandomQuizSetup';
import Quiz from './components/Quiz';
import Results from './components/Results';
import PracticeAll from './components/PracticeAll';
import History from './components/History';
import Search from './components/Search';
import Theory from './components/Theory';
import Guide from './components/Guide';
import { QuestionMarkIcon } from './components/icons';
import { allSetsData } from './data/sets';
import { Question, UserAnswers } from './types';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: Question[]): Question[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

type View = 'mode-select' | 'set-select' | 'random-setup' | 'quiz' | 'results' | 'practice-all' | 'history' | 'search' | 'theory';

function App() {
    const [view, setView] = useState<View>('mode-select');
    
    // Quiz State
    const [currentSetIndex, setCurrentSetIndex] = useState<number | null>(null);
    const [randomQuestions, setRandomQuestions] = useState<Question[]>([]); // Store random questions for retry
    const [submittedAnswers, setSubmittedAnswers] = useState<UserAnswers | null>(null);
    const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
    const [completionTime, setCompletionTime] = useState<number | null>(null);
    
    // UI State
    const [isGuideVisible, setIsGuideVisible] = useState(false);

    const totalSets = allSetsData.length;
    const allQuestions = useMemo(() => allSetsData.flat(), []);
    
    const quizTitle = useMemo(() => {
        const mode = isPracticeMode ? 'Luyện tập' : 'Thi';
        if (currentSetIndex === null) return '';
        if (currentSetIndex === -1) return `${mode} ngẫu nhiên`;
        return `${mode} bộ đề ${currentSetIndex + 1}`;
    }, [currentSetIndex, isPracticeMode]);
    
    const currentQuestions: Question[] = useMemo(() => {
        if (currentSetIndex === null) return [];
        
        if (currentSetIndex === -1) { // Random quiz mode
            return randomQuestions; // Use the stored random questions
        }

        return allSetsData[currentSetIndex] || [];
    }, [currentSetIndex, randomQuestions]);

    const handleSubmitQuiz = useCallback((answers: UserAnswers, timeTaken: number) => {
        setSubmittedAnswers(answers);
        setCompletionTime(timeTaken);
        setView('results');
    }, []);


    const handleSelectPracticeAll = () => {
        setView('practice-all');
    };
    
    const handleSelectSearch = () => {
        setView('search');
    };

    const handleSelectTheory = () => {
        setView('theory');
    }

    const handleSelectTestBySet = () => {
        setIsPracticeMode(false);
        setView('set-select');
    };

    const handleSelectTestRandom = () => {
        setIsPracticeMode(false);
        setCurrentSetIndex(-1); 
        // Go to setup screen first
        setView('random-setup');
    };
    
    const handleStartRandomQuiz = (count: number) => {
        const shuffled = shuffleArray(allQuestions);
        const selected = shuffled.slice(0, count);
        setRandomQuestions(selected);
        setSubmittedAnswers(null);
        setView('quiz');
    };

    const handleRetryRandomQuiz = () => {
        // Reuse the existing randomQuestions
        setSubmittedAnswers(null);
        setCompletionTime(null);
        setView('quiz');
    };
    
    const handleSelectSupport = () => {
        setView('history');
    };
    
    const handleSelectSet = (setIndex: number) => {
        setCurrentSetIndex(setIndex);
        setSubmittedAnswers(null);
        setView('quiz');
    };
    
    const handleGoBackToMainMenu = () => {
        setView('mode-select');
        setCurrentSetIndex(null);
        setSubmittedAnswers(null);
        setIsPracticeMode(false);
        setCompletionTime(null);
    };

    const handleBackToSetSelector = () => {
        setView('set-select');
        setSubmittedAnswers(null);
        setCompletionTime(null);
        setCurrentSetIndex(null);
    };
    
    const handleBackToRandomSetup = () => {
        setView('random-setup');
        setSubmittedAnswers(null);
        setCompletionTime(null);
    }

    const quizTotalTime = useMemo(() => {
        if (currentSetIndex === -1) { // Random quiz
            // Calculate time based on question count: approx 45-50s per question
            const count = currentQuestions.length;
            if (count <= 10) return 10 * 60;
            if (count <= 20) return 20 * 60;
            return Math.min(count * 60, 90 * 60); // Cap at 90 mins
        }
        if (currentSetIndex !== null) { // Set quiz
            return 15 * 60; // 15 minutes
        }
        return 0;
    }, [currentSetIndex, currentQuestions.length]);


    const renderContent = () => {
        switch (view) {
            case 'theory':
                return <Theory onBack={handleGoBackToMainMenu} />;
            case 'search':
                return <Search questions={allQuestions} onBack={handleGoBackToMainMenu} />;
            case 'history':
                 return <History onBack={handleGoBackToMainMenu} />;
            case 'practice-all':
                return (
                    <PracticeAll
                        questions={allQuestions}
                        onBack={handleGoBackToMainMenu}
                    />
                );
            case 'random-setup':
                return (
                    <RandomQuizSetup 
                        totalQuestions={allQuestions.length}
                        onStart={handleStartRandomQuiz}
                        onBack={handleGoBackToMainMenu}
                    />
                );
            case 'quiz':
                const isSetQuiz = currentSetIndex !== null && currentSetIndex !== -1;
                const isRandomQuiz = currentSetIndex === -1;
                
                let onBackHandler = handleGoBackToMainMenu;
                if (isSetQuiz) onBackHandler = handleBackToSetSelector;
                if (isRandomQuiz) onBackHandler = handleBackToRandomSetup;

                return (
                    <Quiz
                        questions={currentQuestions}
                        onSubmit={handleSubmitQuiz}
                        onBack={onBackHandler}
                        setTitle={quizTitle}
                        isPracticeMode={isPracticeMode}
                        totalTime={quizTotalTime}
                    />
                );
            case 'results':
                const isSetResults = currentSetIndex !== null && currentSetIndex !== -1;
                const isRandomResults = currentSetIndex === -1;

                let onRestartHandler = handleGoBackToMainMenu;
                let restartLabel = "Về màn hình chính";
                let onRetryHandler = undefined;

                if (isSetResults) {
                    onRestartHandler = handleBackToSetSelector;
                    restartLabel = "Quay về chọn bộ đề";
                }
                if (isRandomResults) {
                    onRestartHandler = handleBackToRandomSetup;
                    restartLabel = "Quay về chọn số lượng";
                    onRetryHandler = handleRetryRandomQuiz;
                }

                return (
                    <Results
                        questions={currentQuestions}
                        userAnswers={submittedAnswers!}
                        onRestart={onRestartHandler}
                        onRetry={onRetryHandler}
                        restartLabel={restartLabel}
                        setTitle={quizTitle}
                        isPracticeMode={isPracticeMode}
                        completionTime={completionTime!}
                    />
                );
            case 'set-select':
                return (
                    <SetSelector
                        totalSets={totalSets}
                        onSelectSet={handleSelectSet}
                        onBack={handleGoBackToMainMenu}
                    />
                );
            case 'mode-select':
            default:
                return (
                    <ModeSelector
                        onSelectPracticeAll={handleSelectPracticeAll}
                        onSelectTestBySet={handleSelectTestBySet}
                        onSelectTestRandom={handleSelectTestRandom}
                        onSelectSupport={handleSelectSupport}
                        onSelectSearch={handleSelectSearch}
                        onSelectTheory={handleSelectTheory}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen font-sans flex flex-col">
            <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-slate-200">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
                    <h1 className="text-xl md:text-3xl font-bold text-center text-slate-900 tracking-tight flex-1">ÔN THI CHỨNG CHỈ ĐẤU THẦU 2025</h1>
                </div>
            </header>
            <main className="mx-auto px-4 py-4 sm:py-6 md:py-8 flex-grow w-full">
                {renderContent()}
            </main>
            <footer className="text-center p-6 text-slate-500 text-sm border-t border-slate-200 bg-white/30">
                Bản quyền thuộc về "Phạm Văn Bình - Phòng CĐVT - Công ty 790"
            </footer>

            <button
                onClick={() => setIsGuideVisible(true)}
                className="fixed bottom-6 right-6 z-20 p-3 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Hướng dẫn sử dụng"
            >
                <QuestionMarkIcon />
            </button>

            {isGuideVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4 animate-fade-in">
                    <div className="bg-slate-50 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <Guide onClose={() => setIsGuideVisible(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
