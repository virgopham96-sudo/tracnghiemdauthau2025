
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import ModeSelector from './pages/Home/ModeSelector';
import SetSelector from './pages/SetSelector/SetSelector';
import RandomQuizSetup from './pages/RandomQuizSetup/RandomQuizSetup';
import Quiz from './pages/Quiz/Quiz';
import Results from './pages/Results/Results';
import PracticeAll from './pages/PracticeAll/PracticeAll';
import History from './pages/History/History';
import Search from './pages/Search/Search';
import Theory from './pages/Theory/Theory';
import Guide from './components/Guide';
import { MockExam } from './pages/MockExam/MockExam';
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

const getUrlForState = (view: View, currentSetIndex: number | null): string => {
    switch (view) {
        case 'mode-select':
            return '/';
        case 'practice-all':
            return '/chedoluyentap';
        case 'set-select':
            return '/thitheobode';
        case 'theory':
            return '/lythuyet';
        case 'search':
            return '/tracuu';
        case 'history':
            return '/ungho';
        case 'random-setup':
            return '/thingauhien/setup';
        case 'mock-exam':
            return '/thithu';
        case 'quiz':
            if (currentSetIndex === -1) return '/thingauhien/thi';
            if (currentSetIndex === -2) return '/thithu/thi';
            if (currentSetIndex !== null) return `/thitheobode/bo-de-${currentSetIndex + 1}`;
            return '/';
        case 'results':
            if (currentSetIndex === -1) return '/ketqua?set=-1';
            if (currentSetIndex === -2) return '/ketqua?set=-2';
            if (currentSetIndex !== null) return `/ketqua?set=${currentSetIndex + 1}`;
            return '/ketqua';
        default:
            return '/';
    }
};

const initialParsedState = (() => {
    if (typeof window === 'undefined') return { view: 'mode-select' as View, currentSetIndex: null as number | null };
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    
    let view: View = 'mode-select';
    let currentSetIndex: number | null = null;
    
    if (path === '/chedoluyentap') {
        view = 'practice-all';
    } else if (path === '/thitheobode') {
        view = 'set-select';
    } else if (path === '/lythuyet') {
        view = 'theory';
    } else if (path === '/tracuu') {
        view = 'search';
    } else if (path === '/ungho') {
        view = 'history';
    } else if (path === '/thingauhien/setup') {
        view = 'random-setup';
    } else if (path === '/thingauhien/thi') {
        view = 'quiz';
        currentSetIndex = -1;
    } else if (path === '/thithu') {
        view = 'mock-exam';
        currentSetIndex = -2;
    } else if (path === '/thithu/thi') {
        view = 'quiz';
        currentSetIndex = -2;
    } else if (path.startsWith('/thitheobode/bo-de-')) {
        const parts = path.split('-');
        const setNum = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(setNum) && setNum >= 1 && setNum <= 39) {
            currentSetIndex = setNum - 1;
            view = 'quiz';
        } else {
            view = 'set-select';
        }
    } else if (path === '/ketqua') {
        view = 'results';
        const setVal = searchParams.get('set');
        if (setVal) {
            const setNum = parseInt(setVal, 10);
            if (setNum === -1) {
                currentSetIndex = -1;
            } else if (setNum === -2) {
                currentSetIndex = -2;
            } else if (!isNaN(setNum) && setNum >= 1 && setNum <= 39) {
                currentSetIndex = setNum - 1;
            }
        }
    }
    return { view, currentSetIndex };
})();

type View = 'mode-select' | 'set-select' | 'random-setup' | 'quiz' | 'results' | 'practice-all' | 'history' | 'search' | 'theory' | 'mock-exam';

function App() {
    const [view, setView] = useState<View>(initialParsedState.view);
    
    // Quiz State
    const [currentSetIndex, setCurrentSetIndex] = useState<number | null>(initialParsedState.currentSetIndex);
    const [randomQuestions, setRandomQuestions] = useState<Question[]>([]); // Store random questions for retry
    const [submittedAnswers, setSubmittedAnswers] = useState<UserAnswers | null>(null);
    const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
    const [completionTime, setCompletionTime] = useState<number | null>(null);
    const [randomQuizTitleSuffix, setRandomQuizTitleSuffix] = useState<string>('');
    
    // UI State
    const [isGuideVisible, setIsGuideVisible] = useState(false);

    const totalSets = allSetsData.length;
    const allQuestions = useMemo(() => allSetsData.flat(), []);

    // Sync state changes with the URL path
    useEffect(() => {
        const targetPath = getUrlForState(view, currentSetIndex);
        if (window.location.pathname + window.location.search !== targetPath) {
            window.history.pushState({}, '', targetPath);
        }
    }, [view, currentSetIndex]);

    // Handle back/forward navigation in the browser
    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname;
            const searchParams = new URLSearchParams(window.location.search);
            
            let newView: View = 'mode-select';
            let newSetIndex: number | null = null;
            
            if (path === '/chedoluyentap') {
                newView = 'practice-all';
            } else if (path === '/thitheobode') {
                newView = 'set-select';
            } else if (path === '/lythuyet') {
                newView = 'theory';
            } else if (path === '/tracuu') {
                newView = 'search';
            } else if (path === '/ungho') {
                newView = 'history';
            } else if (path === '/thingauhien/setup') {
                newView = 'random-setup';
            } else if (path === '/thingauhien/thi') {
                newView = 'quiz';
                newSetIndex = -1;
            } else if (path === '/thithu') {
                newView = 'mock-exam';
                newSetIndex = -2;
            } else if (path === '/thithu/thi') {
                newView = 'quiz';
                newSetIndex = -2;
            } else if (path.startsWith('/thitheobode/bo-de-')) {
                const parts = path.split('-');
                const setNum = parseInt(parts[parts.length - 1], 10);
                if (!isNaN(setNum) && setNum >= 1 && setNum <= 39) {
                    newSetIndex = setNum - 1;
                    newView = 'quiz';
                } else {
                    newView = 'set-select';
                }
            } else if (path === '/ketqua') {
                newView = 'results';
                const setVal = searchParams.get('set');
                if (setVal) {
                    const setNum = parseInt(setVal, 10);
                    if (setNum === -1) {
                        newSetIndex = -1;
                    } else if (setNum === -2) {
                        newSetIndex = -2;
                    } else if (!isNaN(setNum) && setNum >= 1 && setNum <= 39) {
                        newSetIndex = setNum - 1;
                    }
                }
            }
            
            setView(newView);
            setCurrentSetIndex(newSetIndex);
        };
        
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);
    
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
            if (randomQuestions.length === 0) {
                // If direct loading, fallback to stable questions so it doesn't crash
                const count = currentSetIndex === -2 ? 70 : 20;
                // Stably load questions based on ID sequence for safety, or simple slice
                return allQuestions.slice(0, count);
            }
            return randomQuestions; // Use the stored random questions
        }

        return allSetsData[currentSetIndex] || [];
    }, [currentSetIndex, randomQuestions, allQuestions]);

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

    const handleSelectMockExam = () => {
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
            <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-slate-200 shrink-0">
                <div className="container mx-auto px-2 sm:px-4 py-2 flex justify-between items-center relative">
                    <div className="hidden md:block md:w-24"></div>
                    <h1 className="text-[17px] sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-slate-900 tracking-tight flex-1">ÔN THI CHỨNG CHỈ ĐẤU THẦU</h1>
                    <button 
                        onClick={handleSelectSupport}
                        className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-full text-[11px] sm:text-sm font-bold shadow-sm hover:shadow transition-all justify-center shrink-0 ml-1.5 whitespace-nowrap"
                    >
                        <HeartIcon className="w-3.5 h-3.5 md:w-5 md:h-5 text-pink-500 shrink-0" />
                        <span>Ủng hộ</span>
                    </button>
                </div>
            </header>
            <main className="mx-auto px-2 md:px-4 py-2 sm:py-4 md:py-6 flex-grow w-full flex flex-col items-center justify-center">
                {renderContent()}
            </main>
            {view === 'mode-select' && (
                <footer className="text-center py-4 px-4 text-slate-500 text-xs sm:text-sm border-t border-slate-200 bg-white/30 shrink-0">
                    Bản quyền thuộc về "Phạm Văn Bình - Phòng CĐVT - Công ty 790"
                </footer>
            )}

            {view === 'mode-select' && (
                <button
                    onClick={() => setIsGuideVisible(true)}
                    className="fixed bottom-6 right-6 z-20 p-3 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Hướng dẫn sử dụng"
                >
                    <QuestionMarkIcon />
                </button>
            )}

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
