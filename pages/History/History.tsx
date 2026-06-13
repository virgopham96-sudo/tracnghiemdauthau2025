
import React from 'react';

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

                <p className="mt-8 text-slate-500">
                    Xin chân thành cảm ơn!
                </p>
            </div>
        </div>
    );
};

export default History;