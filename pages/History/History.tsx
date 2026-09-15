
import React from 'react';
import { openRandomAdLink } from '../../data/adLinks';

interface HistoryProps {
    onBack: () => void;
}

const History: React.FC<HistoryProps> = ({ onBack }) => {
    return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                 <button
                    onClick={onBack}
                    className="bg-white hover:bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-full transition-colors flex items-center gap-2 border border-slate-200 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Quay lại
                </button>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center flex-1">Ủng hộ tác giả</h2>
            </div>

            <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 sm:p-8 text-center flex flex-col items-center">
                <p className="text-slate-600 mb-6 max-w-md">
                    Nếu bạn thấy ứng dụng này hữu ích, xin hãy ủng hộ tác giả một ly cà phê. Sự ủng hộ của bạn là động lực lớn để tác giả tiếp tục phát triển các sản phẩm miễn phí và chất lượng.
                </p>
                
                <div className="mb-6 p-2 bg-white border-4 border-slate-100 rounded-lg shadow-inner">
                     <img 
                        src='https://qr.sepay.vn/img?acc=106002115544&bank=ICB&amount=0&des=Ung ho web thi dau thau'
                        alt="Mã QR ủng hộ"
                        className="w-56 h-56 sm:w-64 sm:h-64 object-contain"
                    />
                </div>
                
                <div className="space-y-2 text-slate-700">
                    <p className="text-lg font-bold text-slate-900">PHAM VAN BINH</p>
                    <p>Tài khoản: <span className="font-semibold text-cyan-600">106002115544</span></p>
                    <p>Ngân hàng TMCP Công thương Việt Nam</p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 w-full flex flex-col items-center">
                    <p className="text-xs sm:text-sm text-slate-500 mb-3 font-medium">Hoặc bạn có thể ủng hộ bằng cách:</p>
                    <button
                        onClick={openRandomAdLink}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300 hover:border-amber-400 text-amber-900 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                        title="Mở ngẫu nhiên link Shopee để ủng hộ tác giả"
                    >
                        <span className="text-base">🎁</span>
                        <span>Ấn vào quảng cáo để ủng hộ tác giả</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </button>
                </div>

                <p className="mt-8 text-slate-500">
                    Xin chân thành cảm ơn!
                </p>
            </div>
        </div>
    );
};

export default History;