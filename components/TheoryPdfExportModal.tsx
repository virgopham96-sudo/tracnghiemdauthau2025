import React, { useState } from 'react';
import { THEORY_DATA, LEGAL_FOUNDATION } from '../data/theoryData';

interface TheoryPdfExportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TheoryPdfExportModal: React.FC<TheoryPdfExportModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handlePrintBrowser = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Trình duyệt đã chặn cửa sổ bật lên. Vui lòng cho phép popup để in/lưu PDF.');
            return;
        }

        const dateStr = new Date().toLocaleDateString('vi-VN');

        const legalHtml = `
            <div class="legal-box">
                <div class="legal-title">📌 CĂN CỨ PHÁP LÝ NỀN TẢNG CẬP NHẬT NĂM 2026:</div>
                <ul>
                    ${LEGAL_FOUNDATION.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;

        const topicsHtml = THEORY_DATA.map(sec => `
            <div class="topic-section">
                <div class="topic-title">${sec.title}</div>
                ${sec.parts.map(part => `
                    ${part.subtitle ? `<p class="subtitle"><strong>${part.subtitle}</strong></p>` : ''}
                    ${part.content && part.content.length > 0 ? `
                        <ul>
                            ${part.content.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    ` : ''}
                `).join('')}
                ${sec.comparisonTable && sec.comparisonTable.length > 0 ? `
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Nội dung quy định</th>
                                <th>Quy định Cũ (Dễ nhầm)</th>
                                <th>Quy định Đúng Mới Nhất (2026)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sec.comparisonTable.map(row => `
                                <tr>
                                    <td><strong>${row.content}</strong></td>
                                    <td class="old-rule"><del>${row.oldRule}</del></td>
                                    <td class="new-rule"><strong>${row.newRule}</strong></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : ''}
                ${sec.tip ? `
                    <div class="tip-box">
                        <div class="tip-title">💡 Mẹo làm bài & Né bẫy đề thi:</div>
                        <p>${sec.tip}</p>
                    </div>
                ` : ''}
            </div>
        `).join('');

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>TỔNG HỢP KIẾN THỨC LUẬT ĐẤU THẦU (CẬP NHẬT 2026) - ${dateStr}</title>
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
                        margin-bottom: 20px;
                        padding-bottom: 14px;
                        border-bottom: 3px solid #0284c7;
                    }
                    .header h1 {
                        margin: 0 0 6px 0;
                        color: #0369a1;
                        font-size: 20px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .header p {
                        margin: 0;
                        color: #475569;
                        font-size: 13px;
                        font-weight: 500;
                    }
                    .legal-box {
                        background-color: #f0f9ff;
                        border: 1px solid #bae6fd;
                        border-radius: 8px;
                        padding: 12px 16px;
                        margin-bottom: 20px;
                    }
                    .legal-title {
                        font-weight: bold;
                        color: #0369a1;
                        margin-bottom: 6px;
                    }
                    .topic-section {
                        margin-bottom: 20px;
                        padding: 16px;
                        border: 1px solid #cbd5e1;
                        border-radius: 8px;
                        page-break-inside: avoid;
                    }
                    .topic-title {
                        font-size: 14px;
                        font-weight: bold;
                        color: #0369a1;
                        margin-bottom: 10px;
                        padding-bottom: 4px;
                        border-bottom: 1px solid #e2e8f0;
                    }
                    .subtitle {
                        margin: 8px 0 4px 0;
                        color: #0f172a;
                        font-size: 13px;
                    }
                    ul {
                        margin: 4px 0 10px 0;
                        padding-left: 20px;
                    }
                    li {
                        margin-bottom: 4px;
                    }
                    .tip-box {
                        background-color: #fefce8;
                        border-left: 4px solid #eab308;
                        padding: 8px 12px;
                        border-radius: 0 6px 6px 0;
                        margin-top: 10px;
                        font-size: 12px;
                        color: #713f12;
                    }
                    .tip-title {
                        font-weight: bold;
                        color: #854d0e;
                        margin-bottom: 2px;
                    }
                    .comparison-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 10px 0;
                        font-size: 12px;
                    }
                    .comparison-table th, .comparison-table td {
                        border: 1px solid #cbd5e1;
                        padding: 8px 10px;
                        text-align: left;
                        vertical-align: top;
                    }
                    .comparison-table th {
                        background-color: #f1f5f9;
                        color: #0f172a;
                        font-weight: bold;
                    }
                    .old-rule {
                        color: #dc2626;
                        background-color: #fef2f2;
                    }
                    .new-rule {
                        color: #166534;
                        background-color: #f0fdf4;
                        font-weight: bold;
                    }
                    @media print {
                        body { padding: 0; }
                        @page { margin: 12mm; size: A4; }
                        .topic-section {
                            border-color: #e2e8f0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>TỔNG HỢP KIẾN THỨC LUẬT ĐẤU THẦU (CẬP NHẬT 2026)</h1>
                    <p>Hệ thống lý thuyết cốt lõi & Mẹo giải đề thi | Ngày xuất: ${dateStr}</p>
                </div>
                ${legalHtml}
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
                            <h3 className="text-base sm:text-lg font-bold">Lưu / In Tổng hợp Kiến thức (PDF)</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">10 Chuyên đề cập nhật mới nhất năm 2026</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 rounded-xl text-xs text-sky-800 dark:text-sky-300 leading-relaxed">
                        Tài liệu tổng hợp gồm <strong>10 chuyên đề lý thuyết trọng tâm & mẹo giải đề thi</strong> cập nhật theo Luật 90/2025/QH15, Nghị định 349/2026/NĐ-CP và Thông tư 134/2026/TT-BTC.
                    </div>

                    <a
                        href="/assets/aistudio/tong-hop-kien-thuc-luat-dau-thau-cap-nhat-2026_84be44bb.pdf"
                        download="tong-hop-kien-thuc-luat-dau-thau-cap-nhat-2026.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 text-sm text-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Tải file PDF gốc chuẩn (6 trang)
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                        type="button"
                        onClick={handlePrintBrowser}
                        className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Mở bản In / Lưu PDF qua trình duyệt
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};
