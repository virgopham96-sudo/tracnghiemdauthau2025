import React, { useState, useMemo } from 'react';
import { ArrowUpIcon, ChevronRightIcon } from '../../components/icons';
import { TheoryPdfExportModal } from '../../components/TheoryPdfExportModal';
import { THEORY_DATA, LEGAL_FOUNDATION, TheorySection } from '../../data/theoryData';

interface TheoryProps {
    onBack: () => void;
}

const highlightText = (text: string, highlight: string): React.ReactNode => {
    if (!highlight.trim()) {
        return text;
    }
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-amber-200 dark:bg-amber-800 text-amber-950 dark:text-amber-100 px-1 rounded font-bold">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

const TopicSection: React.FC<{
    title: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="mb-3 sm:mb-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all duration-200">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors focus:outline-none select-none group cursor-pointer"
            >
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-sky-700 dark:text-sky-400 uppercase group-hover:text-sky-800 dark:group-hover:text-sky-300 flex-1 pr-3 sm:pr-4 leading-snug">
                    {title}
                </h3>
                <div className={`transform transition-transform duration-300 text-slate-400 dark:text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 shrink-0 ${isOpen ? 'rotate-90' : ''}`}>
                    <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[8000px] opacity-100 border-t border-slate-100 dark:border-slate-800' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="p-4 sm:p-6 text-slate-800 dark:text-slate-200 space-y-4 leading-relaxed bg-slate-50/40 dark:bg-slate-950/30 text-xs sm:text-sm md:text-base">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Theory: React.FC<TheoryProps> = ({ onBack }) => {
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSectionId, setSelectedSectionId] = useState<string>('all');
    const [openSectionIds, setOpenSectionIds] = useState<Record<number, boolean>>(() => {
        // Default: Open the first 3 sections
        return { 1: true, 2: true, 10: true };
    });

    const handleToggleSection = (id: number) => {
        setOpenSectionIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleExpandAll = () => {
        const allOpen: Record<number, boolean> = {};
        THEORY_DATA.forEach(sec => {
            allOpen[sec.id] = true;
        });
        setOpenSectionIds(allOpen);
    };

    const handleCollapseAll = () => {
        setOpenSectionIds({});
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Filter 10 Chuyên đề based on search & category
    const filteredSections = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return THEORY_DATA.filter(sec => {
            if (selectedSectionId !== 'all' && sec.id !== parseInt(selectedSectionId, 10)) {
                return false;
            }

            if (!term) return true;

            if (sec.title.toLowerCase().includes(term)) return true;
            if (sec.tip && sec.tip.toLowerCase().includes(term)) return true;

            if (sec.parts.some(p => {
                if (p.subtitle && p.subtitle.toLowerCase().includes(term)) return true;
                if (p.content && p.content.some(c => c.toLowerCase().includes(term))) return true;
                return false;
            })) {
                return true;
            }

            if (sec.comparisonTable && sec.comparisonTable.some(row => {
                return (
                    row.content.toLowerCase().includes(term) ||
                    row.oldRule.toLowerCase().includes(term) ||
                    row.newRule.toLowerCase().includes(term)
                );
            })) {
                return true;
            }

            return false;
        });
    }, [searchTerm, selectedSectionId]);

    const isSearching = searchTerm.trim().length > 0;

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col animate-fade-in pb-16 sm:pb-20">
            {/* Top Navigation */}
            <div className="flex items-center gap-2 mb-4 shrink-0">
                <button
                    onClick={onBack}
                    className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-3.5 sm:px-4 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 shadow-sm text-xs sm:text-sm shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Quay lại</span>
                </button>
                <div className="flex-1 text-center px-2">
                    <h2 className="text-base sm:text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                        TỔNG HỢP KIẾN THỨC LUẬT ĐẤU THẦU
                    </h2>
                    <p className="text-xs sm:text-sm text-sky-700 dark:text-sky-400 font-semibold mt-0.5">
                        Cập nhật mới nhất năm 2026 – Hệ thống lý thuyết & Mẹo giải đề thi
                    </p>
                </div>
            </div>

            {/* Action Buttons: Direct PDF Download & Modal Export */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-4">
                <a
                    href="/assets/aistudio/tong-hop-kien-thuc-luat-dau-thau-cap-nhat-2026_84be44bb.pdf"
                    download="tong-hop-kien-thuc-luat-dau-thau-cap-nhat-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all text-xs sm:text-sm md:text-base text-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>TẢI XUỐNG TÀI LIỆU PDF CHUẨN (CẬP NHẬT 2026)</span>
                </a>

                <button
                    onClick={() => setIsPdfModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm transition-all text-xs sm:text-sm md:text-base shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>IN / LƯU PDF TÙY CHỌN</span>
                </button>
            </div>

            {/* Căn cứ pháp lý nền tảng */}
            <div className="mb-4 bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-sky-950/40 p-4 sm:p-5 rounded-2xl border border-sky-200/80 dark:border-sky-900/50 shadow-sm">
                <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-base sm:text-lg">📌</span>
                    <h3 className="font-bold text-xs sm:text-sm md:text-base text-sky-900 dark:text-sky-300 uppercase tracking-wide">
                        Căn cứ pháp lý nền tảng cập nhật năm 2026:
                    </h3>
                </div>
                <ul className="space-y-1.5 pl-5 list-disc text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {LEGAL_FOUNDATION.map((item, idx) => (
                        <li key={idx}>
                            <span className="font-medium text-slate-900 dark:text-slate-100">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Search & Topic Filters */}
            <div className="mb-4 bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="flex-1">
                        <label htmlFor="theory-part-select" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                            Lọc theo Chuyên đề:
                        </label>
                        <select
                            id="theory-part-select"
                            value={selectedSectionId}
                            onChange={(e) => setSelectedSectionId(e.target.value)}
                            className="w-full p-2.5 text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition cursor-pointer"
                        >
                            <option value="all">Tất cả 10 Chuyên đề cập nhật mới nhất</option>
                            {THEORY_DATA.map((sec) => (
                                <option key={sec.id} value={sec.id}>
                                    {sec.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label htmlFor="theory-search-input" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                            Tìm kiếm nhanh từ khóa:
                        </label>
                        <div className="relative">
                            <input
                                id="theory-search-input"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Nhập từ khóa (vd: hạn mức, 01 tỷ, chỉ định thầu, bảo hành...)"
                                className="w-full p-2.5 pl-9 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status Bar & Expand/Collapse All */}
                <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                        Hiển thị <strong className="text-slate-800 dark:text-slate-100">{filteredSections.length}</strong> / 10 chuyên đề
                        {isSearching && ` (đang lọc theo "${searchTerm}")`}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleExpandAll}
                            className="text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-200 font-semibold px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200/60 dark:border-sky-900/50 transition-colors"
                        >
                            Mở tất cả
                        </button>
                        <button
                            onClick={handleCollapseAll}
                            className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors"
                        >
                            Thu gọn
                        </button>
                    </div>
                </div>
            </div>

            {/* List of 10 Chuyên đề */}
            {filteredSections.length > 0 ? (
                <div className="space-y-3">
                    {filteredSections.map((sec) => {
                        const isOpen = isSearching || !!openSectionIds[sec.id];

                        return (
                            <TopicSection
                                key={sec.id}
                                title={highlightText(sec.title, searchTerm)}
                                isOpen={isOpen}
                                onToggle={() => handleToggleSection(sec.id)}
                            >
                                {/* Regular Subsections */}
                                {sec.parts.map((part, pIdx) => (
                                    <div key={pIdx} className="space-y-2 pb-2">
                                        {part.subtitle && (
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base md:text-lg border-l-4 border-sky-500 pl-3 py-0.5">
                                                {highlightText(part.subtitle, searchTerm)}
                                            </h4>
                                        )}
                                        {part.content && part.content.length > 0 && (
                                            <ul className="space-y-2 pl-4 list-disc text-slate-700 dark:text-slate-200 text-xs sm:text-sm md:text-base">
                                                {part.content.map((bullet, bIdx) => (
                                                    <li key={bIdx} className="leading-relaxed">
                                                        {highlightText(bullet, searchTerm)}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}

                                {/* Chuyên đề 10 Comparison Table */}
                                {sec.comparisonTable && sec.comparisonTable.length > 0 && (
                                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm my-3">
                                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                            <thead>
                                                <tr className="bg-sky-100/80 dark:bg-sky-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 font-bold">
                                                    <th className="p-3 sm:p-3.5 w-2/5">Nội dung quy định</th>
                                                    <th className="p-3 sm:p-3.5 w-1/4 text-red-700 dark:text-red-400 bg-red-50/50 dark:bg-red-950/30">
                                                        Quy định Cũ (Dễ nhầm)
                                                    </th>
                                                    <th className="p-3 sm:p-3.5 w-2/5 text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30">
                                                        Quy định Đúng Mới Nhất (2026)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                                                {sec.comparisonTable.map((row, rIdx) => (
                                                    <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="p-3 sm:p-3.5 font-semibold text-slate-900 dark:text-slate-100 align-top">
                                                            {highlightText(row.content, searchTerm)}
                                                        </td>
                                                        <td className="p-3 sm:p-3.5 text-red-600 dark:text-red-400 bg-red-50/30 dark:bg-red-950/10 align-top font-medium line-through">
                                                            {highlightText(row.oldRule, searchTerm)}
                                                        </td>
                                                        <td className="p-3 sm:p-3.5 text-emerald-700 dark:text-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/10 align-top font-bold">
                                                            {highlightText(row.newRule, searchTerm)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Mẹo làm bài & Né bẫy đề thi Callout Box */}
                                {sec.tip && (
                                    <div className="mt-3 p-3.5 sm:p-4.5 bg-gradient-to-r from-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:to-slate-900 rounded-xl border border-amber-300/80 dark:border-amber-800/80 text-amber-950 dark:text-amber-200 shadow-xs">
                                        <div className="flex items-start gap-2.5">
                                            <span className="text-lg sm:text-xl shrink-0">💡</span>
                                            <div>
                                                <h4 className="font-extrabold text-xs sm:text-sm text-amber-900 dark:text-amber-300 uppercase tracking-wide mb-1">
                                                    Mẹo làm bài & Né bẫy đề thi:
                                                </h4>
                                                <p className="text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                                                    {highlightText(sec.tip.replace(/^Nguồn vốn công|Bộ 3 số|Ghi nhớ:|Cấm yêu cầu|Bảo đảm|Gói thầu|Kiến nghị|Thay thế|Hướng dẫn/, (m) => m), searchTerm)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TopicSection>
                        );
                    })}
                </div>
            ) : (
                <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-base text-slate-500 dark:text-slate-400">
                        Không tìm thấy chuyên đề hoặc nội dung nào khớp với từ khóa "{searchTerm}".
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedSectionId('all');
                        }}
                        className="mt-3 text-sky-600 dark:text-sky-400 hover:underline font-bold text-sm"
                    >
                        Xóa bộ lọc để xem toàn bộ 10 chuyên đề
                    </button>
                </div>
            )}

            {/* Scroll to top button */}
            <button
                onClick={handleScrollToTop}
                className="fixed bottom-8 right-4 md:right-8 z-20 p-2.5 sm:p-3 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Lên đầu trang"
            >
                <ArrowUpIcon />
            </button>

            {/* Print / PDF Export Modal */}
            <TheoryPdfExportModal
                isOpen={isPdfModalOpen}
                onClose={() => setIsPdfModalOpen(false)}
            />
        </div>
    );
};

export default Theory;
