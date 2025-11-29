
import React, { useState } from 'react';
import { ShuffleIcon } from './icons';

interface RandomQuizSetupProps {
    totalQuestions: number;
    onStart: (count: number) => void;
    onBack: () => void;
}

const RandomQuizSetup: React.FC<RandomQuizSetupProps> = ({ totalQuestions, onStart, onBack }) => {
    const [questionCount, setQuestionCount] = useState<number>(70);

    const presets = [10, 20, 30, 50, 70, 100];

    const handleStart = () => {
        if (questionCount > 0 && questionCount <= totalQuestions) {
            onStart(questionCount);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
            <div className="bg-white border-2 border-slate-200 rounded-xl shadow-lg p-8 w-full">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-cyan-100 p-3 rounded-lg">
                        <ShuffleIcon className="h-8 w-8 text-cyan-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Thi ngẫu nhiên</h2>
                </div>

                <p className="text-slate-600 mb-6">
                    Hệ thống sẽ chọn ngẫu nhiên các câu hỏi từ ngân hàng {totalQuestions} câu hỏi.
                    Vui lòng chọn số lượng câu hỏi bạn muốn thi:
                </p>

                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold text-slate-700">Số lượng câu hỏi:</span>
                        <span className="font-bold text-cyan-600 text-xl">{questionCount}</span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max={Math.min(200, totalQuestions)} // Limit slider to 200 or total available
                        step="10"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                        {presets.map(preset => (
                            preset <= totalQuestions && (
                                <button
                                    key={preset}
                                    onClick={() => setQuestionCount(preset)}
                                    className={`px-3 py-1 rounded-full text-sm font-semibold border transition-all ${
                                        questionCount === preset
                                            ? 'bg-cyan-500 text-white border-cyan-500 shadow-md'
                                            : 'bg-white text-slate-600 border-slate-300 hover:border-cyan-400 hover:text-cyan-600'
                                    }`}
                                >
                                    {preset} câu
                                </button>
                            )
                        ))}
                         <button
                            onClick={() => setQuestionCount(totalQuestions)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold border transition-all ${
                                questionCount === totalQuestions
                                    ? 'bg-cyan-500 text-white border-cyan-500 shadow-md'
                                    : 'bg-white text-slate-600 border-slate-300 hover:border-cyan-400 hover:text-cyan-600'
                            }`}
                        >
                            Tất cả ({totalQuestions})
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onBack}
                        className="flex-1 py-3 px-6 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        Quay lại
                    </button>
                    <button
                        onClick={handleStart}
                        className="flex-1 py-3 px-6 rounded-lg font-bold text-white bg-cyan-500 hover:bg-cyan-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                    >
                        Bắt đầu thi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RandomQuizSetup;
