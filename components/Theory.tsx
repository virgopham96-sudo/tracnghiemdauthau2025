import React, { useState } from 'react';
import { ArrowUpIcon, ChevronRightIcon } from './icons';

interface TheoryProps {
    onBack: () => void;
}

const HighlightBox = ({ title, children }: { title?: string, children?: React.ReactNode }) => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-3 rounded-r-lg">
        {title && <p className="font-bold text-yellow-800 mb-1">{title}</p>}
        <div className="text-slate-800 italic text-sm">{children}</div>
    </div>
);

const TopicSection = ({ title, children }: { title: string, children?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none select-none group"
            >
                <h3 className="text-lg md:text-xl font-bold text-cyan-700 uppercase group-hover:text-cyan-800 flex-1 pr-4">{title}</h3>
                <div className={`transform transition-transform duration-300 text-slate-400 group-hover:text-cyan-600 shrink-0 ${isOpen ? 'rotate-90' : ''}`}>
                    <ChevronRightIcon />
                </div>
            </button>
            <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 text-slate-700 space-y-3 leading-relaxed bg-slate-50/30">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Theory: React.FC<TheoryProps> = ({ onBack }) => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto animate-fade-in pb-20">
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
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center flex-1">Tổng hợp kiến thức Luật Đấu Thầu</h2>
            </div>

            <TopicSection title="1. Phạm vi, Đối tượng áp dụng & Khái niệm cơ bản">
                <p><strong>1. Khi nào bắt buộc áp dụng Luật Đấu thầu?</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Gói thầu sử dụng vốn ngân sách nhà nước, vốn đầu tư công, vốn nhà nước ≥ 30% tổng mức đầu tư.</li>
                    <li>Gói thầu mua thuốc, vật tư y tế của đơn vị công lập.</li>
                    <li>Các dự án PPP theo luật.</li>
                    <li>Các gói thầu sử dụng vốn ODA nếu điều ước quốc tế yêu cầu.</li>
                </ul>
                <HighlightBox title="VÍ DỤ TRÚNG CÂU HỎI:">
                    <ul className="list-disc pl-5">
                        <li>Gói thầu của cơ quan nhà nước dùng NSNN =&gt; <strong>áp dụng</strong></li>
                        <li>Đơn vị sự nghiệp tự chủ hoàn toàn, tự mua sắm = không dùng NSNN =&gt; <strong>không bắt buộc áp dụng</strong></li>
                    </ul>
                </HighlightBox>

                <p><strong>2. Trường hợp KHÔNG áp dụng Luật Đấu thầu</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Mua sắm cá nhân, hộ kinh doanh (ví dụ: mua phần mềm của hộ kinh doanh =&gt; không áp dụng).</li>
                    <li>Doanh nghiệp nhà nước mua sắm bằng tiền tự doanh, không dùng vốn NSNN.</li>
                    <li>Các hoạt động không phải là "lựa chọn nhà thầu".</li>
                </ul>

                <p><strong>3. Các loại gói thầu</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Gói thầu tư vấn:</strong> Lập quy hoạch, lập báo cáo nghiên cứu khả thi, tư vấn giám sát, thiết kế... (Ví dụ: Lập nhiệm vụ quy hoạch, lập báo cáo nghiên cứu khả thi (FS), giám sát = tư vấn).</li>
                    <li><strong>Gói thầu phi tư vấn:</strong> In ấn, bảo vệ, vệ sinh, quảng cáo, tổ chức hội nghị... (Ví dụ: In sổ công tác, quảng cáo, thuê sự kiện = phi tư vấn).</li>
                    <li><strong>Gói thầu hàng hóa:</strong> Máy móc, thiết bị, phần mềm thương mại, hàng tiêu dùng, hóa chất, thuốc, vật tư y tế.</li>
                    <li><strong>Gói thầu xây lắp:</strong> Xây dựng công trình, lắp đặt, sửa chữa.</li>
                </ul>

                <p><strong>4. Khái niệm đấu thầu</strong></p>
                <p>Đấu thầu là quá trình lựa chọn nhà thầu / nhà đầu tư trên cơ sở: <strong>cạnh tranh – công bằng – minh bạch – hiệu quả kinh tế – trách nhiệm giải trình</strong>.</p>

                <p><strong>5. Đấu thầu quốc tế</strong></p>
                <p>Là đấu thầu có nhà thầu trong nước và nước ngoài cùng tham gia. Ngôn ngữ: Tiếng Anh hoặc Việt + Anh.</p>
            </TopicSection>

            <TopicSection title="2. Hình thức lựa chọn nhà thầu">
                <p>Có 6 hình thức chính:</p>
                <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>ĐẤU THẦU RỘNG RÃI</strong>
                        <ul className="list-disc pl-5 mt-1">
                            <li>Hình thức mặc định. Không có hạn mức =&gt; dùng cho mọi giá trị.</li>
                            <li>Áp dụng khi không thuộc trường hợp hạn chế, chỉ định thầu, chào hàng...</li>
                            <li><em>Câu hỏi thường gặp: "Hạn mức đấu thầu rộng rãi?" =&gt; Không có hạn mức.</em></li>
                        </ul>
                    </li>
                    <li><strong>ĐẤU THẦU HẠN CHẾ</strong>
                        <ul className="list-disc pl-5 mt-1">
                            <li>Chỉ mời một số nhà thầu có năng lực đặc thù.</li>
                            <li>Áp dụng khi: công trình đặc thù, công nghệ phức tạp, yêu cầu nhà thầu chất lượng cao.</li>
                        </ul>
                    </li>
                    <li><strong>CHÀO HÀNG CẠNH TRANH</strong>
                        <ul className="list-disc pl-5 mt-1">
                            <li>Hàng hóa thông dụng, sẵn có, giá ≤ 10 tỷ</li>
                            <li>Dịch vụ phi tư vấn thông dụng, ≤ 10 tỷ</li>
                            <li>Xây lắp đơn giản, ≤ 5 tỷ.</li>
                            <li><em>Lưu ý: Đánh giá kỹ thuật bằng Đạt/Không đạt.</em></li>
                        </ul>
                    </li>
                    <li><strong>CHỈ ĐỊNH THẦU</strong> (Hạn mức rất hay bị hỏi)
                        <ul className="list-disc pl-5 mt-1">
                            <li>Mua sắm thường xuyên: ≤ 500 triệu</li>
                            <li>Hàng hóa thuộc dự án đầu tư: ≤ 1 tỷ</li>
                            <li>Xây lắp: ≤ 1 tỷ</li>
                            <li>Ngoài hạn mức còn có trường hợp đặc biệt: Gói thầu khẩn cấp, thiên tai, dịch bệnh. Độc quyền. Nguyên thủ chủ đầu tư yêu cầu.</li>
                        </ul>
                    </li>
                    <li><strong>MUA SẮM TRỰC TIẾP</strong>
                        <ul className="list-disc pl-5 mt-1">
                            <li>Điều kiện: Nhà thầu đã trúng thầu gói trước bằng đấu thầu rộng rãi/hạn chế. Trong vòng 12 tháng kể từ ngày ký hợp đồng trước. Đơn giá không vượt đơn giá gói trước và phù hợp giá thị trường.</li>
                            <li>Áp dụng cho hàng hóa + phi tư vấn, không áp dụng cho xây lắp.</li>
                        </ul>
                    </li>
                    <li><strong>ĐẶT HÀNG</strong>
                        <ul className="list-disc pl-5 mt-1">
                            <li>Áp dụng với sản phẩm, dịch vụ công. Theo pháp luật ngành (nếu khác Luật Đấu thầu =&gt; ưu tiên Luật Đấu thầu).</li>
                        </ul>
                    </li>
                </ol>
            </TopicSection>

            <TopicSection title="3. Kế hoạch lựa chọn nhà thầu (KHLCNT)">
                <p><strong>Nội dung KHLCNT phải có:</strong> Giá gói thầu; Hình thức lựa chọn; Loại hợp đồng; Thời gian thực hiện hợp đồng; Hình thức quản lý dự án.</p>
                <p className="mt-2">KHLCNT phải đăng tải trên Hệ thống trong <strong>05 ngày làm việc</strong>.</p>
                <p className="mt-2"><strong>Trường hợp KHÔNG phải lập KHLCNT:</strong> Mua sắm ≤ 50 triệu =&gt; Không lập KHLCNT nhưng phải: mua sắm tiết kiệm, hiệu quả, có hóa đơn, chứng từ.</p>
            </TopicSection>

            <TopicSection title="4. Bảo đảm cạnh tranh trong đấu thầu">
                <p><strong>Nhà thầu phải độc lập với:</strong> Chủ đầu tư; Nhà thầu tư vấn lập HSMT; Nhà thầu tư vấn thiết kế, giám sát; Nhà thầu quản lý dự án.</p>
                <p className="mt-2"><strong>Các trường hợp không độc lập:</strong> Có sở hữu vốn &gt; 30% lẫn nhau; Có người quản lý/vốn điều hành liên quan; Nhà thầu tư vấn thiết kế lại tham dự gói xây lắp đó.</p>
                <HighlightBox title="Trường hợp KHÔNG vi phạm:">
                    Hai anh em ruột là giám đốc 2 công ty =&gt; Không vi phạm (không quy định cấm).
                </HighlightBox>
            </TopicSection>

            <TopicSection title="5. Lập & Đánh giá hồ sơ mời thầu">
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Tiêu chuẩn đánh giá tính hợp lệ:</strong> Có bản gốc, Hiệu lực HSDT đáp ứng, Có bảo đảm dự thầu hợp lệ, Ký/đóng dấu đúng quy định, Đáp ứng ngôn ngữ. (Không bao gồm: Nộp thuế, Năng lực tài chính).</li>
                    <li><strong>Đánh giá năng lực & kinh nghiệm:</strong> Dùng đạt/không đạt. Các chỉ tiêu: Doanh thu, Hợp đồng tương tự, Năng lực tài chính.
                        <br/><em>Lưu ý: Hợp đồng tương tự xét theo mã HS hoặc cùng chủng loại đối với hàng hóa. Xây lắp xét theo loại kết cấu + cấp công trình + quy mô ≥ 50%.</em>
                    </li>
                    <li><strong>Đánh giá kỹ thuật:</strong>
                        <ul className="list-disc pl-5">
                            <li>Tư vấn: chấm thang điểm (1.000 điểm).</li>
                            <li>Hàng hóa/xây lắp: đạt/không đạt.</li>
                            <li>Nội dung: Giải pháp kỹ thuật, Nhân sự chủ chốt, Thiết bị thi công, Bảo hành/bảo trì.</li>
                        </ul>
                    </li>
                    <li><strong>Phương pháp đánh giá tài chính:</strong> Giá thấp nhất, Giá đánh giá, Kết hợp kỹ thuật – giá, Giá cố định (tư vấn).</li>
                </ul>
            </TopicSection>

            <TopicSection title="6. Gói thầu qua mạng (E-bidding)">
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Nộp – rút – sửa hồ sơ:</strong> Trước đóng thầu: được sửa/rút trực tuyến. Sau đóng thầu mà rút =&gt; bị: Không hoàn trả bảo đảm dự thầu, Không tiếp tục đánh giá, Bị coi là không đảm bảo uy tín.</li>
                    <li><strong>Hàng mẫu:</strong> Được nộp bổ sung trong <strong>05 ngày làm việc</strong> sau đóng thầu.</li>
                    <li><strong>Thông tin kỹ thuật không rõ:</strong> (Ví dụ nhà thầu không ghi xuất xứ) =&gt; phải yêu cầu làm rõ, không loại ngay.</li>
                    <li><strong>Quy trình:</strong> Toàn bộ quy trình từ lập, phê duyệt HSMT đến phê duyệt kết quả đều thực hiện trên hệ thống.</li>
                </ul>
                <HighlightBox>
                    <p>Làm rõ hồ sơ: Thực hiện trên hệ thống, do chủ đầu tư thực hiện.</p>
                    <p>Bảo đảm dự thầu: Các thành viên liên danh phải sử dụng cùng một thể thức (cùng điện tử hoặc cùng bằng giấy).</p>
                </HighlightBox>
            </TopicSection>

            <TopicSection title="7. Thương thảo & Trúng thầu">
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Trường hợp được thương thảo chi phí:</strong> Gói thầu tư vấn (đấu thầu rộng rãi). Nhà thầu tự nguyện giảm giá trong thương thảo.</li>
                    <li><strong>Trường hợp không được thương thảo chi phí:</strong> Gói hàng hóa/xây lắp áp dụng phương pháp giá thấp nhất.</li>
                </ul>
            </TopicSection>

            <TopicSection title="8. Lưu trữ hồ sơ">
                <ul className="list-disc pl-5 space-y-1">
                    <li>Hồ sơ hủy thầu: lưu <strong>05 năm</strong>.</li>
                    <li>Hồ sơ hoàn công – quyết toán: theo luật lưu trữ.</li>
                    <li>HSDT không đạt kỹ thuật (bản tài chính) gói không qua mạng: trả lại khi hoàn trả bảo đảm dự thầu.</li>
                </ul>
            </TopicSection>

            <TopicSection title="9. Các loại hợp đồng trong đấu thầu">
                <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>Hợp đồng trọn gói (Lump-sum):</strong> Giá hợp đồng không thay đổi. Nhà thầu tự chịu rủi ro về tăng khối lượng/chi phí. Thanh toán theo tỉ lệ phần việc hoàn thành. (Gặp rất nhiều trong đề).</li>
                    <li><strong>Hợp đồng theo đơn giá cố định:</strong> Đơn giá không thay đổi, nhưng khối lượng thực tế đo bóc =&gt; tổng giá thanh toán có thể thay đổi.</li>
                    <li><strong>Hợp đồng theo đơn giá điều chỉnh:</strong> Đơn giá được điều chỉnh theo công thức (biến động giá, nhân công, nhiên liệu...). Bắt buộc phải có công thức điều chỉnh giá trong hợp đồng.</li>
                    <li><strong>Hợp đồng theo thời gian (Time-based):</strong> Áp dụng cho dịch vụ tư vấn. Thanh toán theo thời gian làm việc thực tế + chi phí.</li>
                    <li><strong>Hợp đồng theo giá kết hợp:</strong> Dùng khi gói thầu gồm nhiều phần việc khác nhau.</li>
                </ol>
            </TopicSection>

            <TopicSection title="10. Bảo đảm dự thầu & Thực hiện hợp đồng">
                <p><strong>1. Bảo đảm dự thầu</strong></p>
                <ul className="list-disc pl-5 mb-2">
                    <li>Mục đích: tránh nhà thầu bỏ cuộc, rút HSDT, từ chối thương thảo.</li>
                    <li>Khi không hoàn trả bảo đảm dự thầu: Rút HSDT sau đóng thầu, Từ chối thương thảo, Gian lận, Từ chối hoàn thiện hợp đồng.</li>
                </ul>
                <p><strong>2. Bảo đảm thực hiện hợp đồng</strong></p>
                <ul className="list-disc pl-5">
                    <li>Giá trị: 2% – 10% giá hợp đồng (đối với rủi ro cao có thể đến 30%).</li>
                    <li>Bắt buộc nộp trước khi ký hợp đồng.</li>
                    <li>Không phải nộp khi: Gói thầu chỉ định thầu rút gọn; Gói thầu phi tư vấn/hàng hóa ≤ 50 triệu; Tự thực hiện.</li>
                </ul>
            </TopicSection>

            <TopicSection title="11. Quản lý hợp đồng & Thanh toán">
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Điều chỉnh hợp đồng:</strong> Chỉ được điều chỉnh khi thay đổi phạm vi công việc, bất khả kháng, hoặc điều chỉnh giá (đối với hợp đồng đơn giá điều chỉnh). Do lỗi của chủ đầu tư =&gt; được bổ sung chi phí.</li>
                    <li><strong>Thanh toán hợp đồng:</strong>
                        <ul className="list-disc pl-5">
                            <li>Trọn gói: theo tỉ lệ hoàn thành.</li>
                            <li>Đơn giá: theo khối lượng nghiệm thu.</li>
                            <li>Cơ sở thanh toán là giá hợp đồng và các điều khoản đã ký.</li>
                        </ul>
                    </li>
                    <li><strong>Tạm ứng hợp đồng:</strong> Tối đa theo hợp đồng (thường Xây lắp 10–20%, Tư vấn 20–40%). Phải có bảo lãnh tạm ứng.</li>
                </ul>
            </TopicSection>

            <TopicSection title="12. Hủy thầu, Hủy kết quả & Xử lý vi phạm">
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Hủy thầu:</strong> Khi tất cả HSDT không đáp ứng, có gian lận, HSMT sai sót nghiêm trọng, thay đổi mục tiêu đầu tư. (Thực hiện trước khi ký hợp đồng).</li>
                    <li><strong>Hủy kết quả:</strong> Khi phát hiện gian lận sau khi đã phê duyệt kết quả.</li>
                    <li><strong>Thời hạn lưu trữ hồ sơ hủy thầu:</strong> 05 năm.</li>
                    <li><strong>Hành vi bị cấm và thời gian cấm:</strong>
                        <ul className="list-disc pl-5">
                            <li>Gian lận: Cấm từ 03 - 05 năm.</li>
                            <li>Cản trở: Cấm từ 01 - 03 năm.</li>
                            <li>Thành viên tổ chuyên gia đồng thời thẩm định HSMT: Cấm từ 06 tháng đến 01 năm.</li>
                        </ul>
                    </li>
                </ul>
            </TopicSection>

            <TopicSection title="13. Xử lý tình huống trong đấu thầu">
                <p className="italic text-slate-500 mb-2">(Một số tình huống hay gặp trong ngân hàng câu hỏi)</p>
                <ul className="list-decimal pl-5 space-y-1">
                    <li>Nhà thầu không ký tên phần tài chính =&gt; HSDT không hợp lệ, loại.</li>
                    <li>Nhà thầu không nộp hàng mẫu khi yêu cầu =&gt; Loại, trừ gói thầu qua mạng (được bổ sung sau 05 ngày).</li>
                    <li>Nhà thầu báo giá thấp bất thường =&gt; Chủ đầu tư phải làm rõ, nếu không có cơ sở =&gt; loại.</li>
                    <li>Nhà thầu có hợp đồng tương tự 49% =&gt; Không đạt (yêu cầu ≥ 50%).</li>
                    <li>Hai nhà thầu chung vốn 20% =&gt; Vẫn độc lập =&gt; được tham dự.</li>
                    <li>Nhà thầu phụ đặc biệt không liệt kê trong HSDT =&gt; Loại.</li>
                    <li>Một nhà thầu nộp 2 HSDT =&gt; Loại cả hai (trừ HSDT thay thế theo quy định).</li>
                    <li>Chỉ có 01 nhà thầu tham dự: Có thể mở thầu ngay hoặc gia hạn.</li>
                    <li>Nhà thầu vi phạm hợp đồng trong liên danh: Chỉ đăng tải thông tin thành viên vi phạm.</li>
                    <li>Xử lý kiến nghị: Trước khi có kết quả (Chủ đầu tư, người có thẩm quyền); Sau khi có kết quả (Chủ đầu tư, sau đó là Hội đồng giải quyết kiến nghị).</li>
                </ul>
            </TopicSection>

            <TopicSection title="14. Mua sắm tập trung">
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Khái niệm:</strong> Mua sắm tập trung là phương thức gom nhiều nhu cầu lại để mua sắm thống nhất, tiết kiệm chi phí.</li>
                    <li><strong>Sản phẩm áp dụng:</strong> Máy móc thiết bị văn phòng, Vật tư tiêu hao, Thuốc, vật tư y tế...</li>
                    <li><strong>Phương thức thực hiện:</strong> Ký thỏa thuận khung =&gt; Lựa chọn nhà thầu tập trung =&gt; Các đơn vị rút hàng – ký hợp đồng riêng.</li>
                </ul>
            </TopicSection>

            <TopicSection title="15. Đấu thầu theo quy chuẩn quốc tế & ODA">
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>ODA áp dụng luật nào?</strong> Nếu điều ước quốc tế quy định khác =&gt; Ưu tiên điều ước quốc tế. Nếu không quy định =&gt; theo Luật Đấu thầu VN.</li>
                    <li><strong>Hình thức lựa chọn nhà thầu quốc tế:</strong> QCBS (chất lượng & giá), QBS (chất lượng là chính), CQS (chọn tư vấn tốt nhất), FBS (giá cố định), LCS (giá thấp nhất đủ kỹ thuật).</li>
                    <li><strong>Quy định đặc thù ODA:</strong> Có thể dùng danh sách ngắn. Được phép đấu thầu quốc tế rộng rãi. Ngôn ngữ chính: tiếng Anh.</li>
                </ul>
                <HighlightBox>
                    <p>Đấu thầu qua mạng: Hiệp định CPTPP không cho phép bắt buộc.</p>
                    <p>Mẫu HSMT: Áp dụng theo các Thông tư hướng dẫn riêng cho từng hiệp định (VD: Gói thầu thuộc UKVFTA áp dụng mẫu theo Thông tư 12/2022/TT-BKHĐT).</p>
                </HighlightBox>
            </TopicSection>

            <button
                onClick={handleScrollToTop}
                className="fixed bottom-8 right-4 md:right-8 z-20 p-3 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 animate-fade-in"
                aria-label="Lên đầu trang"
            >
                <ArrowUpIcon />
            </button>
        </div>
    );
};

export default Theory;