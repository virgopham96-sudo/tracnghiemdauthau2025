export interface ComparisonRow {
    content: string;
    oldRule: string;
    newRule: string;
}

export interface TheorySectionPart {
    subtitle?: string;
    content?: string[];
    highlightTitle?: string;
    highlightText?: string | string[];
}

export interface TheorySection {
    id: number;
    title: string;
    parts: TheorySectionPart[];
    tip?: string;
    comparisonTable?: ComparisonRow[];
}

export const LEGAL_FOUNDATION: string[] = [
    "Luật Đấu thầu số 22/2023/QH15 (sửa đổi, bổ sung bởi Luật số 57/2024/QH15 và Luật số 90/2025/QH15 - VBHN số 126/VBHN-VPQH).",
    "Nghị định số 214/2025/NĐ-CP (sửa đổi, bổ sung bởi Nghị định số 349/2026/NĐ-CP có hiệu lực từ 09/9/2026 - VBHN số 36/2026/VBHN-ND-BTC).",
    "Thông tư số 134/2026/TT-BTC (thay thế Thông tư số 80/2025/TT-BTC từ 09/9/2026) & Thông tư số 79/2025/TT-BTC quy định E-HSMT.",
    "Nghị định số 274/2026/NĐ-CP (thay thế NĐ 23/2024/NĐ-CP & NĐ 115/2024/NĐ-CP về lựa chọn nhà đầu tư dự án đầu tư kinh doanh).",
    "Ngân hàng câu hỏi 430 câu thi chứng chỉ nghiệp vụ đấu thầu theo Thông báo số 2775/TB-QLĐT ngày 22/10/2026 của Cục Quản lý đấu thầu."
];

export const THEORY_DATA: TheorySection[] = [
    {
        id: 1,
        title: "CHUYÊN ĐỀ 1: QUY ĐỊNH CHUNG, PHẠM VI ÁP DỤNG & KHÁI NIỆM CỐT LÕI",
        parts: [
            {
                subtitle: "1. Nguyên tắc xác định phạm vi áp dụng Luật Đấu thầu",
                content: [
                    "3 câu hỏi cốt lõi xác định phạm vi: Ai mua? Dùng nguồn tiền gì? Mua để làm gì?",
                    "Bắt buộc áp dụng: Hoạt động lựa chọn nhà thầu thuộc dự án/dự toán mua sắm của cơ quan nhà nước, đơn vị sự nghiệp công lập, dự án sử dụng vốn ngân sách nhà nước, vốn đầu tư công. (VD: Sở Y tế dùng ngân sách mua thuốc cho bệnh viện công).",
                    "Quyền tự quyết mua sắm: Doanh nghiệp nhà nước (DNNN) không sử dụng vốn ngân sách nhà nước; Đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên và chi đầu tư (nhóm 1) hoặc tự bảo đảm chi thường xuyên (nhóm 2) không sử dụng ngân sách nhà nước; Việc mua/thuê nhà, trụ sở, tài sản gắn liền với đất; Mua sắm của hộ kinh doanh cá thể. Các đơn vị này được tự quyết định việc mua sắm trên cơ sở bảo đảm công khai, minh bạch, hiệu quả kinh tế và trách nhiệm giải trình."
                ]
            },
            {
                subtitle: "2. Phân loại gói thầu chuẩn xác để chọn đúng đáp án",
                content: [
                    "Gói thầu Dịch vụ tư vấn: Sử dụng trí tuệ, chất xám chuyên môn chuyên sâu (lập nhiệm vụ quy hoạch, lập báo cáo nghiên cứu khả thi, khảo sát, thiết kế, thẩm định, giám sát thi công, kiểm toán...).",
                    "Gói thầu Dịch vụ phi tư vấn: Dịch vụ thông thường có quy trình sản xuất/cung cấp có sẵn, không đòi hỏi tư vấn chuyên môn sâu (in ấn sổ sách công tác, bảo vệ, vệ sinh tòa nhà, thuê máy chủ, vận chuyển, bảo trì thiết bị, quảng cáo, tổ chức sự kiện...).",
                    "Gói thầu Mua sắm hàng hóa: Máy móc, thiết bị, nguyên nhiên vật liệu, phụ tùng, thuốc, hóa chất, vật tư y tế, phần mềm thương mại.",
                    "Gói thầu Xây lắp & Gói thầu Hỗn hợp: Xây lắp (thi công xây dựng, lắp đặt thiết bị công trình). Hỗn hợp: EP, EC, PC, EPC, chìa khóa trao tay."
                ]
            }
        ],
        tip: "Nguồn vốn công + Chủ thể công + Phục vụ dự án/dự toán = Bắt buộc kiểm tra Luật Đấu thầu. Đối với phân loại gói thầu, đề thi hay thử thách ở 2 gói: 'Lập nhiệm vụ quy hoạch' là TƯ VẤN, còn 'In sổ công tác' hoặc 'Thuê máy chủ' là PHI TƯ VẤN."
    },
    {
        id: 2,
        title: "CHUYÊN ĐỀ 2: CÁC HÌNH THỨC LỰA CHỌN NHÀ THẦU & HẠN MỨC MỚI NHẤT (NĐ 349/2026/NĐ-CP)",
        parts: [
            {
                subtitle: "1. Đấu thầu rộng rãi & Đấu thầu hạn chế",
                content: [
                    "Đấu thầu rộng rãi: Hình thức cơ bản, không hạn chế số lượng nhà thầu tham dự và KHÔNG QUY ĐỊNH HẠN MỨC ÁP DỤNG. Luôn được khuyến khích áp dụng.",
                    "Đấu thầu hạn chế: Áp dụng khi gói thầu có yêu cầu cao về kỹ thuật hoặc kỹ thuật có tính đặc thù mà chỉ có một số nhà thầu (tối thiểu 05 nhà thầu) đáp ứng yêu cầu."
                ]
            },
            {
                subtitle: "2. Chỉ định thầu - Hạn mức mới theo Nghị định 349/2026/NĐ-CP",
                content: [
                    "Hạn mức Chỉ định thầu mới nhất (Khoản 4 Điều 78 NĐ 214/2025 sửa đổi bởi NĐ 349/2026): Áp dụng cho gói thầu thuộc các hạn mức sau:",
                    "• Dự toán mua sắm không hình thành dự án: Giá gói thầu KHÔNG QUÁ 01 TỶ ĐỒNG (trước đây là 500 triệu đồng).",
                    "• Gói thầu dịch vụ tư vấn thuộc dự án: Giá gói thầu KHÔNG QUÁ 03 TỶ ĐỒNG (trước đây là 800 triệu đồng).",
                    "• Gói thầu phi tư vấn, hàng hóa, xây lắp, hỗn hợp thuộc dự án: Giá gói thầu KHÔNG QUÁ 05 TỶ ĐỒNG (trước đây là 02 tỷ đồng).",
                    "Mua sắm nhỏ lẻ dưới 100 triệu đồng: Gói thầu/nội dung mua sắm có giá không quá 100 triệu đồng thì Thủ trưởng đơn vị tự quyết định mua sắm bảo đảm tiết kiệm, hiệu quả, tự chịu trách nhiệm, có đầy đủ hóa đơn chứng từ, KHÔNG phải lập KHLCNT và không bắt buộc áp dụng quy trình chỉ định thầu rút gọn."
                ]
            },
            {
                subtitle: "3. Chào hàng cạnh tranh, Mua sắm trực tiếp & Các hình thức khác",
                content: [
                    "Chào hàng cạnh tranh: Áp dụng cho gói thầu dịch vụ phi tư vấn thông dụng, đơn giản; hàng hóa thông dụng, sẵn có; xây lắp công trình đơn giản có giá gói thầu KHÔNG QUÁ 10 TỶ ĐỒNG. KHÔNG áp dụng cho gói thầu dịch vụ tư vấn.",
                    "Mua sắm trực tiếp: Chỉ áp dụng duy nhất cho gói thầu HÀNG HÓA tương tự dựa trên hợp đồng trúng thầu qua ĐTRR/ĐTHC đã ký trước đó không quá 12 tháng. Chủ đầu tư CHỈ ĐƯỢC ÁP DỤNG 01 LẦN đối với loại hàng hóa đó.",
                    "Mua vé máy bay & phương tiện công cộng: Mua vé máy bay cho đoàn công tác trong nước/quốc tế thuộc hình thức Lựa chọn nhà thầu trong trường hợp đặc biệt (Điều 29 Luật Đấu thầu & Điều 84 NĐ 214/2025 sửa đổi). Không phải lập KHLCNT."
                ]
            }
        ],
        tip: "Bộ 3 số hạn mức chỉ định thầu MỚI NHẤT bắt buộc phải nhớ: 01 TỶ / 03 TỶ / 05 TỶ. Đề thi nếu đưa ra các con số cũ 500 triệu / 800 triệu / 02 tỷ đồng ở các phương án nhiễu thì ĐÓ LÀ PHƯƠNG ÁN SAI."
    },
    {
        id: 3,
        title: "CHUYÊN ĐỀ 3: KẾ HOẠCH LỰA CHỌN NHÀ THẦU & THẨM QUYỀN CỦA CHỦ ĐẦU TƯ",
        parts: [
            {
                subtitle: "1. Thẩm quyền và Trách nhiệm của Chủ đầu tư (Cập nhật Luật 90/2025/QH15)",
                content: [
                    "Chủ đầu tư phê duyệt: Kế hoạch lựa chọn nhà thầu (KHLCNT); Hồ sơ mời quan tâm/sơ tuyển/HSMT/HSYC; Kết quả lựa chọn nhà thầu (KQLCNT).",
                    "Thay đổi thuật ngữ trọng yếu: Luật số 90/2025/QH15 và VBHN số 126/VBHN-VPQH đã thay thế cụm từ 'Bên mời thầu' bằng 'CHỦ ĐẦU TƯ' trong các chức năng phê duyệt HSMT, phê duyệt KQLCNT, giải thích/làm rõ HSMT đối với nhánh lựa chọn nhà thầu. Cụm từ 'Bên mời thầu' hiện nay chủ yếu dùng ở nhánh lựa chọn nhà đầu tư.",
                    "Thời hạn đăng tải KHLCNT: Kế hoạch lựa chọn nhà thầu phải được đăng tải trên Hệ thống mạng đấu thầu quốc gia chậm nhất là 05 NGÀY LÀM VIỆC kể từ ngày được ban hành/phê duyệt."
                ]
            },
            {
                subtitle: "2. Bảo đảm cạnh tranh trong đấu thầu (Điều 6 Luật Đấu thầu)",
                content: [
                    "Nguyên tắc độc lập pháp lý & tài chính: Nhà thầu tham dự thầu phải độc lập với Chủ đầu tư, Đơn vị tư vấn lập HSMT, Đơn vị tư vấn đánh giá HSDT, Đơn vị tư vấn thẩm định.",
                    "Trường hợp ngoại lệ cho phép: Đơn vị sự nghiệp công lập trực thuộc cơ quan quản lý nhà nước có chức năng phù hợp với gói thầu; các đơn vị sự nghiệp công lập có cùng một cơ quan trực tiếp quản lý.",
                    "Mối quan hệ thân nhân: Người đại diện theo pháp luật của 02 nhà thầu tham dự thầu là anh em ruột: KHÔNG thuộc hành vi bị cấm, KHÔNG vi phạm quy định về bảo đảm cạnh tranh trong đấu thầu."
                ]
            }
        ],
        tip: "Ghi nhớ: Khi đề thi hỏi về thẩm quyền phê duyệt HSMT, KHLCNT hay KQLCNT trong lựa chọn nhà thầu, chọn đáp án CHỦ ĐẦU TƯ (không chọn Bên mời thầu). Thời hạn đăng tải KHLCNT là 05 NGÀY LÀM VIỆC."
    },
    {
        id: 4,
        title: "CHUYÊN ĐỀ 4: QUY ĐỊNH E-HSMT, TIÊU CHUẨN ĐÁNH GIÁ & E-HSDT",
        parts: [
            {
                subtitle: "1. Tiêu chuẩn đánh giá và Các hành vi hạn chế cạnh tranh",
                content: [
                    "Không được quy định hạn chế cạnh tranh trong E-HSMT: Cấm nêu nhãn hiệu, xuất xứ cụ thể của hàng hóa (trừ trường hợp mua sắm phụ tùng thay thế hoặc thuộc trường hợp đặc thù). Cấm yêu cầu hợp đồng tương tự trong cùng lãnh thổ một quốc gia cụ thể.",
                    "Giấy phép bán hàng của Nhà sản xuất: Chỉ được yêu cầu đối với hàng hóa đặc thù, phức tạp cần gắn với trách nhiệm của nhà sản xuất. Không được yêu cầu đối với hàng hóa thông thường, sẵn có trên thị trường.",
                    "Nhân sự chủ chốt trong gói thầu Mua sắm hàng hóa: KHÔNG ĐƯỢC yêu cầu về huy động nhân sự chủ chốt đối với phần công việc CUNG CẤP HÀNG HÓA. Chỉ được yêu cầu đối với dịch vụ liên quan có yếu tố đặc thù, phức tạp (lắp đặt, đào tạo chuyển giao công nghệ phức tạp)."
                ]
            },
            {
                subtitle: "2. Đánh giá E-HSDT và Xử lý nhà thầu liên danh",
                content: [
                    "Đánh giá nhà thầu liên danh về nghĩa vụ bảo hành: Theo Mẫu số 4A và 4B (Thông tư 79/2025/TT-BTC), tiêu chí khả năng bảo hành đối với nhà thầu liên danh được tính cho TỔNG CÁC THÀNH VIÊN LIÊN DANH ('Nhà thầu liên danh'), còn đối với từng thành viên liên danh là 'Không áp dụng'. Nhà thầu liên danh chứng minh bằng Cam kết tự thực hiện HOẶC Hợp đồng nguyên tắc với đơn vị bảo hành.",
                    "Cơ chế làm rõ E-HSDT: Được làm rõ về tư cách hợp lệ, năng lực, kinh nghiệm, tài liệu kỹ thuật, cam kết bảo hành. Việc làm rõ không được làm thay đổi bản chất HSDT và giá dự thầu."
                ]
            }
        ],
        tip: "Cấm yêu cầu nhân sự chủ chốt cho phần CUNG CẤP HÀNG HÓA. Với nhà thầu liên danh chứng minh bảo hành: xét cho TỔNG CÁC THÀNH VIÊN LIÊN DANH (chủ thể là 'Nhà thầu liên danh') với điều kiện HOẶC (cam kết tự thực hiện HOẶC ký HĐ nguyên tắc)."
    },
    {
        id: 5,
        title: "CHUYÊN ĐỀ 5: ĐẤU THẦU QUA MẠNG & CHÀO GIÁ TRỰC TUYẾN (TT 79/2025/TT-BTC & NĐ 214/2025)",
        parts: [
            {
                subtitle: "1. Quy trình đánh giá E-HSDT trên Hệ thống Mạng đấu thầu quốc gia",
                content: [
                    "Quy trình 01 (Đánh giá thông thường): Áp dụng cho tất cả gói thầu. Đánh giá tính hợp lệ -> Năng lực & Kinh nghiệm -> Kỹ thuật -> Tài chính -> Xếp hạng.",
                    "Quy trình 02 (Hệ thống tự động xếp hạng): Áp dụng cho gói thầu mua sắm hàng hóa, dịch vụ phi tư vấn 1 giai đoạn 1 túi hồ sơ áp dụng phương pháp 'Giá thấp nhất' mà tất cả các nhà thầu đều KHÔNG CÓ ƯU ĐÃI. Hệ thống tự động xếp hạng theo giá dự thầu sau giảm giá."
                ]
            },
            {
                subtitle: "2. Chào giá trực tuyến theo quy trình rút gọn & thông thường",
                content: [
                    "Chào giá trực tuyến rút gọn: Áp dụng cho gói thầu hàng hóa/phi tư vấn/xây lắp không quá 05 tỷ đồng đối với dự án. KHÔNG YÊU CẦU BẢO ĐẢM DỰ THẦU. Nhà thầu chấp thuận trao hợp đồng trong 03 NGÀY LÀM VIỆC. Nếu từ chối sẽ bị khóa chức năng chào giá trực tuyến 06 THÁNG.",
                    "Bảo đảm dự thầu < 50 triệu đồng qua mạng: Nhà thầu KHÔNG CẦN nộp thư bảo lãnh khi nộp E-HSDT, chỉ tích cam kết trong Đơn dự thầu. Thư bảo lãnh/giấy chứng nhận bảo hiểm nộp khi đối chiếu tài liệu, thời gian có hiệu lực tính từ NGÀY THỰC HIỆN ĐỐI CHIẾU TÀI LIỆU."
                ]
            }
        ],
        tip: "Bảo đảm dự thầu < 50 triệu qua mạng: Không nộp thư bảo lãnh lúc đóng thầu; hiệu lực bảo lãnh tính từ NGÀY ĐỐI CHIẾU TÀI LIỆU. Chào giá trực tuyến rút gọn: KHÔNG cần bảo đảm dự thầu."
    },
    {
        id: 6,
        title: "CHUYÊN ĐỀ 6: HỢP ĐỒNG, BẢO ĐẢM DỰ THẦU & BẢO ĐẢM THỰC HIỆN HỢP ĐỒNG",
        parts: [
            {
                subtitle: "1. Phân loại Hợp đồng và Điều kiện áp dụng",
                content: [
                    "Hợp đồng trọn gói: Giá hợp đồng không thay đổi trong suốt quá trình thực hiện. Áp dụng cho gói thầu xác định rõ khối lượng, đơn giá.",
                    "Hợp đồng theo đơn giá cố định: Đơn giá không thay đổi, thanh toán theo khối lượng nghiệm thu thực tế.",
                    "Hợp đồng theo đơn giá điều chỉnh: Đơn giá được điều chỉnh theo công thức thỏa thuận khi có biến động giá.",
                    "Hợp đồng theo chi phí cộng phí: Áp dụng khi tại thời điểm lựa chọn nhà thầu CHƯA ĐỦ CƠ SỞ XÁC ĐỊNH phạm vi công việc, nhu cầu chi phí đầu vào."
                ]
            },
            {
                subtitle: "2. Bảo đảm thực hiện hợp đồng (BĐTHHĐ)",
                content: [
                    "Mức bảo đảm thực hiện hợp đồng: Từ 2% đến 10% giá hợp đồng.",
                    "Trường hợp giá dự thầu thấp khác thường: Chủ đầu tư có thể quy định giá trị BĐTHHĐ tối đa lên tới 30% GIÁ HỢP ĐỒNG để phòng ngừa rủi ro.",
                    "Trường hợp không phải nộp BĐTHHĐ: Nhà thầu cung cấp dịch vụ tư vấn; Nhà thầu thực hiện theo hình thức TỰ THỰC HIỆN; Gói thầu thuộc hạn mức chỉ định thầu rút gọn."
                ]
            }
        ],
        tip: "Gói thầu TƯ VẤN và TỰ THỰC HIỆN KHÔNG phải nộp bảo đảm thực hiện hợp đồng. Khi giá dự thầu thấp khác thường, mức BĐTHHĐ tối đa là 30% giá hợp đồng."
    },
    {
        id: 7,
        title: "CHUYÊN ĐỀ 7: GIẢI QUYẾT KIẾN NGHỊ & KIỂM TRA, GIÁM SÁT HOẠT ĐỘNG ĐẤU THẦU",
        parts: [
            {
                subtitle: "1. Quy trình Giải quyết kiến nghị về Hồ sơ mời thầu (Trước đóng thầu)",
                content: [
                    "Thời hạn gửi đơn kiến nghị HSMT: Nhà thầu/cơ quan gửi đơn kiến nghị về HSMT đến Chủ đầu tư trước thời điểm đóng thầu tối thiểu 03 NGÀY LÀM VIỆC (đối với đấu thầu qua mạng/trong nước) hoặc 05 NGÀY LÀM VIỆC (đối với đấu thầu quốc tế/không qua mạng).",
                    "Thời hạn Chủ đầu tư trả lời: Chủ đầu tư phải có văn bản giải quyết kiến nghị trong thời hạn 07 NGÀY LÀM VIỆC kể từ ngày nhận được đơn kiến nghị và đăng tải công khai trên Hệ thống."
                ]
            },
            {
                subtitle: "2. Quy trình Giải quyết kiến nghị về KQLCNT & Phân định thẩm quyền",
                content: [
                    "Thời hạn gửi đơn kiến nghị KQLCNT: Trong vòng 10 ngày kể từ ngày đăng tải công khai KQLCNT.",
                    "Trường hợp gửi đơn đồng thời: Nếu nhà thầu gửi đơn kiến nghị về KQLCNT ĐỒNG THỜI đến Chủ đầu tư và Bộ phận thường trực giúp việc Hội đồng giải quyết kiến nghị (->) Trách nhiệm giải quyết thuộc về HỘI ĐỒNG GIẢI QUYẾT KIẾN NGHỊ.",
                    "Thông tư 134/2026/TT-BTC (từ 09/9/2026): Quy định chi tiết mẫu hồ sơ yêu cầu chỉ định thầu, báo cáo đánh giá, thẩm định, kiểm tra, giám sát hoạt động đấu thầu, thay thế hoàn toàn Thông tư 80/2025/TT-BTC."
                ]
            }
        ],
        tip: "Kiến nghị HSMT: Gửi trước đóng thầu 03 ngày làm việc; Chủ đầu tư trả lời trong 07 ngày làm việc. Kiến nghị KQLCNT gửi đồng thời Chủ đầu tư + Bộ phận thường trực -> HỘI ĐỒNG GIẢI QUYẾT KIẾN NGHỊ xử lý."
    },
    {
        id: 8,
        title: "CHUYÊN ĐỀ 8: XỬ LÝ TÌNH HUỐNG, HỦY THẦU & XỬ LÝ VI PHẠM",
        parts: [
            {
                subtitle: "1. Xử lý tình huống trong lựa chọn nhà thầu",
                content: [
                    "Đề xuất biện pháp thi công khác: Trường hợp HSMT cho phép nhà thầu đề xuất biện pháp thi công khác, phần sai khác khối lượng do biện pháp thi công mới KHÔNG bị hiệu chỉnh sai lệch và KHÔNG bị tính là sai lệch thiếu.",
                    "Thay thế vật tư/thiết bị chưa đáp ứng kỹ thuật: Trường hợp gói thầu chỉ có 01 nhà thầu tham dự, HSDT đáp ứng cơ bản nhưng vật tư thông dụng chưa đáp ứng kỹ thuật, Chủ đầu tư xem xét cho phép thay thế nếu tổng giá trị các hạng mục này chiếm tỷ trọng KHÔNG QUÁ 1% GIÁ GÓI THẦU và đơn giá không cao hơn giá đã chào."
                ]
            },
            {
                subtitle: "2. Mức xử lý vi phạm & Cấm tham gia hoạt động đấu thầu",
                content: [
                    "Hành vi gian lận (làm giả hồ sơ, tài liệu): Bị cấm tham gia hoạt động đấu thầu từ 03 NĂM ĐẾN 05 NĂM.",
                    "Hành vi cản trở: Bị cấm tham gia hoạt động đấu thầu từ 01 NĂM ĐẾN 03 NĂM.",
                    "Hành vi vi phạm trong liên danh: Thành viên liên danh nào vi phạm hành vi gian lận thì xử lý cấm đối với CHÍNH THÀNH VIÊN ĐÓ (từ 03 đến 05 năm)."
                ]
            }
        ],
        tip: "Thay thế vật tư thông dụng chưa đạt kỹ thuật (gói thầu 1 nhà thầu): tỷ trọng tối đa KHÔNG QUÁ 1% giá gói thầu. Mức phạt gian lận: 03 - 05 năm cấm thầu."
    },
    {
        id: 9,
        title: "CHUYÊN ĐỀ 9: HIỆP ĐỊNH THƯƠNG MẠI TỰ DO & LỰA CHỌN NHÀ ĐẦU TƯ (NĐ 274/2026/NĐ-CP)",
        parts: [
            {
                subtitle: "1. Đấu thầu theo các Hiệp định Thương mại Tự do (CPTPP, EVFTA, UKVFTA)",
                content: [
                    "Đấu thầu thuốc theo EVFTA: Chính phủ giao BỘ Y TẾ chịu trách nhiệm ban hành văn bản hướng dẫn chi tiết về tổ chức lựa chọn nhà thầu và đấu thầu thuốc theo cam kết EVFTA.",
                    "Đấu thầu nội khối: Chỉ dành cho các nhà thầu nội khối thuộc các nước thành viên hiệp định tham dự thầu."
                ]
            },
            {
                subtitle: "2. Lựa chọn nhà đầu tư thực hiện dự án đầu tư kinh doanh (NĐ 274/2026/NĐ-CP)",
                content: [
                    "Văn bản pháp lý mới: Nghị định số 274/2026/NĐ-CP (có hiệu lực từ 07/7/2026) thay thế Nghị định 23/2024/NĐ-CP và Nghị định 115/2024/NĐ-CP quy định chi tiết thi hành Luật Đấu thầu về lựa chọn nhà đầu tư.",
                    "Hình thức lựa chọn nhà đầu tư: Đấu thầu rộng rãi, đấu thầu hạn chế, chỉ định nhà đầu tư, lựa chọn nhà đầu tư trong trường hợp đặc biệt.",
                    "Phương thức lựa chọn nhà đầu tư: Áp dụng phương thức 01 giai đoạn 02 túi hồ sơ, 02 giai đoạn 01 túi hồ sơ, 02 giai đoạn 02 túi hồ sơ (KHÔNG áp dụng phương thức 01 giai đoạn 01 túi hồ sơ)."
                ]
            }
        ],
        tip: "Hướng dẫn đấu thầu thuốc EVFTA: BỘ Y TẾ. Lựa chọn nhà đầu tư: NĐ 274/2026/NĐ-CP thay thế các NĐ cũ; KHÔNG áp dụng phương thức 1 giai đoạn 1 túi hồ sơ cho nhà đầu tư."
    },
    {
        id: 10,
        title: "CHUYÊN ĐỀ 10: BẢNG TỔNG HỢP ĐỐI CHIẾU QUY ĐỊNH CŨ VS CẬP NHẬT MỚI NHẤT (NÉ BẪY ĐỀ THI)",
        parts: [],
        comparisonTable: [
            {
                content: "Hạn mức Chỉ định thầu dự toán mua sắm",
                oldRule: "500 triệu đồng",
                newRule: "Không quá 01 TỶ ĐỒNG (khoản 4 Điều 78 NĐ 214 sửa bởi NĐ 349/2026/NĐ-CP)"
            },
            {
                content: "Hạn mức Chỉ định thầu tư vấn thuộc dự án",
                oldRule: "800 triệu đồng",
                newRule: "Không quá 03 TỶ ĐỒNG (khoản 4 Điều 78 NĐ 214 sửa bởi NĐ 349/2026/NĐ-CP)"
            },
            {
                content: "Hạn mức Chỉ định thầu phi tư vấn/xây lắp dự án",
                oldRule: "02 tỷ đồng",
                newRule: "Không quá 05 TỶ ĐỒNG (khoản 4 Điều 78 NĐ 214 sửa bởi NĐ 349/2026/NĐ-CP)"
            },
            {
                content: "Thẩm quyền phê duyệt HSMT, KQLCNT",
                oldRule: "Bên mời thầu",
                newRule: "CHỦ ĐẦU TƯ (Luật số 90/2025/QH15 & VBHN số 126/VBHN-VPQH)"
            },
            {
                content: "Mẫu hồ sơ chỉ định thầu, báo cáo đánh giá",
                oldRule: "Thông tư 80/2025/TT-BTC",
                newRule: "Thông tư 134/2026/TT-BTC (thay thế TT 80/2025 từ 09/9/2026)"
            }
        ]
    }
];
