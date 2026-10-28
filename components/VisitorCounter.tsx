import React, { useEffect, useState } from 'react';
import { EyeIcon, ChartBarIcon } from './icons';
import { recordAndFetchVisitorCount, getCachedVisitorStats, VisitorStats } from '../services/visitorCounter';

interface VisitorCounterProps {
    variant?: 'footer' | 'card' | 'badge';
    className?: string;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ variant = 'footer', className = '' }) => {
    const [stats, setStats] = useState<VisitorStats>(() => getCachedVisitorStats());

    useEffect(() => {
        let isMounted = true;
        recordAndFetchVisitorCount().then((newStats) => {
            if (isMounted) {
                setStats(newStats);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const formattedTotal = stats.total.toLocaleString('vi-VN');
    const formattedToday = stats.today.toLocaleString('vi-VN');

    if (variant === 'card') {
        return (
            <div className={`w-full max-w-xl mx-auto mt-6 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-cyan-50/40 to-slate-50 dark:from-slate-800/60 dark:via-cyan-950/20 dark:to-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-700 dark:text-slate-300 ${className}`}>
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 shrink-0">
                        <ChartBarIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                            Thống kê trang web
                        </span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                Tổng số lượt truy cập:
                            </span>
                            <span className="text-base font-extrabold text-cyan-600 dark:text-cyan-400">
                                {formattedTotal}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs text-xs font-medium text-slate-600 dark:text-slate-300">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Hôm nay: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{formattedToday}</strong></span>
                </div>
            </div>
        );
    }

    if (variant === 'badge') {
        return (
            <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 ${className}`}
                title={`Tổng: ${formattedTotal} lượt truy cập (Hôm nay: ${formattedToday})`}
            >
                <EyeIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{formattedTotal} lượt truy cập</span>
            </span>
        );
    }

    // Default 'footer' variant
    return (
        <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 shadow-2xs transition-all ${className}`}
            title={`Tổng số lượt truy cập kể từ khi trang web hoạt động: ${formattedTotal} (Hôm nay: ${formattedToday})`}
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <EyeIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>Lượt truy cập:</span>
            <span className="font-bold text-cyan-700 dark:text-cyan-300">{formattedTotal}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-slate-500 dark:text-slate-400">Hôm nay: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formattedToday}</span></span>
        </div>
    );
};

export default VisitorCounter;
