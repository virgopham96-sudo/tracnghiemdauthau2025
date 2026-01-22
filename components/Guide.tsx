
import React from 'react';
import { BookOpenIcon, ClipboardListIcon, ShuffleIcon, SearchIcon, CloseIcon } from './icons';

interface GuideProps {
    onClose: () => void;
}

const Guide: React.FC<GuideProps> = ({ onClose }) => {
    return (
        <div className="p-6 md:p-8">
            <div className="relative flex justify-center items-center mb-6 border-b pb-4 border-slate-200">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Hướng dẫn sử dụng</h2>
                <button 
                    onClick={onClose} 
                    className="absolute -top-2 -right-2 md:-top-4 md:-right-4 p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors"
                    aria-label="Đóng"
                >
                    <CloseIcon className="h-6 w-6" />
                </button>
            </div>

            <div className="space-y-8">
                {/* Section 1: Modes */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                    <h3 className="text-2xl font-bold text-cyan-700 mb-4">Các Chế độ Ôn luyện & Thi</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-cyan-100 p-2 rounded-lg mt-1 shrink-0"><BookOpenIcon className="h-6 w-6 text-cyan-600"/></div>
                            <div>
                                <p className="font-bold text-slate-800">Luyện tập tổng hợp</p>
                                <p className="text-slate-600">Ôn tập toàn bộ 390 câu hỏi không giới hạn thời gian. Xem đáp án và giải thích chi tiết ngay sau khi trả lời. Đặc biệt, bạn có thể <span className="font-semibold text-cyan-600">lọc câu hỏi theo 15 chủ đề</span> chính của Luật Đấu thầu.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-cyan-100 p-2 rounded-lg mt-1 shrink-0"><ClipboardListIcon className="h-6 w-6 text-cyan-600"/></div>
                            <div>
                                <p className="font-bold text-slate-800">Thi theo bộ đề</p>
                                <p className="text-slate-600">Thử sức với 39 bộ đề thi, mỗi bộ đề gồm 10 câu hỏi với thời gian làm bài 15 phút, mô phỏng một phần bài thi thực tế.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-cyan-100 p-2 rounded-lg mt-1 shrink-0"><ShuffleIcon className="h-6 w-6 text-cyan-600"/></div>
                            <div>
                                <p className="font-bold text-slate-800">Thi ngẫu nhiên</p>
                                <p className="text-slate-600">Làm bài thi tổng hợp với số lượng câu hỏi tùy chọn được lấy ngẫu nhiên từ toàn bộ ngân hàng đề.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Search */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                     <h3 className="text-2xl font-bold text-cyan-700 mb-4">Tra cứu & Tìm kiếm</h3>
                     <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-cyan-100 p-2 rounded-lg mt-1 shrink-0"><SearchIcon className="h-6 w-6 text-cyan-600"/></div>
                            <div>
                                <p className="font-bold text-slate-800">Tra cứu theo từ khoá</p>
                                <p className="text-slate-600">Sử dụng chức năng "Tra cứu câu hỏi" từ màn hình chính để tìm kiếm nhanh bất kỳ từ khoá nào trong toàn bộ 390 câu hỏi, các lựa chọn và phần giải thích. Từ khoá sẽ được tô vàng để dễ dàng nhận biết.</p>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Section 3: Shortcuts */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                    <h3 className="text-2xl font-bold text-cyan-700 mb-4">Phím tắt tiện lợi</h3>
                    <p className="text-slate-600 mb-4">Sử dụng bàn phím để thao tác nhanh và hiệu quả hơn trong các chế độ Luyện tập và Thi.</p>
                    <ul className="list-none space-y-3">
                        <li className="flex items-center gap-3">
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">1</kbd>
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">2</kbd>
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">3</kbd>
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">4</kbd>
                            <span className="text-slate-700">- Chọn nhanh các đáp án A, B, C, D.</span>
                        </li>
                         <li className="flex items-center gap-3">
                            <kbd className="w-12 text-center px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">→</kbd>
                            <span className="text-slate-700">- Chuyển sang câu hỏi tiếp theo.</span>
                        </li>
                         <li className="flex items-center gap-3">
                            <kbd className="w-12 text-center px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">←</kbd>
                            <span className="text-slate-700">- Quay về câu hỏi trước đó.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Guide;
