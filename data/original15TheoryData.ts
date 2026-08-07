export interface OriginalTheoryTopic {
    id: number;
    title: string;
    content: string[];
    tips?: string[];
}

export const ORIGINAL_15_THEORY_DATA: OriginalTheoryTopic[] = [
    {
        id: 1,
        title: "1. Phạm vi, Đối tượng áp dụng & Khái niệm cơ bản",
        content: [
            "Bắt buộc áp dụng Luật Đấu thầu với gói thầu của cơ quan nhà nước, đơn vị sự nghiệp công lập sử dụng vốn NSNN, vốn đầu tư công.",
            "Dự án đầu tư công có vốn nhà nước ≥ 30% tổng mức đầu tư hoặc < 30% nhưng > 500 tỷ đồng.",
            "Gói thầu mua thuốc, vật tư y tế, thiết bị y tế của cơ sở y tế công lập.",
            "Gói thầu thuộc dự án PPP, gói thầu sử dụng vốn ODA, vốn vay ưu đãi nước ngoài.",
            "Không bắt buộc áp dụng với đơn vị sự nghiệp công lập tự chủ hoàn toàn dùng vốn ngoài ngân sách hoặc DN nhà nước dùng vốn tự huy động."
        ],
        tips: [
            "Có dùng ngân sách nhà nước / đầu tư công => Bắt buộc áp dụng.",
            "Tự chủ tài chính hoàn toàn / nguồn vốn hợp pháp ngoài ngân sách => Không bắt buộc."
        ]
    },
    {
        id: 2,
        title: "2. Hình thức lựa chọn nhà thầu",
        content: [
            "Đấu thầu rộng rãi: Hình thức mặc định, không giới hạn số lượng nhà thầu tham dự.",
            "Đấu thầu hạn chế: Áp dụng khi gói thầu có yêu cầu kỹ thuật cao, công nghệ phức tạp mà chỉ có một số nhà thầu (tối thiểu 3 nhà thầu) đáp ứng.",
            "Chỉ định thầu: Mua sắm thường xuyên ≤ 100 triệu; Hàng hóa/phi tư vấn dự án ≤ 500 triệu; Xây lắp/tư vấn/hỗn hợp ≤ 1 tỷ; hoặc trường hợp cấp bách, thiên tai, dịch bệnh.",
            "Chào hàng cạnh tranh: Hàng hóa, phi tư vấn thông dụng ≤ 5 tỷ; Xây lắp đơn giản ≤ 5 tỷ.",
            "Mua sắm trực tiếp: Áp dụng cho hàng hóa, phi tư vấn với nhà thầu đã trúng thầu rộng rãi/hạn chế trong vòng 12 tháng, đơn giá không vượt hợp đồng trước. (Không áp dụng cho xây lắp)."
        ],
        tips: [
            "Chỉ định thầu mua sắm thường xuyên: ≤ 100 triệu",
            "Chỉ định thầu dự án (hàng hóa/phi tư vấn): ≤ 500 triệu",
            "Chỉ định thầu dự án (xây lắp/tư vấn): ≤ 1 tỷ",
            "Chào hàng cạnh tranh: ≤ 5 tỷ"
        ]
    },
    {
        id: 3,
        title: "3. Kế hoạch lựa chọn nhà thầu (KHLCNT)",
        content: [
            "Nội dung KHLCNT gồm: Tên gói thầu, Giá gói thầu, Nguồn vốn, Hình thức & Phương thức LCNT, Thời gian bắt đầu LCNT, Loại hợp đồng, Thời gian thực hiện hợp đồng.",
            "Đăng tải KHLCNT: Phải đăng tải trên Hệ thống mạng đấu thầu quốc gia trong thời hạn 05 ngày làm việc kể từ ngày phê duyệt.",
            "Gói thầu ≤ 50 triệu đồng: Không bắt buộc lập KHLCNT nhưng phải có hóa đơn chứng từ hợp lệ."
        ]
    },
    {
        id: 4,
        title: "4. Bảo đảm cạnh tranh trong đấu thầu",
        content: [
            "Độc lập về tài chính giữa Nhà thầu với Chủ đầu tư, Bên mời thầu, Nhà thầu tư vấn lập HSMT, Giám sát, Quản lý dự án.",
            "Hai nhà thầu tham dự cùng 1 gói thầu không được có sở hữu vốn > 30% lẫn nhau hoặc thuộc cùng 1 tổ chức sở hữu > 30% vốn.",
            "Luật Đấu thầu không cấm quan hệ nhân thân (anh em, họ hàng) giữa Giám đốc các doanh nghiệp độc lập tham gia cùng gói thầu."
        ]
    },
    {
        id: 5,
        title: "5. Lập & Đánh giá hồ sơ mời thầu",
        content: [
            "HSMT không được đưa ra các điều kiện nhằm hạn chế sự tham gia của nhà thầu hoặc tạo lợi thế cho một/một số nhà thầu.",
            "Đánh giá HSDT: Đánh giá tính hợp lệ => Đánh giá năng lực, kinh nghiệm => Đánh giá kỹ thuật => Đánh giá tài chính, giá dự thầu."
        ]
    },
    {
        id: 6,
        title: "6. Gói thầu qua mạng (E-bidding)",
        content: [
            "100% thao tác đăng tải E-HSMT, nộp E-HSDT, làm rõ, mở thầu, công khai KQLCNT thực hiện trên Hệ thống mạng đấu thầu quốc gia.",
            "Trước thời điểm đóng thầu, nhà thầu được quyền sửa hoặc rút E-HSDT bất kỳ lúc nào.",
            "Mẫu E-HSMT mua sắm hàng hóa qua mạng 1 giai đoạn 1 túi hồ sơ: Áp dụng Mẫu số 4A (Thông tư 79/2025/TT-BTC)."
        ]
    },
    {
        id: 7,
        title: "7. Thương thảo & Trúng thầu",
        content: [
            "Thương thảo hợp đồng căn cứ vào HSDT, HSMT và dự thảo hợp đồng.",
            "Nhà thầu trúng thầu phải có HSDT hợp lệ, đáp ứng năng lực kinh nghiệm, kỹ thuật và có giá đề nghị trúng thầu không vượt giá gói thầu được duyệt."
        ]
    },
    {
        id: 8,
        title: "8. Lưu trữ hồ sơ",
        content: [
            "Hồ sơ đấu thầu thông thường lưu trữ theo quy định pháp luật về lưu trữ.",
            "Hồ sơ liên quan đến hủy thầu phải lưu trữ tối thiểu 05 năm kể từ ngày ban hành quyết định hủy thầu."
        ]
    },
    {
        id: 9,
        title: "9. Các loại hợp đồng trong đấu thầu",
        content: [
            "Hợp đồng trọn gói: Giá hợp đồng không thay đổi (trừ bổ sung ngoài phạm vi), thanh toán theo % hoàn thành, bắt buộc áp dụng cho gói thầu dịch vụ tư vấn đơn giản, quy mô nhỏ.",
            "Hợp đồng theo đơn giá cố định: Đơn giá cố định, thanh toán theo khối lượng nghiệm thu thực tế.",
            "Hợp đồng theo đơn giá điều chỉnh: Cả đơn giá và khối lượng đều có thể điều chỉnh.",
            "Hợp đồng theo thời gian: Thanh toán theo thời gian làm việc thực tế của chuyên gia tư vấn."
        ]
    },
    {
        id: 10,
        title: "10. Bảo đảm dự thầu & Thực hiện hợp đồng",
        content: [
            "Bảo đảm dự thầu (BĐDT): 1% - 1.5% (gói thầu nhỏ); 1.5% - 3% (gói thầu thông thường).",
            "Bảo đảm thực hiện hợp đồng (BĐTHHĐ): 2% - 10% (rủi ro cao lên đến 30%).",
            "Không hoàn trả BĐDT nếu rút HSDT sau đóng thầu, gian lận, hoặc từ chối đối chiếu tài liệu / từ chối ký hợp đồng."
        ]
    },
    {
        id: 11,
        title: "11. Quản lý hợp đồng & Thanh toán",
        content: [
            "Thanh toán căn cứ theo điều khoản hợp đồng đã ký kết, biên bản nghiệm thu và hóa đơn chứng từ hợp lệ.",
            "Việc điều chỉnh hợp đồng chỉ được thực hiện trong thời gian thực hiện hợp đồng."
        ]
    },
    {
        id: 12,
        title: "12. Hủy thầu, Hủy kết quả & Xử lý vi phạm",
        content: [
            "Hủy thầu khi tất cả HSDT không đáp ứng HSMT, hoặc có bằng chứng gian lận, thông thầu, cản trở.",
            "Khung thời gian cấm thầu: Gian lận/Thông thầu/Hối lộ cấm 3 - 5 năm; Chuyển nhượng thầu trái phép cấm 1 - 3 năm; Vi phạm kiêm nhiệm cấm 6 tháng - 1 năm."
        ]
    },
    {
        id: 13,
        title: "13. Xử lý tình huống trong đấu thầu",
        content: [
            "Chào thiếu giá hạng mục: Yêu cầu làm rõ, tính theo giá cao nhất của hạng mục đó trong số các HSDT để so sánh.",
            "Ít hơn 3 nhà thầu nộp HSDT: Có thể gia hạn thời điểm đóng thầu hoặc mở thầu ngay.",
            "Hợp đồng tương tự thiếu giá trị: Đánh giá KHÔNG ĐẠT.",
            "Hàng hóa không ghi rõ xuất xứ trong Bảng giá: Yêu cầu làm rõ, không loại ngay."
        ]
    },
    {
        id: 14,
        title: "14. Mua sắm tập trung",
        content: [
            "Áp dụng khi mua sắm hàng hóa, dịch vụ số lượng lớn, chủng loại tương tự của nhiều đơn vị.",
            "Đơn vị Mua sắm tập trung LCNT và ký Thỏa thuận khung; đơn vị sử dụng ký hợp đồng và thanh toán."
        ]
    },
    {
        id: 15,
        title: "15. Đấu thầu theo quy chuẩn quốc tế & ODA",
        content: [
            "Áp dụng quy định của Điều ước quốc tế, Thỏa thuận về vốn ODA, vốn vay ưu đãi.",
            "Trường hợp Điều ước quốc tế có quy định khác với Luật Đấu thầu thì áp dụng quy định của Điều ước quốc tế đó."
        ]
    }
];
