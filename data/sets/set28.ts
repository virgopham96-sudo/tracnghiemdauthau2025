
import { Question } from '../../types';

export const set28: Question[] = [
    {
        "id": 271,
        "question": "Gói thầu hàng hóa có giá gói thầu 01 tỷ đồng thực hiện chào giá trực tuyến theo quy trình rút gọn, trường hợp chủ đầu tư đăng tải thông báo mời thầu vào 11h00 ngày Thứ 2 (15/9/2025), thời điểm nào sau đây là thời điểm kết thúc chào giá trực tuyến sớm nhất?",
        "options": {
            "A": "08h00 ngày thứ 6 (19/9/2025)",
            "B": "08h00 ngày thứ bảy (20/9/2025)",
            "C": "11h00 ngày thứ 6 (19/9/2025)",
            "D": "08h00 ngày thứ 2 (22/9/2025)"
        },
        "correctAnswer": "D",
        "explanation": "Căn cứ pháp lý: Khoản 2 Điều 102 Nghị định số 214/2025/NĐ-CP. Gói thầu 01 tỷ đồng (dưới 02 tỷ) -> Thời gian chuẩn bị tối thiểu 03 ngày làm việc. Đăng thông báo: 11h00 Thứ 2 (15/9). 3 ngày làm việc chuẩn bị: 16, 17, 18 (Thứ 5). Bắt đầu chào giá sớm nhất: Thứ 6 (19/9). Thời gian chào giá tối thiểu: 24 giờ. Từ 08h00 Thứ 6 (19/9) + 24h -> 08h00 Thứ 7 (20/9). Tuy nhiên, thời điểm kết thúc phải trong giờ hành chính (Khoản 4 Điều 100). Thứ 7 thường không được tính là giờ hành chính trong đấu thầu (hoặc hệ thống không set kết thúc vào ngày nghỉ). Do đó, thời điểm kết thúc sẽ chuyển sang đầu giờ làm việc tiếp theo là 08h00 Thứ 2 (22/9).",
        "category": "Đấu thầu qua mạng"
    },
    {
        "id": 272,
        "question": "Đối với đấu thầu qua mạng, thành phần nào sau đây không được coi là một phần của E-HSMT và nhà thầu không phải đáp ứng các yêu cầu này?",
        "options": {
            "A": "Bảng dữ liệu được số hóa dưới dạng webform trên Hệ thống mạng đấu thầu quốc gia",
            "B": "Tiêu chuẩn đánh giá về tính hợp lệ được đính kèm trên Hệ thống mạng đấu thầu quốc gia",
            "C": "Yêu cầu về năng lực, kinh nghiệm được đính kèm trên Hệ thống mạng đấu thầu quốc gia",
            "D": "Phương án B và C đều đúng"
        },
        "correctAnswer": "D",
        "explanation": "Căn cứ pháp lý: Khoản 3 Điều 26 Thông tư số 79/2025/TT-BTC. Thông tư quy định Bảng dữ liệu, Tiêu chuẩn đánh giá tính hợp lệ, Yêu cầu năng lực kinh nghiệm phải được số hóa dưới dạng webform. Nếu chủ đầu tư đính kèm các file yêu cầu khác cho các nội dung này (mà không số hóa), các file đó không được coi là một phần của E-HSMT và nhà thầu không phải đáp ứng.",
        "category": "Đấu thầu qua mạng"
    },
    {
        "id": 273,
        "question": "Yêu cầu nào sau đây là đúng đối với tệp tin (file) đăng tải trên Hệ thống mạng đấu thầu quốc gia?",
        "options": {
            "A": "Các file mở, đọc được bằng các phần mềm thông dụng như: các phần mềm đọc, soạn thảo văn bản MS Office hoặc Open Office; các phần mềm đọc file PDF; các phần mềm thiết kế thông dụng như AutoCad, Photoshop; phần mềm đọc file ảnh tích hợp sẵn trên Hệ điều hành Windows. Các file sử dụng phông chữ không thuộc bảng mã Unicode",
            "B": "Các file nén mở được bằng các phần mềm giải nén thông dụng như phần mềm giải nén ZIP tích hợp sẵn trên hệ điều hành Windows, MacOS hoặc phần mềm giải nén Rar hoặc 7Zip. Trường hợp sử dụng file nén, các file sau khi giải nén phải có định dạng đúng quy định.",
            "C": "Không bị nhiễm virus, không bị lỗi, hỏng và không thiết lập mật khẩu",
            "D": "Các phương án trên đều đúng"
        },
        "correctAnswer": "C",
        "explanation": "Căn cứ pháp lý: Điểm c Khoản 1 Điều 5 Thông tư số 79/2025/TT-BTC. Quy định về định dạng tệp tin yêu cầu: Không bị nhiễm virus, không bị lỗi/hỏng và đặc biệt là không thiết lập mật khẩu (để hệ thống và tổ chuyên gia có thể mở và đọc được).",
        "category": "Đấu thầu qua mạng"
    },
    {
        "id": 274,
        "question": "Đối với đấu thầu qua mạng, trường hợp file đính kèm trong E-HSMT không thể mở hoặc không đọc được thì chủ đầu tư phải thực hiện hành động nào sau đây?",
        "options": {
            "A": "Đăng tải và phát hành lại toàn bộ E-HSMT",
            "B": "Sửa đổi E-HSMT và không phải phát hành lại toàn bộ E-HSMT",
            "C": "Đề nghị Trung tâm Đấu thầu qua mạng quốc gia sửa đổi E-HSMT trong trường hợp chủ đầu tư không sửa đổi được E-HSMT",
            "D": "Các phương án trên đều đúng"
        },
        "correctAnswer": "A",
        "explanation": "Căn cứ pháp lý: Khoản 2 Điều 5 Thông tư số 79/2025/TT-BTC. Nếu file đính kèm trong E-HSMT không mở/đọc được, Chủ đầu tư phải đăng tải và phát hành lại toàn bộ E-HSMT để đảm bảo tính công bằng và đầy đủ thông tin cho nhà thầu.",
        "category": "Đấu thầu qua mạng"
    },
    {
        "id": 275,
        "question": "Đối với đấu thầu qua mạng, trường hợp Hệ thống mạng đấu thầu quốc gia gặp sự cố không thể vận hành và phải tự động gia hạn thời điểm đóng thầu của các gói thầu bị ảnh hưởng (có thời điểm đóng thầu trong thời gian từ khi Hệ thống bị sự cố cho đến thời điểm sau hoàn thành khắc phục sự cố 02 giờ) thì việc đánh giá E-HSDT được thực hiện trên cơ sở thời điểm đóng thầu nào sau đây?",
        "options": {
            "A": "Thời điểm đóng thầu nêu trong E-TBMT đã được đăng tải trước thời điểm Hệ thống mạng đấu thầu quốc gia gặp sự cố",
            "B": "Thời điểm đóng thầu mà Hệ thống mạng đấu thầu quốc gia tự động gia hạn",
            "C": "Do Chủ đầu tư quyết định",
            "D": "Phương án A và B đều đúng"
        },
        "correctAnswer": "D",
        "explanation": "Căn cứ pháp lý: Khoản 3 Điều 6 Thông tư số 79/2025/TT-BTC. Khi Hệ thống tự động gia hạn do sự cố, việc đánh giá E-HSDT được thực hiện dựa trên thời điểm đóng thầu: Hồ sơ nộp trước sự cố: Căn cứ thời điểm đóng thầu cũ (A). Hồ sơ nộp sau khi khắc phục: Căn cứ thời điểm đóng thầu mới (B). Do đó, cả A và B đều đúng tùy thuộc vào thời điểm nộp của từng nhà thầu.",
        "category": "Đấu thầu qua mạng"
    },
    {
        "id": 276,
        "question": "Loại Chứng thư số nào sau đây được sử dụng trên Hệ thống mạng đấu thầu quốc gia?",
        "options": {
            "A": "Chứng thư số chuyên dùng do tất cả tổ chức có chức năng cung cấp dịch vụ chứng thực chữ ký số chuyên dùng cấp",
            "B": "Tất cả các loại chứng thư số",
            "C": "Chứng thư số công cộng do tổ chức cung cấp dịch vụ chứng thực chữ ký số công cộng cấp hoặc chứng thư số do tổ chức cung cấp dịch vụ chứng thực chữ ký số chuyên dùng Chính phủ cấp",
            "D": "Phương án A và C đều đúng"
        },
        "correctAnswer": "C",
        "explanation": "Căn cứ pháp lý: Khoản 6 Điều 3 Thông tư số 79/2025/TT-BTC. Chứng thư số sử dụng trên Hệ thống là: (1) Chứng thư số công cộng (do các tổ chức cung cấp dịch vụ chứng thực chữ ký số công cộng cấp - VNPT, Viettel, Bkav...); hoặc (2) Chứng thư số chuyên dùng Chính phủ (cấp cho cơ quan nhà nước). Không phải tất cả các loại chứng thư số chuyên dùng khác đều được chấp nhận.",
        "category": "Đấu thầu qua mạng"
    },
    {
        "id": 277,
        "question": "Đối với đấu thầu qua mạng, trường hợp nhà thầu sử dụng bảo lãnh dự thầu điện tử trên Hệ thống mạng đấu thầu quốc gia, phát biểu nào sau đây là đúng?",
        "options": {
            "A": "Giá trị bảo lãnh dự thầu luôn đáp ứng yêu cầu trong E-HSMT",
            "B": "Thời gian hiệu lực của bảo lãnh dự thầu luôn đáp ứng yêu cầu trong E-HSMT",
            "C": "Đối tượng thụ hưởng bảo lãnh dự thầu luôn đáp ứng yêu cầu trong E-HSMT",
            "D": "Các phương án trên đều đúng"
        },
        "correctAnswer": "D",
        "explanation": "Căn cứ pháp lý: Quy trình kỹ thuật bảo lãnh điện tử trên Hệ thống (liên thông dữ liệu). Khi nhà thầu chọn bảo lãnh điện tử, thông tin được truyền trực tiếp từ Ngân hàng sang Hệ thống đấu thầu dựa trên mã gói thầu và yêu cầu của E-HSMT. Do đó, các thông tin về giá trị, hiệu lực, thụ hưởng sẽ được hệ thống kiểm soát để luôn đáp ứng yêu cầu (nếu ngân hàng phát hành thành công theo lệnh).",
        "category": "Đấu thầu qua mạng"
    },
    {
        "id": 278,
        "question": "Gói thầu mua sắm hàng hóa có: - Thời điểm đóng thầu theo E-TBMT là: 18h00 ngày 25/9/2025 - Hiệu lực của bảo đảm dự thầu theo yêu cầu của E-HSMT là: 90 ngày - Do lỗi hệ thống nên Hệ thống tự động gia hạn thời điểm đóng thầu mới là: 11h ngày 26/9/2025 Nhà thầu A đã nộp E-HSDT trước thời điểm Hệ thống xảy ra sự cố với hiệu lực của bảo đảm dự thầu là 90 ngày kể từ ngày 25/9/2025; Nhà thầu B nộp E-HSDT sau khi Hệ thống được khắc phục và trước thời điểm đóng thầu mới với hiệu lực của bảo đảm dự thầu là 90 ngày kể từ ngày 26/9/2025. Trong trường hợp này, bảo đảm dự thầu của nhà thầu A và nhà thầu B được đánh giá như thế nào?",
        "options": {
            "A": "Bảo đảm dự thầu của nhà thầu A được đánh giá là không hợp lệ; Bảo đảm dự thầu của nhà thầu B được đánh giá là hợp lệ",
            "B": "Bảo đảm dự thầu của nhà thầu A và nhà thầu B đều được đánh giá là hợp lệ",
            "C": "Bảo đảm dự thầu của nhà thầu A được đánh giá là hợp lệ; Bảo đảm dự thầu của nhà thầu B được đánh giá là không hợp lệ",
            "D": "Bảo đảm dự thầu của nhà thầu A và nhà thầu B đều được đánh giá là không hợp lệ"
        },
        "correctAnswer": "B",
        "explanation": "Căn cứ pháp lý: Khoản 3 Điều 6 Thông tư số 79/2025/TT-BTC và nguyên tắc xử lý sự cố. Nhà thầu A nộp trước sự cố: Hiệu lực tính từ thời điểm đóng thầu cũ (25/9) -> Hợp lệ theo thời điểm đó. Nhà thầu B nộp sau sự cố (khi đã có thời điểm đóng thầu mới 26/9): Hiệu lực tính từ thời điểm đóng thầu mới -> Hợp lệ theo thời điểm mới. Cả hai đều được đánh giá là hợp lệ dựa trên thời điểm tương ứng mà họ nộp thầu.",
        "category": "Đấu thầu qua mạng"
    },
    {
        "id": 279,
        "question": "So sánh điều kiện xét duyệt trúng thầu giữa phương pháp giá cố định và phương pháp dựa trên kỹ thuật đối với gói thầu dịch vụ tư vấn, điểm chung quyết định để nhà thầu được xếp hạng thứ nhất là gì?",
        "options": {
            "A": "Có giá dự thầu thấp nhất",
            "B": "Có điểm tổng hợp cao nhất",
            "C": "Có điểm kỹ thuật cao nhất",
            "D": "Có giá đề nghị trúng thầu thấp nhất"
        },
        "correctAnswer": "C",
        "explanation": "Căn cứ pháp lý: Điểm b Khoản 2 Điều 59 (Giá cố định) và Điểm b Khoản 4 Điều 59 (Dựa trên kỹ thuật) Luật Đấu thầu. Phương pháp Giá cố định: Nhà thầu có điểm kỹ thuật cao nhất được xếp hạng nhất. Phương pháp Dựa trên kỹ thuật: Nhà thầu có điểm kỹ thuật cao nhất được xếp hạng nhất. Điểm chung quyết định xếp hạng thứ nhất là: Có điểm kỹ thuật cao nhất.",
        "category": "Hồ sơ mời thầu và Đánh giá HSDT"
    },
    {
        "id": 280,
        "question": "Phương pháp kết hợp giữa kỹ thuật và giá được áp dụng cho gói thầu tư vấn có đặc điểm nào trong các phương án sau đây?",
        "options": {
            "A": "Gói thầu tư vấn đơn giản, chi phí thấp",
            "B": "Gói thầu tư vấn có yêu cầu kỹ thuật rất cao, chi phí cố định",
            "C": "Gói thầu tư vấn chú trọng tới cả chất lượng và chi phí thực hiện",
            "D": "Gói thầu tư vấn có quy trình thực hiện đã được tiêu chuẩn hoá"
        },
        "correctAnswer": "C",
        "explanation": "Căn cứ pháp lý: Điểm a Khoản 3 Điều 59 Luật Đấu thầu. Phương pháp kết hợp giữa kỹ thuật và giá được áp dụng đối với gói thầu tư vấn chú trọng tới cả chất lượng và chi phí thực hiện gói thầu.",
        "category": "Hồ sơ mời thầu và Đánh giá HSDT"
    }
];
