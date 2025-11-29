
import React, { useEffect, useState } from 'react';
import { QuizResult } from '../types';
import { TrophyIcon, ClockIcon, ClipboardListIcon, ChevronLeftIcon } from './icons';

interface UserHistoryProps {
    currentUser: string;
    onBack: () => void;
}

const UserHistory: React.FC<UserHistoryProps> = ({ currentUser, onBack }) => {
    const [history, setHistory] = useState<QuizResult[]>([]);

    useEffect(() => {
        const storageKey = `quiz_history_${currentUser}`;
        const data = localStorage.getItem(storageKey);
        if (data) {
            try {
                const parsed = JSON.parse(data);
                setHistory(parsed);
            } catch (e) {
                console.error("Error parsing history", e);
            }
        }
    }, [currentUser]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="bg-white hover:bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-full transition-colors flex items-center gap-2 border border-slate-200 shadow-sm"
                >
                    <ChevronLeftIcon />
                    Quay lại
                </button>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center flex-1">
                    Lịch sử thi của {currentUser}
                </h2>
            </div>

            {history.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-slate-200">
                    <p className="text-slate-500 text-lg">Bạn chưa có lịch sử thi nào.</p>
                    <p className="text-slate-400 mt-2">Hãy bắt đầu làm bài thi để ghi nhận kết quả!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((result) => (
                        <div key={result.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-bold uppercase rounded-full">
                                            {result.mode}
                                        </span>
                                        <span className="text-slate-400 text-sm">
                                            {formatDate(result.date)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6 text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <TrophyIcon className="h-5 w-5 text-yellow-500" />
                                            <span className="font-bold">
                                                {result.score}/{result.totalQuestions}
                                            </span>
                                            <span className="text-sm text-slate-500">Câu đúng</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="h-5 w-5 text-blue-500" />
                                            <span>{formatTime(result.timeTaken)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xs text-slate-500 uppercase font-semibold">Điểm số</span>
                                    <span className={`text-3xl font-bold ${result.score / result.totalQuestions >= 0.8 ? 'text-green-500' : (result.score / result.totalQuestions >= 0.5 ? 'text-yellow-500' : 'text-red-500')}`}>
                                        {Math.round((result.score / result.totalQuestions) * 100)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserHistory;
