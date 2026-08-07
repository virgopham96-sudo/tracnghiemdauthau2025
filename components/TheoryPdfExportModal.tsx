import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { THEORY_DATA } from '../data/theoryData';

interface TheoryPdfExportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TheoryPdfExportModal: React.FC<TheoryPdfExportModalProps> = ({ isOpen, onClose }) => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [progressText, setProgressText] = useState<string>('');

    const hiddenRenderRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    const handleDownloadPdf = async () => {
        if (!hiddenRenderRef.current) return;

        try {
            setIsGenerating(true);
            setProgress(10);
            setProgressText('Đang chuẩn bị nội dung tài liệu...');

            await new Promise((res) => setTimeout(res, 300));

            const container = hiddenRenderRef.current;
            const pageElements = Array.from(container.querySelectorAll('.pdf-page')) as HTMLElement[];

            if (pageElements.length === 0) {
                throw new Error('Không tìm thấy trang để xuất.');
            }

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
            const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

            for (let i = 0; i < pageElements.length; i++) {
                const pageEl = pageElements[i];
                const pct = Math.round(((i + 1) / pageElements.length) * 85) + 10;
                setProgress(pct);
                setProgressText(`Đang xử lý trang ${i + 1} / ${pageElements.length}...`);

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
            setProgressText('Đang đóng gói file PDF...');

            const filename = `Tong_hop_kien_thuc_Luat_Dau_Thau_${new Date().toISOString().slice(0, 10)}.pdf`;
            pdf.save(filename);

            setProgress(100);
            setTimeout(() => {
                setIsGenerating(false);
                onClose();
            }, 600);
        } catch (err) {
            console.error('Lỗi khi tạo PDF:', err);
            alert('Có lỗi xảy ra trong quá trình tạo file PDF. Vui lòng sử dụng tính năng In / Lưu PDF.');
            setIsGenerating(false);
        }
    };

    const handlePrintBrowser = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Trình duyệt đã chặn cửa sổ bật lên. Vui lòng cho phép popup để in/lưu PDF.');
            return;
        }

        const dateStr = new Date().toLocaleDateString('vi-VN');

        const topicsHtml = THEORY_DATA.map(sec => `
            <div class="topic-section">
                <div class="topic-title">${sec.title}</div>
                ${sec.parts.map(part => `
                    ${part.subtitle ? `<p class="subtitle"><strong>${part.subtitle}</strong></p>` : ''}
                    ${part.content && part.content.length > 0 ? (
                        part.listType === 'decimal' ? `
                            <ol>
                                ${part.content.map(item => `<li>${item}</li>`).join('')}
                            </ol>
                        ` : `
                            <ul>
                                ${part.content.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        `
                    ) : ''}
                    ${part.highlightTitle ? `
                        <div class="highlight-box">
                            <div class="highlight-title">${part.highlightTitle}</div>
                            ${Array.isArray(part.highlightText) ? `
                                <ul>${part.highlightText.map(ht => `<li>${ht}</li>`).join('')}</ul>
                            ` : `<p>${part.highlightText || ''}</p>`}
                        </div>
                    ` : ''}
                `).join('')}
            </div>
        `).join('');

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>TỔNG HỢP KIẾN THỨC LUẬT ĐẤU THẦU - ${dateStr}</title>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 24px;
                        color: #0f172a;
                        background: #ffffff;
                        line-height: 1.6;
                        font-size: 13px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 24px;
                        padding-bottom: 16px;
                        border-bottom: 3px solid #0284c7;
                    }
                    .header h1 {
                        margin: 0 0 6px 0;
                        color: #0369a1;
                        font-size: 22px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .header p {
                        margin: 0;
                        color: #64748b;
                        font-size: 13px;
                    }
                    .topic-section {
                        margin-bottom: 22px;
                        padding: 16px;
                        border: 1px solid #cbd5e1;
                        border-radius: 8px;
                        background-color: #ffffff;
                        page-break-inside: avoid;
                    }
                    .topic-title {
                        font-size: 15px;
                        font-weight: bold;
                        color: #0284c7;
                        border-bottom: 2px solid #e2e8f0;
                        padding-bottom: 6px;
                        margin-bottom: 12px;
                        text-transform: uppercase;
                    }
                    .subtitle {
                        margin-top: 10px;
                        margin-bottom: 4px;
                        color: #0f172a;
                    }
                    ul, ol {
                        margin: 6px 0 12px 20px;
                        padding: 0;
                    }
                    li {
                        margin-bottom: 4px;
                    }
                    strong {
                        color: #0f172a;
                    }
                    .highlight-box {
                        background-color: #fefce8;
                        border-left: 4px solid #eab308;
                        padding: 10px 14px;
                        border-radius: 0 6px 6px 0;
                        margin: 10px 0;
                        font-style: italic;
                        color: #713f12;
                    }
                    .highlight-title {
                        font-weight: bold;
                        color: #854d0e;
                        font-style: normal;
                        margin-bottom: 4px;
                    }
                    @media print {
                        body { padding: 0; }
                        @page { margin: 15mm; size: A4; }
                        .topic-section {
                            border-color: #e2e8f0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>TỔNG HỢP KIẾN THỨC LUẬT ĐẤU THẦU</h1>
                    <p>Tài liệu hệ thống hóa 10 phần lý thuyết cốt lõi | Ngày xuất: ${dateStr}</p>
                </div>
                ${topicsHtml}
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        setTimeout(() => {
            printWindow.print();
        }, 500);
    };

    // Group sections for PDF pages (3 pages)
    const page1Sections = THEORY_DATA.slice(0, 3); // Sections 1, 2, 3
    const page2Sections = THEORY_DATA.slice(3, 7); // Sections 4, 5, 6, 7
    const page3Sections = THEORY_DATA.slice(7, 10); // Sections 8, 9, 10

    const renderPdfSectionGroup = (sections: typeof THEORY_DATA) => (
        <div className="space-y-3 text-xs leading-relaxed">
            {sections.map(sec => (
                <div key={sec.id} className="p-3 border border-slate-300 rounded-lg bg-white">
                    <h2 className="font-bold text-xs text-cyan-700 uppercase mb-1 border-b pb-1 border-slate-200">
                        {sec.title}
                    </h2>
                    {sec.parts.map((part, idx) => (
                        <div key={idx} className="mt-1.5 space-y-1">
                            {part.subtitle && (
                                <p className="font-bold text-slate-900 text-xs">{part.subtitle}</p>
                            )}
                            {part.content && part.content.length > 0 && (
                                <ul className="list-disc pl-4 space-y-0.5 text-slate-700 text-[11px]">
                                    {part.content.slice(0, 5).map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                    {part.content.length > 5 && (
                                        <li className="italic text-slate-500">... và các nội dung chi tiết trong tài liệu.</li>
                                    )}
                                </ul>
                            )}
                            {part.highlightTitle && (
                                <div className="p-1.5 bg-yellow-50 border-l-2 border-yellow-400 text-[11px] text-yellow-900 rounded-r">
                                    <span className="font-bold">{part.highlightTitle} </span>
                                    {Array.isArray(part.highlightText) ? part.highlightText.join(' ') : part.highlightText}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
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
                            <h3 className="text-lg font-bold">Lưu Tổng hợp Kiến thức dưới dạng PDF</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Xuất toàn bộ 10 phần lý thuyết cốt lõi sang PDF</p>
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
                    <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900 rounded-xl text-xs text-cyan-800 dark:text-cyan-300 leading-relaxed">
                        Tài liệu tổng hợp gồm <strong>10 phần lý thuyết trọng tâm</strong> Luật Đấu thầu. Bạn có thể tải file PDF thiết kế chuẩn trang A4 hoặc In/Lưu PDF trực tiếp qua trình duyệt.
                    </div>

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

                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                        type="button"
                        onClick={handleDownloadPdf}
                        disabled={isGenerating}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Tải file PDF
                    </button>

                    <button
                        type="button"
                        onClick={handlePrintBrowser}
                        disabled={isGenerating}
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm border border-slate-200 dark:border-slate-700 disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        In trực tiếp
                    </button>
                </div>

                {/* Off-screen PDF layout renderer */}
                <div
                    style={{
                        position: 'fixed',
                        top: '-10000px',
                        left: '-10000px',
                        width: '794px',
                        zIndex: -9999,
                        pointerEvents: 'none',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <div ref={hiddenRenderRef}>
                        {/* Page 1 */}
                        <div
                            className="pdf-page bg-white text-slate-900 p-8"
                            style={{ width: '794px', height: '1123px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justify: 'space-between', fontFamily: 'Arial, sans-serif' }}
                        >
                            <div>
                                <div className="border-b-2 border-cyan-600 pb-3 mb-4 flex items-center justify-between">
                                    <div>
                                        <h1 className="text-xl font-bold text-cyan-700 tracking-tight uppercase">TỔNG HỢP KIẾN THỨC LUẬT ĐẤU THẦU (TRANG 1/3)</h1>
                                        <p className="text-xs text-slate-500 mt-0.5">Tài liệu hệ thống hóa 10 phần lý thuyết cốt lõi</p>
                                    </div>
                                    <div className="text-right text-xs text-slate-400">
                                        <div>Trang 1 / 3</div>
                                        <div>{new Date().toLocaleDateString('vi-VN')}</div>
                                    </div>
                                </div>
                                {renderPdfSectionGroup(page1Sections)}
                            </div>
                            <div className="border-t border-slate-200 pt-2 text-center text-[10px] text-slate-400">
                                Tài liệu ôn tập Luật Đấu thầu — Trang 1/3
                            </div>
                        </div>

                        {/* Page 2 */}
                        <div
                            className="pdf-page bg-white text-slate-900 p-8"
                            style={{ width: '794px', height: '1123px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justify: 'space-between', fontFamily: 'Arial, sans-serif' }}
                        >
                            <div>
                                <div className="border-b-2 border-cyan-600 pb-3 mb-4 flex items-center justify-between">
                                    <div>
                                        <h1 className="text-xl font-bold text-cyan-700 tracking-tight uppercase">TỔNG HỢP KIẾN THỨC LUẬT ĐẤU THẦU (TRANG 2/3)</h1>
                                        <p className="text-xs text-slate-500 mt-0.5">Phần 4 đến Phần 7: Năng lực, Ưu đãi, Hợp đồng, Mua sắm y tế & Tập trung</p>
                                    </div>
                                    <div className="text-right text-xs text-slate-400">
                                        <div>Trang 2 / 3</div>
                                        <div>{new Date().toLocaleDateString('vi-VN')}</div>
                                    </div>
                                </div>
                                {renderPdfSectionGroup(page2Sections)}
                            </div>
                            <div className="border-t border-slate-200 pt-2 text-center text-[10px] text-slate-400">
                                Tài liệu ôn tập Luật Đấu thầu — Trang 2/3
                            </div>
                        </div>

                        {/* Page 3 */}
                        <div
                            className="pdf-page bg-white text-slate-900 p-8"
                            style={{ width: '794px', height: '1123px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justify: 'space-between', fontFamily: 'Arial, sans-serif' }}
                        >
                            <div>
                                <div className="border-b-2 border-cyan-600 pb-3 mb-4 flex items-center justify-between">
                                    <div>
                                        <h1 className="text-xl font-bold text-cyan-700 tracking-tight uppercase">TỔNG HỢP KIẾN THỨC LUẬT ĐẤU THẦU (TRANG 3/3)</h1>
                                        <p className="text-xs text-slate-500 mt-0.5">Phần 8 đến Phần 10: Đấu thầu qua mạng, Vi phạm cấm thầu & Tình huống</p>
                                    </div>
                                    <div className="text-right text-xs text-slate-400">
                                        <div>Trang 3 / 3</div>
                                        <div>{new Date().toLocaleDateString('vi-VN')}</div>
                                    </div>
                                </div>
                                {renderPdfSectionGroup(page3Sections)}
                            </div>
                            <div className="border-t border-slate-200 pt-2 text-center text-[10px] text-slate-400">
                                Tài liệu ôn tập Luật Đấu thầu — Trang 3/3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
