import React, { useState, useRef } from 'react';
import { Question } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PdfExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    questionsToExport: Question[];
    totalQuestionsCount: number;
    allQuestions: Question[];
    searchTerm: string;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
    isOpen,
    onClose,
    questionsToExport,
    totalQuestionsCount,
    allQuestions,
    searchTerm,
}) => {
    const [exportScope, setExportScope] = useState<'filtered' | 'all'>('filtered');
    const [includeExplanations, setIncludeExplanations] = useState<boolean>(true);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [progressText, setProgressText] = useState<string>('');

    const hiddenRenderRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    const targetQuestions = exportScope === 'all' ? allQuestions : questionsToExport;

    const handleDownloadPdf = async () => {
        if (!hiddenRenderRef.current || targetQuestions.length === 0) return;

        try {
            setIsGenerating(true);
            setProgress(5);
            setProgressText('Đang chuẩn bị dữ liệu...');

            // Wait a tick for hidden DOM to render cleanly
            await new Promise((res) => setTimeout(res, 300));

            const container = hiddenRenderRef.current;
            const pageElements = Array.from(container.querySelectorAll('.pdf-page')) as HTMLElement[];

            if (pageElements.length === 0) {
                throw new Error('Không tìm thấy trang để xuất.');
            }

            // Create A4 portrait jsPDF instance
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
            const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

            for (let i = 0; i < pageElements.length; i++) {
                const pageEl = pageElements[i];
                const pct = Math.round(((i + 1) / pageElements.length) * 90);
                setProgress(pct);
                setProgressText(`Đang xử lý trang ${i + 1} / ${pageElements.length}...`);

                // Use html2canvas to capture page
                const canvas = await html2canvas(pageEl, {
                    scale: 1.5,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.95);

                if (i > 0) {
                    pdf.addPage('a4', 'portrait');
                }

                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            }

            setProgress(98);
            setProgressText('Đang hoàn tất và tải file...');

            const filename = `Cau_hoi_Luat_Dau_Thau_${new Date().toISOString().slice(0, 10)}.pdf`;
            pdf.save(filename);

            setProgress(100);
            setTimeout(() => {
                setIsGenerating(false);
                onClose();
            }, 600);
        } catch (err) {
            console.error('Lỗi khi tạo PDF:', err);
            alert('Có lỗi xảy ra trong quá trình tạo file PDF. Vui lòng thử lại hoặc sử dụng tính năng In trực tiếp.');
            setIsGenerating(false);
        }
    };

    const handlePrintBrowser = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Trình duyệt đã chặn cửa sổ bật lên. Vui lòng cho phép popup để in/lưu PDF.');
            return;
        }

        const questionsHtml = targetQuestions
            .map(
                (q, idx) => `
            <div style="margin-bottom: 20px; padding: 16px; border: 1px solid #cbd5e1; border-radius: 8px; background-color: #ffffff; page-break-inside: avoid;">
                <div style="font-weight: bold; font-size: 15px; color: #0f172a; margin-bottom: 12px; line-height: 1.4;">
                    <span style="color: #0284c7; margin-right: 6px;">Câu ${q.id}:</span> ${q.question}
                </div>
                <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 6px;">
                    ${Object.entries(q.options)
                        .map(([key, val]) => {
                            const isCorrect = key === q.correctAnswer;
                            return `
                            <div style="padding: 8px 12px; border-radius: 6px; border: 1px solid ${isCorrect ? '#16a34a' : '#e2e8f0'}; background-color: ${isCorrect ? '#f0fdf4' : '#f8fafc'}; font-size: 13px; color: #1e293b; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong style="color: ${isCorrect ? '#15803d' : '#334155'}; margin-right: 6px;">${key}.</strong>
                                    <span>${val}</span>
                                </div>
                                ${isCorrect ? '<span style="background-color: #16a34a; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">ĐÁP ÁN ĐÚNG</span>' : ''}
                            </div>
                        `;
                        })
                        .join('')}
                </div>
                ${
                    includeExplanations && q.explanation
                        ? `
                <div style="padding: 10px 14px; background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0; font-size: 13px; color: #0f172a; margin-top: 10px;">
                    <div style="font-weight: bold; color: #0369a1; margin-bottom: 4px; font-size: 12px;">LÝ GIẢI / GỢI Ý (CÂU ${q.id}-${q.correctAnswer}):</div>
                    <div style="line-height: 1.5; white-space: pre-wrap;">${q.explanation}</div>
                </div>
                `
                        : ''
                }
            </div>
        `
            )
            .join('');

        const dateStr = new Date().toLocaleDateString('vi-VN');

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Ngân hàng câu hỏi Luật Đấu Thầu - ${dateStr}</title>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 20px;
                        color: #0f172a;
                        background: #ffffff;
                        line-height: 1.5;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 24px;
                        padding-bottom: 16px;
                        border-bottom: 2px solid #0284c7;
                    }
                    .header h1 {
                        margin: 0 0 6px 0;
                        color: #0284c7;
                        font-size: 22px;
                    }
                    .header p {
                        margin: 0;
                        color: #64748b;
                        font-size: 13px;
                    }
                    @media print {
                        body { padding: 0; }
                        @page { margin: 15mm; size: A4; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>TỔNG HỢP CÂU HỎI TRẮC NGHIỆM LUẬT ĐẤU THẦU</h1>
                    <p>Số lượng: ${targetQuestions.length} câu hỏi | Ngày xuất: ${dateStr}${searchTerm ? ` | Từ khoá: "${searchTerm}"` : ''}</p>
                </div>
                ${questionsHtml}
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        setTimeout(() => {
            printWindow.print();
        }, 500);
    };

    // Calculate pagination for PDF canvas rendering
    const QUESTIONS_PER_PAGE = 3;
    const pagesCount = Math.ceil(targetQuestions.length / QUESTIONS_PER_PAGE);
    const pagesArray = Array.from({ length: pagesCount }, (_, i) =>
        targetQuestions.slice(i * QUESTIONS_PER_PAGE, (i + 1) * QUESTIONS_PER_PAGE)
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-6 text-slate-900 dark:text-slate-100 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Lưu toàn bộ câu hỏi dạng PDF</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Xuất file PDF câu hỏi kèm đáp án và lý giải chi tiết</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isGenerating}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    {/* Scope Selector */}
                    <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                            Phạm vi xuất câu hỏi:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setExportScope('filtered')}
                                className={`p-3 rounded-xl border text-left text-sm font-semibold transition-all ${
                                    exportScope === 'filtered'
                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 ring-2 ring-cyan-200 dark:ring-cyan-900'
                                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                <div className="font-bold">Danh sách đang lọc</div>
                                <div className="text-xs opacity-80 mt-0.5">{questionsToExport.length} câu hỏi</div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setExportScope('all')}
                                className={`p-3 rounded-xl border text-left text-sm font-semibold transition-all ${
                                    exportScope === 'all'
                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 ring-2 ring-cyan-200 dark:ring-cyan-900'
                                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                <div className="font-bold">Toàn bộ ngân hàng câu hỏi</div>
                                <div className="text-xs opacity-80 mt-0.5">{allQuestions.length} câu hỏi</div>
                            </button>
                        </div>
                    </div>

                    {/* Explanations Toggle */}
                    <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={includeExplanations}
                            onChange={(e) => setIncludeExplanations(e.target.checked)}
                            className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500 border-slate-300"
                        />
                        <div className="text-sm">
                            <span className="font-bold">Bao gồm đáp án và gợi ý/lý giải chi tiết</span>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Đánh dấu đáp án đúng màu xanh và kèm khung giải thích</p>
                        </div>
                    </label>

                    {/* Progress Bar */}
                    {isGenerating && (
                        <div className="p-4 bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-900 rounded-xl space-y-2 animate-pulse">
                            <div className="flex justify-between text-xs font-bold text-cyan-700 dark:text-cyan-300">
                                <span>{progressText}</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-cyan-200 dark:bg-cyan-900 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                        type="button"
                        onClick={handleDownloadPdf}
                        disabled={isGenerating || targetQuestions.length === 0}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Tải file PDF ({targetQuestions.length} câu)
                    </button>

                    <button
                        type="button"
                        onClick={handlePrintBrowser}
                        disabled={isGenerating || targetQuestions.length === 0}
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm border border-slate-200 dark:border-slate-700 disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        In / Lưu PDF
                    </button>
                </div>

                {/* Hidden Render Template for html2canvas */}
                <div
                    style={{
                        position: 'fixed',
                        top: '-10000px',
                        left: '-10000px',
                        width: '794px', // Standard A4 width @ 96dpi
                        zIndex: -9999,
                        pointerEvents: 'none',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <div ref={hiddenRenderRef}>
                        {pagesArray.map((pageQuestions, pageIdx) => (
                            <div
                                key={pageIdx}
                                className="pdf-page bg-white text-slate-900 p-8"
                                style={{
                                    width: '794px',
                                    height: '1123px', // A4 aspect ratio height
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justify: 'space-between',
                                    fontFamily: 'Arial, sans-serif',
                                }}
                            >
                                <div>
                                    {/* Header on every page */}
                                    <div className="border-b-2 border-cyan-600 pb-3 mb-5 flex items-center justify-between">
                                        <div>
                                            <h1 className="text-xl font-bold text-cyan-700 tracking-tight uppercase">
                                                NỘI DUNG CÂU HỎI & LÝ GIẢI - LUẬT ĐẤU THẦU
                                            </h1>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Tổng hợp {targetQuestions.length} câu hỏi trắc nghiệm kèm giải thích chuẩn xác
                                            </p>
                                        </div>
                                        <div className="text-right text-xs text-slate-400">
                                            <div>Trang {pageIdx + 1} / {pagesCount}</div>
                                            <div>{new Date().toLocaleDateString('vi-VN')}</div>
                                        </div>
                                    </div>

                                    {/* Questions */}
                                    <div className="space-y-4">
                                        {pageQuestions.map((q) => (
                                            <div
                                                key={q.id}
                                                className="p-3.5 border border-slate-300 rounded-lg bg-white shadow-none"
                                            >
                                                <div className="font-bold text-sm text-slate-900 mb-2 leading-snug">
                                                    <span className="text-cyan-700 mr-1.5">Câu {q.id}:</span>
                                                    {q.question}
                                                </div>

                                                <div className="space-y-1 mb-2.5">
                                                    {Object.entries(q.options).map(([key, val]) => {
                                                        const isCorrect = key === q.correctAnswer;
                                                        return (
                                                            <div
                                                                key={key}
                                                                className={`p-2 rounded border text-xs flex justify-between items-center ${
                                                                    isCorrect
                                                                        ? 'bg-green-50 border-green-500 text-green-900 font-medium'
                                                                        : 'bg-slate-50 border-slate-200 text-slate-700'
                                                                }`}
                                                            >
                                                                <div>
                                                                    <strong className={isCorrect ? 'text-green-700 mr-1.5' : 'text-slate-800 mr-1.5'}>
                                                                        {key}.
                                                                    </strong>
                                                                    <span>{val as string}</span>
                                                                </div>
                                                                {isCorrect && (
                                                                    <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0 ml-2">
                                                                        ĐÁP ÁN ĐÚNG
                                                                    </span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {includeExplanations && q.explanation && (
                                                    <div className="p-2.5 bg-cyan-50/80 border-l-4 border-cyan-500 rounded-r text-xs text-slate-800">
                                                        <div className="font-bold text-cyan-800 text-[11px] mb-0.5">
                                                            LÝ GIẢI (CÂU {q.id}-{q.correctAnswer}):
                                                        </div>
                                                        <div className="whitespace-pre-line leading-relaxed text-[11px] text-slate-700">
                                                            {q.explanation}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="border-t border-slate-200 pt-2 text-center text-[11px] text-slate-400">
                                    Ứng dụng Ôn tập & Tra cứu Trắc nghiệm Luật Đấu Thầu | Trang {pageIdx + 1} / {pagesCount}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
