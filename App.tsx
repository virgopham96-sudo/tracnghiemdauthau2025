
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
import { MockExam } from './components/MockExam';
import { QuestionMarkIcon, HeartIcon } from './components/icons';
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

const EXTERNAL_LINKS = [
    'https://s.shopee.vn/6VIeZ9Vn1n',
    'https://s.shopee.vn/2VmZHaVqUC',
    'https://s.shopee.vn/1gDSI9xCOB',
    'https://s.shopee.vn/4fr3rkEgYc',
    'https://s.shopee.vn/7AYOqQU1n0',
    'https://s.shopee.vn/20qIgzGjW6'
];

const openRandomLink = () => {
    const randomIndex = Math.floor(Math.random() * EXTERNAL_LINKS.length);
    const url = EXTERNAL_LINKS[randomIndex];
    
    // Create a temporary anchor element to bypass some popup blockers
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

type View = 'mode-select' | 'set-select' | 'random-setup' | 'quiz' | 'results' | 'practice-all' | 'history' | 'search' | 'theory' | 'mock-exam';

function App() {
    const [view, setView] = useState<View>('mode-select');
    
    // Quiz State
    const [currentSetIndex, setCurrentSetIndex] = useState<number | null>(null);
    const [randomQuestions, setRandomQuestions] = useState<Question[]>([]); // Store random questions for retry
    const [submittedAnswers, setSubmittedAnswers] = useState<UserAnswers | null>(null);
    const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
    const [completionTime, setCompletionTime] = useState<number | null>(null);
    const [randomQuizTitleSuffix, setRandomQuizTitleSuffix] = useState<string>('');
    
    // UI State
    const [isGuideVisible, setIsGuideVisible] = useState(false);

    const totalSets = allSetsData.length;
    const allQuestions = useMemo(() => allSetsData.flat(), []);
    
    const quizTitle = useMemo(() => {
        const mode = isPracticeMode ? 'Luyện tập' : 'Thi';
        if (currentSetIndex === null) return '';
        if (currentSetIndex === -2) return 'Luyện tập thi như thật';
        if (currentSetIndex === -1) return `${mode} ngẫu nhiên${randomQuizTitleSuffix}`;
        return `${mode} bộ đề ${currentSetIndex + 1}`;
    }, [currentSetIndex, isPracticeMode, randomQuizTitleSuffix]);
    
    const currentQuestions: Question[] = useMemo(() => {
        if (currentSetIndex === null) return [];
        
        if (currentSetIndex === -1 || currentSetIndex === -2) { // Random quiz mode and Mock Exam
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
        openRandomLink();
        setIsPracticeMode(false);
        setView('set-select');
    };

    const handleSelectTestRandom = () => {
        openRandomLink();
        setIsPracticeMode(false);
        setCurrentSetIndex(-1); 
        // Go to setup screen first
        setView('random-setup');
    };

    const handleSelectMockExam = () => {
        openRandomLink();
        // 70 random questions from all 390
        const count = 70;
        const shuffled = shuffleArray([...allQuestions]);
        const selected = shuffled.slice(0, count);
        
        setRandomQuestions(selected);
        setSubmittedAnswers(null);
        setCurrentSetIndex(-2); // -2 denotes mock exam
        setIsPracticeMode(false);
        setView('mock-exam');
    };
    
    const handleStartRandomQuiz = (count: number, limit: number) => {
        // Slice the allQuestions array based on the limit (e.g., 340 or 390)
        // Since questions are ordered by ID/Sets, slicing the first X items works.
        const sourceQuestions = allQuestions.slice(0, limit);
        const shuffled = shuffleArray(sourceQuestions);
        const selected = shuffled.slice(0, count);
        
        setRandomQuestions(selected);
        setSubmittedAnswers(null);
        setRandomQuizTitleSuffix(limit === 340 ? ' (Bộ đề cũ)' : '');
        setView('quiz');
    };

    const handleRetryRandomQuiz = () => {
        // Reuse the existing randomQuestions
        setSubmittedAnswers(null);
        setCompletionTime(null);
        if (currentSetIndex === -2) {
            setView('mock-exam');
        } else {
            setView('quiz');
        }
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
        setRandomQuizTitleSuffix('');
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
        if (currentSetIndex === -2) { // Mock exam
            return 60 * 60; // 60 minutes
        }
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
            case 'mock-exam':
                 return (
                     <MockExam
                        questions={currentQuestions}
                        onSubmit={handleSubmitQuiz}
                        onBack={handleGoBackToMainMenu}
                     />
                 );
            case 'quiz':
                const isSetQuiz = currentSetIndex !== null && currentSetIndex !== -1 && currentSetIndex !== -2;
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
                const isSetResults = currentSetIndex !== null && currentSetIndex !== -1 && currentSetIndex !== -2;
                const isRandomResults = currentSetIndex === -1 || currentSetIndex === -2;

                let onRestartHandler = handleGoBackToMainMenu;
                let restartLabel = "Về màn hình chính";
                let onRetryHandler = undefined;

                if (isSetResults) {
                    onRestartHandler = handleBackToSetSelector;
                    restartLabel = "Quay về chọn bộ đề";
                }
                if (isRandomResults) {
                    if (currentSetIndex === -1) {
                         onRestartHandler = handleBackToRandomSetup;
                         restartLabel = "Quay về chọn số lượng";
                    }
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
                        onSelectMockExam={handleSelectMockExam}
                        onSelectTestRandom={handleSelectTestRandom}
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
                    <div className="hidden md:block md:w-32"></div>
                    <h1 className="text-xl md:text-3xl font-bold text-center text-slate-900 tracking-tight flex-1">ÔN THI CHỨNG CHỈ ĐẤU THẦU</h1>
                    <button 
                        onClick={handleSelectSupport}
                        className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full text-xs md:text-sm font-bold shadow-sm hover:shadow transition-all md:w-32 justify-center"
                    >
                        <HeartIcon className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="hidden md:inline">Ủng hộ</span>
                        <span className="md:hidden">Ủng hộ</span>
                    </button>
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
