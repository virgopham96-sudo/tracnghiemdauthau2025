import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowUpIcon, ChevronRightIcon } from '../../components/icons';
import { TheoryPdfExportModal } from '../../components/TheoryPdfExportModal';
import { THEORY_DATA } from '../../data/theoryData';
import { ORIGINAL_15_THEORY_DATA } from '../../data/original15TheoryData';
import { THEORY_MARKDOWN_CONTENT } from '../../data/theoryMarkdown';

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
                    <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 px-1 rounded font-bold">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

const TopicSection = ({
    title,
    isOpen,
    onToggle,
    children
}: {
    title: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
}) => {
    return (
        <div className="mb-3 sm:mb-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm sm:shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md sm:hover:shadow-lg transition-all duration-300">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 md:p-5 text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none select-none group"
            >
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-cyan-700 dark:text-cyan-400 uppercase group-hover:text-cyan-800 dark:group-hover:text-cyan-300 flex-1 pr-3 sm:pr-4 leading-snug">
                    {title}
                </h3>
                <div className={`transform transition-transform duration-300 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 shrink-0 ${isOpen ? 'rotate-90' : ''}`}>
                    <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[8000px] opacity-100 border-t border-slate-100 dark:border-slate-800' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-3.5 sm:p-5 md:p-6 text-slate-800 dark:text-slate-200 space-y-4 leading-relaxed bg-slate-50/30 dark:bg-slate-950/30 text-xs sm:text-sm md:text-base">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Theory: React.FC<TheoryProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'markdown10' | 'structured15'>('markdown10');
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSectionId, setSelectedSectionId] = useState<string>('all');
    const [openSectionIds, setOpenSectionIds] = useState<Record<number, boolean>>({});

    const handleToggleSection = (id: number) => {
        setOpenSectionIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleExpandAll = () => {
        const allOpen: Record<number, boolean> = {};
        const dataset = activeTab === 'markdown10' ? THEORY_DATA : ORIGINAL_15_THEORY_DATA;
        dataset.forEach(sec => {
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

    // Filter for 10-part markdown structured theory
    const filtered10Parts = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return THEORY_DATA.filter(sec => {
            if (selectedSectionId !== 'all' && sec.id !== parseInt(selectedSectionId, 10)) {
                return false;
            }

            if (!term) return true;

            if (sec.title.toLowerCase().includes(term)) return true;

            return sec.parts.some(p => {
                if (p.subtitle && p.subtitle.toLowerCase().includes(term)) return true;
                if (p.content && p.content.some(c => c.toLowerCase().includes(term))) return true;
                if (p.highlightTitle && p.highlightTitle.toLowerCase().includes(term)) return true;
                if (p.highlightText) {
                    if (Array.isArray(p.highlightText)) {
                        return p.highlightText.some(t => t.toLowerCase().includes(term));
                    }
                    return p.highlightText.toLowerCase().includes(term);
                }
                return false;
            });
        });
    }, [searchTerm, selectedSectionId]);

    // Filter for 15 original theory topics
    const filtered15Topics = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return ORIGINAL_15_THEORY_DATA.filter(sec => {
            if (selectedSectionId !== 'all' && sec.id !== parseInt(selectedSectionId, 10)) {
                return false;
            }

            if (!term) return true;

            if (sec.title.toLowerCase().includes(term)) return true;
            if (sec.content.some(c => c.toLowerCase().includes(term))) return true;
            if (sec.tips && sec.tips.some(t => t.toLowerCase().includes(term))) return true;

            return false;
        });
    }, [searchTerm, selectedSectionId]);

    const isSearching = searchTerm.trim().length > 0 || selectedSectionId !== 'all';

    return (
        <div className="p-2 md:p-4 max-w-5xl mx-auto flex flex-col h-[calc(100vh-100px)] animate-fade-in relative pb-16 sm:pb-20">
            {/* Top Navigation */}
            <div className="flex items-center gap-2 mb-3 shrink-0">
                <button
                    onClick={onBack}
                    className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-1.5 px-3 md:py-2 md:px-4 rounded-full transition-colors flex items-center gap-1 md:gap-2 border border-slate-200 dark:border-slate-700 shadow-sm text-sm shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden md:inline">Quay lại</span>
                </button>
                <h2 className="text-base sm:text-lg md:text-2xl font-bold text-slate-900 dark:text-slate-100 text-center flex-1 truncate px-1">
                    Tổng hợp kiến thức Luật Đấu Thầu
                </h2>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 shrink-0">
                <a
                    href="https://drive.google.com/drive/folders/1b8yle1T_9qAfGGfIkNQLNzcPhECZzCVB?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl shadow-md transition-all hover:shadow-lg text-xs sm:text-sm md:text-base"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="text-center">TẢI XUỐNG TỔNG HỢP ĐÁP ÁN (390 CÂU)</span>
                </a>

                <button
                    onClick={() => setIsPdfModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl shadow-md transition-all hover:shadow-lg text-xs sm:text-sm md:text-base shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>LƯU LÝ THUYẾT (PDF)</span>
                </button>
            </div>

            {/* Independent Source Switcher Tabs */}
            <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl mb-3 shrink-0">
                <button
                    onClick={() => {
                        setActiveTab('markdown10');
                        setSelectedSectionId('all');
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all text-center ${
                        activeTab === 'markdown10'
                            ? 'bg-white dark:bg-slate-900 text-cyan-700 dark:text-cyan-400 shadow-md'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                    📘 Cẩm nang 10 Phần chi tiết (Nguyên vẹn file .md)
                </button>
                <button
                    onClick={() => {
                        setActiveTab('structured15');
                        setSelectedSectionId('all');
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all text-center ${
                        activeTab === 'structured15'
                            ? 'bg-white dark:bg-slate-900 text-cyan-700 dark:text-cyan-400 shadow-md'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                    📑 15 Chủ đề tổng hợp cốt lõi (Lý thuyết cũ)
                </button>
            </div>

            {/* Search & Filter Controls */}
            <div className="mb-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                        <label htmlFor="theory-part-select" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                            Lọc theo phần / chuyên đề:
                        </label>
                        <select
                            id="theory-part-select"
                            value={selectedSectionId}
                            onChange={(e) => setSelectedSectionId(e.target.value)}
                            className="w-full p-2.5 text-xs sm:text-sm font-semibold border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition cursor-pointer"
                        >
                            <option value="all">
                                {activeTab === 'markdown10' ? 'Tất cả 10 Phần chi tiết (file .md)' : 'Tất cả 15 Chủ đề lý thuyết cũ'}
                            </option>
                            {activeTab === 'markdown10'
                                ? THEORY_DATA.map((sec) => (
                                      <option key={sec.id} value={sec.id}>
                                          {sec.title}
                                      </option>
                                  ))
                                : ORIGINAL_15_THEORY_DATA.map((sec) => (
                                      <option key={sec.id} value={sec.id}>
                                          {sec.title}
                                      </option>
                                  ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label htmlFor="theory-search-input" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                            Tra cứu nội dung / từ khóa:
                        </label>
                        <div className="relative">
                            <input
                                id="theory-search-input"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Nhập từ khóa (vd: chỉ định thầu, bảo đảm dự thầu...)..."
                                className="w-full p-2.5 pr-8 text-xs sm:text-sm border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1 text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                        {activeTab === 'markdown10'
                            ? (filtered10Parts.length === THEORY_DATA.length
                                  ? `Hiển thị đầy đủ 10 phần lý thuyết`
                                  : `Tìm thấy ${filtered10Parts.length} / 10 phần phù hợp`)
                            : (filtered15Topics.length === ORIGINAL_15_THEORY_DATA.length
                                  ? `Hiển thị đầy đủ 15 chủ đề lý thuyết cũ`
                                  : `Tìm thấy ${filtered15Topics.length} / 15 chủ đề phù hợp`)}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleExpandAll}
                            className="text-cyan-600 dark:text-cyan-400 hover:underline font-bold text-xs"
                        >
                            Mở tất cả
                        </button>
                        <span className="text-slate-300 dark:text-slate-700">|</span>
                        <button
                            onClick={handleCollapseAll}
                            className="text-slate-500 dark:text-slate-400 hover:underline font-medium text-xs"
                        >
                            Thu gọn
                        </button>
                    </div>
                </div>
            </div>

            {/* TAB 1: 10 PART MARKDOWN CONTENT */}
            {activeTab === 'markdown10' && (
                <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                    {filtered10Parts.length === 0 ? (
                        <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
                            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                                Không tìm thấy nội dung lý thuyết nào phù hợp với từ khóa của bạn.
                            </p>
                        </div>
                    ) : (
                        filtered10Parts.map((section) => {
                            const isOpen = isSearching || !!openSectionIds[section.id];
                            return (
                                <TopicSection
                                    key={section.id}
                                    title={highlightText(section.title, searchTerm)}
                                    isOpen={isOpen}
                                    onToggle={() => handleToggleSection(section.id)}
                                >
                                    {section.parts.map((part, idx) => (
                                        <div key={idx} className="space-y-2">
                                            {part.subtitle && (
                                                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base border-b border-slate-200 dark:border-slate-800 pb-1 mt-1">
                                                    {highlightText(part.subtitle, searchTerm)}
                                                </h4>
                                            )}

                                            {part.content && part.content.length > 0 && (
                                                part.listType === 'decimal' ? (
                                                    <ol className="list-decimal pl-5 space-y-1.5 text-slate-800 dark:text-slate-200">
                                                        {part.content.map((item, i) => (
                                                            <li key={i}>{highlightText(item, searchTerm)}</li>
                                                        ))}
                                                    </ol>
                                                ) : (
                                                    <ul className="list-disc pl-5 space-y-1.5 text-slate-800 dark:text-slate-200">
                                                        {part.content.map((item, i) => (
                                                            <li key={i}>{highlightText(item, searchTerm)}</li>
                                                        ))}
                                                    </ul>
                                                )
                                            )}

                                            {part.highlightTitle && (
                                                <div className="bg-yellow-50 dark:bg-yellow-950/40 border-l-4 border-yellow-400 dark:border-yellow-600 p-3 lg:p-4 my-2 rounded-r-lg">
                                                    <p className="font-bold text-yellow-800 dark:text-yellow-300 mb-1 text-xs sm:text-sm md:text-base">
                                                        {highlightText(part.highlightTitle, searchTerm)}
                                                    </p>
                                                    <div className="text-slate-800 dark:text-slate-200 italic text-xs sm:text-sm md:text-base">
                                                        {Array.isArray(part.highlightText) ? (
                                                            <ul className="list-disc pl-5 space-y-1">
                                                                {part.highlightText.map((ht, hIdx) => (
                                                                    <li key={hIdx}>{highlightText(ht, searchTerm)}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p>{highlightText(part.highlightText || '', searchTerm)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </TopicSection>
                            );
                        })
                    )}
                </div>
            )}

            {/* TAB 2: 15 ORIGINAL THEORY TOPICS */}
            {activeTab === 'structured15' && (
                <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                    {filtered15Topics.length === 0 ? (
                        <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
                            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                                Không tìm thấy chủ đề nào phù hợp với từ khóa của bạn.
                            </p>
                        </div>
                    ) : (
                        filtered15Topics.map((topic) => {
                            const isOpen = isSearching || !!openSectionIds[topic.id];
                            return (
                                <TopicSection
                                    key={topic.id}
                                    title={highlightText(topic.title, searchTerm)}
                                    isOpen={isOpen}
                                    onToggle={() => handleToggleSection(topic.id)}
                                >
                                    <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200">
                                        {topic.content.map((item, i) => (
                                            <li key={i}>{highlightText(item, searchTerm)}</li>
                                        ))}
                                    </ul>

                                    {topic.tips && topic.tips.length > 0 && (
                                        <div className="bg-yellow-50 dark:bg-yellow-950/40 border-l-4 border-yellow-400 dark:border-yellow-600 p-3 my-2 rounded-r-lg">
                                            <p className="font-bold text-yellow-800 dark:text-yellow-300 mb-1 text-xs sm:text-sm">
                                                💡 Mẹo nhớ nhanh:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm italic text-slate-800 dark:text-slate-200">
                                                {topic.tips.map((tip, idx) => (
                                                    <li key={idx}>{highlightText(tip, searchTerm)}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </TopicSection>
                            );
                        })
                    )}
                </div>
            )}

            <button
                onClick={handleScrollToTop}
                className="fixed bottom-8 right-4 md:right-8 z-20 p-3 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 animate-fade-in"
                aria-label="Lên đầu trang"
            >
                <ArrowUpIcon />
            </button>

            <TheoryPdfExportModal
                isOpen={isPdfModalOpen}
                onClose={() => setIsPdfModalOpen(false)}
            />
        </div>
    );
};

export default Theory;
