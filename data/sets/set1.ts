
import { Question } from '../../types';

export const set1: Question[] = [
    {
        "id": 1,
        "question": "Trường hợp nào sau đây bắt buộc phải lựa chọn nhà thầu theo quy định tại Luật Đấu thầu?",
        "options": {
            "A": "Gói thầu thuộc dự án sử dụng vốn ngân sách nhà nước của cơ quan nhà nước",
            "B": "Lựa chọn nhà thầu của doanh nghiệp nhà nước không sử dụng vốn ngân sách nhà nước",
            "C": "Lựa chọn nhà thầu của đơn vị sự nghiệp công lập tự bảo đảm chi thường xuyên không sử dụng ngân sách nhà nước",
            "D": "Việc thuê, mua, thuê mua nhà, trụ sở, tài sản gắn liền với đất"
        },
        "correctAnswer": "A",
        "explanation": "Theo Khoản 1 Điều 2 Luật Đấu thầu, Luật này áp dụng đối với hoạt động lựa chọn nhà thầu của cơ quan, tổ chức sử dụng vốn ngân sách nhà nước. Do đó, gói thầu thuộc dự án sử dụng vốn ngân sách nhà nước của cơ quan nhà nước bắt buộc phải áp dụng Luật Đấu thầu.\n\nCác phương án B, C, D thuộc trường hợp được tự quyết định việc mua sắm theo quy định tại Khoản 7 Điều 3 Luật Đấu thầu (doanh nghiệp nhà nước không sử dụng vốn ngân sách, đơn vị sự nghiệp công lập tự chủ chi thường xuyên không sử dụng vốn ngân sách, thuê/mua trụ sở).",
        "category": "Quy định chung"
    },
    {
        "id": 2,
        "question": "Chọn phương án đúng về phạm vi điều chỉnh của Luật Đấu thầu?",
        "options": {
            "A": "Quy định về quản lý nhà nước đối với hoạt động đấu thầu",
            "B": "Quy định về thẩm quyền và trách nhiệm của các cơ quan, tổ chức, cá nhân trong hoạt động đấu thầu",
            "C": "Quy định về hoạt động lựa chọn nhà thầu thực hiện gói thầu, hoạt động lựa chọn nhà đầu tư thực hiện dự án đầu tư kinh doanh",
            "D": "Tất cả phương án trên đều đúng"
        },
        "correctAnswer": "D",
        "explanation": "Căn cứ Điều 1 Luật Đấu thầu, phạm vi điều chỉnh bao gồm cả quản lý nhà nước, thẩm quyền trách nhiệm của các bên, và các hoạt động lựa chọn nhà thầu, nhà đầu tư. Vì vậy, tất cả các phương án A, B, C đều đúng.",
        "category": "Quy định chung"
    },
    {
        "id": 3,
        "question": "Trường hợp nào sau đây không thuộc đối tượng áp dụng của Luật Đấu thầu?",
        "options": {
            "A": "Gói thầu mua thuốc, hoá chất, vật tư xét nghiệm sử dụng nguồn ngân sách nhà nước của bệnh viện công lập A",
            "B": "Gói thầu xây dựng đường giao thông sử dụng vốn đầu tư công do Ban Quản lý dự án đầu tư xây dựng công trình tỉnh A làm chủ đầu tư",
            "C": "Gói thầu mua sắm trang thiết bị làm việc sử dụng vốn nhà nước của Văn phòng UBND tỉnh A",
            "D": "Hoạt động mua phần mềm kế toán của hộ kinh doanh cá thể"
        },
        "correctAnswer": "D",
        "explanation": "Hoạt động mua phần mềm kế toán của hộ kinh doanh cá thể là hoạt động của tư nhân, không sử dụng vốn nhà nước và không thuộc đối tượng điều chỉnh bắt buộc của Luật Đấu thầu (trừ khi họ tự nguyện áp dụng). Các phương án A, B, C đều liên quan đến vốn nhà nước hoặc đơn vị công lập nên thuộc đối tượng áp dụng.",
        "category": "Quy định chung"
    },
    {
        "id": 4,
        "question": "Theo quy định pháp luật về đấu thầu, gói thầu nào là gói thầu cung cấp dịch vụ tư vấn?",
        "options": {
            "A": "Thiết kế và cung cấp hệ thống xử lý nước thải",
            "B": "Gói thầu lập nhiệm vụ quy hoạch vùng",
            "C": "Gói thầu quảng cáo trên nền tảng xã hội và phát sóng trên VTV",
            "D": "Gói thầu mua phần mềm kế toán MISA"
        },
        "correctAnswer": "B",
        "explanation": "Gói thầu lập nhiệm vụ quy hoạch vùng là dịch vụ tư vấn (theo Khoản 4 Điều 4 Luật Đấu thầu: lập quy hoạch là dịch vụ tư vấn).\n\nA là gói thầu hỗn hợp (thiết kế và cung cấp hàng hóa).\n\nC là dịch vụ phi tư vấn (quảng cáo).\n\nD là mua sắm hàng hóa (phần mềm thương mại).",
        "category": "Quy định chung"
    },
    {
        "id": 5,
        "question": "Theo quy định pháp luật về đấu thầu, gói thầu nào là gói thầu cung cấp dịch vụ phi tư vấn?",
        "options": {
            "A": "Gói thầu in sổ công tác của tỉnh A",
            "B": "Gói thầu thuê kiểm toán dự án",
            "C": "Gói thầu mua phần mềm kế toán hỗ trợ doanh nghiệp khởi nghiệp sáng tạo, doanh nghiệp nhỏ do phụ nữ làm chủ",
            "D": "Gói thầu xây dựng trụ sở làm việc của tỉnh A."
        },
        "correctAnswer": "A",
        "explanation": "Gói thầu in sổ công tác (in ấn) được quy định là dịch vụ phi tư vấn tại Khoản 5 Điều 4 Luật Đấu thầu.\n\nB là dịch vụ tư vấn (kiểm toán).\n\nC là hàng hóa (phần mềm).\n\nD là xây lắp.",
        "category": "Quy định chung"
    },
    {
        "id": 6,
        "question": "Theo quy định pháp luật về đấu thầu, đấu thầu là gì?",
        "options": {
            "A": "Là quá trình lựa chọn nhà thầu để ký kết, thực hiện hợp đồng cung cấp dịch vụ tư vấn, dịch vụ phi tư vấn, mua sắm hàng hóa, xây lắp trên cơ sở bảo đảm cạnh tranh, công bằng, minh bạch, hiệu quả kinh tế và trách nhiệm giải trình",
            "B": "Là quá trình lựa chọn nhà đầu tư để ký kết, thực hiện hợp đồng dự án đầu tư kinh doanh trên cơ sở bảo đảm cạnh tranh, công bằng, minh bạch, hiệu quả kinh tế và trách nhiệm giải trình",
            "C": "Là quá trình lựa chọn đơn vị để thực hiện hợp đồng thông qua các quy trình, thủ tục do pháp luật đấu thầu quy định.",
            "D": "Phương án A và B đều đúng"
        },
        "correctAnswer": "D",
        "explanation": "Theo Khoản 8 Điều 4 Luật Đấu thầu, đấu thầu là quá trình lựa chọn nhà thầu để ký kết, thực hiện hợp đồng... và lựa chọn nhà đầu tư để ký kết, thực hiện hợp đồng dự án đầu tư kinh doanh. Do đó, cả A và B đều đúng.",
        "category": "Quy định chung"
    },
    {
        "id": 7,
        "question": "Đấu thầu quốc tế là gì?",
        "options": {
            "A": "Là hoạt động đấu thầu mà nhà thầu trong nước, nhà thầu nước ngoài được tham dự thầu",
            "B": "Là hoạt động đấu thầu mà nhà thầu trong nước, nhà thầu nước ngoài được tham dự thầu, trong đó nhà thầu trong nước bắt buộc phải liên danh với nhà thầu nước ngoài",
            "C": "Là hoạt động đấu thầu chỉ nhà thầu quốc tế được phép tham dự thầu",
            "D": "Là hoạt động đấu thầu chỉ nhà thầu trong nước được phép tham dự thầu"
        },
        "correctAnswer": "A",
        "explanation": "Theo Khoản 10 Điều 4 Luật Đấu thầu, đấu thầu quốc tế là hoạt động đấu thầu mà nhà thầu, nhà đầu tư trong nước, nước ngoài được tham dự thầu.",
        "category": "Quy định chung"
    },
    {
        "id": 8,
        "question": "Giá đề nghị trúng thầu là gì?",
        "options": {
            "A": "Là giá dự thầu của nhà thầu ghi trong quyết định phê duyệt kết quả lựa chọn nhà thầu.",
            "B": "Là giá dự thầu của nhà thầu được đề nghị trúng thầu sau khi đã được sửa lỗi, hiệu chỉnh sai lệch theo yêu cầu của hồ sơ mời thầu, hồ sơ yêu cầu, trừ đi giá trị giảm giá (nếu có)",
            "C": "Là giá dự thầu của nhà thầu chưa tính sửa lỗi, hiệu chỉnh sai lệch và giá trị giảm giá (nếu có)",
            "D": "Là giá trị ghi trong hợp đồng giữa chủ đầu tư và nhà thầu"
        },
        "correctAnswer": "B",
        "explanation": "Theo Khoản 13 Điều 4 Luật Đấu thầu, giá đề nghị trúng thầu là giá dự thầu của nhà thầu được đề nghị trúng thầu sau khi đã được sửa lỗi, hiệu chỉnh sai lệch, trừ đi giá trị giảm giá (nếu có).",
        "category": "Quy định chung"
    },
    {
        "id": 9,
        "question": "Theo quy định pháp luật về đấu thầu, hàng hóa gồm?",
        "options": {
            "A": "Máy móc, thiết bị, nguyên liệu, nhiên liệu, vật liệu, vật tư, phụ tùng; sản phẩm; phương tiện; hàng tiêu dùng, phần mềm thương mại",
            "B": "Thuốc, hóa chất, vật tư xét nghiệm, thiết bị y tế",
            "C": "Phương án A và B đều đúng",
            "D": "Logistics, bảo hiểm, quảng cáo, nghiệm thu chạy thử, chụp ảnh vệ tinh"
        },
        "correctAnswer": "C",
        "explanation": "Theo Khoản 17 Điều 4 Luật Đấu thầu, hàng hóa bao gồm cả máy móc, thiết bị, nguyên liệu... và thuốc, hóa chất, vật tư xét nghiệm, thiết bị y tế. Do đó cả A và B đều đúng.",
        "category": "Quy định chung"
    },
    {
        "id": 10,
        "question": "Đối tượng nào sau đây được hưởng ưu đãi trong lựa chọn nhà thầu?",
        "options": {
            "A": "Hàng hóa có xuất xứ Việt Nam",
            "B": "Nhà thầu trong nước sản xuất hàng hóa có xuất xứ Việt Nam phù hợp với hồ sơ mời thầu",
            "C": "Sản phẩm, dịch vụ thân thiện môi trường theo quy định của pháp luật về bảo vệ môi trường",
            "D": "Tất cả các phương án trên đều đúng"
        },
        "correctAnswer": "D",
        "explanation": "Theo Khoản 1 Điều 10 Luật Đấu thầu, tất cả các đối tượng nêu tại A, B, C (Hàng hóa xuất xứ Việt Nam; Sản phẩm thân thiện môi trường; Nhà thầu trong nước sản xuất hàng hóa xuất xứ Việt Nam) đều thuộc đối tượng được hưởng ưu đãi.",
        "category": "Quy định chung"
    }
];
